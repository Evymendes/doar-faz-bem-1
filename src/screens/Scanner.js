// Libs
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import Quagga from 'quagga';

// Services
import { validateIsbn } from '../services/barcode';

// Components
import Header from '../components/Header';

// Images
import MarkerIcon from '../assets/aa.png';

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
	font-family: Overpass, Regular;
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

const ContainerModalDetails = styled.div`
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

const ContentModalDetails = styled.div`
	width: 100%;
	height: 100vh;
	background: #fff;
`;

const WrapperModalDetails = styled.div`
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

const ButtonBarCode = styled.button`
	margin-bottom: ${(props) => (props.addInfo && '1rem')};
	width: 20rem;
	height: 3.5rem;
	text-align: center;
	color: #fff;
	font-size: 1rem;
	font-weight: bold;
	text-transform: uppercase;
	text-decoration: none;
	border: none;
	border-radius: 50px;
	box-shadow: 2px 2px 2px #888888;
	background: ${(props) => (props.addInfo ? '#D8998A' : '#49E5D6')};
	cursor: pointer;
`;

const ContainerModal = styled.div`
	width: 25%;
	height: 25%;
	display: flex;
	align-items: center;
	flex-direction: column;
	background: #0000ff;
`;

const ContentModal = styled.div`
	flex: 1;
	background: #fff;
`;

const ContainerIbsnCode = styled.div`
	margin-bottom: 4rem;
	padding: 3rem;
	border: 2px solid #49E5D6;
`;

const ErrorMessage = styled.span`
	margin-top: 1rem;
  color: red;
  font-size: .8rem;
  font-family: "Overpass", Bold;
  font-weight: 600;
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
	font-family: "Overpass", Regular;
  font-weight: 600;
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
	}

	handleInputBarCode = (event) => {
		this.setState({
			valueCode: event.target.value,
		});
	}

	handleButtonBarCode = () => {
		if (this.state.valueCode.length === 0) {
			this.setState({
				error: '*Insira o código de barras.',
			});
		} else {
			this.setState({
				error: null,
			});

			this.handleOpenModalLoading();
		}
	}

  onDetected = (result) => {
  	let scannerAttemps = 0;
  	Quagga.offDetected(this.onDetected);

  	console.log('result', result);

  	const isbn = result.codeResult.code;

  	if (validateIsbn(isbn)) {
  		this.setState({
  			modalOpenDetails: true,
  			isbnCode: isbn,
  		});

  		alert(`ISBN válido ${isbn}`);
  	} else if (scannerAttemps >= 5) {
  		alert('Não foi possível ler o código. Tente novamente');
  	}

  	scannerAttemps++;
  	Quagga.onDetected(this.onDetected);
	}

	renderModalLoading = () => (
		<ContainerModalDetails
			display={this.state.modalOpenLoading}
			style={{
				backgroundColor: '#49E5D6',
				flexDirection: 'column',
			}}
		>
			<TextLoading>Carregando...</TextLoading>
			<Loading />
		</ContainerModalDetails>
	)

	renderModalDetails = () => (
		<ContentModal>
			<p>Informação Extraída</p>
			<ContainerIbsnCode>
				<p>{this.state.isbnCode}</p>
			</ContainerIbsnCode>
			<ButtonBarCode addInfo>Adicionar Mais Informações</ButtonBarCode>
			<ButtonBarCode>concluir</ButtonBarCode>
		</ContentModal>
	);

	renderModalBarCode = () => (
		<ContainerModalDetails
			display={this.state.modalOpenBarCode}
		>
			<ContentModalDetails>
				{/* <ModalDetailsHeader>
					<div
						style={{
							width: '4rem',
							height: '4rem',
							borderRadius: '50%',
							background: '#000',
							boxShadow: '5px 5px 6px #888888',
						}}
					/>
					<img
						src={CloseIcon}
						alt='Fechar'
						onClick={this.handleOpenBarCodeModal}
					/>
				</ModalDetailsHeader> */}
				<Header barCodeModal={this.handleOpenBarCodeModal} />
				<WrapperModalDetails>
					<InputBarCode
						type='text'
						placeholder='Digite o codigo de barras...'
						onChange={this.handleInputBarCode}
					/>
					<ButtonBarCode onClick={this.handleButtonBarCode}>concluir</ButtonBarCode>
					{this.state.error && (
						<ErrorMessage>
							{this.state.error}
						</ErrorMessage>
					)}
				</WrapperModalDetails>
			</ContentModalDetails>
		</ContainerModalDetails>
	)

	render() {
		return (
			<>
				<Video id="video" />
				<Container>
					<ScanMarker>
						<img
							src={MarkerIcon}
							alt="logo"
							width="260"
							height="260"
						/>
					</ScanMarker>
					<ContainerDigitBarCode>
						<ButtonDigitBarCode onClick={this.handleOpenBarCodeModal}>Digitar Codigo de Barras</ButtonDigitBarCode>
					</ContainerDigitBarCode>
				</Container>
				<ContainerModalDetails display={this.state.modalOpenDetails}>
					{this.state.modalOpenDetails && this.renderModalDetails()}
				</ContainerModalDetails>
				{this.state.modalOpenBarCode && this.renderModalBarCode()}
				{this.state.modalOpenLoading && this.renderModalLoading()}
			</>
		);
	}
}

export default Scanner;
