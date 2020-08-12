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
`;

const LogoIcon = styled.img`
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
`;

const DashboardText = styled.p`
	padding-left: ${(props) => (props.username && '1rem')};
	width: ${(props) => (props.username && '100%')};
	display: ${(props) => (props.username && 'flex')};;
	justify-content: ${(props) => (props.username && 'flex-start')};
	align-items: ${(props) => (props.username && 'center')};
	color: #D8998A;
	font-size: ${(props) => (props.username ? '.90rem' : '1rem')};
	font-family: 'Overpass', Bold;
	text-decoration: none;
	font-weight: 800;
	cursor: ${(props) => (!props.username && 'pointer')};
	white-space:  ${(props) => (!props.username && 'nowrap')};

	@media(min-width: 1024px) {
		margin-right: 2.5rem;
	}

	@media(min-width: 1440px) {
		margin-right: 5.5rem;
	}
`;

class Header extends Component {
	state = {
		isRedirect: false,
		user: '',
	}

	componentDidMount() {
		this.getUser();
	}

	getUser = async () => {
		try {
			const user = await localStorage.getItem('username');

			this.setState({
				user,
			});
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
				&& (
					<>
						<DashboardText username>
							Olá, { }
							{this.state.user.charAt(0).toUpperCase() + this.state.user.slice(1).toLowerCase()}
						</DashboardText>
						<DashboardText
							onClick={this.handleLogout}
						>
						Sair
						</DashboardText>
					</>
				)
				}
				{this.state.isRedirect && <Redirect exact to="/" />}
			</Container>
		);
	}
}

Header.defaultProps = {
	strokeColor: '#d8998a',
};

export default Header;
