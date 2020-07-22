// Libs
import React, { useState } from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';

// Components
import Header from '../components/Header';

// Images
import SelectMoreIcon from '../assets/plus.svg';
import SelectMinusIcon from '../assets/minus.svg';
import EditIcon from '../assets/edit.svg';
import TrashIcon from '../assets/trash.svg';

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
		${''}
		max-height: calc(100% - 89.8px);
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

const ContainerDelModal = styled.div`
	width: 90%;
	height: 10rem;
	background: #c7c7;
`;

const data = [
	{
		col1: 'remedio1', col2: '7898927111014', col3: '10/01/2021', col4: 'categoria1',
	},
	{
		col1: 'remedio2', col2: '7898927323014', col3: '11/02/2021', col4: 'categoria2',
	},
	{
		col1: 'remedio3', col2: '7893237111022', col3: '12/03/2021', col4: 'categoria3',
	},
	{
		col1: 'remedio4', col2: '7898927111323', col3: '13/04/2021', col4: 'categoria4',
	},
	{
		col1: 'remedio5', col2: '7898927324564', col3: '14/05/2021', col4: 'categoria5',
	},
];

const columns = [
	{
		Header: 'Medicamento',
		accessor: 'col1',
	},
	{
		Header: 'Código',
		accessor: 'col2',
	},
	{
		Header: 'Data de Validade',
		accessor: 'col3',
	},
	{
		Header: 'Categoria',
		accessor: 'col4',
	},
];

const handleOptionChange = (rowId, openMedDetails, setOpenMedDetails, setItemMedDetails) => {

	setItemMedDetails(rowId);
	setOpenMedDetails(!openMedDetails);

	if (openMedDetails) {
		setItemMedDetails(null);
	}
};

const handleOpenDeleteModal = (itemMedDetails, openDelModal, setOpenDelModal) => {
	console.log('del item', itemMedDetails);

	setOpenDelModal(!openDelModal);
};

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
								? (
									<>
										<ContainerTableTitleMob>
											<TableTitleMob>Medicamento</TableTitleMob>
											<TableList>remedio1</TableList>
										</ContainerTableTitleMob>

										<ContainerTableTitleMob>
											<TableTitleMob>Código</TableTitleMob>
											<TableList>7898927111014</TableList>
										</ContainerTableTitleMob>

										<ContainerTableTitleMob>
											<TableTitleMob>Data de Validade</TableTitleMob>
											<TableList>10/01/2021</TableList>
										</ContainerTableTitleMob>

										<ContainerTableTitleMob>
											<TableTitleMob>Categoria</TableTitleMob>
											<TableList>catego</TableList>
										</ContainerTableTitleMob>
									</>
								)
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

	return (
		<Container>
			<Header withoutClose={showCloseButton} />
			<Table
				columns={columns}
				data={data}
				openMedDetails={openMedDetails}
				setOpenMedDetails={setOpenMedDetails}
				itemMedDetails={itemMedDetails}
				setItemMedDetails={setItemMedDetails}
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
						<ButtonMedDetails onClick={() => handleOpenDeleteModal(itemMedDetails, openDelModal, setOpenDelModal)}>
							<img src={TrashIcon} alt="Editar" />
							<p>Excluir</p>
						</ButtonMedDetails>
					</>
				)}
			</ContainerButton>
			{openDelModal && (
				<ContainerDelModal>
					<p>meu deus do ceu</p>
					<p>me ajuda</p>
				</ContainerDelModal>
			)}
		</Container>
	);
}

export default Dashboard;
