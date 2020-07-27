// Libs
import React from 'react';
import styled from 'styled-components';

// Images
import CloseIcon from '../assets/fechar.svg';

import { deleteMedicament } from '../services/api';


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
	z-index: 5;
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

const handleDeleteMed = async (row, setOpenDelModal, isModalDelOpened) => {
	try {
		const response = await deleteMedicament(row.objectId);
		setOpenDelModal(!isModalDelOpened)
	} catch (error) {
		console.log('error', error.response);
	}
};

const ModalDelete = props => {
	return (
		<Overlay>
			<ContainerDelModal>
				<DelModalHeader>
					<p>Excluir Medicamento</p>
					<img
						src={CloseIcon}
						alt="Fechar"
						onClick={() => props.setOpenDelModal(!props.isModalDelOpened)}
					/>
				</DelModalHeader>
				<DelModalText>Após ser excluido, um modelo não pode ser recuperado.</DelModalText>
				<DelModalText>Você deseja excluir o medicamento {}
					<span>
						{props.medicament.PRODUTO}
					</span>?
        </DelModalText>
				<ContainerDelModalButtons>
					<DelModalButton
						cancel
						onClick={() => props.setOpenDelModal(!props.isModalDelOpened)}
					>
						cancelar
        </DelModalButton>
					<DelModalButton onClick={() => handleDeleteMed(props.medicament, props.setOpenDelModal, props.isModalDelOpened)}>confirmar</DelModalButton>
				</ContainerDelModalButtons>
			</ContainerDelModal>
		</Overlay>
	)
}

export default ModalDelete;