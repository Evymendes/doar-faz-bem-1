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
import SelectMoreIcon from '../assets/plus.svg';
import SelectMinusIcon from '../assets/minus.svg';
import searchIcon from '../assets/search.svg';

// Services
import { getAllMedicaments } from '../services/api';

// Styles
const Container = styled.div`
	width: 100%;
	max-height: 100%;

	@media(min-width: 768px) {
		max-height: 75vh;
	}

	@media(min-width: 1024px) {
		max-height: 90vh;
	}
`;

const ContainerSearch = styled.div`
	padding-top: 1rem;
	padding-bottom: 2rem;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	@media(min-width: 1024px) {
		width: 45%;
	}

	@media(min-width: 1440px) {
		width: 32%;
	}
`;

const TitleSearch = styled.p`
	display: none;

	@media(min-width: 1024px) {
		display: flex;
		color: #D8998A;
		font-size: 1.3rem;
		padding-right: 1rem;
		font-family: 'Overpass', bold;
		font-weight: 900;
	}
`;

const ContainerInputSearch = styled.div`
	padding-left: 1.5rem;
	display: flex;
	width: 20rem;
	height: 3.5rem;
	border: none;
	border-radius: 50px;
	background-color: #EDEDED;

	@media(min-width: 320px) {
		margin: 0 1rem;
	}

	@media(min-width: 768px) {
		margin: 0;
		width: 25rem;
	}

	@media(min-width: 1024px) {
		padding: 0 1.5rem 0 1.5rem;
		width: 100%;
	}

	@media(min-width: 1440px) {
		padding: 0 1.5rem 0 1.5rem;
	}

`;

const InputSearch = styled.input`
	width: 85%;
	color: #404040;
	font-size: .90rem;
	font-weight: bold;
	background: transparent;
	border: none;
	outline: none;

	@media(min-width: 1024px) {
		width: 90%;
	}
`;

const WrapperTable = styled.div`
	width: 100%;

	@media(min-width: 1024px) {
		height: 85vh;
		display: flex;
		justify-content: center;
	}
`;

const Table = styled.table`
	max-width: 100%;
  width: 100%;
	border-spacing: 0;
`;

const ContainerTable = styled.div`
	@media(min-width: 1024px) {
		width: 90%;
	}
`;

const ContentTable = styled.div`

	@media(min-width: 1024px) {
		max-height: 70%;
		overflow-y: scroll;

		::-webkit-scrollbar {
			width: 10px;
			}
			::-webkit-scrollbar-track {
			background: #fff;
			}
			::-webkit-scrollbar-thumb {
				background: #dfb4a9;
			}
			::-webkit-scrollbar-thumb:hover {
				background: #D8998A;
			}
		}
`;

const ContainerTableHeader = styled.div`
	display: flex;

	@media(min-width: 1024px) {
		padding-bottom: 1rem;
		align-items: center;
    justify-content: space-between;
	}
`;

const TableHeaderTitle = styled.h2`
	display: none;

	@media(min-width: 1024px) {
		padding-left: .7rem;
		display: flex;
		font-size: 1.8rem;
		color: #D8998A;
		white-space: nowrap;
		font-weight: 900;
		font-family: 'Overpass', Bold;
	}
`;

const Thead = styled.thead`
	display: none;

	@media (min-width: 1024px) {
		display: flex;
		text-align: left;
	}
`;

const Tr = styled.tr`
	margin: ${(props) => (props.lastOneMob && '0 0 8rem 0')};
	padding: 1rem 1rem 13rem 1rem;
	position: relative;
	height: 2.3rem;
	display: flex;
	flex-wrap: wrap;
	cursor: pointer;

	&:nth-child(even) {
    background-color: #fff;
  }
	&:nth-child(odd) {
    background-color: #B4E4E6;
	}

	@media(min-width: 768px) {
		margin: ${(props) => (props.lastOneMob && '0 0 6rem 0')};
		padding: 1rem 1rem 11rem 1rem;
	}

	@media(min-width: 1024px) {
		margin: ${(props) => (props.lastOneMob && '0 0 1rem 0')};
		padding: 0;
		flex-wrap: initial;
		height: 2.8rem;
		min-height: 2.8rem;
	}
`;

