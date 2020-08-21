import React from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';

import Header from '../components/Header';


const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const ContainerTable = styled.div`
	margin: 0 auto;
	width: 90%;
	height: 100vh;
	overflow-y: scroll;
	overflow-x: hidden;

	::-webkit-scrollbar {
		width: 5px;
	}
	::-webkit-scrollbar-track {
		background: #fff;
	}
	::-webkit-scrollbar-thumb {
		background: #FFCFCD;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #f9bdbb;
	}

	@media(max-width: 768px) {
		width: 100%;
	}
`;

const Table = styled.table`
	width: 100%;
	border-spacing: 0;
	table-layout: fixed;
`;

const Thead = styled.thead`
	@media(max-width: 768px) {
		display: none;
	}
`;

const Th = styled.th`
	min-width: ${(props) => props.width};
	padding: 1rem 0 1rem 0.875rem ;
	text-align: left;
	background-color: #85144B;
	color: white;
	font-weight: bold;
	font-size: 0.875rem;
`;

const Tr = styled.tr`
	border-radius: 3px;
	word-wrap:break-word;

	&:nth-child(even) {
		background-color: #FFF;
	};
	&:nth-child(odd) {
		background-color: #B4E4E6;
	}
	&:hover {
		background-color: #CCC;
		border: 0.5px solid #85144B;
	};

	@media(max-width: 768px) {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
	}
`;

const Td = styled.td`
	word-wrap:break-word;
	padding-top: 1rem;
	padding-bottom: 1rem;
	padding-left: 0.875rem;
	border: none;
	width: 200px;
	word-wrap: break-word;
	font-size: 0.813rem;


	@media(max-width: 768px) {
		width: 20%;
	}
`;

function MedicamentInfo(props) {
	const data = React.useMemo(
		() => [
			{
				col1: 'Vai na Web',
				col2: '123.456.789-54',
				col3: 'Evelyn Mendes Ribeiro',
			},
			{
				col1: 'Precuisa ser',
				col2: '987.654.321-89',
				col3: 'Fulano da Silva',
			},
			{
				col1: '1sti',
				col2: '852.963.741-87',
				col3: 'Fulano da Silva',
			},
		],
		[],
	);

	const columns = React.useMemo(
		() => [
			{
				Header: 'Nome',
				accessor: 'col1',
			},
			{
				Header: 'Preço Máximo',
				accessor: 'col2',
			},
			{
				Header: 'Descrição',
				accessor: 'col3',
			},
		],
		[],
	);

	const renderTable = () => (
		<Table {...getTableProps()}>
			<Thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<Th
								{...column.getHeaderProps()}
								width={column.Header === 'Descrição'
									|| column.Header === 'Nome'
									|| column.Header === 'Preço Máximo'
								}
							>
								{column.render('Header')}
							</Th>
						))}
					</tr>
				))}
			</Thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<Tr {...row.getRowProps()}>
							{row.cells.map((cell) => (
								<Td
									{...cell.getCellProps()}
								>
									{cell.render('Cell')}
								</Td>
							))}
						</Tr>
					);
				})}
			</tbody>
		</Table>
	);

	const handleBack = () => {
		props.history.push({
			pathname: '/searchMedicament',
		});
	};

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns, data });

	return (
		<Container>
			{/* <Header openModal={handleBack}/> */}
			<ContainerTable>
				{renderTable()}
			</ContainerTable>
		</Container>
	);
}

export default MedicamentInfo;
