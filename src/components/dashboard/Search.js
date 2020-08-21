// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../Header';
import DefaultButton from '../DefaultButton';

const Container = styled.div`
	/* width: 100%;
	height: 100%; */
	flex: 1;
`;

const Content = styled.div`
	/* width: 100%;
	height: 100vh; */
	background: #FFF;
	height: calc(100vh - 96px);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

// const Content = styled.div`
// 	height: 85vh;
// 	padding: 1rem;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	flex-direction: column;
// `;

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

	}

	render() {
		return (
			<Container
				display={this.state.modalOpenBarCode}
			>
				<Header openModal={this.handleOpenBarCodeModal} history={this.props.history} />
				<Content>
					<InputBarCode
						type='number'
						placeholder='Digite o código de barras...'
						onChange={this.handleInputBarCode}
					/>
					{this.state.error && (
						<ErrorMessage>
							{this.state.error}
						</ErrorMessage>
					)}
					<DefaultButton
						margin='1rem 0'
						handleClick={this.handleButtonBarCode}
						text={'Verificar Código'}
					/>
					<DefaultButton
						margin='0'
						background='#D8998A'
						backgroundHover='#ce9385'
						handleClick={this.handleOpenBarCodeModal}
						text={'Voltar para a Leitura de Código'}
					/>
				</Content>
			</Container>
		);
	}
}

export default SearchMedicament;
