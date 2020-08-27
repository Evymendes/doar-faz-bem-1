/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';

const Container = styled.div`
	height: 100%;
`;

const Title = styled.h2`
	margin-bottom: 1rem;
	font-size: 1.5rem;
	color: #D8998A;
	font-family: "Overpass", Bold;

	@media(max-width: 648px) {
		font-size: 1.2rem;
    text-align: center;
	}
`;

const ContainerTable = styled.div`
	max-height: 80vh;
	overflow-y: scroll;
	overflow-x: hidden;

	::-webkit-scrollbar {
		width: 10px;
	}
	::-webkit-scrollbar-track {
		background: #D8998A;
	}
	::-webkit-scrollbar-thumb {
		background: #D8998A;
	}

	@media(max-width: 768px) {
		width: 100%;
	}

	@media(max-width: 648px) {
		height: 80vh;

		::-webkit-scrollbar {
			width: 5px;
		}
		::-webkit-scrollbar-track {
			background: #D8998A;
		}
		::-webkit-scrollbar-thumb {
			background: #D8998A;
		}
	}
`;

const ContantTable = styled.table`
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
	position: sticky;
	top: 0;
	padding: 1rem 0 1rem 0.875rem;
	width: ${(props) => props.width && '12%'};
	text-align: left;
	color: white;
	font-family: "Overpass", Bold;
	font-size: 1rem;
	background-color: #D8998A;

	@media(max-width: 768px) {
		width: ${(props) => props.width && '20%'};
		font-size: 0.875rem;
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
	font-size: 0.95rem;
	font-family: "Overpass", Light;
	text-align: left;

	@media(max-width: 768px) {
		padding-bottom: 0.5rem;
		width: ${(props) => ((props.width) ? props.width : '50%')};
		font-size: 0.85rem;
	}
`;

function Table(props) {
	const [medList, setMedLIst] = useState([]);

	useEffect(() => {
		const { medicament } = props;

		setMedLIst(medicament);
	}, [medList]);

	const data = React.useMemo(
		() => medList,
	);

	const columns = React.useMemo(
		() => [
			{
				Header: 'Medicamento',
				accessor: 'PRODUTO',
			},
			{
				Header: 'Preço Máximo',
				accessor: 'PMC_20_PERC',
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
				Header: 'Descrição',
				accessor: 'DESCRICAO',
			},
		],
		[],
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns, data });

	const renderTable = () => (
		<ContantTable {...getTableProps()}>
			<Thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<Th
								{...column.getHeaderProps()}
								width={(column.Header === 'Produto' && '12%')
									|| (column.Header === 'Preço Máximo' && '12%')
									|| (column.Header === 'Classe Terapêutica' && '12%')
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
									width={cell.column.Header === 'Produto' && '30%'
										|| cell.column.Header === 'Preço Máximo' && '35%'
										|| cell.column.Header === 'Classe Terapêutica' && '35%'
									}
									background={cell.column.Header === 'Nome' && 'red'
										|| cell.column.Header === 'Preço Máximo' && 'pink'
										|| cell.column.Header === 'Classe Terapêutica' && 'yellow'
									}
								>
									<ThMob width={cell.column.Header}>{cell.column.Header}</ThMob>
									{cell.value ? cell.value.charAt(0).toUpperCase() + cell.value.slice(1).toLowerCase() : '-'}
								</Td>
							))}
						</Tr>
					);
				})}
			</tbody>
		</ContantTable>
	);

	return (
		<Container>
			<Title>Há {medList.length} {medList.length === 1 ? 'resultado' : 'resultados'} para essa pesquisa</Title>
			<ContainerTable>
				{renderTable()}
			</ContainerTable>
		</Container>
	);
}

export default Table;
