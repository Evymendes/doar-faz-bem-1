// Libs
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// Components
import { ReactComponent as CloseIcon } from '../assets/fechar.svg';

// Styles
const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	height: 15vh;
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

const DashboardText = styled(NavLink)`
	padding-left: 1rem;
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	color: #D8998A;
	font-size: .90rem;
	font-family: 'Overpass', Bold;
	text-decoration: none;
	font-weight: 800;
`;

function handleClick(history) {
	history.push({
		pathname: '/',
	});
}

const Header = (props) => (
	<Container>
		<Logo onClick={() => handleClick(props.history)}>
			DOAR FAZ BEM
		</Logo>
		{props.withoutClose ? null
			:			<CloseIcon
				strokeWidth={'2'}
				style={props.iconStyle}
				onClick={props.openModal}
			/>
		}
		{props.withoutClose && <DashboardText exact to="/">Voltar Para o Início</DashboardText>}
	</Container>
);

Header.defaultProps = {
	iconStyle: { stroke: '#D8998A', cursor: 'pointer' },
};

export default Header;