const TableTitle = styled.th`
	display: none;

	@media(min-width: 1024px) {
		position: sticky;
		top: 0;
		z-index: 5;
		padding: .25rem;
		padding-left: 0.7rem;
		width: 25%;
		display: flex;
		color: #fff;
		align-items: center;
		font-size: 1rem;
		font-family: 'Overpass', Regular;
		background-color: #D8998A;
		white-space: nowrap;
	}
`;

const ContainerTableTitleMob = styled.span`
	min-width: 40%;
	padding-right: 2rem;
	padding-bottom: 0.5rem;
	display: flex;
	flex-direction: column;

	@media (min-width: 1024px) {
		display: none;
	}
`;

const TableTitleMob = styled.th`
	display: flex;
	color: #D8998A;
	font-size: 1rem;
	font-family: 'Overpass', Regular;

	@media(min-width: 1024px) {
		display: none;
	}
`;

const TableList = styled.td`
	padding: 0.5rem 0;
	display: flex;
	width: 100%;
	color: #404040;
	font-size: 0.85rem;
	font-family: "Overpass", Light;

	@media (min-width: 768px) {
		padding: .25rem;
		font-size: 0.95rem;
		width: 100%;
	}

	@media(min-width: 1024px) {
		width: 25%;
		align-items: center;
	}
`;

const TextNoMedicament = styled.h2`
	padding-top: 10rem;
	display: flex;
	justify-content: center;
	color: #D8998A;
	font-size: 1.2rem;
	font-family: "Overpass", Bold;
	font-weight: 600;

	@media(min-width: 768px) {
		font-size: 1.5rem;
	}
`;

const ButtonMoreMob = styled.img`
	position: absolute;
	right: 15px;
	width: 1.5rem;
	display: flex;

	@media(min-width: 1024px) {
		align-self: center;
	}
`;

const ContainerButton = styled.div`
	padding: 0 1rem;
	position: ${(props) => (!props.medDetails && 'fixed')};;
	bottom: ${(props) => (!props.medDetails && '0')};
	width: 100%;
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => (props.medDetails ? '#D8998A' : '#fff')};
`;

const ButtonAddMed = styled.button`
	width: 20rem;
	height: 3.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 1rem;
	font-weight: bold;
	text-decoration: none;
	border: none;
	border-radius: 50px;
	background-color: #D8998A;
	box-shadow: 2px 2px 2px #888888;
	cursor: pointer;
`;

const formatDate = (date) => moment(date).locale('pt-br').format('MM/DD/YYYY');

const columns = [
	{
		Header: 'Medicamento',
		accessor: 'PRODUTO',
	},
	{
		Header: 'Código',
		accessor: 'EAN_1',
	},
	{
		Header: 'Validade',
		accessor: 'DATA_EXPIRACAO.iso',
	},
	{
		Header: 'Classe Terapêutica',
		accessor: 'CLASSE_TERAPEUTICA',
	},
	{
		Header: 'Substância',
		accessor: 'SUBSTANCIA',
	},
	{
		Header: 'Laboratório',
		accessor: 'LABORATORIO',
	},
	{
		Header: 'Embalagem Aberta?',
		accessor: (d) => (d.EMBALAGEM_ABERTA ? 'Sim' : 'Não'),
	},
	{
		Header: 'Apresentação',
		accessor: 'APRESENTACAO',
	},
	{
		Header: 'Quantidade',
		accessor: 'QUANTIDADE',
	},
	{
		Header: 'Cadastrado Em',
		accessor: (d) => formatDate(d.createdAt),
	},
	{
		Header: 'Tipo de Produto',
		accessor: 'TIPO_DE_PRODUTO',
	},
	{
		Header: 'Descrição',
		accessor: 'DESCRICAO',
	},
	{
		Header: 'Preço',
		accessor: 'PMC_20_PERC',
	},
];

const handleOptionChange = (row, isOpenedMedDetails, setOpenMedDetails, setItemMedDetails) => {
	setItemMedDetails(row);
	setOpenMedDetails(!isOpenedMedDetails);

	if (isOpenedMedDetails) {
		setItemMedDetails(null);
	}
};

const handleHistory = (props) => {
	props.history.push({
		pathname: '/scanner',
	});
};

