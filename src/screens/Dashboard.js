// Libs
import React, { useState, useEffect } from 'react';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Redirect } from 'react-router-dom';

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
	overflow-y: visible;

	::-webkit-scrollbar {
  	width: 10px;
	}
	::-webkit-scrollbar-track {
  	background: #fff;
	}
	::-webkit-scrollbar-thumb {
  	background: #B4E4E6;
	}
	::-webkit-scrollbar-thumb:hover {
  	background: #38D5D5;
	}

	@media(min-width: 768px) {
		max-height: 75vh;
	}

	@media(min-width: 1024px) {
		overflow-y: hidden;
	}
	${'' /* @media(min-width: 1024px) {
		overflow-y: scroll;
		max-height: calc(100% - 89.8px);
	} */}
`;

// const Tbody = styled.tbody`
// 	@media(min-width: 1024px) {
// 		overflow-y: scroll;
// 		max-height: calc(100% - 89.8px);
// 	}
// `;

const ContainerSearch = styled.div`
	padding-top: 1rem;
	padding-bottom: 2rem;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	@media(min-width: 1024px) {
		width: 60%;
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

	@media(min-width: 768px) {
		width: 25rem;
	}

	@media(min-width: 1024px) {
		width: 30rem;
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
	display: flex;
	justify-content: center;
`;

const ContainerTable = styled.table`
	max-width: 90%;
  width: 100%;
	border-spacing: 0;
`;

const Tbody = styled.tbody`
	max-width: 100%;
  width: 100%;
	overflow-y: scroll;
`;

const ContainerTableHeader = styled.div`
	display: flex;
`;
const WrapperTableHeader = styled.div`
	display: none;

	@media(min-width: 1024px) {
		width: 20%;
		display: flex;
		align-items: center;
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
		font-weight: 600;
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
	padding: 1rem 1rem 13rem 1rem;
	height: 2.3rem;
	display: flex;
	flex-wrap: wrap;
	position: relative;

	&:nth-child(even) {
    background-color: #fff;
  }
	&:nth-child(odd) {
    background-color: #B4E4E6;
	}

	@media(min-width: 768px) {
		padding: 1rem 1rem 9rem 1rem;
	}

	@media(min-width: 1024px) {
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
		padding: .25rem;
		padding-left: 0.7rem;
		width: 25%;
		display: flex;
		color: #fff;
		align-items: center;
		font-size: 1rem;
		font-family: 'Overpass', Regular;
		background-color: #D8998A;
		z-index: 5;
		white-space: nowrap;
	}
`;

