// Libs
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

// Images
import Logo from '../assets/logo.jpg';
import Background from '../assets/headerbg.jpeg';

// Styles
const Container = styled.div`
	width: 100%;
	${'' /* height: 100vh; */}
	font-family: 'Overpass', Regular;
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

	@media(max-width: 720px) {
		width: 150%;
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
`;

const ContainerLogo = styled.div`
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
	padding: 2rem;
	color: #fff;
`;

const LogoIcon = styled.img`
	width: 10rem;
	height: 10rem;
	border-radius: 50%;
`;

const OnboardingHeader = (props) => (
	<Container>
		<ContainerHeader heightHeader={props.heightHeader}>
			<Header heightHeader={props.heightHeader}>
				<ContainerLogo>
					<LogoIcon src={Logo} alt="Logo" />
				</ContainerLogo>
			</Header>
		</ContainerHeader>
	</Container>
);

export default OnboardingHeader;
