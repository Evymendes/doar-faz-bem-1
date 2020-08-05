// Libs
import React from 'react';
import styled from 'styled-components';

// Assets
import ChevronDown from '../../assets/chevron-down.svg';

// Styles
const Container = styled.div`
  margin-bottom: ${(props) => (props.isError ? '0.5rem' : '1.5rem')};
`;

const Title = styled.p`
	font: 700 1rem 'Overpass', serif;
	width: 90%;
	color: #FFF;
`;

const Content = styled.div`
	padding: 0 0.7rem;
	width: 100%;
	height: 2.7rem;
	color: #989494;
	font: 700 1rem 'Overpass', serif;
	text-decoration: none;
	background: #FFF;
	outline: none;
	border: ${(props) => (props.isError ? '2px solid red' : 'none')};
	border-radius:${(props) => (props.isModal ? '4px 4px 0 0' : '4px')};
	box-shadow: 2px 2px 2px #888888;
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
`;

const ContentText = styled.p`
	color: ${(props) => (props.isData ? '#989494' : '#38D5D5')};
	text-transform: capitalize;
`;

const Icon = styled.img`
	transform: ${(props) => (props.isRotation) && 'rotate(180deg)'};
	transition-duration: 0.4s;
`;

const DropDown = styled.div`
	background: #FFF;
	height: ${(props) => (props.apresentation ? '7.5rem' : null)};
	display: flex;
	flex-direction: column;
	box-shadow: rgb(136, 136, 136) 1px 1px 2px 1px;
	overflow-y: ${(props) => (props.apresentation ? 'scroll' : null)};

	::-webkit-scrollbar {
  width: 4px;
	}
	::-webkit-scrollbar-track {
  	background: #fff;
	}
	::-webkit-scrollbar-thumb {
  	background: #38D5D5;
	}
	::-webkit-scrollbar-thumb:hover {
  	background: #38D5D5;
	}

`;

const Text = styled.p`
	padding: 0.35rem 0 0.35rem 0.7rem;
	font: 400 0.9rem 'Overpass', serif;
	color:#989494;
	text-transform: capitalize;
	cursor: pointer;

	&:hover {
		background: #98949457;
	}
`;

const ErrorMessage = styled.p`
	margin-top: .3rem;
  color: red;
	font: 400 .9rem 'Overpass', serif;
	display: flex;
	justify-content: flex-end;
`;

const DefaultDropDown = (props) => (
	<Container isError={props.isError}>
		<Title> {props.title}</Title>
		<Content isModal={props.isModal} isError={props.isError} onClick={props.onClick}>
			<ContentText isData={props.selectedText}>{props.selectedText || 'clique para selecionar'}</ContentText>
			<Icon isRotation={props.isRotation} src={ChevronDown} alt="DropDown" />
		</Content>
		{props.isModal
			&& <DropDown apresentation={props.type}>
				{props.item.map((item, index) => (
					<Text key={index} apresentation={props.type} onClick={() => props.inClickSelected(item)}>{item}</Text>
				))}
			</DropDown>
		}
		{props.isError && (
			<ErrorMessage>
				*Campo obrigatório.
			</ErrorMessage>
		)}
	</Container>
);

DefaultDropDown.defaultProps = {
	Title: '',
};

export default DefaultDropDown;
