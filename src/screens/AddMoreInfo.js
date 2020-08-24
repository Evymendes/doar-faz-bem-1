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
	margin-top: 5rem;
	height: 95vh;
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

class AddMoreInfo extends Component {
	state = {
		isModalDate: undefined,
		isModalOpenPackaging: undefined,
		typePackaging: ['sim', 'não'],
		selectedPackaging: undefined,
		isModalPresentation: undefined,
		isRotationOpenPackaging: undefined,
		isRotationType: undefined,
		presentation: [
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
			'presentation',
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
			presentation: undefined,
			quantity: undefined,
			description: undefined,
			price: undefined,
		},
		medIdToEdit: false,
	}

	componentDidMount() {
		this.formatMedData();
	}

	formatDate = (date) => {
		if (date) {
			return date.substr(0, 7);
		}
	}

	formatMedData = () => {
		const { state } = this.props.location;

		if (state && state.result && state.result.EAN_1) {
			const { result, medIdToEdit } = state;

			if (medIdToEdit) {
				this.setState({
					med: {
						code: result.EAN_1,
						name: result.PRODUTO,
						expirationDate: result.DATA_EXPIRACAO.iso,
						substance: result.SUBSTANCIA,
						laboratory: result.LABORATORIO,
						therapeuticClass: result.CLASSE_TERAPEUTICA,
						productType: result.TIPO_DE_PRODUTO,
						presentation: result.APRESENTACAO,
						description: result.DESCRICAO,
						openPacking: result.EMBALAGEM_ABERTA === true ? 'sim' : 'não',
						quantity: result.QUANTIDADE,
						price: result.PMC_20_PERC,
					},
				});
				return;
			}

			this.setState({
				med: {
					productType: result.APRESENTACAO,
					therapeuticClass: result.CLASSE_TERAPEUTICA,
					description: result.DESCRICAO,
					code: result.EAN_1,
					laboratory: result.LABORATORIO,
					price: result.PMC_20_PERC,
					name: result.PRODUTO,
					substance: result.SUBSTANCIA,
				},
				onlyCode: !result.PRODUTO,
			});
		}
	}

	handleBackScanner = () => {
		this.props.history.push({
			pathname: '/dashboard',
		});
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
		const removeItems = (item) => {
			return 	item !== 'substance' && item !== 'laboratory';
		};

		fields.filter((item) => removeItems(item)).map((field) => {
			if (!med[field]) {
				errors.push(field);
			}
		});

		this.setState({
			errors,
		});

		if (errors.length === 0) {
			await this.persistMedicament();
			this.props.history.push({
				pathname: '/medicaments',
			});
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
	}

	persistMedicament = async () => {
		const { med } = this.state;
		const { medIdToEdit } = this.props.location.state;
		const date = new Date(med.expirationDate);
		const userId = localStorage.getItem('objectId');

		const formatData = {
			DATA_EXPIRACAO: { __type: 'Date', iso: date },
			CLASSE_TERAPEUTICA: med.therapeuticClass,
			userId: { "__type": "Pointer", "className": "_User", "objectId": userId },
			EAN_1: (med.code && med.code.toString()),
			TIPO_DE_PRODUTO: med.productType,
			EMBALAGEM_ABERTA: med.openPacking === 'sim',
			DESCRICAO: med.description,
			APRESENTACAO: med.presentation,
			LABORATORIO: med.laboratory,
			SUBSTANCIA: med.substance,
			PMC_20_PERC: med.price,
			PRODUTO: med.name,
			QUANTIDADE: med.quantity,
		};

		try {
			if (medIdToEdit) {
				await editMedicament(formatData, medIdToEdit);
				return;
			}
			await createMedicament(formatData);
		} catch (error) {
			console.log('error', error);
			console.log('error.response', error.response);
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
			isModalPresentation: false,
			isRotationType: !isRotationType,
			med: {
				...this.state.med,
				presentation: item,
			},
			errors: this.state.errors.filter((erro) => erro !== 'presentation'),
		});
	}

	handleModalPresentation = () => {
		const { isModalPresentation, isRotationType } = this.state;

		this.setState({
			isModalPresentation: !isModalPresentation,
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
			isModalPresentation,
			presentation,
			med,
			isRotationOpenPackaging,
			isRotationType,
			errors,
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
					disabled={med.code}
					style={this.styledDisabled(med.code)}
				/>
				<DefaultInput
					label='Medicamento:'
					onChange={(ev) => this.handleChange('name', ev)}
					text={med.name}
					isError={errors.includes('name')}
					disabled={!onlyCode}
					style={this.styledDisabled(!onlyCode)}
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
					disabled={!onlyCode}
					style={this.styledDisabled(!onlyCode)}
				/>
				<DefaultInput
					label='Substância:'
					onChange={(ev) => this.handleChange('substance', ev)}
					text={med.substance}
					required={false}
					disabled={!onlyCode}
					style={this.styledDisabled(!onlyCode)}
				/>
				<DefaultInput
					label='Laboratório:'
					onChange={(ev) => this.handleChange('laboratory', ev)}
					text={med.laboratory}
					required={false}
					disabled={!onlyCode}
					style={this.styledDisabled(!onlyCode)}
				/>
				<DefaultInput
					label='Tipo do Produto:'
					onChange={(ev) => this.handleChange('productType', ev)}
					text={med.productType}
					placeholder='Ex: Genérico...'
					isError={errors.includes('productType')}
					disabled={!onlyCode}
					style={this.styledDisabled(!onlyCode)}
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
					isModal={isModalPresentation}
					isError={errors.includes('presentation')}
					onClick={this.handleModalPresentation}
					inClickSelected={this.handleSelectedType}
					selectedText={med.presentation}
					item={presentation}
					isRotation={isRotationType}
					type='presentation'
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
					disabled={!onlyCode}
					style={this.styledDisabled(!onlyCode)}
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

export default AddMoreInfo;
