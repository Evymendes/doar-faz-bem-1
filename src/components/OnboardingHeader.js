// Libs
// Libs
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Images
import Logo from '../assets/logo.jpg';
import Background from '../assets/headerbg.jpeg';

// Styles
const Container = styled.div`
	width: 100%;
	font-family: 'Overpass', Regular;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	@media(max-width: 320px) {
		min-height: auto;
	}
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
	width: 115%;
	height: ${(props) => (props.heightHeader ? props.heightHeader : '45vh')};
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

	@media(max-width: 320px) {
		height: 30vh;
	}

	@media(max-width: 720px) {
		width: 150%;
	}

	@media(min-width: 768px) {
		height: ${(props) => (props.heightHeader && '40vh')};
	}
`;

const Header = styled.div`
	flex: 1;
	height: ${(props) => (props.heightHeader ? props.heightHeader : '45vh')};
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

	@media(max-width: 320px) {
		height: 30vh;
	}

	@media(min-width: 768px) {
		height: ${(props) => (props.heightHeader && '40vh')};
	}
`;

const ContainerLogo = styled.div`
	width: 10rem;
	height: 10rem;
	border-radius: 50%;
	background: #fff;
	${'' /* box-shadow: 0px 2px 2px rgba(0,0,0,0.25);
	opacity: 0;
	animation-name: ${fadeIn};
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-delay: 1s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
	animation-play-state: running; */}
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	color: #fff;

	@media(max-width: 320px) {
		width: 8.5rem;
    height: 8.5rem;
	}
`;

const LogoIcon = styled.img`
	width: 10rem;
	height: 10rem;
	border-radius: 50%;
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

	@media(max-width: 320px) {
		width: 7.5rem;
    height: 7.5rem;
	}
`;

const OnboardingHeader = (props) => (
	<Container>
		<ContainerHeader heightHeader={props.heightHeader}>
			<Header heightHeader={props.heightHeader}>
				<LogoIcon src={Logo} alt="Logo" />
			</Header>
		</ContainerHeader>
	</Container>
);

export default OnboardingHeader;
