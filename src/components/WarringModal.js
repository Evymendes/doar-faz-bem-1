// Libs
import React from 'react';
import styled from 'styled-components';

// Components
import DefaultButton from './DefaultButton';

// Assets
import { ReactComponent as CloseIcon } from '../assets/fechar.svg';

// Styles
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

const Container = styled.div`
	position: relative;
	padding: 2rem;
	max-width: 33%;
	border-radius: 6px;
	background: #fff;

	@media(max-width: 667px) and (orientation: landscape) {
		padding: 1rem;
		max-width: 75%;
	}
`;

const Icon = styled(CloseIcon)`
	stroke: red;
	cursor: pointer;
	position: absolute;
	top: 3%;
	right: 2%;
	width: 1rem;
`;

const Text = styled.p`
	padding-bottom: ${(props) => (props.title ? '1.5rem' : '1rem')};
	color: ${(props) => (props.title ? '#D8998A' : '#404040')};
	font-size: ${(props) => (props.title ? '1.3rem' : '.95rem')};
	font-family: "Overpass", Regular;
	font-weight: ${(props) => (props.title ? '800' : '400')};
`;

const ContainerButton = styled.div`
	margin-top: .8rem;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const WarringModal = (props) => {
	const handleClick = () => {
		props.handleClick();
	};

	return (
		<Overlay>
			<Container>
				<Icon strokeWidth={'3'}
					style={{
						stroke: '#d8998a',
						cursor: 'pointer',
						position: 'absolute',
						top: '3%',
						right: '2%',
						width: '1rem',
					}}
					onClick={handleClick}
				/>
				<Text title>Mensagem de Incompatibilidade</Text>
				<Text>{props.firsText}</Text>
				<Text>{props.secText}</Text>
				<ContainerButton>
					<DefaultButton
						margin='0'
						background='#D8998A'
						backgroundHover='#ce9385'
						handleClick={props.modalCloseWarring}
						text={props.desk || 'Ok'}
					/>
				</ContainerButton>
			</Container>
		</Overlay>
	);
};

WarringModal.defaultProps = {
	margin: '1rem 0',
	color: '#c7c7c7',
	background: '#fff',
	border: 'none',
};

export default WarringModal;
