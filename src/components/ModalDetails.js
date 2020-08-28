// Libs
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/pt-br';

// Components
import { ReactComponent as CloseIcon } from '../assets/fechar.svg';

// Images
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
	overflow-y: hidden;

	@media(min-width: 1024px) {
		justify-content: center;
		align-items: center;
	}
`;

const ContainerDetails = styled.div`
	width: 100%;
	min-height: auto;
	display: flex;
	flex-direction: column;
	background-color: #fff;
	font-family: 'Overpass', Regular;

	@media (max-width: 768px) and (orientation: landscape) {
		overflow-y: scroll;
		height: 100%;
		overflow-y: scroll;

		::-webkit-scrollbar {
			width: 4px;
		}
		::-webkit-scrollbar-track {
			background: #fff;
		}
		::-webkit-scrollbar-thumb {
			background: #fff;
		}
		::-webkit-scrollbar-thumb:hover {
			background: #fff;
		}
	}


	@media(min-width: 1024px) {
		border-radius: 10px;
		min-width: 50%;
		width: 35%;
	}

	@media(min-width: 1440px) {
		min-width: 35%;
		width: 35%;
	}
`;

const WrapperDetails = styled.div`
	padding-top: ${(props) => (props.main && '1rem')};
	padding-left: ${(props) => (!props.main && '.3rem')};
	height: ${(props) => (props.main && '100%')};
	display:  ${(props) => (!props.main && 'flex')};
	align-items: baseline;
	background: #FFF;

	@media(min-width: 1024px) {
		padding-left: ${(props) => (!props.main && '1rem')};
	}
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

	@media(min-width: 1024px) {
		padding: 1.5rem 1.8rem;
	}
`;

const DetailsItem = styled.span`
	padding: 0 0.8rem 1.5rem 0.8rem;
	width: 35%;
	display: flex;
	justify-content: center;
	flex-direction: column;

	@media(max-width: 425px) {
		width: ${(props) => (props.widthMob ? props.widthMob : '35%')};
	}
`;

const DetailsText = styled.p`
	padding-top:  ${(props) => (!props.title && '.2rem')};
	color: ${(props) => (props.title ? '#D8998A' : '#404040')};
	font-size: ${(props) => (props.title ? '1rem' : '.85rem')};
	font-weight: ${(props) => (props.title ? '600' : '400')};

	@media(min-width: 1024px) {
		font-size: ${(props) => (props.title ? '1rem' : '.85rem')};
	}
`;

const ContainerButton = styled.div`
	margin-top: 1rem;
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

const handleRedirectScreen = (props) => {
	props.history.push({
		pathname: '/addmoreinfo',
		state: {
			result: props.medicament.original,
			medIdToEdit: props.medicament.original.objectId,
		},
	});
};

const formatDate = (props) => {
	const date = props.medicament.values['Cadastrado Em'];

	return moment(date).locale('pt-br').format('DD/MM/YYYY');
};

const formatExpirationDate = (date) => date
	.substr(0, 7)
	.split('-')
	.reverse()
	.join('/');

const ModalDetails = (props) => {
	const medicament = props.medicament.values;

	return (
		<Overlay onClick={() => props.setOpenMedDetails(!props.isOpenedMedDetails)}>
			<ContainerDetails onClick={(e) => e.stopPropagation()}>
				<ContainerDetailsHeader>
					<p>Cadastrado em {formatDate(props) || '-'}</p>
					<CloseIcon
						alt="Fechar"
						strokeWidth={'1.5'}
						style={{ stroke: '#D8998A', cursor: 'pointer' }}
						onClick={() => props.setOpenMedDetails(!props.isOpenedMedDetails)}
					/>
				</ContainerDetailsHeader>
				<WrapperDetails main>
					<WrapperDetails>
						<DetailsItem>
							<DetailsText title>Medicamento</DetailsText>
							<DetailsText>
								{(medicament.PRODUTO.charAt(0).toUpperCase()
								+ medicament.PRODUTO.slice(1).toLowerCase()) || '-'}
							</DetailsText>
						</DetailsItem>
						<DetailsItem>
							<DetailsText title>Código</DetailsText>
							<DetailsText>{(props.medicament.original.EAN_1) || '-'}</DetailsText>
						</DetailsItem>
						<DetailsItem>
							<DetailsText title>Validade</DetailsText>
							<DetailsText>{(formatExpirationDate(medicament['DATA_EXPIRACAO.iso'])) || '-'}</DetailsText>
						</DetailsItem>
					</WrapperDetails>
					<WrapperDetails>
						<DetailsItem>
							<DetailsText title>Tipo de Produto</DetailsText>
							<DetailsText>
								{(props.medicament.original.TIPO_DE_PRODUTO.charAt(0).toUpperCase()
								+ props.medicament.original.TIPO_DE_PRODUTO.slice(1)) || '-'}
							</DetailsText>
						</DetailsItem>
						<DetailsItem>
							<DetailsText title>Substância</DetailsText>
							<DetailsText>
								{(medicament.SUBSTANCIA && medicament.SUBSTANCIA.charAt(0).toUpperCase()
								+ medicament.SUBSTANCIA.slice(1).toLowerCase()) || '-'}
							</DetailsText>
						</DetailsItem>
						<DetailsItem>
							<DetailsText title>Laboratório</DetailsText>
							<DetailsText>
								{(medicament.LABORATORIO && medicament.LABORATORIO.charAt(0).toUpperCase()
								+ medicament.LABORATORIO.slice(1).toLowerCase()) || '-'}
							</DetailsText>
						</DetailsItem>
					</WrapperDetails>
					<WrapperDetails>
						<DetailsItem>
							<DetailsText title>Embalagem Aberta?</DetailsText>
							<DetailsText>{(medicament['Embalagem Aberta?']) || '-'}</DetailsText>
						</DetailsItem>
						<DetailsItem>
							<DetailsText title>Apresentação</DetailsText>
							<DetailsText>
								{(medicament.APRESENTACAO.charAt(0).toUpperCase() + medicament.APRESENTACAO.slice(1)) || '-'}
							</DetailsText>
						</DetailsItem>
						<DetailsItem>
							<DetailsText title>Quantidade</DetailsText>
							<DetailsText>{(medicament.QUANTIDADE) || '-'}</DetailsText>
						</DetailsItem>
					</WrapperDetails>
					<WrapperDetails>
						<DetailsItem widthMob={'50%'}>
							<DetailsText title>Classe Terapêutica</DetailsText>
							<DetailsText>
								{(medicament.CLASSE_TERAPEUTICA.charAt(0).toUpperCase()
								+ medicament.CLASSE_TERAPEUTICA.slice(1).toLowerCase()) || '-'}
							</DetailsText>
						</DetailsItem>
						<DetailsItem style={{ padding: 0 }}>
							<DetailsText title>Preço</DetailsText>
							<DetailsText>
								{(medicament.PMC_20_PERC) ? `R$ ${medicament.PMC_20_PERC}` : '-'}
							</DetailsText>
						</DetailsItem>
					</WrapperDetails>
					<WrapperDetails>
						<DetailsItem style={{ width: '100%' }}>
							<DetailsText title>Descrição</DetailsText>
							<DetailsText>
								{(medicament.DESCRICAO) || '-'}
							</DetailsText>
						</DetailsItem>
					</WrapperDetails>
				</WrapperDetails>

				<ContainerButton medDetails={props.isOpenedMedDetails}>
					<ButtonMedDetails detail onClick={() => handleRedirectScreen(props)}>
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
};

export default ModalDetails;
