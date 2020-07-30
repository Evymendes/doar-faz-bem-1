// Libs
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Components
import Button from '../components/DefaultButton';

// Images
import Background from '../assets/headerbg.jpeg';

// Styles
const Container = styled.div`
	width: 100%;
	height: 100vh;
	font-family: Overpass, Regular;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const borderAnimation = keyframes`
  0% {
		border-bottom-right-radius: 0%;
		border-bottom-left-radius: 0%;
  }
  100% {
		border-bottom-right-radius: 50%;
		border-bottom-left-radius: 50%;
  }
`;

const fadeIn = keyframes`
  0% {
		opacity: 0;
  }
  100% {
		opacity: 1;
  }
`;

const ContainerHeader = styled.div`
	position: relative;
	width: 150%;
	height: 45vh;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom-left-radius: 50%;
	border-bottom-right-radius: 50%;
	background-image: url(${Background});
	background-position: center;
  background-size: cover;
	background-repeat: no-repeat;
	animation-name: ${borderAnimation};
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
`;

const Header = styled.div`
	flex: 1;
	height: 45vh;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom-left-radius: 50%;
	border-bottom-right-radius: 50%;
	background-color: #38d5d58a;
	animation-name: ${borderAnimation};
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
`;

const Content = styled.section`
	height: 55vh;
	background: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 90%;
`;

const Logo = styled.div`
	width: 10rem;
	height: 10rem;
	border-radius: 50%;
	background: #fff;
	box-shadow: 0px 2px 2px rgba(0,0,0,0.25);
	opacity: 0;
	animation-name: ${fadeIn};
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-delay: 1s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
	animation-play-state: running;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.75rem;
	padding: 2rem;
	color: #fff;
	background: linear-gradient(45deg, #3dfefe, #9E9E9E);
	font-weight: 800;
`;

const Login = (props) => {
	const handleClick = (link) => {
		props.history.push({
			pathname: link,
		});
	};

	return (
		<Container>
			<ContainerHeader>
				<Header>
					<Logo>
						DOAR FAZ BEM
					</Logo>
				</Header>
			</ContainerHeader>
			<Content>
				<Button
					handleClick={() => handleClick('/scanner')}
					text={'Escanear Código de Barras'}
					style={{
						margin: '1rem',
						background: '#49E5D6',
						color: '#fff',
					}}
				/>
				<Button
					handleClick={() => handleClick('/dashboard')}
					text={'Visualizar Medicamentos'}
					style={{
						margin: '1rem',
						background: '#D8998A',
						color: '#fff',
					}}
				/>
			</Content>
		</Container>
	);
};

export default Login;
