/* eslint-disable class-methods-use-this */
// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

// Images
import Logo from '../assets/logo.jpg';
// import Logo from '../assets/logo-doar-faz-bem.svg';
import NotificationIcon from '../assets/bell.svg';

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
	color: #D8998A;
	font-size: ${(props) => (props.username ? '.90rem' : '1rem')};
	font-family: 'Overpass', Bold;
	text-decoration: none;
	font-weight: 800;
	white-space: nowrap;

	@media(min-width: 768px) {
		margin: ${(props) => props.username && '1rem'};
		width: ${(props) => (!props.username && '4.5rem')};
	}

	@media(min-width: 1440px) {
		margin: ${(props) => props.username && '1rem'};
		width: ${(props) => (!props.username && '6.5rem')};
	}
`;

const ContainerUser = styled.div`
	margin-left: 1rem;
	width: 90%;
`;

const WrapperUser = styled.div`
	@media(min-width: 768px) {
		width: max-content;
		max-width: 27%;
		display: flex;
		background: #c4c4c426;
		align-items: center;
		justify-content: flex-end;
		height: 3rem;
		padding: 1rem;
		border-radius: 6px;
		box-shadow: 5px 4px 9px 0px #c4c4c44
	}

	@media(min-width: 1440px) {
		max-width: 15%;
	}
`;

const UserNotificationIcon = styled.img`
	display: none;

	@media(min-width: 768px) {
		margin-right: 1rem;
		display: flex;
		cursor: pointer;
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
						<ContainerUser>
							<WrapperUser>
								<DashboardText username>
									Olá, { }
									{this.state.user.charAt(0).toUpperCase() + this.state.user.slice(1).toLowerCase()}
								</DashboardText>
								<UserNotificationIcon src={NotificationIcon} alt="notifications" />
							</WrapperUser>
						</ContainerUser>
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
