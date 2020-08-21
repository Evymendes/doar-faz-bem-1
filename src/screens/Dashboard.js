/* eslint-disable no-nested-ternary */
// Libs
import React, { useState, useEffect } from 'react';
import {
	useTable, useFilters, useGlobalFilter, useSortBy,
} from 'react-table';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/pt-br';

// Components
import Header from '../components/Header';
import Loading from '../components/Loading';
import ModalDelete from '../components/ModalDelete';
import ModalDetails from '../components/ModalDetails';

// Images
import Med from '../assets/med-colors.svg';
import ToolBox from '../assets/toolbox-colors.svg';
import Search from '../assets/search-colors.svg';

// Styles
const Container = styled.div`
	width: 100%;
	min-height: calc(100vh - 5rem);
	margin-top: 5rem;
	background: #38D5D5;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Buttons = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-flow: row wrap;
	position: relative;
	width: 55vw;

	@media(min-width: 550px) {
		align-items: flex-start;
		justify-content: center;
	}
`;

const Button = styled.div`
	background: #fff;
	margin-top: 1rem;
	width: 100%;
	height: 8.5rem;
	padding: 1rem;
	cursor: pointer;

	box-shadow: 0 0 6px -1px rgba(0,0,0,.15), 0 2px 4px -1px rgba(0,0,0,.25);
	border: 1px solid #f5f5f5;
	border-radius: 10px;
	font: 600 0.9rem 'Overpass', serif;
	color: #38D5D5;
	text-align: center;
	z-index: 1;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	&:nth-child(2) {
		color: #D8998A;
	}

	& img {
		padding: 0.55rem;
		align-self: center;
	}

	@media(min-width: 620px) {
		margin: 0.55rem;
		align-items: flex-start;
		width: 8.5rem;
		height: 8.5rem;
	}
`;

const Redirect = (history, link) => {
	history.push({
		pathname: `${link}`,
	});
};

function Dashboard(props) {
	return (
		<Container>
			<Header withoutClose={true} isWhite={true}/>
				<Buttons>
					<Button onClick={() => Redirect(props.history, '/medicaments')}>
						<img src={ToolBox}></img>
						<span>Visualizar Medicamentos</span>
					</Button>
					<Button onClick={() => Redirect(props.history, '/scanner')}>
						<img src={Med}></img>
						<span>Adicionar Medicamentos</span>
					</Button>
					<Button onClick={() => Redirect(props.history, '/searchMedicament')}>
						<img src={Search}></img>
						<span>Pesquisar por preço</span>
					</Button>
				</Buttons>
		</Container>
	);
}

export default Dashboard;
