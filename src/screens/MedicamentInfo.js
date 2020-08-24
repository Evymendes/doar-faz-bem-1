/* eslint-disable react/jsx-key */
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
	margin-top: 8rem;
	width: 90%;
	overflow-y: scroll;
	overflow-x: hidden;

	::-webkit-scrollbar {
		width: 5px;
	}
	::-webkit-scrollbar-track {
		background: transparent;
	}
	::-webkit-scrollbar-thumb {
		background: transparent;
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
	width: ${(props) => props.width && '12%'};
	padding: 1rem 0 1rem 0.875rem ;
	text-align: left;
	background-color: #D8998A;
	color: white;
	font-weight: bold;
	font-size: 0.875rem;

	@media(max-width: 768px) {
		width: ${(props) => props.width && '20%'};
	}
`;

const ThMob = styled.th`
	display: none;

	@media(max-width: 768px) {
		display: flex;
		color: #D8998A;
		font: 600 1rem 'Overpass', serif;
	}

	@media(max-width: 375px) {
		font-size: .9rem;
	}
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
	word-wrap: break-word;
	color: #404040;
	font-size: 0.85rem;
	font-family: "Overpass", Light;


	@media(max-width: 768px) {
		width: ${(props) => ((props.width) ? props.width : '50%')};
	}
`;

function MedicamentInfo(props) {
	const data = React.useMemo(
		() => [
			{
				col1: 'Gaballon',
				col2: 'R$ 38,00',
				col3: 'Antialérgicos',
				col4: 'Cloridrato de tiamina;pantotenato de cálcio;ácido gamaminobutírico;cloridrato de piridoxina;cloridrato de lisina',
				col5: '50 MG + 50 MG + 2 MG + 4 MG + 4 MG COM CT BL AL PLAS OPC X 20',
			},
			{
				col1: 'Gaballon Gaballon',
				col2: 'R$ 138,00',
				col3: 'Antialérgicos',
				col4: 'Cloridrato de tiamina;pantotenato de cálcio;ácido gamaminobutírico;cloridrato de piridoxina;cloridrato de lisina',
				col5: '50 MG + 50 MG + 2 MG + 4 MG + 4 MG COM CT BL AL PLAS OPC X 20',
			},
			{
				col1: '1sti',
				col2: 'R$ 938,00',
				col3: 'Antialérgicos',
				col4: 'Cloridrato de tiamina;pantotenato de cálcio;ácido gamaminobutírico;cloridrato de piridoxina;cloridrato de lisina',
				col5: '50 MG + 50 MG + 2 MG + 4 MG + 4 MG COM CT BL AL PLAS OPC X 20',
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
				Header: 'Categoria',
				accessor: 'col3',
			},
			{
				Header: 'Substância',
				accessor: 'col4',
			},
			{
				Header: 'Descrição',
				accessor: 'col5',
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
								width={column.Header === 'Nome' && '12%'
									|| column.Header === 'Preço Máximo' && '12%'
									|| column.Header === 'Categoria' && '12%'
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
									width={cell.column.Header === 'Nome' && '30%'
										|| cell.column.Header === 'Preço Máximo' && '35%'
										|| cell.column.Header === 'Categoria' && '35%'
									}
									background={cell.column.Header === 'Nome' && 'red'
										|| cell.column.Header === 'Preço Máximo' && 'pink'
										|| cell.column.Header === 'Categoria' && 'yellow'
									}
								>
									<ThMob width={cell.column.Header}>{cell.column.Header}</ThMob>
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
			<Header openModal={handleBack} isWhite />
			<ContainerTable>
				{renderTable()}
			</ContainerTable>
		</Container>
	);
}

export default MedicamentInfo;
