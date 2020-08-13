// /* eslint-disable class-methods-use-this */
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
		isModalDate: undefined,
		isModalOpenPackaging: undefined,
		typePackaging: ['sim', 'não'],
		selectedPackaging: undefined,
		isModalType: undefined,
		isRotationOpenPackaging: undefined,
		isRotationType: undefined,
		type: [
			'Comprimidos',
			'Pomada',
			'Xarope',
			'Gotas',
			'Supositórios',
			'Injetáveis',
			'Cápsulas',
			'Drágeas',
			'Outros',
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
			price: undefined,
		},
		medId: false,
	}

	componentDidMount() {
		this.treatingDataautoCompleted();
	}

	formatDate = (date) => {
		if (date) {
			return date.substr(0, 7);
		}
	}

	treatingDataautoCompleted = () => {
		const { state } = this.props.location;

		if (state && state.result && state.result.EAN_1) {
			const { result, medId } = this.props.location.state;

			if (medId) {
				// Edit
				this.setState({
					med: {
						code: result.EAN_1,
						name: result.PRODUTO,
						expirationDate: result.DATA_EXPIRACAO.iso,
						substance: result.SUBSTANCIA,
						laboratory: result.LABORATORIO,
						therapeuticClass: result.CLASSE_TERAPEUTICA,
						productType: result.TIPO_DE_PRODUTO,
						type: result.APRESENTACAO,
						description: result.DESCRICAO,
						openPacking: result.EMBALAGEM_ABERTA === true ? 'sim' : 'não',
						quantity: result.QUANTIDADE,
						price: result.PMC_20_PERC,
					},
					medId,
				});
				return;
			}

			// Create
			this.setState({
				med: {
					code: result.EAN_1,
					name: result.PRODUTO,
					therapeuticClass: result.CLASSE_TERAPEUTICA,
					substance: result.SUBSTANCIA,
					laboratory: result.LABORATORIO,
					productType: result.TIPO_DE_PRODUTO,
					description: result.APRESENTACAO,
					price: result.PMC_20_PERC,
				},
				onlyCode: !result.PRODUTO,
				medId: result.PRODUTO,
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
				pathname: '/dashboard',
			});
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
	}

	createMedic = async () => {
		const { med, medId } = this.state;
		const date = new Date(med.expirationDate);
		const userId = localStorage.getItem('objectId');

		const formatData = {
			userId: { "__type": "Pointer", "className": "_User", "objectId": userId },
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
			PMC_20_PERC: med.price,
		};

		try {
			if (medId && (medId !== med.name)) {
				await editMedicament(formatData, medId);
				return;
			}

			await createMedicament(formatData);

		} catch (error) {
			console.log('error', error);
			console.log('error.response create', error.response);
		}
	}

	handleModalDate = () => {
		this.setState({
			isModalDate: !this.state.isModalDate,
		});
	}

	handleModalOpenPackaging = () => {
		const { isModalOpenPackaging, isRotationOpenPackaging } = this.state;

		this.setState({
			isModalOpenPackaging: !isModalOpenPackaging,
			isRotationOpenPackaging: !isRotationOpenPackaging,
		});
	}

	handleSelectedPackaging = (item) => {
		const { isRotationOpenPackaging } = this.state;
		this.setState({
			selectedPackaging: item,
			isModalOpenPackaging: false,
			isRotationOpenPackaging: !isRotationOpenPackaging,
			med: {
				...this.state.med,
				openPacking: item,
			},
			errors: this.state.errors.filter((erro) => erro !== 'openPacking'),
		});
	}

	handleSelectedType = (item) => {
		const { isRotationType } = this.state;

		this.setState({
			selectedType: item,
			isModalType: false,
			isRotationType: !isRotationType,
			med: {
				...this.state.med,
				type: item,
			},
			errors: this.state.errors.filter((erro) => erro !== 'type'),
		});
	}

	handleModalType = () => {
		const { isModalType, isRotationType } = this.state;

		this.setState({
			isModalType: !isModalType,
			isRotationType: !isRotationType,
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
			onlyCode,
		} = this.state;

		return (
			<>
				<DefaultInput
					label='Código de Barras:'
					type='number'
					onChange={(ev) => this.handleChange('code', ev)}
					text={med.code}
					isError={errors.includes('code')}
					disabled={onlyCode || medId}
					style={this.styledDisabled(onlyCode || medId)}
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
					date
					label='Data de Validade:'
					labelWidth='auto'
					type="month"
					handleModalDate={this.handleModalDate}
					isModal={this.state.isModalDate}
					onChange={(ev) => this.handleChange('expirationDate', ev)}
					text={this.formatDate(med.expirationDate)}
					isError={errors.includes('expirationDate')}
				/>
				<DefaultInput
					label='Classe Terapêutica:'
					onChange={(ev) => this.handleChange('therapeuticClass', ev)}
					text={med.therapeuticClass}
					placeholder='Ex: Analgésico...'
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
					placeholder='Ex: Genérico...'
					isError={errors.includes('productType')}
					disabled={medId}
					style={this.styledDisabled(medId)}
				/>
				<DefaultDropDown
					title='Embalagem Aberta?'
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
					placeholder='Ex: 500 MG...'
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
							margin= '1rem 1rem 1rem 0'
							borderColor= '#FFF'
							background= 'transparent'
							backgroundHover='#3cc5b8'
							border= '1px solid white'
							handleClick={() => this.handleBackScanner()}
							text={'CANCELAR'}
						/>
						<DefaultButton
							backgroundHover='#3cc5b8'
							handleClick={this.validationScreen}
							text={'SALVAR'}
						/>
					</Footer>
				</Form>
			</Container>
		);
	}
}

export default Login;
