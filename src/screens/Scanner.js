/* eslint-disable no-mixed-spaces-and-tabs */
// Libs
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink, Redirect } from 'react-router-dom';
import Quagga from 'quagga';

// Services
import { validateIsbn } from '../services/barcode';

// Components
import Header from '../components/Header';

// Images
import MarkerIcon from '../assets/markerIcon.svg';
import BackIcon from '../assets/back.svg';

// Styles
const Video = styled.div`
	video {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		min-width: 100%;
		min-height: 100%;
	}

	canvas {
		display: none;
	}
`;

const ButtonBack = styled(NavLink)`
	position: fixed;
	left: 0;
	top: 0;
	margin-top: .8rem;
	position: fixed;
	z-index: 1;

	img {
		width: 2.3rem;
	}
`;

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	min-width: 100%;
	min-height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: 'Overpass', Regular;
`;

const ScanMarker = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ContainerDigitBarCode = styled.div`
	width: 20%;
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(255, 255, 255, 0.8);
	border-top-left-radius: 6px;
	border-top-right-radius: 6px;

	@media(max-width: 648px) {
		width: 100%;
	}
`;

const ButtonDigitBarCode = styled.button`
	width: 20rem;
	height: 3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 1rem;
	font-weight: bold;
	text-decoration: none;
	border: none;
	border-radius: 50px;
	box-shadow: 2px 2px 2px #888888;
	cursor: pointer;
	background: #49E5D6;
