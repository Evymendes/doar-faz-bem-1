/* eslint-disable class-methods-use-this */
// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

// Images
import Logo from '../assets/logo-doar-faz-bem.svg';
import NotificationIconOff from '../assets/bell.svg';
import NotificationIconOn from '../assets/bell-2.svg';

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
	cursor: ${(props) => (!props.username && 'pointer')};

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
		box-shadow: 5px 4px 9px 0px #c4c4c44;
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

const ContainerNotifications = styled.div`
	position: relative;
`;

const WrapperNotifications = styled.div`

	@media(min-width: 768px) {
		position: absolute;
		margin-top: .8rem;
    width: 12rem;
		max-height: 10rem;
		background: #B4E4E6;
		border-radius: 13px;
		z-index: 6;
		overflow-y: scroll;
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);

		::-webkit-scrollbar {
			width: 4px;
			height: 2px;
		}
		::-webkit-scrollbar-track {
			background: transparent;
		}
		::-webkit-scrollbar-thumb {
			background: transparent;
		}
		::-webkit-scrollbar-thumb:hover {
			background: transparent;
		}

	}
`;

const TextNotification = styled.p`
	@media(min-width: 768px) {
		padding: .8rem;
		font-size: .88rem;
		font-family: 'Overpass',Regular;
		width: 100%;
		flex-wrap: wrap;
		border-bottom: ${(props) => props.isNotification && '0.1px solid #fff'} ;

		span {
			font-weight: bold;

			p {
				font-weight: normal;

				span {
					color: red;
				}
			}
		}
	}
`;

const ContainerNotificationsArrow = styled.div`
	@media(min-width: 768px) {
		position: absolute;
		left: 6.9rem;
    top: 0rem;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-bottom: 13px solid #B4E4E6;
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

	renderNotifications = (item) => {
		const expiredMedicine = [];

		item.vanquished.map((item) => {
			expiredMedicine.push({ ...item, expirationTime: 0 });
		});
		item.expirationTwoMonths.map((item) => {
			expiredMedicine.push({ ...item, expirationTime: 1 });
		});
		item.expirationThirtyDays.map((item) => {
			expiredMedicine.push({ ...item, expirationTime: 2 });
		});

		return expiredMedicine.map((med, index) => {
			const isLast = index !== expiredMedicine.length - 1;
			const isSingular = med.expirationTime === 1 ? 'mês' : 'meses';

			return (
				<TextNotification key={item.objectId} isNotification={isLast}>
					O medicamento { }
					<span expirationDate={med.expirationTime === 0}>
						{(med.PRODUTO.charAt(0).toUpperCase() + med.PRODUTO.slice(1).toLowerCase()) || '-'} { }
						{med.expirationTime === 0 ? (
							<p>está <span>vencido</span></p>
						) : (
							<p><span>vencerá</span> daqui a {med.expirationTime} {isSingular}.</p>
						)}
					</span>
				</TextNotification>
			);
		});
	}

	render() {
		const {
			withoutClose, strokeColor, openModal, handleOpenNotifications, isOpenNotification, isNotification,
			isExpiredMedicine,
		} = this.props;

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
										Olá, {}
										{this.state.user.charAt(0).toUpperCase() + this.state.user.slice(1).toLowerCase()}
									</DashboardText>
									{isNotification ? (
										<UserNotificationIcon
											src={NotificationIconOn}
											alt="com notificação"
											onClick={handleOpenNotifications}
										/>
									) : (
										<UserNotificationIcon
											src={NotificationIconOff}
											alt="sem notificação"
											onClick={handleOpenNotifications}
										/>
									)}
								</WrapperUser>
								{withoutClose && isOpenNotification && (
									<ContainerNotifications>
										<ContainerNotificationsArrow />
										<WrapperNotifications>
											{isNotification
												? isExpiredMedicine && this.renderNotifications(isExpiredMedicine)
												: <TextNotification>Você não possui medicamentos à vencer.</TextNotification>
											}
										</WrapperNotifications>
									</ContainerNotifications>
								)}
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
