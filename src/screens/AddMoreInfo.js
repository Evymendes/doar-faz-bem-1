/* eslint-disable class-methods-use-this */
// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

// Components
import Header from '../components/Header';

// Styles
const Container = styled.div`
	width: 100%;
	height: 100vh;
	font-family: 'Overpass', Regular;
	background: #38D5D5;
`;

const Form = styled.form`
	position: relative;
	padding-top: 5rem;
	margin: 0 auto;
	width: 85%;
	height: calc(100vh - 96px);
`;

const FormContent = styled.div`
	margin-bottom: 1.5rem;
	padding: 0.7rem 0.7rem;
	font-weight: bold;
	text-decoration: none;
	border: none;
	border-radius: 4px;
	box-shadow: 2px 2px 2px #888888;
	background: #FFF;
	overflow: hidden;
`;

const Label = styled.label`
	font: 700 .9rem 'Overpass', serif;
	width: 90%;
	color: #38D5D5;
	background: #FFF;
	display: block;
  position: absolute;
  pointer-events: none;

	&:before {
		color: green;
	}
`;

const Input = styled.input`
	border: none;
	outline: none;
  font-size: 1rem;

	background: none;
  border-width: 0;
  display: block;
  width: 100%;
	&:focus
	label {
		placeholder: green;
	}
`;

const Footer = styled.div`
	width: 20%;
	height: 5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	@media(max-width: 648px) {
		position: absolute;
		left: 0;
	 	right: 0;
    bottom: 4rem;
	}
`;

const Button = styled.button`
	width: 9.2rem;
	height: 3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 1rem;
	font-weight: bold;
	font-family: Overpass, Regular;
	text-decoration: none;
	border-radius: 50px;
	box-shadow: ${(props) => (props.cancel ? 'none' : '2px 2px 2px #888888')};
	cursor: pointer;
	background: ${(props) => (props.cancel ? 'transparent' : '#49E5D6')};
	border: ${(props) => (props.cancel ? '1px solid #FFF' : 'none')};
	text-transform: uppercase;

	@media(max-width: 320px) {
		width: 8rem;
	}
`;

class Login extends Component {
	state = {

	}

	handleBackScanner = () => {
		this.setState({
			isRedirect: true,
			redirect: '/qrcode',
		});
	}

	handleLabelName = () => {
		// this.setState({

		// })
		console.log('ola');
		this.inputName.focus();
	}

	render() {
		const { isRedirect, redirect } = this.state;

		return (
			<Container>
				<Header openModal={this.handleBackScanner} />
				<Form>
					<FormContent>
						<Label for="input__name" onClick={this.handleLabelName}>
						Nome:
						</Label>
						<Input ref={(node) => this.inputName = node}
							placeholder='olaaaaaaa'
						/>
					</FormContent>
					<FormContent>
						<Label>	Data de Validade:	</Label>
						<Input placeholder='olaaaaaaa' />
					</FormContent>
					<FormContent>
						<Label>Código: </Label>
						<Input placeholder='olaaaaaaa' />
					</FormContent>
					<FormContent>
						<Label> Categoria: </Label>
						<Input placeholder='olaaaaaaa' />
					</FormContent>
					<Footer>
						<Button cancel onClick={this.handleBackScanner}>cancelar</Button>
						<Button onClick={this.handleOpenScannerScreen}>confirmar</Button>
					</Footer>
				</Form>
				{isRedirect && <Redirect to={redirect} />}
			</Container>
		);
	}
}

export default Login;
