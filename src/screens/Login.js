/* eslint-disable class-methods-use-this */
// Libs
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// Images
// import Logo from '../assets/aa.png';
import Background from '../assets/headerbg.jpeg';

// Styles
const Container = styled.div`
	width: 100%;
	height: 100vh;
	font-family: Overpass, Regular;
`;

const ContainerHeader = styled.div`
	height: 40vh;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom-left-radius: 40%;
	border-bottom-right-radius: 40%;
	background-image: url(${Background});
	background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Header = styled.div`
	flex: 1;
	height: 40vh;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom-left-radius: 40%;
	border-bottom-right-radius: 40%;
	background-color: #38d5d58a;
`;

const Content = styled.div`
	padding-top: 1rem;
	height: 60vh;
	background: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Button = styled(NavLink)`
	margin-bottom: 2rem;
	width: 20rem;
	height: 3.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	text-decoration: none;
	border: none;
	border-radius: 50px;
	box-shadow: 2px 2px 2px #888888;
	cursor: pointer;
`;

const Login = () => (
	<Container>
		<ContainerHeader>
			<Header>
				<div
					style={{
						width: '9.5rem',
						height: '9rem',
						borderRadius: '50%',
						background: '#fff',
						boxShadow: '5px 5px 10px #888888',
					}}
				/>
			</Header>
		</ContainerHeader>
		<Content>
			<Button
				exact to="/scanner"
				// activeClassName="login_header-button"
				style={{
					background: '#49E5D6',
					color: '#fff',
				}}
			>
				Escanear Codigo de Barras
			</Button>
			<Button
				// exact to="/qrcode"
				exact to="/addMoreInfo"

				style={{
					background: '#D8998A',
					color: '#fff',
				}}
			>
				Escanear QR Code
			</Button>
			<Button
				exact to="/"
				style={{
					background: '#EDEDED',
					color: '#000',
					cursor: 'not-allowed',
				}}
			>
				Adicionar Medicamento
			</Button>
		</Content>
	</Container>
);

export default Login;