const ContainerTableTitleMob = styled.span`
	min-width: 40%;
	padding-right: 2rem;
	padding-bottom: 0.8rem;
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

const formatDate = (date) => moment(date).locale('pt-br').format('DD/MM/YYYY');

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
		accessor: (d) => formatDate(d.DATA_EXPIRACAO.iso),
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
];

const handleOptionChange = (row, isOpenedMedDetails, setOpenMedDetails, setItemMedDetails) => {
	setItemMedDetails(row);
	setOpenMedDetails(!isOpenedMedDetails);

	if (isOpenedMedDetails) {
		setItemMedDetails(null);
	}
};

const GlobalFilter = ({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
}) =>
// const count = preGlobalFilteredRows && preGlobalFilteredRows.length;

	(
		<ContainerSearch>
			<ContainerInputSearch>
				<InputSearch
					value={globalFilter || ''}
					onChange={(e) => {
						setGlobalFilter(e.target.value || undefined);
					}}
					style={{
						border: '0',
					}}
					placeholder='Digite aqui para pesquisar...'
				/>
				<img src={searchIcon} alt="Lupa" />
			</ContainerInputSearch>
		</ContainerSearch>
	);
const Table = ({
	columns, data, isOpenedMedDetails, setOpenMedDetails, medicament, setItemMedDetails,
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
	},
	useFilters,
	useGlobalFilter);

	const widthMob = (window.matchMedia('(max-width: 768px)').matches);

	// rows.sort((item, b) => item.values.Validade.localeCompare(b.values.Validade));

	const sortListByDate = (a, b) => a.values.Validade - b.values.Validade;

	rows.sort(sortListByDate);

	return (
		<ContainerTable {...getTableProps()}>

			<ContainerTableHeader>
				<WrapperTableHeader>
					<TableHeaderTitle>Gerenciar Medicamentos</TableHeaderTitle>
				</WrapperTableHeader>
				<GlobalFilter
					preGlobalFilteredRows={preGlobalFilteredRows}
					globalFilter={state.globalFilter}
					setGlobalFilter={setGlobalFilter}
				/>
			</ContainerTableHeader>

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
									|| column.Header === 'Descrição' || column.Header === 'Cadastrado Em') && 'none',
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
			<Tbody {...getTableBodyProps()}>
				{rows.map((row, index) => {
					prepareRow(row);
					return (
						<Tr
							{...row.getRowProps()}
							onClick={() => handleOptionChange(row, isOpenedMedDetails, setOpenMedDetails, setItemMedDetails)}
							key={index}
							style={{
								margin: index === rows.length - 1 && '0 0 8rem 0',
								cursor: 'pointer',
							}}
						>
							{widthMob
								? <>
									<ContainerTableTitleMob>
										<TableTitleMob>Medicamento</TableTitleMob>
										<TableList>{row.values.PRODUTO || '-'}</TableList>
									</ContainerTableTitleMob>
									<ContainerTableTitleMob>
										<TableTitleMob>Código</TableTitleMob>
										<TableList>{row.values.EAN_1 || '-'}</TableList>
									</ContainerTableTitleMob>
									<ContainerTableTitleMob>
										<TableTitleMob>Validade</TableTitleMob>
										<TableList>{row.values.Validade || '-'}</TableList>
									</ContainerTableTitleMob>
									<ContainerTableTitleMob>
										<TableTitleMob>Classe Terapêutica</TableTitleMob>
										<TableList>{row.values.CLASSE_TERAPEUTICA || '-'}</TableList>
									</ContainerTableTitleMob>
								</>
								: <>
									{row.cells.map((cell, index) => <TableList
										{...cell.getCellProps()}
										style={{
											paddingLeft: '.7rem',
											display: (cell.column.Header === 'Laboratório' || cell.column.Header === 'Apresentação'
											|| cell.column.Header === 'Descrição' || cell.column.Header === 'Cadastrado Em') && 'none',
											justifyContent: (cell.column.Header === 'Embalagem Aberta?'
											|| cell.column.Header === 'Quantidade' || cell.column.Header === 'Validade') && 'center',
										}}
										key={index}
									>
										{cell.render('Cell')}
									</TableList>)}
								</>
							}
							<ButtonMoreMob
								src={(medicament && medicament.id) === row.id && isOpenedMedDetails ? SelectMinusIcon : SelectMoreIcon}
								onClick={() => handleOptionChange(row, isOpenedMedDetails, setOpenMedDetails, setItemMedDetails)}
							/>
						</Tr>
					);
				})}
			</Tbody>
		</ContainerTable>
	);
};

function Dashboard() {
	const [showCloseButton] = useState(true);
	const [isOpenedMedDetails, setOpenMedDetails] = useState(false);
	const [medicament, setItemMedDetails] = useState(null);
	const [isModalDelOpened, setOpenDelModal] = useState(false);
	
	const [medList, setMedList] = useState([]);
	
	const [isFetching, setIsFetching] = useState(null);
	const [isRedirect, setIsRedirect] = useState(null);

	useEffect(() => {
		const getAllData = async () => {
			try {
				setIsFetching(true);

				const response = await getAllMedicaments();

				setMedList(response.data.results);

				setIsFetching(false);
			} catch (error) {
				console.log('error', error.response);
			}
		};
		getAllData();
	}, []);

	return (
		<Container>
			<Header withoutClose={showCloseButton} />
			{isFetching ? <Loading
				backgroundColor='transparent'
				textColor='#B4E4E6'
				loadingColor='linear-gradient(to right, #D8998A 0%, #fff 100%, #D8998A 0% )'
			/> : (
				<WrapperTable>
					<Table
						columns={columns}
						data={medList}
						isOpenedMedDetails={isOpenedMedDetails}
						setOpenMedDetails={setOpenMedDetails}
						medicament={medicament}
						setItemMedDetails={setItemMedDetails}
					/>
				</WrapperTable>
			)}
			{!isOpenedMedDetails ? (
				<ContainerButton medDetails={isOpenedMedDetails}>
					<ButtonAddMed onClick={() => setIsRedirect(true)}>Adicionar Medicamento</ButtonAddMed>
				</ContainerButton>
			) : (
				<ModalDetails
					isOpenedMedDetails={isOpenedMedDetails}
					setOpenMedDetails={setOpenMedDetails}
					setOpenDelModal={setOpenDelModal}
					isModalDelOpened={isModalDelOpened}
					medicament={medicament}
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
			{isRedirect && <Redirect to={'/addmoreinfo'} />}
		</Container>
	);
}

export default Dashboard;