const GlobalFilter = ({
	globalFilter,
	setGlobalFilter,
}) => (
	<ContainerSearch>
		<TitleSearch>Pesquisar</TitleSearch>
		<ContainerInputSearch>
			<InputSearch
				value={globalFilter || ''}
				onChange={(e) => {
					setGlobalFilter(e.target.value || undefined);
				}}
				style={{
					border: '0',
				}}
				placeholder='Pesquisar por um medicamento...'
			/>
			<img src={searchIcon} alt="Lupa" />
		</ContainerInputSearch>
	</ContainerSearch>
);
const RenderTable = ({
	columns, data, isOpenedMedDetails, setOpenMedDetails, medicament, setItemMedDetails, isError,
}) => {
	const filterTypes = React.useMemo(
		() => ({
			text: (rows, id, filterValue) => rows.filter((row) => {
				const rowValue = row.values[id];
				return rowValue !== undefined
					? String(rowValue)
						.toLowerCase()
						.startsWith(String(filterValue).toLowerCase())
					: true;
			}),
		}),
		[],
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,
		preGlobalFilteredRows,
		setGlobalFilter,
	} = useTable({
		columns,
		data,
		filterTypes,
		initialState: {
			sortBy: [{ id: 'DATA_EXPIRACAO.iso', desc: false }],
		},
	},
	useFilters,
	useGlobalFilter,
	useSortBy);

	const widthMob = (window.matchMedia('(max-width: 1023px)').matches);

	const formatExpirationDate = (date) => date
		.substr(0, 7)
		.split('-')
		.reverse()
		.join('/');

	return (
		<ContainerTable>
			<ContainerTableHeader>
				<TableHeaderTitle>Gerenciar Medicamentos</TableHeaderTitle>
				<GlobalFilter
					preGlobalFilteredRows={preGlobalFilteredRows}
					globalFilter={state.globalFilter}
					setGlobalFilter={setGlobalFilter}
				/>
			</ContainerTableHeader>
			<ContentTable>
				<Table {...getTableProps()}>
					<Thead>
						{headerGroups.map((headerGroup, index) => (
							<Tr
								{...headerGroup.getHeaderGroupProps()}
								key={index}
								style={{ width: '100%' }}
							>
								{headerGroup.headers.map((column, index) => (
									<TableTitle
										{...column.getHeaderProps()}
										key={index}
										style={{
											display: (column.Header === 'Laboratório' || column.Header === 'Apresentação'
												|| column.Header === 'Descrição' || column.Header === 'Cadastrado Em'
												|| column.Header === 'Classe Terapêutica') && 'none',
											justifyContent: (column.Header === 'Embalagem Aberta?'
												|| column.Header === 'Quantidade' || column.Header === 'Validade') && 'center',
										}}
									>
										{column.render('Header')}
									</TableTitle>
								))}
							</Tr>
						))}
					</Thead>
					{rows && rows.length === 0 ? (
						<TextNoMedicament>{isError ? 'Algo errado' : 'Não há Medicamentos no Momento.'}</TextNoMedicament>
					) : (
						<tbody {...getTableBodyProps()}>
							{rows.map((row, index) => {
								prepareRow(row);
								return (
									<Tr
										{...row.getRowProps()}
										onClick={() => handleOptionChange(row, isOpenedMedDetails, setOpenMedDetails, setItemMedDetails)}
										key={index}
										lastOneMob={index === rows.length - 1}
									>
										{widthMob
											? <>
												<ContainerTableTitleMob>
													<TableTitleMob>Medicamento</TableTitleMob>
													<TableList>
														{row.values.PRODUTO.charAt(0).toUpperCase()
														+ row.values.PRODUTO.slice(1).toLowerCase() || '-'}
													</TableList>
												</ContainerTableTitleMob>
												<ContainerTableTitleMob>
													<TableTitleMob>Código</TableTitleMob>
													<TableList>{row.values.EAN_1 || '-'}</TableList>
												</ContainerTableTitleMob>
												<ContainerTableTitleMob>
													<TableTitleMob>Validade</TableTitleMob>
													<TableList>{formatExpirationDate(row.values['DATA_EXPIRACAO.iso']) || '-'}</TableList>
												</ContainerTableTitleMob>
												<ContainerTableTitleMob>
													<TableTitleMob>Preço</TableTitleMob>
													<TableList>{row.values.PMC_20_PERC || '-'}</TableList>
												</ContainerTableTitleMob>
												<ContainerTableTitleMob>
													<TableTitleMob>Classe Terapêutica</TableTitleMob>
													<TableList>
														{row.values.CLASSE_TERAPEUTICA.charAt(0).toUpperCase()
															+ row.values.CLASSE_TERAPEUTICA.slice(1).toLowerCase() || '-'}
													</TableList>
												</ContainerTableTitleMob>
											</>
											: <>
												{row.cells.map((cell, index) => <TableList
													{...cell.getCellProps()}
													style={{
														paddingLeft: '.7rem',
														display: (cell.column.Header === 'Laboratório' || cell.column.Header === 'Apresentação'
																|| cell.column.Header === 'Descrição' || cell.column.Header === 'Cadastrado Em'
																|| cell.column.Header === 'Classe Terapêutica') && 'none',
														justifyContent: (cell.column.Header === 'Embalagem Aberta?'
																|| cell.column.Header === 'Quantidade'
																|| cell.column.Header === 'Validade') && 'center',
													}}
													key={index}
												>
													{cell.column.Header === 'Validade'
														? formatExpirationDate(cell.row.values['DATA_EXPIRACAO.iso'])
														: cell.value === undefined ? '-'
															: cell.value && cell.value.charAt(0).toUpperCase() + cell.value.slice(1).toLowerCase()
													}
												</TableList>)}
											</>
										}
										<ButtonMoreMob
											src={(medicament && medicament.id) === row.id
													&& isOpenedMedDetails ? SelectMinusIcon : SelectMoreIcon}
											onClick={() => handleOptionChange(row, isOpenedMedDetails, setOpenMedDetails, setItemMedDetails)}
										/>
									</Tr>
								);
							})}
						</tbody>
					)}
				</Table>
			</ContentTable>
		</ContainerTable>
	);
};

