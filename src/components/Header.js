// Libs
import React from 'react';
import styled from 'styled-components';

// Components
// import Logo from '../asssets/';
import CloseIcon from '../assets/fechar.svg';
import IconWhite from '../assets/closeWhite.svg';

// Styles
const Container = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1rem;

	img {
		/* width: ${(props) => (props.iconWhite ? '2.2rem' : '1.2rem')}; */
		width: ${(props) => (props.width)};
		cursor: pointer;
	}
`;

const Icon  = styled.img`

	width: ${(props) => (props.iconWhite ? '2rem' : '1.2rem')};
	width: ${(props) => (props.width)};
	cursor: pointer;
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
	cursor: pointer;
`;

function handleClick(history) {
	history.push({
		pathname: '/',
	});
}

const Header = (props) => (
	<Container>
		{console.log('porps', props)}
		<Logo onClick={() => handleClick(props.history)}>
			DOAR FAZ BEM
		</Logo>
		{props.withoutClose ? null
			: <Icon
				src={props.iconWhite ? IconWhite : CloseIcon}
				iconWhite={props.iconWhite}
				// width={props.width}
				alt='Fechar'
				onClick={props.openModal}
			/>
		}
	</Container>
);

// Header.defaultProps = {
// 	width: '1.2rem',
// };

export default Header;
