// Libs
import React from 'react';
import styled from 'styled-components';

// Images
import { ReactComponent as CloseIcon } from '../assets/fechar.svg';

// Services
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

	@media(min-width: 768px) {
		max-width: 50%;
	}

	@media(min-width: 1024px) {
		width: 40%;
		min-width: 40%;
	}

	@media(min-width: 1440px) {
		width: 25%;
		min-width: 25%;
	}
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
	padding: .8rem 0 .8rem 1rem;
	font-size: .9rem;
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

const handleDeleteMed = async (
	isModalDelOpened,
	isOpenedMedDetails,
	medList,
	medicament,
	setMedList,
	setOpenDelModal,
	setOpenMedDetails,
) => {
	try {
		await deleteMedicament(medicament.objectId);
		const list = medList.filter((med) => med.objectId !== medicament.objectId);

		setOpenDelModal(!isModalDelOpened);
		setOpenMedDetails(!isOpenedMedDetails);
		setMedList(list);
	} catch (error) {
		console.log('error', error);
		console.log('error', error.response);
	}
};

const ModalDelete = (props) => (
	<Overlay>
		<ContainerDelModal>
			<DelModalHeader>
				<p>Excluir Medicamento</p>
				<CloseIcon
					strokeWidth={'2'}
					width="18"
					style={{ stroke: '#D8998A', cursor: 'pointer' }}
					alt="Fechar"
					onClick={() => props.setOpenDelModal(!props.isModalDelOpened)}
				/>
			</DelModalHeader>
			<DelModalText>Após ser excluido, o medicamento não pode ser recuperado.</DelModalText>
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
				<DelModalButton
					onClick={
						() => handleDeleteMed(
							props.isModalDelOpened,
							props.isOpenedMedDetails,
							props.medList,
							props.medicament,
							props.setMedList,
							props.setOpenDelModal,
							props.setOpenMedDetails,
						)}
				>
					confirmar
				</DelModalButton>
			</ContainerDelModalButtons>
		</ContainerDelModal>
	</Overlay>
);

export default ModalDelete;
