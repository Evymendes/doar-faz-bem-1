/* eslint-disable class-methods-use-this */
// Libs
import React, { Component } from 'react';
import styled from 'styled-components';

import { getById } from '../services/api';

// Components
import Header from './Header';

//Styled
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
`;

const TextModalDetails = styled.h2`
	margin-bottom: ${(props) => (props.title && '1rem')};
	font-size: ${(props) => (props.title ? '1.5rem' : '1.2rem')};
	font-weight: 800;
	font-family: 'Overpass', Bold;
	text-align: center;
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

	@media(max-width: 320px) {
		width: 18rem;
	}
`;

class ExtractedInf extends Component {
	componentDidMount() {
		this.fetchingData();
	}

	fetchingData = async () => {
		try {
			const response = await getById(this.props.code);
			const data = response.data.results[0] || this.props.code;

			this.setState({
				medicament: {
					code: data.EAN_1,
					name: data.PRODUTO,
					substance: data.SUBSTANCIA,
					laboratory: data.LABORATORIO,
					description: data.APRESENTACAO,
				},
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
					<Button
						addInfo
						onClick={this.handleRedirectScreen}
					>
						Adicionar mais Informações
					</Button>
					<Button
						onClick={this.props.handleCloseModalExactedInfo}
					>
						Cancelar
					</Button>
				</ContentModalDetails>
			</ModalDetails>
		);
	}
}

export default ExtractedInf;
