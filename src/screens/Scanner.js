/* eslint-disable no-mixed-spaces-and-tabs */
// Libs
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Redirect } from 'react-router-dom';
import Quagga from 'quagga';

// Services
import { validateIsbn } from '../services/barcode';

// Components
import Header from '../components/Header';
import ExtractedInf from '../components/ExtractedInf';
import DefaultButton from '../components/DefaultButton';

// Images
import MarkerIcon from '../assets/markerIcon.svg';
import BackIcon from '../assets/backWhite.svg';

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

const ButtonBack = styled.button`
	position: fixed;
	left: 0;
	top: 0;
	margin-top: .8rem;
	position: fixed;
	text-decoration: none;
	background: none;
	border: none;
	outline:none;
	z-index: 1;

	img {
		margin-left: .5rem;
		width: 2.3rem;
	}

	@media(min-width: 768px) {
		img {
			width: 3rem;
		}
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

	img {
		width: 18rem;
	}

	@media(min-width: 768px) {
		img {
			width: 35rem;
		}
	}
`;

const ContainerDigitBarCode = styled.div`
	padding: 0 1rem;
	width: 100%;
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(255, 255, 255, 0.8);
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
	padding: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const InputBarCode = styled.input`
	${'' /* margin-bottom: 2rem; */}
	width: 100%;
	max-width: 20rem;
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

const ErrorMessage = styled.span`
	margin-top: .5rem;
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
		pressed: false,
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
  		}, (error) => {
  			if (error) {
  				console.log(error);
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
			error: '',
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
			error: '',
		});
	}

	handleButtonBarCode = () => {
		const { valueCode, pressed } = this.state;

		this.setState({
			pressed: !pressed,
		});

		if (valueCode.length === 0) {
			this.setState({
				error: '*Insira o Código de Barras.',
			});
		} else {
			this.setState({
				error: null,
			});

			const isbn = valueCode;
			// meu codigo valido 7898927111014
			// 7896112121831
			// 7898927111014

			if (validateIsbn(isbn)) {
				// loading
				this.handleOpenModalLoading();

				// more info modal
				this.setState({
					modalOpenLoading: false,
					isbnCode: valueCode,
					modalOpenBarCode: false,
					modalOpenDetails: true,
				});
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

  	const isbn = result.codeResult.code;

  	if (validateIsbn(isbn)) {
  		this.setState({
  			modalOpenDetails: true,
  			isbnCode: isbn,
  		});
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

	handleCloseModalExactedInfo = () => {
		this.setState({
			modalOpenDetails: false,
		});
	}

	renderModalBarCode = () => (
		<ContainerModalBoilerPlate
			display={this.state.modalOpenBarCode}
		>
			<ContentModalBarCode>
				<Header openModal={this.handleOpenBarCodeModal} history={this.props.history} />
				<WrapperModalBarCode>
					<InputBarCode
						type='number'
						placeholder='Digite o codigo de barras...'
						onChange={this.handleInputBarCode}
					/>
					{this.state.error && (
						<ErrorMessage>
							{this.state.error}
						</ErrorMessage>
					)}
					<DefaultButton
						handleClick={this.handleButtonBarCode}
						text={'Verificar Código'}
						style={{
							margin: '0',
							marginTop: '2rem',
							background: '#49E5D6',
							color: '#fff',
						}}
					/>
					<DefaultButton
						handleClick={this.handleOpenBarCodeModal}
						text={'Voltar para a Leitura de Código'}
						style={{
							margin: '1rem',
							background: '#D8998A',
							color: '#fff',
						}}
					/>
				</WrapperModalBarCode>
			</ContentModalBarCode>
		</ContainerModalBoilerPlate>
	)

	handleBackScreen = () => {
		this.props.history.goBack();
	};

	render() {
		const {
			modalOpenDetails, modalOpenBarCode, modalOpenLoading,
		} = this.state;

		return (
			<>
				<Video id="video" />
				<ButtonBack onClick={this.handleBackScreen}>
					<img src={BackIcon} alt="Voltar" />
				</ButtonBack>
				<Container>
					<ScanMarker>
						<img
							src={MarkerIcon}
							alt="marker space"
						/>
					</ScanMarker>
					<ContainerDigitBarCode>
						<DefaultButton
							handleClick={this.handleOpenBarCodeModal}
							text={'Se preferir, digite o código de barras'}
							style={{
								background: '#49E5D6',
								color: '#fff',
							}}
						/>
					</ContainerDigitBarCode>
				</Container>
				<ContainerModalBoilerPlate display={modalOpenDetails}>
					{modalOpenDetails && (
						<ExtractedInf
							history={this.props.history}
							openModal={this.handleModalOpenDetails}
							code={this.state.isbnCode}
							handleCloseModalExactedInfo={this.handleCloseModalExactedInfo}
						/>
					)}
				</ContainerModalBoilerPlate>
				{modalOpenBarCode && this.renderModalBarCode()}
				{modalOpenLoading && this.renderModalLoading()}
			</>
		);
	}
}

export default Scanner;
