// Libs
import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import OnboardingHeader from '../components/OnboardingHeader';
import DefaultInput from '../components/form/DefaultInput';
import DefaultButton from '../components/DefaultButton';
import EyeOnIcon from '../assets/eye.svg';
import EyeOffIcon from '../assets/eyeOff.svg';

// Services
import { createUser, login } from '../services/api';
import DoarHash from '../services/DoarHash';

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
	margin-top: 2rem;
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const ContainerPasswordInput = styled.div`
	width: 75%;
	position: relative;
	display: flex;
`;

const EyeIcon = styled.img`
	position: absolute;
	right: 1rem;
	bottom: ${(props) => (props.error ? '1.3rem' : '2.3rem')};
	cursor: pointer;
`;

const ErrorMessage = styled.p`
	margin-bottom: .5rem;
  color: #f00;
  font-size: 0.8rem;
	font-family: 'Overpass', Regular;
  font-weight: 400;
`;

const LoginText = styled.p`
	margin-top: .5rem;
	align-self: center;
	color: #989494;
	font-size: .95rem;
	font-family: 'Overpass', Regular;
	font-weight: 600;

	span {
		font-family: 'Overpass', Bold;
		font-weight: 900;
		border-bottom: 2.5px solid #49E5D6;
		cursor: pointer;
	}
`;

class CreateAccount extends Component {
	state = {
		user: {
			username: '',
			email: '',
			password: '',
		},
		emptyFields: false,
		nameError: false,
		emailError: false,
		passwordError: false,
		eyeShowing: false,
		isLoginScreen: false,
		errorBack: undefined,
	}

	createAccount = async (user) => {
		try {
			const userData = { ...user };

			console.log('userData', userData);

			// const encodedPassword = DoarHash(userData.password);
			// // const credentials = `${encodedPassword}`;
			// const base64credentials = Buffer.from(encodedPassword, 'utf-8').toString(
			// 	'base64',
			// );

			// userData.password = base64credentials;

			// await createUser(user);

			const create = await createUser(userData);

			console.log('create', create);
		} catch (error) {
			console.log('error', error);
			console.log('error', error.response);

			if (error.response.data.error === 'Account already exists for this username.') {
				this.setState({
					errorBack: 'Esta conta já existe!',
				});
			}

			if (error.response.data.error === 'Account already exists for this email address.') {
				this.setState({
					errorBack: 'Este e-mail já existe!',
				});
			}

			if (error.response.data.error === 'Account already exists for this username.') {
				this.setState({
					errorBack: 'Este username já existe!',
				});
			}
		}
	}

	loginUser = async (user) => {
		console.log('user loginnnn ------');

		const { email } = user;
		const { password } = user;

		try {
			const loginAccount = await login(email, password);

			console.log('loginAccount', loginAccount);
		} catch (error) {
			console.log('error', error);
			console.log('error', error.response);
		}
	}

	handleChange = (field, ev) => {
		const { user } = this.state;

		user[field] = ev.target.value;

		if (field === 'username') {
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
			user, nameError, emailError, passwordError, isLoginScreen,
		} = this.state;

		let EmptyFields = false;

		// Login - Delete username
		if (isLoginScreen) {
			delete user.username;
		}

		// Create Account
		if (!isLoginScreen && (user.username === '' || user.email === '' || user.password === '')) {
			this.setState({
				emptyFields: true,
			});

			EmptyFields = true;
		}

		// Login
		if (isLoginScreen && (user.email === '' || user.password === '')) {
			this.setState({
				emptyFields: true,
			});

			EmptyFields = true;
		}

		// Create Account
		if (!isLoginScreen && !EmptyFields && !nameError && !emailError && !passwordError) {
			this.createAccount(user);
		}

		// Login
		if (isLoginScreen && !EmptyFields && !emailError && !passwordError) {
			this.loginUser(user);
		}
	}

	handleEyeShow = () => {
		this.setState({
			eyeShowing: !this.state.eyeShowing,
		});
	}

