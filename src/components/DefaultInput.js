// Libs
import React from 'react';
import styled from 'styled-components';

// Styles
const Container = styled.div`
  margin-bottom: ${(props) => (props.isError ? '0.5rem' : '1.5rem')};
`;

const Label = styled.label`
	font: 700 1rem 'Overpass', serif;
	width: 90%;
	color: #FFF;
`;

const Input = styled.input`
	padding: 0 0.7rem;
  width: 100%;
	height: 2.7rem;
	color: ${(props) => (props.isData ? '#989494' : '#38D5D5')};
	font: 700 1rem 'Overpass', serif;
	text-decoration: none;
	background: #FFF;
	outline: none;
  border: ${(props) => (props.isError ? '2px solid red' : 'none')};
	border-radius: 4px;
	box-shadow: 2px 2px 2px #888888;

	::placeholder {
		color: ${(props) => (props.isData ? '#989494' : '#38D5D5')};
	}
`;

const ErrorMessage = styled.p`
	margin-top: .3rem;
  color: red;
	font: 400 .9rem 'Overpass', serif;
	display: flex;
	justify-content: flex-end;
`;

const DefaultInput = (props) => (
	<Container isError={props.isError}>
		<Label> {props.label} </Label>
		<Input
			type={props.type}
			value={props.text || ''}
			onChange={props.onChange}
			placeholder='Digite aqui...'
			isError={props.isError}
			disabled={props.isDisabled}
			isData={props.text}
		/>
		{props.isError && (
			<ErrorMessage>
				*Campo obrigatório.
			</ErrorMessage>
		)}
	</Container>
);

DefaultInput.defaultProps = {
	Label: '',
	type: 'text',
};

export default DefaultInput;
