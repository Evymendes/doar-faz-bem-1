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

const Header = (props) => (
	<Container>
		<div
			style={{
				width: '4rem',
				height: '4rem',
				borderRadius: '50%',
				background: '#000',
				// boxShadow: '5px 5px 6px #888888',
			}}
		/>
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
