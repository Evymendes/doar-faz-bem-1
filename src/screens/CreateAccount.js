// Libs
import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import OnboardingHeader from '../components/OnboardingHeader';
import DefaultInput from '../components/form/DefaultInput';
import DefaultButton from '../components/DefaultButton';
import EyeOnIcon from '../assets/eye.svg';
import EyeOffIcon from '../assets/eyeOff.svg';

// Styles
const Form = styled.form`
	width: 100%;
	height: 100vh;
	font-family: 'Overpass', Regular;
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;

const ContainerInputs = styled.div`
	margin-top: 3rem;
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
`;

class CreateAccount extends Component {
	state = {
		user: {
			name: '',
			email: '',
			password: '',
		},
		emptyFields: false,
		nameError: false,
		emailError: false,
		passwordError: false,
		eyeShowing: false,
	}

	createUser = (user) => {
		console.log('chegou user no create user');
	}

	handleChange = (field, ev) => {
		const { user } = this.state;

		user[field] = ev.target.value;

		if (field === 'name') {
			this.setState({
				nameError: ev.target.value.length < 4,
			});
		}

		if (field === 'email') {
			this.setState({
				emailError: ev.target.value.length < 6,
			});
		}

		if (field === 'password') {
			this.setState({
				passwordError: ev.target.value.length < 6,
			});
		}

		this.setState({
			user,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
	}

	validateUser = () => {
		const {
			user, emptyFields, nameError, emailError, passwordError,
		} = this.state;

		let EmptyFields = false;

		if (user.name === '' || user.email === '' || user.password === '') {
			this.setState({
				emptyFields: true,
			});

			EmptyFields = true;
		}

		if (!EmptyFields && !nameError && !emailError && !passwordError) {
			// this.createUser(user);
		}
	}

	handleEyeShow = () => {
		this.setState({
			eyeShowing: !this.state.eyeShowing,
		});
	}

	render() {
		const errorsMessage = [
			'Insira um nome válido.',
			'Insira um e-mail válido.',
			'Insira uma senha com o mínimo de 6 caracteres.',
		];

		const {
			user, nameError, emailError, passwordError, emptyFields,
		} = this.state;

		return (
			<Form onSubmit={this.handleSubmit}>
				<OnboardingHeader />
				<ContainerInputs>
					<DefaultInput
						width='75%'
						containerDisplay
						containerAlignItems
						containerBorderBottom={'1.5px solid #38D5D5'}
						label='Nome'
						labelMarginRight='1rem'
						labelWidth='auto'
						labelColor='#38D5D5'
						labelFontSize={'0.85rem'}
						type='text'
						inputColor
						boxShadow={'none'}
						text={user.name || ''}
						inputBg={'transparent'}
						placeholder='Seu nome...'
						createError={emptyFields}
						onChange={(ev) => this.handleChange('name', ev)}
						disabled={false}
					/>
					<p>{nameError && errorsMessage[0]}</p>
					<DefaultInput
						width='75%'
						containerDisplay
						containerAlignItems
						containerBorderBottom={'1.5px solid #38D5D5'}
						label='E-mail'
						labelMarginRight='1rem'
						labelWidth='auto'
						labelFontSize={'0.85rem'}
						labelColor='#38D5D5'
						type='text'
						inputColor
						boxShadow={'none'}
						text={user.email || ''}
						inputBg={'transparent'}
						placeholder='exemplo@exemplo.com'
						createError={emptyFields}
						onChange={(ev) => this.handleChange('email', ev)}
						disabled={false}
					/>
					<p>{emailError && errorsMessage[1]}</p>
					<div>
						<DefaultInput
							width='75%'
							containerDisplay
							containerAlignItems
							containerBorderBottom={'1.5px solid #38D5D5'}
							label='Senha'
							labelMarginRight='1rem'
							labelWidth='auto'
							labelColor='#38D5D5'
							labelFontSize={'0.85rem'}
							type={this.state.eyeShowing ? 'text' : 'password'}
							inputColor
							boxShadow={'none'}
							text={user.password || ''}
							inputBg={'transparent'}
							placeholder='000000'
							createError={emptyFields}
							onChange={(ev) => this.handleChange('password', ev)}
							disabled={false}
						/>
						{this.state.eyeShowing
							? <img
								src={EyeOffIcon}
								alt="escondendo"
								onClick={this.handleEyeShow}
							/>
							: <img
								src={EyeOnIcon}
								alt="mostrando"
								onClick={this.handleEyeShow}
							/>
						}
					</div>
					<p>{passwordError && errorsMessage[2]}</p>
					<DefaultButton
						handleClick={this.validateUser}
						text={'Criar Conta'}
						style={{
							margin: '1rem',
							width: '90%',
							background: '#49E5D6',
							color: '#fff',
						}}
					/>
				</ContainerInputs>
			</Form>
		);
	}
}

export default CreateAccount;
