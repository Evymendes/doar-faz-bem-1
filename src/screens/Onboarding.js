// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

// Components
import OnboardingHeader from '../components/OnboardingHeader';
import DefaultInput from '../components/form/DefaultInput';
import DefaultButton from '../components/DefaultButton';
import Loading from '../components/Loading';

// Images
import EyeOnIcon from '../assets/eye.svg';
import EyeOffIcon from '../assets/eyeOff.svg';

// Services
import { createUser, login } from '../services/api';
import { isAuthenticated } from '../auth';

// Styles
const Form = styled.form`
  padding-bottom: 1rem;
	width: 100%;
	font-family: 'Overpass', Regular;
	overflow: hidden;
	display: flex;
	flex-direction: column;

	@media(max-width: 320px) {
		overflow-y: scroll;
	}
`;

const ContainerInputs = styled.div`
	margin-top: 2rem;
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const ContainerPasswordInput = styled.div`
	position: relative;
	display: flex;
`;

const EyeIcon = styled.img`
	position: absolute;
	right: 1rem;
	bottom: 2rem;
	cursor: pointer;

	@media(max-width: 320px) {
		bottom: 1.5rem;
	}
`;

const ErrorMessage = styled.p`
	margin-bottom: .5rem;
  color: #f00;
  font-size: 0.8rem;
	font-family: 'Overpass', Regular;
  font-weight: 400;
`;

const LoginText = styled.p`
	margin-top: ${(props) => (props.isLogin && '.5rem')};
	align-self: center;
	color: #989494;
	font-size: .95rem;
	font-family: 'Overpass', Regular;
	font-weight: 600;

	text-align: center;

	@media(max-width: 320px) {
		width: 80%;
	}

	@media(min-width: 375px) {
		margin-top: ${(props) => (props.isLogin && '.8rem')};
	}

	span {
		font-family: 'Overpass', Bold;
		font-weight: 900;
		border-bottom: 2.5px solid #49E5D6;
		cursor: pointer;
	}
`;

class Onboarding extends Component {
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
		isLoginScreen: true,
		errorBack: undefined,
		redirect: false,
	}

	componentDidMount() {
		const istAuth = isAuthenticated();
		if (istAuth) {
			this.setState({
				redirect: true,
			});
		}
	}

	createAccount = async (user) => {
		try {
			const userData = { ...user };

			const response = await createUser(userData);

			if (response) {
				this.setState({
					isLoading: true,
					errorBack: '',
					emptyFields: false,
				});

				setTimeout(() => {
					this.setState({
						isLoading: false,
						isLoginScreen: true,
					});
				}, 1000);
			}
		} catch (error) {
			console.log('error', error);
			console.log('error', error.response);

			this.setState({
				isLoading: false,
			});

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
					errorBack: 'Este nome já existe!',
				});
			}
		}
	}

	loginUser = async (user) => {
		const { email, password } = user;

		try {
			const response = await login(email, password);

			if (response) {
				localStorage.setItem('sessionToken', response.data.sessionToken);
				localStorage.setItem('objectId', response.data.objectId);
				localStorage.setItem('username', response.data.username);
			}

			this.setState({
				redirect: true,
			});
		} catch (error) {
			console.log('error', error);
			console.log('error', error.response);

			if (error.response.data.code === 101) {
				this.setState({
					errorBack: 'Email ou senha inválidos',
				});
			} else {
				this.setState({
					errorBack: 'Erro desconhecido.',
				});
			}
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
			errorBack: undefined,
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
		this.setState({
			isLoginScreen: !this.state.isLoginScreen,
		});

		this.setState({
			emptyFields: false,
			nameError: false,
			emailError: false,
			passwordError: false,
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
			isLoginScreen, eyeShowing, errorBack, isLoading, redirect,
		} = this.state;

		return (
			<>
				<OnboardingHeader heightHeader='32vh' />
				<Form onSubmit={this.handleSubmit}>
					<ContainerInputs>
						{!isLoginScreen && (
							<DefaultInput
								containerWidth='18rem'
								containerLittleWidth='17rem'
								containerWidthDesk='20rem'
								onboardingMarginBottom
								onboardingMarginBottomLittle
								containerDisplay
								containerAlignItems
								containerBorderBottom={'1.5px solid #38D5D5'}
								label='Username'
								labelMarginRight='1rem'
								labelWidth='auto'
								labelColor='#38D5D5'
								type='text'
								inputColor
								boxShadow={'none'}
								text={user.username || ''}
								inputBg={'transparent'}
								placeholder='Seu username'
								createError={emptyFields}
								createErrorText={nameError}
								onChange={(ev) => this.handleChange('username', ev)}
								disabled={false}
							/>
						)}
						<ErrorMessage>{nameError && errorsMessage[0]}</ErrorMessage>
						<DefaultInput
							containerWidth='18rem'
							containerLittleWidth='17rem'
							containerWidthDesk='20rem'
							onboardingMarginBottom
							onboardingMarginBottomLittle
							containerDisplay
							containerAlignItems
							containerBorderBottom={'1.5px solid #38D5D5'}
							label='E-mail'
							labelMarginRight='1rem'
							labelWidth='auto'
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
								containerWidth='18rem'
								containerLittleWidth='17rem'
								containerWidthDesk='20rem'
								onboardingMarginBottom
								onboardingMarginBottomLittle
								containerDisplay
								containerAlignItems
								containerBorderBottom={'1.5px solid #38D5D5'}
								label='Senha'
								labelMarginRight='1rem'
								labelWidth='auto'
								labelColor='#38D5D5'
								type={eyeShowing ? 'text' : 'password'}
								inputColor
								boxShadow={'none'}
								text={user.password || ''}
								inputBg={'transparent'}
								placeholder='Digite sua senha'
								createError={emptyFields}
								createErrorText={passwordError}
								onChange={(ev) => this.handleChange('password', ev)}
								disabled={false}
							/>
							{eyeShowing
								? <EyeIcon
									src={EyeOffIcon}
									alt="escondendo senha"
									onClick={this.handleEyeShow}
								/>
								: <EyeIcon
									src={EyeOnIcon}
									alt="mostrando senha"
									onClick={this.handleEyeShow}
								/>
							}
						</ContainerPasswordInput>
						<ErrorMessage>{passwordError && errorsMessage[2]}</ErrorMessage>
						<ErrorMessage>{errorBack}</ErrorMessage>
						<DefaultButton
							margin='0 0 1rem 0'
							maxWidth='18rem'
							handleClick={this.validateUser}
							text={!isLoginScreen ? 'Criar Conta' : 'Entrar'}
						/>
					</ContainerInputs>
					<LoginText isLogin={isLoginScreen}>
						{!isLoginScreen ? (
							<>
								Você já possui uma conta? {}
								<span onClick={this.handleLoginScreen}>Faça login</span>
							</>
						) : (
							<>
								Você ainda não possui uma conta? {}
								<span onClick={this.handleLoginScreen}>Crie agora</span>
							</>
						)}
					</LoginText>
					{redirect && <Redirect exact to="/dashboard" />}
				</Form>
				{isLoading && <Loading />}
			</>
		);
	}
}

export default Onboarding;
