// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import QrReader from 'react-qr-reader';
import { NavLink } from 'react-router-dom';

//Assets
import MarkerIcon from '../assets/markerIconQr.svg';
import BackIcon from '../assets/back.svg';

// Styles
const Container = styled.div`
	width: 100%;
	height: 100vh;
`;

const ButtonBack = styled(NavLink)`
	margin-top: 1rem;
	position: fixed;
	z-index: 1;

	img {
		width: 2.3rem;
	}
`;

const Video = styled.div`
	section {
		padding: 0;
		height: 100vh;
	}

	div {
		display: none;
	}

	video {
		height: 100vh;
	}
`;

const ScanMarker = styled.span`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: absolute;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	img {
		width: 14rem;
	}
`;

const Footer = styled.div`
	width: 20%;
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(255, 255, 255, 0.8);
	border-top-left-radius: 6px;
	border-top-right-radius: 6px;

	@media(max-width: 648px) {
		position: absolute;
		left: 0;
	 	right: 0;
    bottom: 0;
		width: 100%;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
`;

const Button = styled.button`
	width: 20rem;
	height: 3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 1rem;
	font-weight: bold;
	font-family: Overpass, Regular;
	text-decoration: none;
	border: none;
	border-radius: 50px;
	box-shadow: 2px 2px 2px #888888;
	cursor: pointer;
	background: #49E5D6;

	@media(max-width: 320px) {
		width: 19rem;
		font-size: .9rem;
	}
`;

class QrCode extends Component {
	state = {
		result: '',
	}

	handleScan = (data) => {
		if (data) {
			this.props.history.push({
				pathname: '/extractedInf',
				state: {
					result: data,
				},
			});
		}
	}

	handleOpenScannerScreen = () => {
		this.props.history.push({
			pathname: '/scanner',
		});
	}

	handleError = (err) => {
		console.error(err);
	}

	render() {
		return (
			<Container>
				<ButtonBack exact to="/">
					<img src={BackIcon} alt="Voltar" />
				</ButtonBack>
				<Video>
					<QrReader
						delay={100}
						onError={this.handleError}
						onScan={this.handleScan}
					/>
					<ScanMarker>
						<img
							src={MarkerIcon}
							alt="marker space"
						/>
					</ScanMarker>
				</Video>
				<Footer>
					<Button onClick={this.handleOpenScannerScreen}>Se preferir, escaneie o código de barras</Button>
				</Footer>
			</Container>
		);
	}
}

export default QrCode;