	handleLoginScreen = () => {
		console.log('isloginscreen');

		this.setState({
			isLoginScreen: !this.state.isLoginScreen,
		});
	}

	render() {
		const errorsMessage = [
			'Insira um nome válido.',
			'Insira um e-mail válido.',
			'Insira uma senha com o mínimo de 6 caracteres.',
		];

		const {
			user, nameError, emailError, passwordError, emptyFields, isLoginScreen, eyeShowing, errorBack,
		} = this.state;

		return (
			<Form onSubmit={this.handleSubmit}>
				<OnboardingHeader heightHeader='40vh' />
				<ContainerInputs>
					{!isLoginScreen && (
						<DefaultInput
							containerWidth='75%'
							containerDisplay
							containerAlignItems
							containerBorderBottom={'1.5px solid #38D5D5'}
							label='Username'
							labelMarginRight='1rem'
							labelWidth='auto'
							labelColor='#38D5D5'
							labelFontSize={'0.85rem'}
							type='text'
							inputColor
							boxShadow={'none'}
							text={user.username || ''}
							inputBg={'transparent'}
							placeholder='Seu username...'
							createError={emptyFields}
							createErrorText={nameError}
							onChange={(ev) => this.handleChange('username', ev)}
							disabled={false}
						/>
					)}
					<ErrorMessage>{nameError && errorsMessage[0]}</ErrorMessage>
					<DefaultInput
						containerWidth='75%'
						containerDisplay
						containerAlignItems
						containerBorderBottom={'1.5px solid #38D5D5'}
						label='E-mail'
						labelMarginRight='1rem'
						labelWidth='auto'
						labelFontSize={'0.85rem'}
						labelColor='#38D5D5'
						type='email'
						inputColor
						boxShadow={'none'}
						text={user.email || ''}
						inputBg={'transparent'}
						placeholder='exemplo@exemplo.com'
						createError={emptyFields}
						createErrorText={emailError}
						onChange={(ev) => this.handleChange('email', ev)}
						disabled={false}
					/>
					<ErrorMessage>{emailError && errorsMessage[1]}</ErrorMessage>
					<ContainerPasswordInput>
						<DefaultInput
							containerWidth='100%'
							containerDisplay
							containerAlignItems
							containerBorderBottom={'1.5px solid #38D5D5'}
							label='Senha'
							labelMarginRight='1rem'
							labelWidth='auto'
							labelColor='#38D5D5'
							labelFontSize={'0.85rem'}
							type={eyeShowing ? 'text' : 'password'}
							inputColor
							boxShadow={'none'}
							text={user.password || ''}
							inputBg={'transparent'}
							placeholder='000000'
							createError={emptyFields}
							createErrorText={passwordError}
							onChange={(ev) => this.handleChange('password', ev)}
							disabled={false}
						/>
						{eyeShowing
							? <EyeIcon
								src={EyeOffIcon}
								alt="escondendo senha"
								error={passwordError}
								onClick={this.handleEyeShow}
							/>
							: <EyeIcon
								src={EyeOnIcon}
								alt="mostrando senha"
								error={passwordError}
								onClick={this.handleEyeShow}
							/>
						}
					</ContainerPasswordInput>
					<ErrorMessage>{passwordError && errorsMessage[2]}</ErrorMessage>
					<ErrorMessage>{errorBack}</ErrorMessage>
					<DefaultButton
						handleClick={this.validateUser}
						text={!isLoginScreen ? 'Criar Conta' : 'Entrar'}
						maxWidth='18rem'
						widthDesk='70%'
						style={{
							margin: '1rem',
							width: '75%',
							background: '#49E5D6',
							color: '#fff',
						}}
					/>
				</ContainerInputs>
				<LoginText>
					{!isLoginScreen ? (
						<>
							Você já possui uma conta? { }
							<span onClick={this.handleLoginScreen}>Faça login</span>
						</>
					) : (
						<>
							Você ainda não possui uma conta? { }
							<span onClick={this.handleLoginScreen}>Crie agora</span>
						</>
					)}
				</LoginText>
			</Form>
		);
	}
}

export default CreateAccount;
