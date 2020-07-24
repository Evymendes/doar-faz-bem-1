/* eslint-disable class-methods-use-this */
// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

// Components
import Header from '../components/Header';
import Loading from '../components/Loading';

// Services
import { createMedicament } from '../services/api';

// Styles
const Container = styled.div`
	width: 100%;
	height: 100vh;
	background: #38D5D5;
`;

const Form = styled.form`
	position: relative;
	margin: 0 auto;
	width: 85%;
	height: calc(100vh - 96px);
	display: flex;
	justify-content: space-around;
	flex-direction: column;
`;

const FormContent = styled.div`
  margin-bottom: ${(props) => (props.isError ? '0.5rem' : '1.5rem')};
`;

const Label = styled.label`
	font: 700 1rem 'Overpass', serif;
	width: 90%;
	color: #FFF;
`;

const Input = styled.input`
	padding: 0.7rem 0.7rem;
  width: 100%;
	color: #989494;
	font: 700 1rem 'Overpass', serif;
	text-decoration: none;
	background: #FFF;
	outline: none;
  border: ${(props) => (props.isError ? '2px solid red' : 'none')};
	border-radius: 4px;
	box-shadow: 2px 2px 2px #888888;

	::placeholder {
		color: #989494;
	}
`;

const ErrorMessage = styled.p`
	margin-top: .3rem;
  color: red;
	font: 400 .9rem 'Overpass', serif;
	display: flex;
	justify-content: flex-end;
`;

const Footer = styled.div`
	width: 20%;
	height: 5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

const Button = styled.button`
	width: 9.2rem;
	height: 3rem;
	color: #fff;
	font: 700 1rem 'Overpass', serif;
	text-decoration: none;
	text-transform: uppercase;
	border-radius: 50px;
	box-shadow: ${(props) => (props.cancel ? 'none' : '2px 2px 2px #888888')};
	background: ${(props) => (props.cancel ? 'transparent' : '#49E5D6')};
	border: ${(props) => (props.cancel ? '1px solid #FFF' : 'none')};
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	@media(max-width: 320px) {
		width: 8rem;
	}
`;

class Login extends Component {
	state = {
		isRedirect: undefined,
		redirect: undefined,
		isLoading: undefined,
		name: '',
		expirationDate: undefined,
		code: '',
		category: '',
		isErrorName: undefined,
		isErrorExpirationDate: undefined,
		isErrorCode: undefined,
		isErrorCategory: undefined,
	}

	createMed = async () => {
		const {
			name, expirationDate, code, category,
		} = this.state;

		const date = new Date(expirationDate);

		const data = {
			EAN_1: code,
			PRODUTO: name,
			SUBSTANCIA: 'subs',
			APRESENTACAO: 'aprensentaaaaa',
			LABORATORIO: 'labor',
			TIPO: category,
			QUANTIDADE: '10',
			EMBALAGEM_ABERTA: true,
			// DATA_EXPIRACAO: expirationDate,
			DATA_EXPIRACAO: { __type: 'Date', iso: date },
		};

		try {
			const response = await createMedicament(data);

			console.log('response', response);
		} catch (error) {
			console.log('error', error.response);
		}
	}

	handleBackScanner = () => {
		this.setState({
			isRedirect: true,
			redirect: '/qrcode',
		});
	}

	handleChange = (field, ev) => {
		if (field === 'name') {
			this.setState({
				isErrorName: ev.target.value.length < 1,
			});
		}

		if (field === 'expirationDate') {
			this.setState({
				isErrorExpirationDate: ev.target.value.length < 1,
			});
		}

		if (field === 'code') {
			this.setState({
				isErrorCode: ev.target.value.length < 1,
			});
		}

		if (field === 'category') {
			this.setState({
				isErrorCategory: ev.target.value.length < 1,
			});
		}

		this.setState({
			[field]: ev.target.value,
		});
	};

	validationScreen = () => {
		const {
			name, expirationDate, code, category,
		} = this.state;

		if (!name) {
			this.setState({
				isErrorName: true,
			});
		} else {
			this.setState({
				isErrorName: false,
			});
		}

		if (!expirationDate) {
			this.setState({
				isErrorExpirationDate: true,
			});
		} else {
			this.setState({
				isErrorExpirationDate: false,
			});
		}

		if (!code) {
			this.setState({
				isErrorCode: true,
			});
		} else {
			this.setState({
				isErrorCode: false,
			});
		}

		if (!category) {
			this.setState({
				isErrorCategory: true,
			});
		} else {
			this.setState({
				isErrorCategory: false,
			});
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const {
			isErrorName,
			isErrorExpirationDate,
			isErrorCode,
			isErrorCategory,
		} = this.state;

		this.validationScreen();

		if (
			isErrorName === false
			&& isErrorExpirationDate === false
			&& isErrorCode === false
			&& isErrorCategory === false
		) {
			this.setState({
				isLoading: true,
			});

			this.createMed();
		}
	}

	renderForm = () => {
		const {
			name,
			expirationDate,
			code,
			category,
			isErrorName,
			isErrorExpirationDate,
			isErrorCode,
			isErrorCategory,
		} = this.state;
		const errorMessage = '*Campo obrigatório.';

		return (
			<>
				<FormContent isError={isErrorName}>
					<Label onClick={this.handleLabelName}>
						Nome:
					</Label>
					<Input
						type="text"
						value={name}
						onChange={(ev) => this.handleChange('name', ev)}
						placeholder='Digite aqui...'
						isError={isErrorName}
					/>
					{isErrorName && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
				<FormContent isError={isErrorName}>
					<Label>	Data de Validade:	</Label>
					<Input
						type="date"
						value={expirationDate}
						onChange={(ev) => this.handleChange('expirationDate', ev)}
						placeholder='Digite aqui...'
						isError={isErrorExpirationDate}
					/>
					{isErrorExpirationDate && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
				<FormContent isError={isErrorName}>
					<Label>Código: </Label>
					<Input
						type="text"
						value={code}
						onChange={(ev) => this.handleChange('code', ev)}
						placeholder='Digite aqui...'
						isError={isErrorCode}
					/>
					{isErrorCode && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
				<FormContent isError={isErrorName}>
					<Label> Categoria: </Label>
					<Input
						type="text"
						value={category}
						onChange={(ev) => this.handleChange('category', ev)}
						placeholder='Digite aqui...'
						isError={isErrorCategory}
					/>
					{isErrorCategory && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
			</>
		);
	}

	render() {
		const {
			isRedirect,
			redirect,
			isLoading,
		} = this.state;

		return (
			<Container>
				<Header openModal={this.handleBackScanner} />
				<Form onSubmit={this.handleSubmit}>
					{/* <FormContent>
						<Input
							id="input__name"
							placeholder='Digite seu nome'
						/>
						<Label for="input__name" onClick={this.handleLabelName}>
							Nome:
						</Label>
					</FormContent> */}
					<div>
						{this.renderForm()}
					</div>
					<Footer>
						<Button cancel onClick={this.handleBackScanner}>cancelar</Button>
						<Button>confirmar</Button>
					</Footer>
				</Form>
				{isLoading && <Loading />}
				{isRedirect && <Redirect to={redirect} />}
			</Container>
		);
	}
}

export default Login;
