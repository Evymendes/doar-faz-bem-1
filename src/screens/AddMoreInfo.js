/* eslint-disable class-methods-use-this */
// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/pt-br';

// Components
import Header from '../components/Header';
import DefaultInput from '../components/form/DefaultInput';
import DefaultDropDown from '../components/form/DefaulfDropDown';
import DefaultTextarea from '../components/form/DefaultTextarea';
import DefaultButton from '../components/DefaultButton';

// Api
import { createMedicament, editMedicament } from '../services/api';

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
	
	@media(min-width: 1024px) {
		width: 40%;
	}
`;

const Footer = styled.div`
	margin: 2rem 0;
	display: flex;
	justify-content: space-between;
`;

class Login extends Component {
	state = {
		isModalOpenPackaging: undefined,
		typePackaging: ['sim', 'não'],
		selectedPackaging: undefined,
		isModalType: undefined,
		isRotationOpenPackaging: undefined,
		isRotationType: undefined,
		type: [
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
		errors: [],
		fields: [
			'code',
			'name',
			'expirationDate',
			'therapeuticClass',
			'substance',
			'laboratory',
			'productType',
			'openPacking',
			'type',
			'quantity',
			'description',
		],
		newMedicament: {
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
		medicament: {
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
		isEdit: false,
	}

	componentDidMount() {
		this.treatingDataautoCompleted();
	}

	formatDate = (date) => {
		if (date) {
			return date.substr(0, 10);
		}
		return
	}

	treatingDataautoCompleted = () => {
		const { state } = this.props.location;

		if (state && state.result && state.result.EAN_1) {
			const { result, isEdit } = this.props.location.state;

			console.log('result', result)

			this.setState({
				medicament: {
					code: result.EAN_1,
					expirationDate: result.DATA_EXPIRACAO && result.DATA_EXPIRACAO.iso,
					name: result.PRODUTO,
					substance: result.SUBSTANCIA,
					laboratory: result.LABORATORIO,
					therapeuticClass: result.CLASSE_TERAPEUTICA,
					productType: result.TIPO_DE_PRODUTO,
					description: isEdit ? result.DESCRICAO : result.APRESENTACAO,
					type: isEdit && result.APRESENTACAO,
					openPacking: result.EMBALAGEM_ABERTA === true ? 'Sim' : result.EMBALAGEM_ABERTA === false ? 'Não' : null,
					quantity: result.QUANTIDADE,
				},
				medicamentId: result.objectId,
				isEdit,
			});
		}
	}

	handleBackScanner = () => {
		this.props.history.goBack();
	}

	handleChange = (field, ev) => {
		const { newMedicament, medicament, errors, isEdit } = this.state;

		if (isEdit) {
			medicament[field] = ev.target.value;
			this.setState({
				medicament,
				errors: errors.filter((erro) => erro !== field),
			});
			return
		}

		newMedicament[field] = ev.target.value;
		this.setState({
			newMedicament,
			errors: errors.filter((erro) => erro !== field),
		});
	};

	validationScreen = async () => {
		const {
			newMedicament,
			medicament,
			fields,
		} = this.state;

		const errors = [];
		fields.map((field) => {
			if (!medicament[field] && !newMedicament[field]) {
				errors.push(field);
			}
		});
		this.setState({
			errors,
		});

		if (errors.length === 0) {
			await this.createMedic();
			this.props.history.push({
				pathname: '/dashboard',
			});
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
	}

	createMedic = async () => {
		const { newMedicament, medicament, isEdit, medicamentId } = this.state;
		const date = new Date(medicament.expirationDate || newMedicament.expirationDate);

		const formatData = {
			EAN_1: (medicament.code && medicament.code.toString()) || newMedicament.code,
			PRODUTO: medicament.name || newMedicament.name,
			DATA_EXPIRACAO: { __type: 'Date', iso: date },
			CLASSE_TERAPEUTICA: medicament.therapeuticClass || newMedicament.therapeuticClass,
			SUBSTANCIA: medicament.substance || newMedicament.substance,
			LABORATORIO: medicament.laboratory || newMedicament.laboratory,
			TIPO_DE_PRODUTO: medicament.productType || newMedicament.productType,
			QUANTIDADE: medicament.quantity || newMedicament.quantity,
			EMBALAGEM_ABERTA: medicament.openPacking === 'sim' ? true : false || newMedicament.openPacking === 'sim' ? true : false,
			APRESENTACAO: medicament.type || newMedicament.type,
			DESCRICAO: medicament.description || newMedicament.description,
		};
		try {
			if (isEdit) {
				await editMedicament(formatData, medicamentId)
				return
			}

			await createMedicament(formatData);

		} catch (error) {
			console.log('error', error);
			console.log('error.response', error.response);
		}
	}

	handleModalOpenPackaging = () => {
		const { isModalOpenPackaging, isRotationOpenPackaging } = this.state;

		this.setState({
			isModalOpenPackaging: !isModalOpenPackaging,
			isRotationOpenPackaging: !isRotationOpenPackaging,
		});
	}

	handleSelectedPackaging = (item) => {
		if (this.state.isEdit) {
			this.setState({
				selectedPackaging: item,
				isModalOpenPackaging: false,
				medicament: {
					...this.state.medicament,
					openPacking: item,
				},
				errors: this.state.errors.filter((erro) => erro !== 'openPacking'),
			});
			return
		}

		this.setState({
			selectedPackaging: item,
			isModalOpenPackaging: false,
			newMedicament: {
				...this.state.newMedicament,
				openPacking: item,
			},
			errors: this.state.errors.filter((erro) => erro !== 'openPacking'),
		});
	}

	handleSelectedType = (item) => {
		if (this.state.isEdit) {
			this.setState({
				selectedType: item,
				isModalType: false,
				medicament: {
					...this.state.medicament,
					type: item,
				},
				errors: this.state.errors.filter((erro) => erro !== 'type'),
			});
			return
		}
		this.setState({
			selectedType: item,
			isModalType: false,
			newMedicament: {
				...this.state.newMedicament,
				type: item,
			},
			errors: this.state.errors.filter((erro) => erro !== 'type'),
		});
	}

	handleModalType = () => {
		this.setState({
			isModalType: !this.state.isModalType,
			isRotationType: !this.state.isRotationType,
		});
	}

	styledDisabled = (isDisabled) => {
		if (isDisabled) {
			return {
				cursor: 'not-allowed',
				opacity: '0.8',
			}
		}
	}

	renderForm = () => {
		const {
			newMedicament,
			isModalOpenPackaging,
			typePackaging,
			selectedPackaging,
			isModalType,
			type,
			selectedType,
			medicament,
			isRotationOpenPackaging,
			isRotationType,
			errors,
		} = this.state;

		return (
			<>
				<DefaultInput
					label='Código de barras:'
					type='number'
					onChange={(ev) => this.handleChange('code', ev)}
					text={medicament.code || newMedicament.code}
					isError={errors.includes('code')}
					disabled={medicament.code}
					style={this.styledDisabled(medicament.code)}
				/>
				<DefaultInput
					label='Medicamento:'
					onChange={(ev) => this.handleChange('name', ev)}
					text={medicament.name || newMedicament.name}
					isError={errors.includes('name')}
					disabled={medicament.name}
					style={this.styledDisabled(medicament.name)}
				/>
				<DefaultInput
					label='Data de Validade:'
					type="date"
					onChange={(ev) => this.handleChange('expirationDate', ev)}
					text={this.formatDate(medicament.expirationDate) || this.formatDate(newMedicament.expirationDate)}
					isError={errors.includes('expirationDate')}
				/>
				<DefaultInput
					label='Classe terapêutica:'
					onChange={(ev) => this.handleChange('therapeuticClass', ev)}
					text={medicament.therapeuticClass || newMedicament.therapeuticClass}
					isError={errors.includes('therapeuticClass')}
					disabled={medicament.therapeuticClass}
					style={this.styledDisabled(medicament.therapeuticClass)}
				/>
				<DefaultInput
					label='Substância:'
					onChange={(ev) => this.handleChange('substance', ev)}
					text={medicament.substance || newMedicament.substance}
					isError={errors.includes('substance')}
					disabled={medicament.substance}
					style={this.styledDisabled(medicament.substance)}
				/>
				<DefaultInput
					label='Laboratório:'
					onChange={(ev) => this.handleChange('laboratory', ev)}
					text={medicament.laboratory || newMedicament.laboratory}
					isError={errors.includes('laboratory')}
					disabled={medicament.laboratory}
					style={this.styledDisabled(medicament.laboratory)}
				/>
				<DefaultInput
					label='Tipo do Produto:'
					onChange={(ev) => this.handleChange('productType', ev)}
					text={medicament.productType || newMedicament.productType}
					isError={errors.includes('productType')}
					disabled={medicament.productType}
					style={this.styledDisabled(medicament.productType)}
				/>
				<DefaultDropDown
					title='Embalagem aberta?'
					isModal={isModalOpenPackaging}
					isError={errors.includes('openPacking')}
					onClick={this.handleModalOpenPackaging}
					inClickSelected={this.handleSelectedPackaging}
					selectedText={
						medicament.openPacking || newMedicament.openPacking
					}
					isRotation={isRotationOpenPackaging}
					item={typePackaging}
				/>
				<DefaultDropDown
					title='Apresentação:'
					isModal={isModalType}
					isError={errors.includes('type')}
					onClick={this.handleModalType}
					inClickSelected={this.handleSelectedType}
					selectedText={medicament.type || newMedicament.type}
					item={type}
					isRotation={isRotationType}
					type='apresentation'
				/>
				<DefaultInput
					label='Quantidade:'
					type='number'
					onChange={(ev) => this.handleChange('quantity', ev)}
					text={medicament.quantity || newMedicament.quantity}
					isError={errors.includes('quantity')}
				/>
				<DefaultTextarea
					label='Descrição:'
					onChange={(ev) => this.handleChange('description', ev)}
					text={medicament.description || newMedicament.description}
					isError={errors.includes('description')}
					disabled={medicament.description}
					style={this.styledDisabled(medicament.description)}
				/>
			</>
		);
	}

	render() {
		const {
			isLoading,
		} = this.state;

		return (
			<Container>
				<Header
					openModal={this.handleBackScanner}
					history={this.props.history}
					strokeColor={'#FFFFFF'}
				/>
				<Form onSubmit={this.handleSubmit}>
					<div>
						{this.renderForm()}
					</div>
					<Footer>
						<DefaultButton
							handleClick={() => this.handleBackScanner()}
							text={'CANCELAR'}
							style={{
								margin: 0,
								marginRight: '1rem',
								border: '1px solid white',
								background: 'transparent',
								color: '#fff',
							}}
						/>
						<DefaultButton
							handleClick={this.validationScreen}
							text={'SALVAR'}
							style={{
								margin: '0',
								color: '#fff',
								border: '1px solid #49E5D6',
								background: '#49E5D6',
							}}
						/>
					</Footer>
				</Form>
			</Container>
		);
	}
}

export default Login;
