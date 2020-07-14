// Libs
import React, { useEffect } from 'react';
import styled from 'styled-components';

import Quagga from 'quagga';

// Services
import { validateIsbn } from '../services/barcode';

// Images
import Logo from '../assets/aa.png';

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
`;

const ScanMarker = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const MarkerDesc = styled.p`
	font-size: 1rem;
	color: #fff;
`;

function Scanner() {
	let scannerAttemps = 0;

	const onDetected = (result) => {
		Quagga.offDetected(onDetected);

		console.log('result', result);

		const isbn = result.codeResult.code;

		if (validateIsbn(isbn)) {
			alert(`ISBN válido ${isbn}`);
		}

		if (scannerAttemps >= 5) {
			alert('não foi possível ler o código. tente novamente');
		}

		scannerAttemps++;
		Quagga.onDetected(onDetected);

		console.log('isbn', isbn);
	};

	useEffect(() => {
		if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia) {
			Quagga.init(
				{
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
				},
				(err) => {
					if (err) {
						console.log(err);
						alert('erro ao abrir a camera do dispositivo');
						return;
					}
					Quagga.start();
				},
			);
			Quagga.onDetected(onDetected);
		}
	}, []);

	return (
		<>
			<Video id="video" />
			<Container>
				<ScanMarker>
					<img
						src={Logo}
						alt="logo"
						width="260"
						height="260"
					/>
					<MarkerDesc>Aponte para o codigo de barras do medicamento.</MarkerDesc>
				</ScanMarker>
			</Container>
		</>
	);
}

export default Scanner;
