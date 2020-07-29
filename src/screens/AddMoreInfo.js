/* eslint-disable class-methods-use-this */
// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

// Components
import Header from '../components/Header';
import Loading from '../components/Loading';
import DefaultInput from '../components/DefaultInput';
import DefaultDropDown from '../components/DefaulfDropDown';

// Api
import { createMedicament } from '../services/api';

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
		typePackaging: ['sim', 'não'],
		selectedPackaging: undefined,
		isModalType: undefined,
		typeMed: [
			'comprimidos',
			'pomada',
			'xarope',
			'gotas',
			'supositórios',
			'injetáveis',
			'cápsulas',
			'drágeas',
			'outros',
		],
		selectedType: undefined,
		isLoading: undefined,
		isErrorCode: false,
		isErrorName: false,
		isErrorExpirationDate: false,
		isErrorTherapeuticClass: false,
		isErrorSubstance: false,
		isErrorLaboratory: false,
		isErrorProductType: false,
		isErrorOpenPackaging: false,
		isErrorTypeMed: false,
		isErrorQuantity: false,
		isErrorDescription: false,
		medicament: {
			code: '',
			name: '',
			expirationDate: undefined,
			therapeuticClass: '',
			substance: '',
			laboratory: '',
			productType: '',
			openPacking: '',
			type: '',
			quantity: '',
			description: '',
		},
		isDisabled: false,
		anvisa: {
			code: undefined,
			name: undefined,
			expirationDate: undefined,
			therapeuticClass: undefined,
			substance: undefined,
			laboratory: undefined,
			productType: undefined,
			openPacking: undefined,
			type: undefined,
			quantity: undefined,
			description: undefined,
		},
	}

	componentDidMount() {
		this.treatingDataAnvisa();
	}

	treatingDataAnvisa = () => {
		const { state } = this.props.location;
		if (state && state.result && state.result.EAN_1) {
			const { result } = this.props.location.state;

			// 7894916341769
			// 7896112121831 ANVISA
			// 7898927111014


		// LABORATORIO: {
		// 	data: 'bbbababa',
		// 	disable: true
		// }

		// this.state.anvisa
		// this.state.medicament

		// disabled = {this.state.anvisa.code}
		// medicament = onchange code

		// code: this.state.anvisa || this.state.medicament


			this.setState({
				anvisa: {
					code: result.EAN_1,
					name: result.PRODUTO,
					substance: result.SUBSTANCIA,
					laboratory: result.LABORATORIO,
					therapeuticClass: result.CLASSE_TERAPEUTICA,
					productType: result.TIPO_DE_PRODUTO,
					description: result.APRESENTACAO,
				},
				isDisabled: true,
			});
		}
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

		if (field === 'therapeuticClass') {
			this.setState({
				isErrorTherapeuticClass: false,
			});
		}

		if (field === 'substance') {
			this.setState({
				isErrorSubstance: false,
			});
		}

		if (field === 'laboratory') {
			this.setState({
				isErrorLaboratory: false,
			});
		}

		if (field === 'productType') {
			this.setState({
				isErrorProductType: false,
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
			therapeuticClass,
			substance,
			type,
			quantity,
			productType,
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

		if (!therapeuticClass) {
			this.setState({
				isErrorTherapeuticClass: true,
			});
		} else {
			this.setState({
				isErrorTherapeuticClass: false,
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
				isErrorLaboratory: true,
			});
		} else {
			this.setState({
				isErrorLaboratory: false,
			});
		}

		if (!productType) {
			this.setState({
				isErrorProductType: true,
			});
		} else {
			this.setState({
				isErrorProductType: false,
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
			isErrorTherapeuticClass,
			isErrorSubstance,
			isErrorLaboratory,
			isErrorProductType,
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
			&& isErrorTherapeuticClass === false
			&& isErrorSubstance === false
			&& isErrorLaboratory === false
			&& isErrorProductType === false
			&& isErrorOpenPackaging === false
			&& isErrorTypeMed === false
			&& isErrorQuantity === false
			&& isErrorDescription === false
			&& isModalOpenPackaging === false
		) {
			this.createMedic();
		}
	}

	createMedic = async () => {
		const { medicament, anvisa } = this.state;
		const date = new Date(medicament.expirationDate);

		const formatData = {
			EAN_1: anvisa.code.toString() || medicament.code.toString(),
			PRODUTO: anvisa.name || medicament.name,
			DATA_EXPIRACAO: { __type: 'Date', iso: date },
			CLASSE_TERAPEUTICA: anvisa.therapeuticClass || medicament.therapeuticClass,
			SUBSTANCIA: anvisa.substance ||  medicament.substance,
			LABORATORIO: anvisa.laboratory || medicament.laboratory,
			TIPO_DE_PRODUTO: anvisa.productType || medicament.productType,
			QUANTIDADE: medicament.quantity,
			EMBALAGEM_ABERTA: medicament.openPacking === true,
			APRESENTACAO: anvisa.type || medicament.type,
			DESCRICAO: anvisa.description || medicament.description,
		};

		try {
			await createMedicament(formatData);

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
			isErrorTherapeuticClass,
			isErrorSubstance,
			isErrorLaboratory,
			isErrorProductType,
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
			isDisabled,
			anvisa,
		} = this.state;

		// 7896112121831
		// 7898927111014

		return (
			<>
				<DefaultInput
					label='Código de barras:'
					type='number'
					onChange={(ev) => this.handleChange('code', ev)}
					text={anvisa.code || medicament.code}
					isError={isErrorCode}
					disabled={anvisa.code}
				/>
				<DefaultInput
					label='Medicamento:'
					onChange={(ev) => this.handleChange('name', ev)}
					text={anvisa.name || medicament.name}
					isError={isErrorName}
					disabled={anvisa.name}
				/>
				<DefaultInput
					label='Data de Validade:'
					type="date"
					onChange={(ev) => this.handleChange('expirationDate', ev)}
					text={medicament.expirationDate}
					isError={isErrorExpirationDate}
					disabled={false}
				/>
				<DefaultInput
					label='Classe terapêutica:'
					onChange={(ev) => this.handleChange('therapeuticClass', ev)}
					text={anvisa.therapeuticClass || medicament.therapeuticClass}
					isError={isErrorTherapeuticClass}
					disabled={anvisa.therapeuticClass}
				/>
				<DefaultInput
					label='Substância:'
					onChange={(ev) => this.handleChange('substance', ev)}
					text={anvisa.substance || medicament.substance}
					isError={isErrorSubstance}
					disabled={anvisa.substance}
				/>
				<DefaultInput
					label='Laboratório:'
					onChange={(ev) => this.handleChange('laboratory', ev)}
					text={anvisa.laboratory || medicament.laboratory}
					isError={isErrorLaboratory}
					disabled={anvisa.laboratory}
				/>
				<DefaultInput
					label='Tipo do Produto:'
					onChange={(ev) => this.handleChange('productType', ev)}
					text={anvisa.productType || medicament.productType}
					isError={isErrorProductType}
					disabled={anvisa.productType}
				/>
				<DefaultDropDown
					title='Embalagem aberta?'
					isModal={isModalOpenPackaging}
					isError={isErrorOpenPackaging}
					onClick={this.handleModalOpenPackaging}
					inClickSelected={this.handleSelectedPackaging}
					selectedText={selectedPackaging}
					item={typePackaging}
				/>
				<DefaultDropDown
					title='Apresentação:'
					isModal={isModalType}
					isError={isErrorTypeMed}
					onClick={this.handleModalType}
					inClickSelected={this.handleSelectedType}
					selectedText={selectedType}
					item={typeMed}
					type='apresentation'
				/>
				<DefaultInput
					label='Quantidade:'
					type='number'
					onChange={(ev) => this.handleChange('quantity', ev)}
					text={medicament.quantity}
					isError={isErrorQuantity}
				/>
				<DefaultInput
					label='Descrição:'
					onChange={(ev) => this.handleChange('description', ev)}
					text={anvisa.description || medicament.description}
					isError={isErrorDescription}
					disabled={anvisa.description}
				/>
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
				<Header
					openModal={this.handleBackScanner}
					history={this.props.history}
					iconStyle={{
						stroke: '#FFFFFF'
					}}
				/>
				<Form onSubmit={this.handleSubmit}>
					<div>
						{this.renderForm()}
					</div>
					<Footer>
						<Button cancel onClick={this.handleBackScanner}>cancelar</Button>
						<Button>salvar</Button>
					</Footer>
				</Form>
				{isLoading && <Loading />}
				{isRedirect && <Redirect to={redirect} />}
			</Container>
		);
	}
}

export default Login;
