// Libs
import React from 'react';
import styled from 'styled-components';

//Assets
import ChevronDown from '../../assets/chevron-down.svg';

// Styles
const Container = styled.div`
	width: 45%;
  margin-bottom: ${(props) => (props.isError || props.createErrorText ? '0.5rem' : '1.5rem')};
	margin-bottom: ${(props) => (props.onboardingMarginBottom && '1.25rem')};
	display: ${(props) => (props.containerDisplay && 'flex')};
	align-items: ${(props) => (props.containerAlignItems && 'center')};
	border-bottom: 2px solid red;

	@media(max-width: 320px) {
		margin-bottom: ${(props) => (props.onboardingMarginBottomLittle && '1rem')};
		width: ${(props) => (props.containerLittleWidth)};
	}

	@media(min-width: 768px) {
		width: ${(props) => (props.containerWidthDesk)};
	}
`;

const Label = styled.label`
	color: #FFF;
	font-weight: 700;
	font-size: 1rem;
	font-family: 'Overpass', serif;
	white-space: nowrap;
`;

const Input = styled.div`
	padding: 0 0.7rem;
	width: 100%;
	height: 2.7rem;
	color: ${(props) => (props.isData ? '#989494' : '#38D5D5')};
	font: 700 .9rem 'Overpass', serif;
	text-decoration: none;
	background: #FFF;
  border: ${(props) => (props.isError ? '2px solid red' : 'none')};
	border-radius: 4px;
	box-shadow: 2px 2px 2px #888888;
	display: flex;
	justify-content: space-between;
	align-items: center;

	::placeholder {
		color: ${(props) => (props.isData || props.inputColor ? '#989494' : '#38D5D5')};
	}
`;

const ErrorMessage = styled.p`
	margin-top: .3rem;
  color: red;
	font: 400 .9rem 'Overpass', serif;
	display: flex;
	justify-content: flex-end;
`;

const InputDate = (props) => (
	<Container
		isError={props.isError}
		containerWidth={props.containerWidth}
		containerLittleWidth={props.containerLittleWidth}
		containerWidthDesk={props.containerWidthDesk}
		containerDisplay={props.containerDisplay}
		containerAlignItems={props.containerAlignItems}
		createError={props.createError}
		createErrorText={props.createErrorText}
		onboardingMarginBottom={props.onboardingMarginBottom}
		onboardingMarginBottomLittle={props.onboardingMarginBottomLittle}
	>
		<Label>
			{props.label}
		</Label>
		<Input
			isError={props.isError}
			onChange={props.onChange}
		>
			<span>{props.placeholder}</span>
			<img src={ChevronDown} />
		</Input>
		{props.isError && (
			<ErrorMessage>
				*Campo obrigatório.
			</ErrorMessage>
		)}
	</Container>
);

InputDate.defaultProps = {
	Label: '',
	type: 'text',
	placeholder: 'Digite aqui...',
};

export default InputDate;
