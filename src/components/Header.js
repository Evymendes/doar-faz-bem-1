// Libs
import React from 'react';
import styled from 'styled-components';

// Components
// import Logo from '../asssets/';
import CloseIcon from '../assets/fechar.svg';

// Styles
const Container = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1rem;

	img {
		width: 1.2rem;
		cursor: pointer;
	}
`;

const Logo = styled.div`
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
	background: #fff;
	box-shadow: 0px 2px 2px rgba(0,0,0,0.25);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.85rem;
	padding: 1rem;
	color: #fff;
	background: linear-gradient(45deg, #3dfefe, #9E9E9E);
	font-weight: 800;
	font-family: sans-serif;
`;

const Header = (props) => (
	<Container>
		<Logo>
			DOAR FAZ BEM
		</Logo>
		{props.withoutClose ? null
			: <img
				src={CloseIcon}
				alt='Fechar'
				onClick={props.openModal}
			/>
		}
	</Container>
);

export default Header;
