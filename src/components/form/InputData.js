// Libs
import React from 'react';
import styled from 'styled-components';

// Styles
const Container = styled.div`
	width: ${(props) => (props.containerWidth)};
  margin-bottom: ${(props) => (props.isError || props.createErrorText ? '0.5rem' : '1.5rem')};
	margin-bottom: ${(props) => (props.onboardingMarginBottom && '1.25rem')};
	display: ${(props) => (props.containerDisplay && 'flex')};
	align-items: ${(props) => (props.containerAlignItems && 'center')};
	border-bottom: ${(props) => (props.containerBorderBottom)};
	border-bottom: ${(props) => (props.createError && '2px solid red')};

	@media(max-width: 320px) {
		margin-bottom: ${(props) => (props.onboardingMarginBottomLittle && '1rem')};
		width: ${(props) => (props.containerLittleWidth)};
	}

	@media(min-width: 768px) {
		width: ${(props) => (props.containerWidthDesk)};
	}
`;

const ContentLabel = styled.div`
	display: flex;
	width: 100%;
	height: 2rem;
	align-items: flex-end;
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

const Icon = styled.span`
	margin: 0 0 0.3rem 0.5rem;
	width: 1.3rem;
	height: 1.2rem;
	font-size: 1rem;
	font-weight: bold;
	border-radius: 2rem;
	background: red;
	display: flex;
	align-items: center;
	justify-content: space-around;
	font-weight: 600;
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

const InputData = (props) => (
	<Container
		isError={props.isError}
		containerWidth={props.containerWidth}
		containerLittleWidth={props.containerLittleWidth}
		containerWidthDesk={props.containerWidthDesk}
		containerDisplay={props.containerDisplay}
		containerAlignItems={props.containerAlignItems}
		containerBorderBottom={props.containerBorderBottom}
		createError={props.createError}
		createErrorText={props.createErrorText}
		onboardingMarginBottom={props.onboardingMarginBottom}
		onboardingMarginBottomLittle={props.onboardingMarginBottomLittle}
	>
		<ContentLabel>
			<Label
				labelColor={props.labelColor}
				labelWidth={props.labelWidth}
				labelMarginRight={props.labelMarginRight}
				labelFontSize={props.labelFontSize}
			>
				{props.label}
			</Label>
			{props.data && <Icon isModal={props.isModal}>!</Icon>}
		</ContentLabel>
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

InputData.defaultProps = {
	Label: '',
	type: 'text',
	placeholder: 'Digite aqui...',
};

export default InputData;
