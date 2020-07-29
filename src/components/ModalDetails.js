// Libs
import React from 'react';
import styled from 'styled-components';

// Images
import CloseIcon from '../assets/fechar.svg';
import EditIcon from '../assets/edit.svg';
import TrashIcon from '../assets/trash.svg';

// Styles
const Overlay = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: flex-end;
	background: rgba(196, 196, 196, 0.3);
	z-index: 5;

	@media(min-width: 1024px) {
		justify-content: center;
		align-items: center;
	}
`;

const ContainerDetails = styled.div`
	width: 100%;
	min-height: 65vh;
	display: flex;
	flex-direction: column;
	background-color: #fff;
	font-family: 'Overpass', Regular;

	@media(min-width: 1024px) {
		border-radius: 10px;
		min-width: 35%;
		width: 35%;
		min-height: auto;
	}
`;

const WrapperDetails = styled.div`
	padding-top: ${(props) => (props.main && '1rem')};
	padding-left: ${(props) => (!props.main && '.3rem')};
	height: ${(props) => (props.main && '100%')};
	display:  ${(props) => (!props.main && 'flex')};
`;

const ContainerDetailsHeader = styled.div`
	padding: 1.5rem .95rem;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	p {
		color: #989494;
		font-size: .90rem;
	}

	img {
		width: 1.2rem;
		cursor: pointer;
	}
`;

const DetailsItem = styled.span`
	padding: 0 0.8rem 1.5rem 0.8rem;
	width: 35%;
	display: flex;
	justify-content: center;
	flex-direction: column;
`;

const DetailsText = styled.p`
	padding-top:  ${(props) => (!props.title && '.2rem')};
	color: ${(props) => (props.title ? '#D8998A' : '#404040')};
	font-size: ${(props) => (props.title ? '.9rem' : '.85rem')};
	font-weight: ${(props) => (props.title ? '600' : '400')};

	@media(min-width: 1024px) {
		font-size: ${(props) => (props.title ? '1rem' : '.85rem')};
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

	@media(min-width: 1024px) {
		border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
	}
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

const ModalDetails = (props) => (
	<Overlay onClick={() => props.setOpenMedDetails(!props.isOpenedMedDetails)}>
		<ContainerDetails onClick={(e) => e.stopPropagation()}>
			<ContainerDetailsHeader>
				<p>Cadastrado em {(props.medicament.values.Cadastrado) || '-'}</p>
				<img
					src={CloseIcon}
					alt="Fechar"
					onClick={() => props.setOpenMedDetails(!props.isOpenedMedDetails)}
				/>
			</ContainerDetailsHeader>
			<WrapperDetails main>
				<WrapperDetails>
					<DetailsItem>
						<DetailsText title>Medicamento</DetailsText>
						<DetailsText>{(props.medicament.values.PRODUTO) || '-'}</DetailsText>
					</DetailsItem>
					<DetailsItem>
						<DetailsText title>Código</DetailsText>
						<DetailsText>{(props.medicament.values.EAN_1) || '-'}</DetailsText>
					</DetailsItem>
					<DetailsItem>
						<DetailsText title>Validade</DetailsText>
						<DetailsText>{(props.medicament.values.Validade) || '-'}</DetailsText>
					</DetailsItem>
				</WrapperDetails>
				<WrapperDetails>
					<DetailsItem>
						<DetailsText title>Classe Terapêutica</DetailsText>
						<DetailsText>{(props.medicament.values.CLASSE_TERAPEUTICA) || '-'}</DetailsText>
					</DetailsItem>
					<DetailsItem>
						<DetailsText title>Substância</DetailsText>
						<DetailsText>{(props.medicament.values.SUBSTANCIA) || '-'}</DetailsText>
					</DetailsItem>
					<DetailsItem>
						<DetailsText title>Laboratório</DetailsText>
						<DetailsText>{(props.medicament.values.LABORATORIO) || '-'}</DetailsText>
					</DetailsItem>
				</WrapperDetails>
				<WrapperDetails>
					<DetailsItem>
						<DetailsText title>Embalagem Aberta?</DetailsText>
						<DetailsText>{(props.medicament.values['Embalagem Aberta?']) || '-'}</DetailsText>
					</DetailsItem>
					<DetailsItem>
						<DetailsText title>Apresentação</DetailsText>
						<DetailsText>{(props.medicament.values.APRESENTACAO) || '-'}</DetailsText>
					</DetailsItem>
					<DetailsItem>
						<DetailsText title>Quantidade</DetailsText>
						<DetailsText>{(props.medicament.values.QUANTIDADE) || '-'}</DetailsText>
					</DetailsItem>
				</WrapperDetails>
				<WrapperDetails>
					<DetailsItem style={{ width: '100%' }}>
						<DetailsText title>Tipo de Produto</DetailsText>
						<DetailsText>{(props.medicament.values.TIPO_DE_PRODUTO) || '-'}</DetailsText>
					</DetailsItem>
				</WrapperDetails>
				<WrapperDetails>
					<DetailsItem style={{ width: '100%' }}>
						<DetailsText title>Descrição</DetailsText>
						<DetailsText>{(props.medicament.values.DESCRICAO) || '-'}</DetailsText>
					</DetailsItem>
				</WrapperDetails>
			</WrapperDetails>

			<ContainerButton medDetails={props.isOpenedMedDetails}>
				<ButtonMedDetails detail>
					<img src={EditIcon} alt="Editar" />
					<p>Editar</p>
				</ButtonMedDetails>
				<ButtonMedDetails onClick={() => props.setOpenDelModal(!props.isModalDelOpened)}>
					<img src={TrashIcon} alt="Excluir" />
					<p>Excluir</p>
				</ButtonMedDetails>
			</ContainerButton>
		</ContainerDetails>
	</Overlay>
);

export default ModalDetails;
