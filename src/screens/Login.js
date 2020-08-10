// Libs
import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import Button from '../components/DefaultButton';
import OnboardingHeader from '../components/OnboardingHeader';
import DefaultInput from '../components/form/DefaultInput';

// Styles
const Container = styled.div`
	width: 100%;
	height: 100vh;
	font-family: 'Overpass', Regular;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Form = styled.form`
	height: 55vh;
	background: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 90%;
`;

const ErrorMessage = styled.p`
	margin-bottom: .5rem;
  color: #f00;
  font-size: 0.8rem;
	font-family: 'Overpass', Regular;
  font-weight: 400;
`;

const ContainerPasswordInput = styled.div`
	position: relative;
	display: flex;
`;

const EyeIcon = styled.img`
	position: absolute;
	right: 1rem;
	bottom: ${(props) => (props.error ? '1.3rem' : '2.3rem')};
	cursor: pointer;
`;

class Login extends Component {
	state = {
		user: {
			email: '',
			password: '',
		},
		emptyFields: false,
		emailError: false,
		passwordError: false,
	}

	// const handleClick = (link) => {
	// 	props.history.push({
	// 		pathname: link,
	// 	});
	// };

	loginUser = async (user) => {
		console.log('user');
	}

	handleChange = (field, ev) => {
		const { user } = this.state;

		user[field] = ev.target.value;

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
			user, emailError, passwordError,
		} = this.state;

		let EmptyFields = false;

		if (user.email === '' || user.password === '') {
			this.setState({
				emptyFields: true,
			});

			EmptyFields = true;
		}

		if (!EmptyFields && !emailError && !passwordError) {
			this.loginUser(user);

			console.log('pronto pra criar');
		}
	}

	render() {
		const {
			user, emptyFields, nameError, emailError,
		} = this.state;

		const errorsMessage = [
			'Insira um e-mail válido.',
			'Senha incorreta.',
		];

		return (
			<Container>
				<OnboardingHeader />
				<Form onSubmit={this.handleSubmit}>
					{/* <Button
						handleClick={() => handleClick('/scanner')}
						text={'Escanear Código de Barras'}
					/> */}
					<DefaultInput
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
					{/* <ContainerPasswordInput>
						<DefaultInput
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
							createErrorText={passwordError}
							onChange={(ev) => this.handleChange('password', ev)}
							disabled={false}
						/>
						{this.state.eyeShowing
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
					</ContainerPasswordInput> */}
					{/* <ErrorMessage>{passwordError && errorsMessage[2]}</ErrorMessage> */}
					<Button
						// background='#D8998A'
						// backgroundHover='#ce9385'
						// handleClick={() => handleClick('/dashboard')}
						handleClick={this.validateUser}
						text={'Visualizar Medicamentos'}
					/>
				</Form>
			</Container>
		);
	}
}

export default Login;
