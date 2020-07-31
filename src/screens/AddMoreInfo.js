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

class Login extends Component {
	state = {
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

		if (state && state.result) {
			const { result } = this.props.location.state;

			this.setState({
				anvisa: {
					code: result,
				},
				isDisabled: true,
			});
		}
	}

	handleBackScanner = () => {
		this.props.history.goBack();
	}

	handleChange = (field, ev) => {
		const { medicament, errors } = this.state;

		medicament[field] = ev.target.value;
		this.setState({
			medicament,
			errors: errors.filter((erro) => erro !== field),
		});
	};

	validationScreen = () => {
		const {
			medicament,
			anvisa,
			fields,
		} = this.state;

		const errors = [];
		fields.map((field) => {
			if (!anvisa[field] && !medicament[field]) {
				errors.push(field);
			}
		});
		this.setState({
			errors,
		});

		if (errors.length === 0) {
			this.createMedic();
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
	}

	createMedic = async () => {
		const { medicament, anvisa } = this.state;
		const date = new Date(medicament.expirationDate);

		const formatData = {
			EAN_1: (anvisa.code && anvisa.code.toString()) || medicament.code,
			PRODUTO: anvisa.name || medicament.name,
			DATA_EXPIRACAO: { __type: 'Date', iso: date },
			CLASSE_TERAPEUTICA: anvisa.therapeuticClass || medicament.therapeuticClass,
			SUBSTANCIA: anvisa.substance || medicament.substance,
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
			medicament: {
				...this.state.medicament,
				openPacking: item,
			},
			errors: this.state.errors.filter((erro) => erro !== 'openPacking'),
		});
	}

	handleSelectedType = (item) => {
		this.setState({
			selectedType: item,
			isModalType: false,
			medicament: {
				...this.state.medicament,
				type: item,
			},
			errors: this.state.errors.filter((erro) => erro !== 'type'),
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
			isModalOpenPackaging,
			typePackaging,
			selectedPackaging,
			isModalType,
			typeMed,
			selectedType,
			anvisa,
			errors,
		} = this.state;

		return (
			<>
				<DefaultInput
					label='Código de barras:'
					type='number'
					onChange={(ev) => this.handleChange('code', ev)}
					text={anvisa.code || medicament.code}
					isError={errors.includes('code')}
					disabled={anvisa.code}
				/>
				<DefaultInput
					label='Medicamento:'
					onChange={(ev) => this.handleChange('name', ev)}
					text={anvisa.name || medicament.name}
					isError={errors.includes('name')}
					disabled={anvisa.name}
				/>
				<DefaultInput
					label='Data de Validade:'
					type="date"
					onChange={(ev) => this.handleChange('expirationDate', ev)}
					text={medicament.expirationDate}
					isError={errors.includes('expirationDate')}
					disabled={false}
				/>
				<DefaultInput
					label='Classe terapêutica:'
					onChange={(ev) => this.handleChange('therapeuticClass', ev)}
					text={anvisa.therapeuticClass || medicament.therapeuticClass}
					isError={errors.includes('therapeuticClass')}
					disabled={anvisa.therapeuticClass}
				/>
				<DefaultInput
					label='Substância:'
					onChange={(ev) => this.handleChange('substance', ev)}
					text={anvisa.substance || medicament.substance}
					isError={errors.includes('substance')}
					disabled={anvisa.substance}
				/>
				<DefaultInput
					label='Laboratório:'
					onChange={(ev) => this.handleChange('laboratory', ev)}
					text={anvisa.laboratory || medicament.laboratory}
					isError={errors.includes('laboratory')}
					disabled={anvisa.laboratory}
				/>
				<DefaultInput
					label='Tipo do Produto:'
					onChange={(ev) => this.handleChange('productType', ev)}
					text={anvisa.productType || medicament.productType}
					isError={errors.includes('productType')}
					disabled={anvisa.productType}
				/>
				<DefaultDropDown
					title='Embalagem aberta?'
					isModal={isModalOpenPackaging}
					isError={errors.includes('openPacking')}
					onClick={this.handleModalOpenPackaging}
					inClickSelected={this.handleSelectedPackaging}
					selectedText={selectedPackaging}
					item={typePackaging}
				/>
				<DefaultDropDown
					title='Apresentação:'
					isModal={isModalType}
					isError={errors.includes('type')}
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
					isError={errors.includes('quantity')}
				/>
				<DefaultTextarea
					label='Descrição:'
					onChange={(ev) => this.handleChange('description', ev)}
					text={anvisa.description || medicament.description}
					isError={errors.includes('description')}
					disabled={anvisa.description}
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
