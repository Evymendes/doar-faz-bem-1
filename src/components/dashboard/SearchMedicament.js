/* eslint-disable class-methods-use-this */
// Libs
import React, { Component } from 'react';
import styled from 'styled-components';

import DefaultButton from '../DefaultButton';

import { getByMedicament } from '../../services/api';

// Components
import Header from '../Header';

// Styles
const Container = styled.div`
	z-index: 1;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	min-width: 100%;
	min-height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Content = styled.div`
	width: 100%;
	height: 100vh;
	background: #fff;

	@media (orientation: landscape) {
		overflow-y: scroll;

		::-webkit-scrollbar {
			width: 4px;
		}
		::-webkit-scrollbar-track {
			background: #FFF;
		}
		::-webkit-scrollbar-thumb {
			background: #FFF;
		}
		::-webkit-scrollbar-thumb:hover {
			background: #FFF;
		}
	}
`;

const ContentWrapper = styled.div`
	height: 100vh;
	padding: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	@media(min-width: 768px) {
		height: 85vh;
	}
`;

const InputBarCode = styled.input`
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

class SearchMedicament extends Component {
	state = {
		searchValue: '',
		error: undefined,
	}

	fetchingData = async () => {
		try {
			const medicament = this.state.searchValue.toUpperCase();

			const response = await getByMedicament(medicament);
			const responseData = response.data.results;

			if (responseData.length === 0) {
				this.setState({
					error: 'Medicamento não encontrado na tabela da Anvisa.',
				});
				return;
			}

			this.props.history.push({
				pathname: '/medicamentInfo',
				state: {
					result: responseData,
				},
			});
		} catch (error) {
			console.log('error', error);
			console.log('error response', error.response);
		}
	}

	handleButtonSearch = () => {
		if (!this.state.searchValue) {
			this.setState({
				error: '*Insira o nome do medicamento.',
			});
		} else {
			this.fetchingData();
		}
	}

	handleInputSearch = (event) => {
		this.setState({
			searchValue: event.target.value,
		});
	}

	handleGoBack = () => {
		this.props.history.push({
			pathname: '/dashboard',
		});
	}

	render() {
		const { error } = this.state;

		return (
			<Container>
				<Content>
					<Header isWhite openModal={this.handleGoBack}/>
					<ContentWrapper>
						<InputBarCode
							type='text'
							placeholder='Digite o nome do medicamento...'
							onChange={this.handleInputSearch}
						/>
						{error && (
							<ErrorMessage>
								{error}
							</ErrorMessage>
						)}
						<DefaultButton
							margin= '2rem 1rem 0'
							handleClick={this.handleButtonSearch}
							text={'Pesquisar Medicamento'}
						/>
					</ContentWrapper>
				</Content>
			</Container>
		);
	}
}

export default SearchMedicament;
