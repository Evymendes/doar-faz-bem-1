/* eslint-disable class-methods-use-this */
// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

// Components
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getById, createMedicament } from '../services/api';

// Assets
import ChevronDown from '../assets/chevron-down.svg';

// Styled
const Container = styled.div`
	width: 100%;
	height: 100%;
	background: #38D5D5;
`;

const Form = styled.form`
	margin: 0 auto;
	padding-top: 2rem;
	width: 86%;
	display: flex;
	flex-direction: column;
`;

const FormContent = styled.div`
  margin-bottom: ${(props) => (props.isError ? '0.5rem' : '1.5rem')};
`;

const Label = styled.label`
	font: 700 1rem 'Overpass', serif;
	width: 90%;
	color: #FFF;
`;

const Input = styled.input`
	padding: 0.7rem 0.7rem;
  width: 100%;
	color: ${(props) => (props.isData ? '#989494' : '#38D5D5')};
	font: 700 1rem 'Overpass', serif;
	text-decoration: none;
	background: #FFF;
	outline: none;
  border: ${(props) => (props.isError ? '2px solid red' : 'none')};
	border-radius: 4px;
	box-shadow: 2px 2px 2px #888888;

	::placeholder {
		color: ${(props) => (props.isData ? '#989494' : '#38D5D5')};
	}
`;

const MultSelect = styled.div`
	padding: 0.7rem 0.7rem 0.44rem 0.7rem;
	width: 100%;
	color: #989494;
	font: 700 1rem 'Overpass', serif;
	text-decoration: none;
	background: #FFF;
	outline: none;
	border: ${(props) => (props.isError ? '2px solid red' : 'none')};
	border-radius:${(props) => (props.isModal ? '4px 4px 0 0' : '4px')};
	box-shadow: 2px 2px 2px #888888;
	display: flex;
	justify-content: space-between;

	::placeholder {
		color: #989494;
	}
`;

const TextMultSelect = styled.p`
	color: ${(props) => (props.isData ? '#989494' : '#38D5D5')};
	text-transform: capitalize;
`;

const Modal = styled.div`
	background: #FFF;
	display: flex;
	flex-direction: column;
	box-shadow: rgb(136, 136, 136) 1px 1px 2px 1px;
`;

const Text = styled.p`
	padding: 0.35rem 0 0.35rem 0.7rem;
	font: 400 0.9rem 'Overpass', serif;
	color:#989494;
	text-transform: capitalize;

	&:hover {
		background: #98949457;
	}
`;

const ErrorMessage = styled.p`
	margin-top: .3rem;
  color: red;
	font: 400 .9rem 'Overpass', serif;
	display: flex;
	justify-content: flex-end;
`;

const Footer = styled.div`
	margin: 2rem 0;
	display: flex;
	justify-content: space-between;
`;

const Button = styled.button`
	width: 9.2rem;
	height: 3rem;
	color: #fff;
	font: 700 1rem 'Overpass', serif;
	text-decoration: none;
	text-transform: uppercase;
	border-radius: 50px;
	box-shadow: ${(props) => (props.cancel ? 'none' : '2px 2px 2px #888888')};
	background: ${(props) => (props.cancel ? 'transparent' : '#49E5D6')};
	border: ${(props) => (props.cancel ? '1px solid #FFF' : 'none')};
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	@media(max-width: 320px) {
		width: 8rem;
	}
`;

class Login extends Component {
	state = {
		isRedirect: undefined,
		redirect: undefined,
		isModalOpenPackaging: undefined,
		typePackaging: ['true', 'false'],
		selectedPackaging: undefined,
		isModalType: undefined,
		typeMed: ['comprimidos', 'gel', 'xarope', 'gotas', 'supositórios', 'injetáveis', 'cápsulas', 'drágeas'],
		selectedType: undefined,
		isLoading: undefined,
		isErrorCode: false,
		isErrorName: false,
		isErrorExpirationDate: false,
		isErrorCategory: false,
		isErrorSubstance: false,
		isErroLaboratory: false,
		isErrorOpenPackaging: false,
		isErrorTypeMed: false,
		isErrorQuantity: false,
		isErrorDescription: false,
		medicament: {
			code: null,
			name: '',
			expirationDate: undefined,
			category: '',
			substance: '',
			laboratory: '',
			openPacking: '',
			type: '',
			quantity: '',
			description: '',
		},
	}

