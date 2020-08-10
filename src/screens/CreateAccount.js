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
import { createUser } from '../services/api';
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
	margin-top: 3rem;
	width: 100%;
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
		}
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
			this.createAccount(user);
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
						createErrorText={nameError}
						onChange={(ev) => this.handleChange('name', ev)}
						disabled={false}
					/>
					<ErrorMessage>{nameError && errorsMessage[0]}</ErrorMessage>
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
					<ContainerPasswordInput>
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
					</ContainerPasswordInput>
					<ErrorMessage>{passwordError && errorsMessage[2]}</ErrorMessage>
					<DefaultButton
						handleClick={this.validateUser}
						text={'Criar Conta'}
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
			</Form>
		);
	}
}

export default CreateAccount;
