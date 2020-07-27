// Libs
import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/pt-br';

// Components
import Header from '../components/Header';
import Loading from '../components/Loading';
import ModalDelete from '../components/ModalDelete';

// Images
import SelectMoreIcon from '../assets/plus.svg';
import SelectMinusIcon from '../assets/minus.svg';
import EditIcon from '../assets/edit.svg';
import TrashIcon from '../assets/trash.svg';
import CloseIcon from '../assets/fechar.svg';
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
		overflow-y: scroll;
		max-height: calc(100% - 89.8px);
	}
`;

const ContainerSearch = styled.div`
	padding-top: 1rem;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ContainerInputSearch = styled.div`
	padding-left: 1.5rem;
	display: flex;
	width: 20rem;
	height: 3.5rem;
	border: none;
	border-radius: 50px;
	background-color: #EDEDED;

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

const ContainerTable = styled.table`
	margin-top: 2rem;
	max-width: 100%;
  width: 100%;
	border-spacing: 0;
`;

const Thead = styled.thead`
	display: none;

	@media (min-width: 768px) {
		display: flex;
		text-align: left;
	}
`;

const Tr = styled.tr`
	padding: 1rem 1rem 8.5rem 1rem;
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
	padding-right: 2rem;
	padding-bottom: 0.8rem;
	display: flex;
	flex-direction: column;

	@media (min-width: 768px) {
		display: none;
	}
`;

const TableTitleMob = styled.th`
	display: flex;
	color: #D8998A;
	font-size: 1rem;
	font-family: 'Overpass', Regular;

	@media(min-width: 768px) {
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
		width: 25%;
	}
`;

const ButtonMoreMob = styled.img`
	position: absolute;
	right: 15px;
	width: 1.5rem;
	display: flex;

	@media(min-width: 1024px) {
		display: none;
	}
`;

const ContainerButton = styled.div`
	position: fixed;
	bottom: 0;
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

const ButtonMedDetails = styled.button`
	width: 50%;
	height: 5rem;
	border: none;
	border-right: ${(props) => (props.detail ? '1.5px solid rgba(196, 196, 196, 0.3)' : 'none')};
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	background: transparent;

	img {
		margin-right: .5rem;
	}

	p {
		color: #404040;
		font-size: 0.95rem;
		font-family: "Overpass", Medium;
		font-weight: 600;
	}
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
		Header: 'Data de Validade',
		accessor: (d) => formatDate(d.DATA_EXPIRACAO.iso),
	},
	{
		Header: 'Categoria',
		accessor: 'CATEGORIA',
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
		Header: 'Tipo',
		accessor: 'TIPO',
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
		Header: 'Descrição',
		accessor: 'APRESENTACAO',
	},
];

const handleOptionChange = (row, isOpenedMedDetails, setOpenMedDetails, setItemMedDetails) => {
	setItemMedDetails(row);
	setOpenMedDetails(!isOpenedMedDetails);

	if (isOpenedMedDetails) {
		setItemMedDetails(null);
	}
};

const Search = () => (
	<ContainerSearch>
		<ContainerInputSearch>
			<InputSearch
				// onChange={}
				placeholder="Digite aqui para pesquisar..."
			/>
			<img src={searchIcon} alt="Lupa" />
		</ContainerInputSearch>
	</ContainerSearch>
);

const Table = ({
	columns, data, isOpenedMedDetails, setOpenMedDetails, medicament, setItemMedDetails,
}) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({
		columns,
		data,
	});

	const widthMob = (window.matchMedia('(max-width: 768px)').matches);

	return (
		<ContainerTable {...getTableProps()}>
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
							>
								{column.render('Header')}
							</TableTitle>
						))}
					</Tr>
				))}
			</Thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row, index) => {
					prepareRow(row);

					return (
						<Tr
							{...row.getRowProps()}
							key={index}
							style={{ margin: index === rows.length - 1 && '0 0 8rem 0' }}
						>
							{widthMob
								? <>
									<ContainerTableTitleMob>
										<TableTitleMob>Medicamento</TableTitleMob>
										<TableList>{row.values.PRODUTO}</TableList>
									</ContainerTableTitleMob>
									<ContainerTableTitleMob>
										<TableTitleMob>Código</TableTitleMob>
										<TableList>{row.values.EAN_1}</TableList>
									</ContainerTableTitleMob>
									<ContainerTableTitleMob>
										<TableTitleMob>Data de Validade</TableTitleMob>
										<TableList>{formatDate(row.values['DATA_EXPIRACAO.iso'])}</TableList>
									</ContainerTableTitleMob>
									{/* <ContainerTableTitleMob>
										<TableTitleMob>Tipo</TableTitleMob>
										<TableList>{row.values.TIPO}</TableList>
									</ContainerTableTitleMob> */}
									<ContainerTableTitleMob>
										<TableTitleMob>Categoria</TableTitleMob>
										<TableList>{row.values.CATEGORIA}</TableList>
									</ContainerTableTitleMob>
								</>
								: <>
									{row.cells.map((cell, index) => <TableList
										{...cell.getCellProps()}
										style={{ paddingLeft: '.7rem' }}
										key={index}
									>
										{cell.render('Cell')}
									</TableList>)}
								</>
							}
							<ButtonMoreMob
								src={(medicament && medicament.id) === row.id ? SelectMinusIcon : SelectMoreIcon}
								onClick={() => handleOptionChange(row, isOpenedMedDetails, setOpenMedDetails, setItemMedDetails)}
							/>
						</Tr>
					);
				})}
			</tbody>
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
	}, [isModalDelOpened]);

	return (
		<Container>
			<Header withoutClose={showCloseButton} />
			<Search />
			<Table
				columns={columns}
				data={medList}
				isOpenedMedDetails={isOpenedMedDetails}
				setOpenMedDetails={setOpenMedDetails}
				medicament={medicament}
				setItemMedDetails={setItemMedDetails}
			/>
			<ContainerButton medDetails={isOpenedMedDetails}>
				{!isOpenedMedDetails ? (
					<ButtonAddMed>Adicionar Medicamento</ButtonAddMed>
				) : (
					<>
						<ButtonMedDetails detail>
							<img src={EditIcon} alt="Editar" />
							<p>Editar</p>
						</ButtonMedDetails>
						<ButtonMedDetails onClick={() => setOpenDelModal(!isModalDelOpened)}>
							<img src={TrashIcon} alt="Excluir" />
							<p>Excluir</p>
						</ButtonMedDetails>
					</>
				)}
			</ContainerButton>
			{isModalDelOpened && (
				<ModalDelete
					setOpenDelModal={setOpenDelModal}
					isModalDelOpened={isModalDelOpened}
					medicament={medicament.original}
				/>
			)}
			{/* {isFetching
				&& <Loading
					backgroundColor='transparent'
					textColor='#D8998A'
					loadingColor='linear-gradient(to right, #B4E4E6 0%, #fff 100%, #B4E4E6 0% )'
				/>} */}
		</Container>
	);
}

export default Dashboard;
