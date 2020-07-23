// Libs
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

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
const pressAnimation = keyframes`
  100% {
		transform: translateY(2px);
    box-shadow: none;
  }
`;

const ContainerHeader = styled.div`
	position: relative;
	width: 125%;
	height: 40vh;
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
	height: 40vh;
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
	padding-top: 1rem;
	height: 60vh;
	background: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 90%;
`;

const Logo = styled.div`
	width: 9rem;
	height: 9rem;
	border-radius: 50%;
	background: #fff;
	box-shadow: 5px 5px 10px #888888;
	opacity: 0;
	animation-name: ${fadeIn};
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-delay: 1s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
`;

const Button = styled.button`
	margin-bottom: 2rem;
	width: 100%;
	max-width: 20rem;
	height: 3.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	font-weight: bold;
	text-decoration: none;
	border: none;
	border-radius: 50px;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
	cursor: pointer;
	animation: ${(props) => (props.pressed ? pressAnimation : '')} 0.5s ease forwards;
`;

const Login = (props) => {
	const [pressed, setPressed] = useState(false);
	const [currentButton, chooseCurrentButton] = useState(false);

	const handleClick = (link) => {
		setPressed((pressed) => !pressed);
		chooseCurrentButton(link);

		if (!pressed) {
			setTimeout(() => {
				props.history.push({
					pathname: link,
				});
			}, 1000);
		}
	};

	return (
		<Container>
			<ContainerHeader>
				<Header>
					<Logo/>
				</Header>
			</ContainerHeader>
			<Content>
				<Button
					pressed={pressed && currentButton === '/scanner'}
					onClick={() => handleClick('/scanner')}
					style={{
						background: '#49E5D6',
						color: '#fff',
					}}
				>
					Escanear Código de Barras
				</Button>
				{/* <Button
					pressed={pressed && currentButton === '/qrcode'}
					onClick={() => handleClick('/qrcode')}
					style={{
						background: '#D8998A',
						color: '#fff',
					}}
				>
					Escanear QR Code
				</Button> */}
				<Button
					pressed={pressed && currentButton === 'none'}
					onClick={() => handleClick(props.history, '/')}
					disabled
					style={{
						background: '#EDEDED',
						cursor: 'not-allowed',
						color: '#9E9E9E',
						opacity: '0.5',
					}}
				>
					Adicionar Medicamento
				</Button>
			</Content>
		</Container>
	);
};

export default Login;
