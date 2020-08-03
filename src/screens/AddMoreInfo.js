/* eslint-disable class-methods-use-this */
// Libs
import React, { Component } from 'react';
import styled from 'styled-components';

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
		med: {
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
		medId: false,
	}

	componentDidMount() {
		this.treatingDataautoCompleted();
	}

	formatDate = (date) => {
		if (date) {
			return date.substr(0, 10);
		}
	}

	treatingDataautoCompleted = () => {
		const { state } = this.props.location;

		console.log('this.props', state.result)

		if (state && state.result && state.result.EAN_1) {
			const { result, medId } = this.props.location.state;

			console.log('result', result)

			if (medId) {
				this.setState({
					med: {
						code: result.EAN_1,
						expirationDate: result.DATA_EXPIRACAO.iso,
						name: result.PRODUTO,
						substance: result.SUBSTANCIA,
						laboratory: result.LABORATORIO,
						therapeuticClass: result.CLASSE_TERAPEUTICA,
						productType: result.TIPO_DE_PRODUTO,
						description: result.DESCRICAO,
						type: result.APRESENTACAO,
						openPacking: result.EMBALAGEM_ABERTA === true ? 'sim' : 'não',
						quantity: result.QUANTIDADE,
					},
					medId,
				});
				return;
			}
			this.setState({
				med: {
					code: result.EAN_1,
					name: result.PRODUTO,
					therapeuticClass: result.CLASSE_TERAPEUTICA,
					substance: result.SUBSTANCIA,
					laboratory: result.LABORATORIO,
					productType: result.TIPO_DE_PRODUTO,
					description: result.APRESENTACAO,
				},
			});
		}
	}

	handleBackScanner = () => {
		this.props.history.goBack();
	}

	handleChange = (field, ev) => {
		const { med, errors } = this.state;

		med[field] = ev.target.value;
		this.setState({
			med,
			errors: errors.filter((erro) => erro !== field),
		});
	};

	validationScreen = async () => {
		const {
			med,
			fields,
		} = this.state;

		const errors = [];

		fields.map((field) => {
			if (!med[field]) {
				errors.push(field);
			}
		});
		this.setState({
			errors,
		});

		if (errors.length === 0) {
			await this.createMedic();
			this.props.history.push({
				// pathname: '/dashboard',
				pathname: '/doar-faz-bem/dashboard',
			});
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
	}

	createMedic = async () => {
		const { med, medId } = this.state;
		const date = new Date(med.expirationDate);

		const formatData = {
			EAN_1: (med.code && med.code.toString()),
			PRODUTO: med.name,
			DATA_EXPIRACAO: { __type: 'Date', iso: date },
			CLASSE_TERAPEUTICA: med.therapeuticClass,
			SUBSTANCIA: med.substance,
			LABORATORIO: med.laboratory,
			TIPO_DE_PRODUTO: med.productType,
			QUANTIDADE: med.quantity,
			EMBALAGEM_ABERTA: med.openPacking === 'sim',
			APRESENTACAO: med.type,
			DESCRICAO: med.description,
		};

		try {
			if (medId) {
				await editMedicament(formatData, medId);
				return;
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
		this.setState({
			selectedPackaging: item,
			isModalOpenPackaging: false,
			med: {
				...this.state.med,
				openPacking: item,
			},
			errors: this.state.errors.filter((erro) => erro !== 'openPacking'),
		});
	}

	handleSelectedType = (item) => {
		this.setState({
			selectedType: item,
			isModalType: false,
			med: {
				...this.state.med,
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
			};
		}
	}

	renderForm = () => {
		const {
			isModalOpenPackaging,
			typePackaging,
			isModalType,
			type,
			med,
			isRotationOpenPackaging,
			isRotationType,
			errors,
			medId,
		} = this.state;

		return (
			<>
				<DefaultInput
					label='Código de barras:'
					type='number'
					onChange={(ev) => this.handleChange('code', ev)}
					text={med.code}
					isError={errors.includes('code')}
					disabled={medId}
					style={this.styledDisabled(medId)}
				/>
				<DefaultInput
					label='Medicamento:'
					onChange={(ev) => this.handleChange('name', ev)}
					text={med.name}
					isError={errors.includes('name')}
					disabled={medId}
					style={this.styledDisabled(medId)}
				/>
				<DefaultInput
					label='Data de Validade:'
					type="date"
					onChange={(ev) => this.handleChange('expirationDate', ev)}
					text={this.formatDate(med.expirationDate)}
					isError={errors.includes('expirationDate')}
				/>
				<DefaultInput
					label='Classe terapêutica:'
					onChange={(ev) => this.handleChange('therapeuticClass', ev)}
					text={med.therapeuticClass}
					isError={errors.includes('therapeuticClass')}
					disabled={medId}
					style={this.styledDisabled(medId)}
				/>
				<DefaultInput
					label='Substância:'
					onChange={(ev) => this.handleChange('substance', ev)}
					text={med.substance}
					isError={errors.includes('substance')}
					disabled={medId}
					style={this.styledDisabled(medId)}
				/>
				<DefaultInput
					label='Laboratório:'
					onChange={(ev) => this.handleChange('laboratory', ev)}
					text={med.laboratory}
					isError={errors.includes('laboratory')}
					disabled={medId}
					style={this.styledDisabled(medId)}
				/>
				<DefaultInput
					label='Tipo do Produto:'
					onChange={(ev) => this.handleChange('productType', ev)}
					text={med.productType}
					isError={errors.includes('productType')}
					disabled={medId}
					style={this.styledDisabled(medId)}
				/>
				<DefaultDropDown
					title='Embalagem aberta?'
					isModal={isModalOpenPackaging}
					isError={errors.includes('openPacking')}
					onClick={this.handleModalOpenPackaging}
					inClickSelected={this.handleSelectedPackaging}
					selectedText={med.openPacking}
					isRotation={isRotationOpenPackaging}
					item={typePackaging}
				/>
				<DefaultDropDown
					title='Apresentação:'
					isModal={isModalType}
					isError={errors.includes('type')}
					onClick={this.handleModalType}
					inClickSelected={this.handleSelectedType}
					selectedText={med.type}
					item={type}
					isRotation={isRotationType}
					type='apresentation'
				/>
				<DefaultInput
					label='Quantidade:'
					type='number'
					onChange={(ev) => this.handleChange('quantity', ev)}
					text={med.quantity}
					isError={errors.includes('quantity')}
				/>
				<DefaultTextarea
					label='Descrição:'
					onChange={(ev) => this.handleChange('description', ev)}
					text={med.description}
					isError={errors.includes('description')}
					disabled={medId}
					style={this.styledDisabled(medId)}
				/>
			</>
		);
	}

	render() {
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
