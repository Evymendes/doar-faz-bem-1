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
import InstallIcon from '../assets/install.svg';
import Close from '../assets/closeBrown.png';

// Services
import { createUser, login } from '../services/api';
import { isAuthenticated } from '../auth';

// Styles
const Form = styled.form`
	margin-top: 3rem;
	width: 100%;
	font-family: 'Overpass', Regular;
	overflow: hidden;
	display: flex;
	flex-direction: column;

	@media(max-width: 320px) {
		margin-top: 0;
		overflow-y: scroll;
	}

	@media(max-width: 768px) {
		margin-top: 2rem;
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

const ErrorMessage = styled.p`
	padding-bottom: .5rem;
  color: #f00;
  font-size: 0.8rem;
	font-family: 'Overpass', Regular;
  font-weight: 400;
	width: 18rem;
	text-align: end;

	@media(max-width: 320px) {
		width: 17rem;
	}

	@media(min-width: 768px) {
		width: 20rem;
	}
`;

const ContainerButton = styled.div`
	margin-top: 1rem;
	width: 18rem;

	@media(max-width: 320px) {
		width: 17rem;
	}

	@media(min-width: 768px) {
		width: 20rem;
	}
`;

const ErrorMessageBack = styled.p`
	padding-bottom: .5rem;
  color: #f00;
  font-size: 0.8rem;
	font-family: 'Overpass', Regular;
  font-weight: 400;
	text-align: center;
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

const ModalInstall = styled.div`
	margin: 0.55rem;
	${''}
	padding: 0.95rem;
	position: absolute;
	bottom: 0;
	right: 0;
	color: #828587;
	font: 400 1rem 'Overpass', serif;
	border-radius: 8px;
	background: #dff8fc;
`;

const ModalInstallIcon = styled.img`
	position: ${(props) => props.close && 'absolute'};
	right: ${(props) => props.close && '.5rem'};
	width: ${(props) => (props.close ? '12px' : '16px')};
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
		showInstallMessage: undefined,
		isInstallModalOpen: false,
	}

	componentDidMount() {
		const istAuth = isAuthenticated();
		if (istAuth) {
			this.setState({
				redirect: true,
			});
		}

		// Verifica se o dispositivo está no iOS:
		const isIos = () => {
			const userAgent = window.navigator.userAgent.toLowerCase();

			return /iphone|ipad|ipod/.test(userAgent);
		};

		// Verifica se o dispositivo está no modo standalone
		const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

		// Verifica se deve exibir notificação popup de instalação:
		if (isIos() && !isInStandaloneMode()) {
			this.setState({ showInstallMessage: true, isInstallModalOpen: true });
		}
	}

	renderModalInstallIphone = () => (
		<ModalInstall>
			<ModalInstallIcon
				src={Close}
				alt="fechar"
				close
				onClick={() => this.setState({ isInstallModalOpen: false })}
			/>
			Instale esse WebApp no seu iPhone: Pressione <ModalInstallIcon src={InstallIcon} alt="install icon" /> e depois selecione <b>Adicionar à Tela de Início</b>.
		</ModalInstall>
	)

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

		// Login
		if (isLoginScreen) {
			delete user.username;

			if (user.email === '' || user.password === '') {
				this.setState({
					emptyFields: true,
				});

				EmptyFields = true;
			}
		}

		// Create Account
		if (!isLoginScreen && (user.username === '' || user.email === '' || user.password === '')) {
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
			errorBack: '',
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
			isLoginScreen, eyeShowing, errorBack, isLoading, redirect, showInstallMessage, isInstallModalOpen,
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
								// onboardingMarginBottom
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
							// isError={nameError}
							/>
						)}
						<ErrorMessage>{nameError && errorsMessage[0]}</ErrorMessage>
						<DefaultInput
							containerWidth='18rem'
							containerLittleWidth='17rem'
							containerWidthDesk='20rem'
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
								isEyeIcon
								eyeShowing={eyeShowing}
								onClickEyeIcon={this.handleEyeShow}
							/>
						</ContainerPasswordInput>
						<ErrorMessage>{passwordError && errorsMessage[2]}</ErrorMessage>
						<ContainerButton>
							<ErrorMessageBack>{errorBack}</ErrorMessageBack>
							<DefaultButton
								margin='0 0 1rem 0'
								maxWidth='18rem'
								handleClick={this.validateUser}
								text={!isLoginScreen ? 'Criar Conta' : 'Entrar'}
							/>
						</ContainerButton>
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
					</ContainerInputs>
					{redirect && <Redirect exact to="/dashboard" />}
				</Form>
				{isLoading && <Loading />}
				{showInstallMessage && isInstallModalOpen && this.renderModalInstallIphone()}
			</>
		);
	}
}

export default Onboarding;