`;

const ContainerModalBoilerPlate = styled.div`
	z-index: 1;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	min-width: 100%;
	min-height: 100%;
	display: ${(props) => (props.display ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
`;

const ContentModalBarCode = styled.div`
	width: 100%;
	height: 100vh;
	background: #fff;
`;

const WrapperModalBarCode = styled.div`
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const InputBarCode = styled.input`
	margin-bottom: 2rem;
	width: 20rem;
	height: 3.5rem;
	text-align: center;
	color: #000;
	font-size: 1rem;
	font-weight: medium;
	text-decoration: none;
	border: none;
	border-radius: 50px;
	background: #EDEDED;
`;

const Button = styled.button`
	margin-bottom: ${(props) => (props.addInfo && '2rem')};
	width: 20rem;
	height: 3.5rem;
	text-align: center;
	color: #fff;
	font-size: 1rem;
	font-family: 'Overpass', Bold;
	font-weight: 800;
	text-transform: ${(props) => (props.addInfo ? 'null' : 'uppercase')};
	text-decoration: none;
	border: none;
	border-radius: 50px;
	box-shadow: 2px 2px 2px #888888;
	background: ${(props) => (props.addInfo ? '#D8998A' : '#49E5D6')};
	cursor: pointer;
`;

const ModalDetails = styled.div`
	flex: 1;
	height: 100vh;
	background: #fff;
`;

const ContentModalDetails = styled.div`
	margin-top: 3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const TextModalDetails = styled.h2`
	margin-bottom: ${(props) => (props.title && '1rem')};
	font-size: ${(props) => (props.title ? '1.5rem' : '1.2rem')};
	font-weight: 800;
	font-family: 'Overpass', Bold;
`;

const ContainerIbsnCode = styled.div`
	margin-bottom: 5rem;
	padding: 3rem;
	border: 3px solid #49E5D6;
	border-radius: 10px;
`;

const ErrorMessage = styled.span`
	margin-top: 1rem;
  color: red;
  font-size: .8rem;
  font-weight: 600;
  font-family: "Overpass", Bold;
`;

const animation = keyframes`
  0%{
    background-position: -400px 0;
  }
  100%{
    background-position: 400px 0;
  }
`;

const TextLoading = styled.h2`
	margin-bottom: 1rem;
	color: #fff;
	font-size: 1.5rem;
  font-weight: 600;
	font-family: "Overpass", Regular;
`;

const Loading = styled.span`
  margin-bottom: 1.313rem;
  width: 300px;
  height: 3.5px;
  border-radius: 4px;
	animation-duration:  3s;
	animation-fill-mode: forwards;
	animation-iteration-count: infinite;
	animation-name: ${animation};
	animation-timing-function: linear;
	background: linear-gradient(to right, #38c7ba 0%, #fff 100%, #38c7ba 0% );
	background-size: 1000px 104px;
	overflow: hidden;
`;

class Scanner extends Component {
	state = {
		modalOpenDetails: false,
		modalOpenBarCode: false,
		modalOpenLoading: false,
		valueCode: '',
		error: null,
	}

	componentDidMount() {
  	if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia) {
  		Quagga.init({
  			inputStream: {
  				name: 'Live',
  				type: 'LiveStream',
  				target: document.querySelector('#video'),
  				constraints: {
  					facingMode: 'environment',
  				},
  			},
  			numOfWorkers: 1,
  			locate: true,
  			decoder: {
  				readers: ['code_128_reader', 'ean_reader', 'ean_8_reader',
  					'code_39_reader', 'code_39_vin_reader', 'codabar_reader',
  					'upc_reader', 'upc_e_reader', 'i2of5_reader',
  					'2of5_reader', 'code_93_reader',
  				],
  			},
  		}, (err) => {
  			if (err) {
  				console.log(err);
  				alert('Erro ao tentar abrir a câmera do dispositivo.');
  				return;
  			}
  			Quagga.start();
  		});
  		Quagga.onDetected(this.onDetected);
  	}
	}

	handleOpenBarCodeModal = () => {
		this.setState({
			modalOpenBarCode: !this.state.modalOpenBarCode,
		});
	}

	handleOpenModalLoading = () => {
		this.setState({
			modalOpenLoading: true,
		});

		// if (this.state.modalOpenLoading) {
		// 	this.setState({
		// 		modalOpenLoading: false,
		// 		isRedirect: true,
		// 		redirect: '/addmoreinfo',
		// 	});
		// }
	}

	handleInputBarCode = (event) => {
		this.setState({
			valueCode: event.target.value,
		});
	}

	handleButtonBarCode = async () => {
		if (this.state.valueCode.length === 0) {
			this.setState({
				error: '*Insira o código de barras.',
			});
		} else {
			this.setState({
				error: null,
			});

			const isbn = this.state.valueCode;
			// meu codigo valido 7898927111014

			if (validateIsbn(isbn)) {

				this.handleOpenModalLoading();

				// console.log('modalOpenLoading', this.state.modalOpenLoading)

				// this.setState({
				// 	modalOpenLoading: false,
				// 	isRedirect: true,
				// 	redirect: '/addmoreinfo',
				// });
				// console.log('codigo correto chegou // abrir modal de mais infos');
			} else {
				this.setState({
					error: '*Código inválido.',
				});
			}
		}
	}

	handleModalOpenDetails = () => {
		this.setState({
			modalOpenDetails: !this.state.modalOpenDetails,
		});
	}

  onDetected = (result) => {
  	Quagga.offDetected(this.onDetected);

  	console.log('result', result);

  	const isbn = result.codeResult.code;

  	if (validateIsbn(isbn)) {
  		this.setState({
  			modalOpenDetails: true,
  			isbnCode: isbn,
  		});
  	} else if (result.length >= 5) {
  		alert('Não foi possível ler o código. Digite-o!');
  	}

  	Quagga.onDetected(this.onDetected);
  }

	renderModalLoading = () => (
		<ContainerModalBoilerPlate
			display={this.state.modalOpenLoading}
			style={{
				backgroundColor: '#49E5D6',
				flexDirection: 'column',
			}}
		>
			<TextLoading>Carregando...</TextLoading>
			<Loading />
		</ContainerModalBoilerPlate>
	)

	renderModalDetails = () => (
		<ModalDetails>
			<Header openModal={this.handleModalOpenDetails} />
			<ContentModalDetails>
				<TextModalDetails title>Informação Extraída:</TextModalDetails>
				<ContainerIbsnCode>
					<TextModalDetails>{this.state.isbnCode}</TextModalDetails>
				</ContainerIbsnCode>
				<Button addInfo>Adicionar mais Informações</Button>
				<Button onClick={() => this.setState({ modalOpenDetails: false })}>Cancelar</Button>
			</ContentModalDetails>
		</ModalDetails>
	);

	renderModalBarCode = () => (
		<ContainerModalBoilerPlate
			display={this.state.modalOpenBarCode}
		>
			<ContentModalBarCode>
				<Header openModal={this.handleOpenBarCodeModal} />
				<WrapperModalBarCode>
					<InputBarCode
						type='number'
						placeholder='Digite o codigo de barras...'
						onChange={this.handleInputBarCode}
					/>
					<Button onClick={this.handleButtonBarCode}>concluir</Button>
					{this.state.error && (
						<ErrorMessage>
							{this.state.error}
						</ErrorMessage>
					)}
				</WrapperModalBarCode>
			</ContentModalBarCode>
		</ContainerModalBoilerPlate>
	)

	render() {
		return (
			<>
				<Video id="video" />
				<ButtonBack exact to="/">
					<img src={BackIcon} alt="Voltar" />
				</ButtonBack>
				<Container>
					<ScanMarker>
						<img
							src={MarkerIcon}
							alt="marker space"
							width="320"
							height="260"
						/>
					</ScanMarker>
					<ContainerDigitBarCode>
						<ButtonDigitBarCode
							onClick={this.handleOpenBarCodeModal}
						>
							Se preferir, digite o código de barras
						</ButtonDigitBarCode>
					</ContainerDigitBarCode>
				</Container>
				<ContainerModalBoilerPlate display={this.state.modalOpenDetails}>
					{this.state.modalOpenDetails && this.renderModalDetails()}
				</ContainerModalBoilerPlate>
				{this.state.modalOpenBarCode && this.renderModalBarCode()}
				{this.state.modalOpenLoading && this.renderModalLoading()}
				{/* {this.state.isRedirect && !this.state.modalOpenLoading && <Redirect to={this.state.redirect} />} */}
			</>
		);
	}
}

export default Scanner;
