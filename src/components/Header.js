/* eslint-disable class-methods-use-this */
// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

// Images
import Logo from '../assets/logo.jpg';
// import Logo from '../assets/logo-doar-faz-bem.svg';

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

const DashboardText = styled.p`
	padding-left: ${(props) => (props.logout && '1rem')};
	width: ${(props) => (props.logout && '100%')};
	display: ${(props) => (props.logout && 'flex')};;
	justify-content: ${(props) => (props.logout && 'flex-start')};
	align-items: ${(props) => (props.logout && 'center')};
	color: #D8998A;
	font-size: ${(props) => (props.logout ? '.90rem' : '1rem')};
	font-family: 'Overpass', Bold;
	text-decoration: none;
	font-weight: 800;
	cursor: ${(props) => (props.logout && 'pointer')};
	white-space:  ${(props) => (!props.logout && 'nowrap')};
`;

class Header extends Component {
	state = {
		isRedirect: false,
		user: '',
	}

	// handleClick = (history) => {
	// 	history.push({
	// 		pathname: '/',
	// 	});
	// }

	componentDidMount() {
		this.getUser();
	}

	getUser = async () => {
		try {
			let user = await localStorage.getItem('username');

			this.setState({
				user,
			});

			// console.log(this.state.user);
		} catch (error) {
			console.log('error', error.response);
		}
	}

	handleLogout = () => {
		localStorage.removeItem('sessionToken');

		this.setState({
			isRedirect: true,
		});
	}

	render() {
		const { withoutClose, strokeColor, openModal } = this.props;
		return (
			<Container>
				{/* <ContainerLogo onClick={() => this.handleClick(this.props.history)}>
					<LogoIcon src={Logo} alt="Logo" />
				</ContainerLogo> */}
				<ContainerLogo>
					<LogoIcon src={Logo} alt="Logo" />
				</ContainerLogo>
				{!withoutClose && <CloseIcon
					strokeWidth={'2'}
					style={{
						stroke: strokeColor,
						cursor: 'pointer',
					}}
					onClick={openModal}
				/>
				}
				{withoutClose
				&& <DashboardText
					logout
					onClick={this.handleLogout}
				>
					Sair
				</DashboardText>
				}
				<DashboardText>
					Olá, { }
					{this.state.user.charAt(0).toUpperCase() + this.state.user.slice(1).toLowerCase()}
				</DashboardText>
				{this.state.isRedirect && <Redirect exact to="/" />}
			</Container>
		);
	}
}

Header.defaultProps = {
	strokeColor: '#d8998a',
};

export default Header;