	componentDidMount() {
		this.treatingData();
	}

	treatingData = () => {
		const { result } = this.props.location.state;
		// code: 7894916341769

		this.setState({
			medicament: {
				code: result.code,
				name: result.name,
				substance: result.substance,
				laboratory: result.laboratory,
				description: result.description,
			},
		});
	}

	handleBackScanner = () => {
		this.props.history.goBack();
	}

	handleChange = (field, ev) => {
		const { medicament } = this.state;

		if (field === 'code') {
			this.setState({
				isErrorCode: false,
			});
		}

		if (field === 'name') {
			this.setState({
				isErrorName: false,
			});
		}

		if (field === 'expirationDate') {
			this.setState({
				isErrorExpirationDate: false,
			});
		}

		if (field === 'category') {
			this.setState({
				isErrorCategory: false,
			});
		}

		if (field === 'substance') {
			this.setState({
				isErrorSubstance: false,
			});
		}

		if (field === 'laboratory') {
			this.setState({
				isErroLaboratory: false,
			});
		}

		if (field === 'openPacking') {
			this.setState({
				isErrorOpenPackaging: false,
			});
		}

		if (field === 'type') {
			this.setState({
				isErrorTypeMed: false,
			});
		}

		if (field === 'quantity') {
			this.setState({
				isErrorQuantity: false,
			});
		}

		if (field === 'description') {
			this.setState({
				isErrorDescription: false,
			});
		}

		medicament[field] = ev.target.value;

		this.setState({
			medicament,
		});
	};

