// Libs
import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/pt-br';

// Components
import Header from '../components/Header';

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
`;

const InputSearch = styled.input`
	width: 85%;
	color: #404040;
	font-size: .90rem;
	font-weight: bold;
	background: transparent;
	border: none;
	outline: none;
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
		text-align: center;
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

const Overlay = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(196, 196, 196, 0.3);
`;

const ContainerDelModal = styled.div`
	width: 90%;
	border-radius: 6px;
	background: #fff;
	font-family: "Overpass", Regular;
`;

const DelModalHeader = styled.span`
	padding: 1rem;
	width: 100%;
	display: flex;
	justify-content: space-between;

	p {
		color: #D8998A;
		font-size: 1.2rem;
		font-weight: 600;
	}

	img {
		width: 1rem;
	}
`;

const DelModalText = styled.p`
	padding: .8rem;
	flex-wrap: wrap;

	span {
		font-weight: 600;
	}
`;

const ContainerDelModalButtons = styled.div`
	padding: 0.5rem 0 1rem 0;
	width: 100%;
	display: flex;
	justify-content: space-around;
`;

const DelModalButton = styled.button`
	width: 8.5rem;
	height: 3rem;
	text-transform: uppercase;
	color: ${(props) => ((props.cancel) ? '#D8998A' : '#fff')};
	font-size: 1rem;
	font-weight: 600;
	border-radius: 50px;
	border:  ${(props) => (props.cancel ? '2px solid #D8998A' : 'none')};
	background: ${(props) => ((props.cancel) ? 'transparent' : '#D8998A')};
`;

const formatDate = (date) => {
	return moment(date).locale('pt-br').format('DD/MM/YYYY');
};

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
		accessor: d => formatDate(d.DATA_EXPIRACAO.iso),
	},
	{
		Header: 'Categoria',
		accessor: 'TIPO',
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
		accessor: d => d.EMBALAGEM_ABERTA ? 'Sim' : 'Não',
	},
	{
		Header: 'Quantidade',
		accessor: 'QUANTIDADE',
	},
	{
		Header: 'Cadastrado Em',
		accessor: d => formatDate(d.createdAt),
	},
	{
		Header: 'Descrição',
		accessor: 'APRESENTACAO',
	},
];

const handleOptionChange = (rowId, openMedDetails, setOpenMedDetails, setItemMedDetails) => {
	setItemMedDetails(rowId);
	setOpenMedDetails(!openMedDetails);

	if (openMedDetails) {
		setItemMedDetails(null);
	}
};

const handleDeleteMed = (selectedId) => {

	console.log('selectedId', selectedId);

	// const filtering = medicamentsList.filter((medicament) => medicament.id !== selectedId);

	// setMedicamentsList(filtering);
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
	columns, data, openMedDetails, setOpenMedDetails, itemMedDetails, setItemMedDetails,
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

									<ContainerTableTitleMob>
										<TableTitleMob>Categoria</TableTitleMob>
										<TableList>{row.values.TIPO}</TableList>
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
								src={itemMedDetails === row.id ? SelectMinusIcon : SelectMoreIcon}
								onClick={() => handleOptionChange(row.id, openMedDetails, setOpenMedDetails, setItemMedDetails)}
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
	const [openMedDetails, setOpenMedDetails] = useState(false);
	const [itemMedDetails, setItemMedDetails] = useState(null);
	const [openDelModal, setOpenDelModal] = useState(false);

	const [medicamentsList, setMedicamentsList] = useState(null);

	const [medList, setMedList] = useState([]);

	useEffect(() => {
		const getAllData = async () => {
			try {
				const response = await getAllMedicaments();

				setMedList(response.data.results);
			} catch (error) {
				console.log('error', error.response);
			}
		};
		getAllData();
	}, []);

	return (
		<Container>
			<Header withoutClose={showCloseButton} />
			<Search />
			<Table
				columns={columns}
				data={medList}
				openMedDetails={openMedDetails}
				setOpenMedDetails={setOpenMedDetails}
				itemMedDetails={itemMedDetails}
				setItemMedDetails={setItemMedDetails}
				medicamentsList={medicamentsList}
				setMedicamentsList={setMedicamentsList}
			/>
			<ContainerButton medDetails={openMedDetails}>
				{!openMedDetails ? (
					<ButtonAddMed>Adicionar Medicamento</ButtonAddMed>
				) : (
					<>
						<ButtonMedDetails detail>
							<img src={EditIcon} alt="Editar" />
							<p>Editar</p>
						</ButtonMedDetails>
						<ButtonMedDetails onClick={() => setOpenDelModal(!openDelModal)}>
							<img src={TrashIcon} alt="Excluir" />
							<p>Excluir</p>
						</ButtonMedDetails>
					</>
				)}
			</ContainerButton>
			{openDelModal && (
				<Overlay>
					<ContainerDelModal>
						<DelModalHeader>
							<p>Excluir Medicamento</p>
							<img
								src={CloseIcon}
								alt="Fechar"
								onClick={() => setOpenDelModal(!openDelModal)}
							/>
						</DelModalHeader>
						<DelModalText>Após ser excluido, um modelo não pode ser recuperado.</DelModalText>
						<DelModalText>Você deseja excluir o { }
							<span>
								Medicamento *****
							</span>?
						</DelModalText>
						<ContainerDelModalButtons>
							<DelModalButton
								cancel
								onClick={() => setOpenDelModal(!openDelModal)}
							>
								cancelar
							</DelModalButton>
							<DelModalButton onClick={() => handleDeleteMed(itemMedDetails)}>confirmar</DelModalButton>
						</ContainerDelModalButtons>
					</ContainerDelModal>
				</Overlay>
			)}
		</Container>
	);
}

export default Dashboard;
