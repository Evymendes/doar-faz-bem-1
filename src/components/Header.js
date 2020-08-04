// Libs
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// Images
import Logo from '../assets/logo.jpg';

// Components
import { ReactComponent as CloseIcon } from '../assets/fechar.svg';

// Styles
const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	height: 15vh;

	@media(min-width: 1024px) {
		height: 10vh;
	}

	@media(min-width: 1440px) {
		height: 15vh;
	}
`;

const ContainerLogo = styled.div`
	padding: 1rem;
	width: 4rem;
	height: 4rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background: #fff;
	box-shadow: 0px 2px 2px rgba(0,0,0,0.25);
	cursor: pointer;
`;

const LogoIcon = styled.img`
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
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
		<ContainerLogo onClick={() => handleClick(props.history)}>
			{/* DOAR FAZ BEM */}
			<LogoIcon src={Logo} alt="Logo" />
		</ContainerLogo>
		{!props.withoutClose && <CloseIcon
			strokeWidth={'2'}
			style={{
				stroke: props.strokeColor,
				cursor: 'pointer',
			}}
			onClick={props.openModal}
		/>
		}
		{props.withoutClose && <DashboardText exact to="/">Voltar Para o Início</DashboardText>}
	</Container>
);

Header.defaultProps = {
	strokeColor: '#d8998a',
};

export default Header;