	validationScreen = () => {
		const {
			code,
			name,
			expirationDate,
			category,
			substance,
			type,
			quantity,
			openPacking,
			laboratory,
			description,
		} = this.state.medicament;

		if (!code) {
			this.setState({
				isErrorCode: true,
			});
		} else {
			this.setState({
				isErrorCode: false,
			});
		}

		if (!name) {
			this.setState({
				isErrorName: true,
			});
		} else {
			this.setState({
				isErrorName: false,
			});
		}

		if (!expirationDate) {
			this.setState({
				isErrorExpirationDate: true,
			});
		} else {
			this.setState({
				isErrorExpirationDate: false,
			});
		}

		if (!category) {
			this.setState({
				isErrorCategory: true,
			});
		} else {
			this.setState({
				isErrorCategory: false,
			});
		}

		if (!substance) {
			this.setState({
				isErrorSubstance: true,
			});
		} else {
			this.setState({
				isErrorSubstance: false,
			});
		}

		if (!laboratory) {
			this.setState({
				isErroLaboratory: true,
			});
		} else {
			this.setState({
				isErroLaboratory: false,
			});
		}

		if (!openPacking) {
			this.setState({
				isErrorOpenPackaging: true,
			});
		} else {
			this.setState({
				isErrorOpenPackaging: false,
			});
		}

		if (!type) {
			this.setState({
				isErrorTypeMed: true,
			});
		} else {
			this.setState({
				isErrorTypeMed: false,
			});
		}

		if (!quantity) {
			this.setState({
				isErrorQuantity: true,
			});
		} else {
			this.setState({
				isErrorQuantity: false,
			});
		}

		if (!description) {
			this.setState({
				isErrorDescription: true,
			});
		} else {
			this.setState({
				isErrorDescription: false,
			});
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const {
			isErrorCode,
			isErrorName,
			isErrorExpirationDate,
			isErrorCategory,
			isErrorSubstance,
			isErroLaboratory,
			isErrorOpenPackaging,
			isErrorTypeMed,
			isErrorQuantity,
			isErrorDescription,
			isModalOpenPackaging,
		} = this.state;

		this.validationScreen();

		if (
			isErrorCode === false
			&& isErrorName === false
			&& isErrorExpirationDate === false
			&& isErrorCategory === false
			&& isErrorSubstance === false
			&& isErroLaboratory === false
			&& isErrorOpenPackaging === false
			&& isErrorTypeMed === false
			&& isErrorQuantity === false
			&& isErrorDescription === false
			&& isModalOpenPackaging === false
		) {
			// this.setState({
			// 	isLoading: true,
			// });

			this.createMedic();
		}
	}

	createMedic = async () => {
		const { medicament } = this.state;
		const date = new Date(medicament.expirationDate);

		const formatName = {
			EAN_1: medicament.code.toString(),
			PRODUTO: medicament.name,
			SUBSTANCIA: medicament.substance,
			APRESENTACAO: medicament.description,
			LABORATORIO: medicament.laboratory,
			TIPO: medicament.type,
			QUANTIDADE: medicament.quantity,
			EMBALAGEM_ABERTA: medicament.open_packing,
			DATA_EXPIRACAO: { __type: 'Date', iso: date },
			CATEGORIA: medicament.category,
		};

		try {
			const response = await createMedicament(formatName);

			console.log('response', response)

			this.props.history.push({
				pathname: '/dashboard',
			});

		} catch (error) {
			console.log('error', error);
			console.log('error.response', error.response);
		}
	}

	handleModalOpenPackaging = () => {
		this.setState({
			isModalOpenPackaging: !this.state.isModalOpenPackaging,
		});
	}

	handleSelectedPackaging = (item) => {
		this.setState({
			selectedPackaging: item,
			isModalOpenPackaging: false,
			isErrorOpenPackaging: false,
			medicament: {
				...this.state.medicament,
				openPacking: item,
			},
		});
	}

	handleSelectedType = (item) => {
		this.setState({
			selectedType: item,
			isModalType: false,
			isErrorTypeMed: false,
			medicament: {
				...this.state.medicament,
				type: item,
			},
		});
	}

	handleModalType = () => {
		this.setState({
			isModalType: !this.state.isModalType,
		});
	}

	renderForm = () => {
		const {
			medicament,
			isErrorCode,
			isErrorName,
			isErrorExpirationDate,
			isErrorCategory,
			isErrorSubstance,
			isErroLaboratory,
			isErrorOpenPackaging,
			isErrorTypeMed,
			isErrorQuantity,
			isErrorDescription,
			isModalOpenPackaging,
			typePackaging,
			selectedPackaging,
			isModalType,
			typeMed,
			selectedType,
		} = this.state;
		const errorMessage = '*Campo obrigatório.';

		// code,  medicamento, data de validade, categoria,
		// substancia, laboratório, embalagem aberto, tipo de medicamento, quantidade, descrição

		return (
			<>
				<FormContent isError={isErrorCode}>
					<Label> Código de barras: </Label>
					<Input
						type="text"
						value={medicament.code || ''}
						onChange={(ev) => this.handleChange('code', ev)}
						placeholder='Digite aqui...'
						isError={isErrorCode}
						disabled={medicament.code}
						isData={medicament.code}
					/>
					{isErrorCode && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
				<FormContent isError={isErrorName}>
					<Label onClick={this.handleLabelName}>
						Medicamento:
					</Label>
					<Input
						type="text"
						value={medicament.name || ''}
						onChange={(ev) => this.handleChange('name', ev)}
						placeholder='Digite aqui...'
						isError={isErrorName}
						disabled={!!medicament.name}
						isData={medicament.name}
					/>
					{isErrorName && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
				<FormContent isError={isErrorName}>
					<Label>	Data de Validade:	</Label>
					<Input
						type="date"
						value={medicament.expirationDate || ''}
						onChange={(ev) => this.handleChange('expirationDate', ev)}
						placeholder='Digite aqui...'
						isError={isErrorExpirationDate}
						isData={medicament.expirationDate}
					/>
					{isErrorExpirationDate && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
				<FormContent>
					<Label>Categoria: </Label>
					<Input
						type="text"
						value={medicament.category || ''}
						onChange={(ev) => this.handleChange('category', ev)}
						placeholder='Digite aqui...'
						isError={isErrorCategory}
						isData={medicament.category}
					/>
					{isErrorCategory && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
				<FormContent>
					<Label> Substância: </Label>
					<Input
						type="text"
						value={medicament.substance || ''}
						onChange={(ev) => this.handleChange('substance', ev)}
						placeholder='Digite aqui...'
						isError={isErrorSubstance}
						disabled={!!medicament.substance}
						isData={medicament.substance}
					/>
					{isErrorSubstance && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
				<FormContent>
					<Label> Laboratório: </Label>
					<Input
						type="text"
						value={medicament.laboratory || ''}
						onChange={(ev) => this.handleChange('laboratory', ev)}
						placeholder='Digite aqui...'
						isError={isErroLaboratory}
						disabled={medicament.laboratory}
						isData={medicament.laboratory}
					/>
					{isErroLaboratory && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
				<FormContent>
					<Label> Embalagem aberta? </Label>
					<MultSelect isModal={isModalOpenPackaging} isError={isErrorOpenPackaging} onClick={this.handleModalOpenPackaging}>
						<TextMultSelect>{selectedPackaging || 'clique para selecionar'}</TextMultSelect>
						<img src={ChevronDown} alt="DropDown" />
					</MultSelect >
					{isModalOpenPackaging
						&& <Modal>
							{typePackaging.map((item, index) => (
								<Text key={index} onClick={() => this.handleSelectedPackaging(item)}>{item}</Text>
							))}
						</Modal>
					}
					{isErrorOpenPackaging && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
				<FormContent>
					<Label> Tipo do medicamento: </Label>
					<MultSelect isModal={isModalType} isError={isErrorTypeMed} onClick={this.handleModalType}>
						<TextMultSelect>{selectedType || 'Clique para selecionar'}</TextMultSelect>
						<img src={ChevronDown} alt="DropDown" />
					</MultSelect >
					{isModalType
						&& <Modal>
							{typeMed.map((item, index) => (
								<Text onClick={() => this.handleSelectedType(item)} key={index}>{item}</Text>
							))}
						</Modal>
					}
					{isErrorTypeMed && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
				<FormContent isError={isErrorQuantity}>
					<Label> Quantidade: </Label>
					<Input
						type="number"
						value={medicament.quantity || ''}
						onChange={(ev) => this.handleChange('quantity', ev)}
						placeholder='Digite aqui...'
						isError={isErrorQuantity}
						isData={medicament.quantity}
					/>
					{isErrorQuantity && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
				<FormContent>
					<Label> Descrição: </Label>
					<Input
						type="text"
						value={medicament.description || ''}
						onChange={(ev) => this.handleChange('description', ev)}
						placeholder='Digite aqui...'
						isError={isErrorDescription}
						disabled={medicament.description}
						isData={medicament.description}
					/>
					{isErrorDescription && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
			</>
		);
	}

	render() {
		const {
			isRedirect,
			redirect,
			isLoading,
		} = this.state;

		return (
			<Container>
				<Header openModal={this.handleBackScanner} history={this.props.history} />
				<Form onSubmit={this.handleSubmit}>
					<div>
						{this.renderForm()}
					</div>
					<Footer>
						<Button cancel onClick={this.handleBackScanner}>cancelar</Button>
						<Button>confirmar</Button>
					</Footer>
				</Form>
				{isLoading && <Loading />}
				{isRedirect && <Redirect to={redirect} />}
			</Container>
		);
	}
}

export default Login;
//
