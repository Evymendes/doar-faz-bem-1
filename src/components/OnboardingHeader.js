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
		min-height: fit-content;
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

	@media(min-width: 768px) {
		height: ${(props) => (props.heightHeader && '40vh')};
	}

	@media(max-width: 720px) {
		width: 150%;
	}

	@media(max-width: 320px) {
		height: 30vh;
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

	@media(min-width: 768px) {
		height: ${(props) => (props.heightHeader && '40vh')};
	}

	@media(max-width: 320px) {
		height: 30vh;
	}
`;

const LogoIcon = styled.img`
	width: 9.5rem;
	height: 9.5rem;
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

	@media(max-width: 667px) and (orientation: landscape) {
		width: 6.5rem;
    height: 6.5rem;
	}

	@media(max-width: 568px) and (orientation: landscape) {
		width: 5.5rem;
    height: 5.5rem;
	}


	@media(max-width: 425px) {
		width: 8rem;
    height: 8rem;
	}

	@media(max-width: 360px) {
		width: 6rem;
    height: 6rem;
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