function Dashboard(props) {
	const [showCloseButton] = useState(true);
	const [isOpenedMedDetails, setOpenMedDetails] = useState(false);
	const [medicament, setItemMedDetails] = useState(null);
	const [isModalDelOpened, setOpenDelModal] = useState(false);

	const [medList, setMedList] = useState([]);
	const [isFetching, setIsFetching] = useState(null);
	const [isError, setIsError] = useState(null);

	const [isOpenNotification, setIsOpenNotification] = useState(false);
	const [isNotification, setIsNotification] = useState(false);

	useEffect(() => {
		const getAllData = async () => {
			try {
				setIsFetching(true);
				const userId = localStorage.getItem('objectId');

				const response = await getAllMedicaments(userId);

				setMedList(response.data.results);

				setIsFetching(false);
			} catch (error) {
				console.log('error', error.response);
				setIsFetching(false);
				setIsError(true);
			}
		};
		getAllData();
	}, []);

	const handleIsNotification = () => {
		setIsNotification(true);
	};

	const handleOpenNotifications = () => {
		setIsOpenNotification(!isOpenNotification);
	};

	return (
		<Container>
			<Header
				withoutClose={showCloseButton}
				history={props.history}
				handleOpenNotifications={handleOpenNotifications}
				isOpenNotification={isOpenNotification}
				isNotification={handleIsNotification}
			/>
			{isFetching ? <Loading
				backgroundColor='transparent'
				textColor='#B4E4E6'
				loadingColor='linear-gradient(to right, #D8998A 0%, #fff 100%, #D8998A 0% )'
			/> : (
				<>
					<WrapperTable>
						<RenderTable
							isError={isError}
							columns={columns}
							data={medList}
							isOpenedMedDetails={isOpenedMedDetails}
							setOpenMedDetails={setOpenMedDetails}
							medicament={medicament}
							setItemMedDetails={setItemMedDetails}
						/>
					</WrapperTable>
					{!isOpenedMedDetails ? (
						<ContainerButton medDetails={isOpenedMedDetails}>
							<ButtonAddMed
								onClick={() => handleHistory(props)
								}>
									Adicionar Medicamento
							</ButtonAddMed>
						</ContainerButton>
					) : (
						<ModalDetails
							isOpenedMedDetails={isOpenedMedDetails}
							setOpenMedDetails={setOpenMedDetails}
							setOpenDelModal={setOpenDelModal}
							isModalDelOpened={isModalDelOpened}
							medicament={medicament}
							history={props.history}
						/>
					)}
					{isModalDelOpened && (
						<ModalDelete
							setOpenDelModal={setOpenDelModal}
							isModalDelOpened={isModalDelOpened}
							isOpenedMedDetails={isOpenedMedDetails}
							setOpenMedDetails={setOpenMedDetails}
							medicament={medicament.original}
							setMedList={setMedList}
							medList={medList}
						/>
					)}
				</>
			)}
		</Container>
	);
}

export default Dashboard;
