/* eslint-disable class-methods-use-this */
// Libs
import React, { Component } from 'react';
import styled from 'styled-components';

import DefaultButton from './DefaultButton';

import { getById } from '../services/api';

// Components
import Header from './Header';

// Styles
const ModalDetails = styled.div`
	flex: 1;
	height: 100vh;
	background: #fff;
`;

const ContentModalDetails = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 75vh;
`;

const ContainerIbsnCode = styled.div`
	width: 20rem;
	margin-bottom: 5rem;
	padding: 3rem;
	border: 3px solid #49E5D6;
	border-radius: 10px;

	@media(max-width: 320px) {
		padding: 3rem 0;
		width: 18rem;
	}

	@media(max-width: 425px) {
		margin-bottom: 3rem;
	}
`;

const TextModalDetails = styled.h2`
	margin-bottom: ${(props) => (props.title && '1rem')};
	font-size: ${(props) => (props.title ? '1.5rem' : '1.2rem')};
	font-weight: 800;
	font-family: 'Overpass', Bold;
	text-align: center;

	@media(max-width: 425px) {
		font-size: 1.2rem;
	}
`;

class ExtractedInf extends Component {
	componentDidMount() {
		this.fetchingData();
	}

	fetchingData = async () => {
		try {
			const response = await getById(this.props.code);
			const data = response.data.results[0] || {EAN_1: this.props.code};

			this.setState({
				medicament: data,
			});
		} catch (error) {
			console.log('error', error);
			console.log('error.response', error.response);
		}
	};

	handleRedirectScreen = () => {
		this.props.history.push({
			pathname: '/addmoreinfo',
			state: {
				result: this.state.medicament,
			},
		});
	}

	render() {
		return (
			<ModalDetails>
				<Header openModal={this.props.openModal} history={this.props.history} />
				<ContentModalDetails>
					<TextModalDetails title>Informação Extraída:</TextModalDetails>
					<ContainerIbsnCode>
						<TextModalDetails>{this.props.code}</TextModalDetails>
					</ContainerIbsnCode>
					<DefaultButton
						handleClick={this.handleRedirectScreen}
						text={'Adicionar mais Informações'}
						style={{
							margin: '1rem',
							width: '90%',
							background: '#49E5D6',
							color: '#fff',
						}}
					/>
					<DefaultButton
						handleClick={this.props.handleCloseModalExactedInfo}
						text={'Voltar para Leitura de Código'}
						style={{
							width: '90%',
							background: '#D8998A',
							color: '#fff',
						}}
					/>
				</ContentModalDetails>
			</ModalDetails>
		);
	}
}

export default ExtractedInf;
