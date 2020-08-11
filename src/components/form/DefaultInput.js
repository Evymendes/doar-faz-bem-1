// Libs
import React from 'react';
import styled from 'styled-components';

// Styles
const Container = styled.div`
	width: ${(props) => (props.containerWidth)};
  margin-bottom: ${(props) => (props.isError || props.createErrorText ? '0.5rem' : '1.5rem')};
	display: ${(props) => (props.containerDisplay && 'flex')};
	align-items: ${(props) => (props.containerAlignItems && 'center')};
	border-bottom: ${(props) => (props.containerBorderBottom)};
	border-bottom: ${(props) => (props.createError && '2px solid red')};
`;

const Label = styled.label`
	margin-right: ${(props) => (props.labelMarginRight)};
	width: ${(props) => (props.labelWidth ? props.labelWidth : '90%')};
	color: ${(props) => (props.labelColor ? props.labelColor : '#FFF')};
	font-weight: 700;
	font-size: ${(props) => (props.labelFontSize ? props.labelFontSize : '1rem')};
	font-family: 'Overpass', serif;
	white-space: nowrap;
`;

const Input = styled.input`
	padding: 0 0.7rem;
  width: 100%;
	height: 2.7rem;
	color: ${(props) => (props.isData ? '#989494' : '#38D5D5')};
	font: 700 1rem 'Overpass', serif;
	text-decoration: none;
	background: ${(props) => (props.inputBg ? props.inputBg : '#FFF')};
	outline: none;
  border: ${(props) => (props.isError ? '2px solid red' : 'none')};
	border-radius: 4px;
	box-shadow: ${(props) => (props.boxShadow ? props.boxShadow : '2px 2px 2px #888888')};

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

const DefaultInput = (props) => (
	<Container
		isError={props.isError}
		containerWidth={props.containerWidth}
		containerDisplay={props.containerDisplay}
		containerAlignItems={props.containerAlignItems}
		containerBorderBottom={props.containerBorderBottom}
		createError={props.createError}
		createErrorText={props.createErrorText}
	>
		<Label
			labelColor={props.labelColor}
			labelWidth={props.labelWidth}
			labelMarginRight={props.labelMarginRight}
			labelFontSize={props.labelFontSize}
		>
			{props.label}
		</Label>
		<Input
			type={props.type}
			value={props.text || ''}
			onChange={props.onChange}
			placeholder={props.placeholder || ''}
			isError={props.isError}
			disabled={props.disabled}
			isData={props.text}
			style={props.style}
			required
			inputColor={props.inputColor}
			boxShadow={props.boxShadow}
			inputBg={props.inputBg}
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
	placeholder: 'Digite aqui...',
};

export default DefaultInput;
