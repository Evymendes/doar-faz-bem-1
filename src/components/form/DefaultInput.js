// Libs
import React from 'react';
import styled from 'styled-components';

// Images
import IconClose from '../../assets/closeBlue.svg';
import InfoIcon from '../../assets/info.svg';
import EyeOnIcon from '../../assets/eye.svg';
import EyeOffIcon from '../../assets/eyeOff.svg';

// Styles
const Container = styled.div`
	width: ${(props) => (props.containerWidth)};
  margin-bottom: ${(props) => (props.isError || props.createErrorText ? '.2rem' : '1.5rem')};
  /* margin-bottom: ${(props) => (props.isError || props.createErrorText ? '0.5rem' : '1.5rem')}; */

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

const ContenteLabel = styled.div`
	display: flex;
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

const Info = styled.span`
	margin: 0 0 .25rem .5rem;
	color: #000;
	width: 1.3rem;
	height: 1.3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	font-family: 'Overpass', serif;
	font-weight: 400;
	background: #fff;
	border-radius: 50%;
	cursor: pointer;
`;

const ContentInfo = styled.div`
	position: relative;
`;

const ContentModal = styled.div`
	position: absolute;
	top: 21px;
	left: -5rem;
	padding-left: 0.5rem;
	min-width: 200px;
	background: #FFF;
	box-shadow: 0 0 4px #888888;
	border: 1px solid #3cc5b8;
	border-radius: 3px;
	z-index: 5;

	p {
		font: 400 0.85rem 'Overpass', serif;
		margin-top: .8rem;
    margin-bottom: .8rem;
	}

	@media(min-width: 768px) {
		p {
			margin: .5rem 0;
		}
	}

`;

const Icon = styled.img`
	display: none;

	@media(max-width: 768px) {
		display: flex;
		position: absolute;
		top: 2px;
		right: 0;
		margin-bottom: ${(props) => (props.onboardingMarginBottomLittle && '1rem')};
		width: ${(props) => (props.containerLittleWidth)};
	}
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

const EyeIcon = styled.img`
	/* position: absolute;
	right: 1rem;
	bottom: 2rem;
	cursor: pointer;

	@media(max-width: 320px) {
		bottom: 1.5rem;
	} */
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
		<ContenteLabel>
			<Label
				labelColor={props.labelColor}
				labelWidth={props.labelWidth}
				labelMarginRight={props.labelMarginRight}
				labelFontSize={props.labelFontSize}
			>
				{props.label}
			</Label>
			{props.date && (
				<ContentInfo>
					<Info
						onClick={props.handleModalDate}
						onMouseEnter={props.handleModalDate}
						onMouseLeave={props.handleModalDate}
					>
						<img src={InfoIcon} alt="info" />
					</Info>
					{props.isModal && (
						<ContentModal>
							<Icon src={IconClose} onClick={props.handleModalDate} />
							<p>Selecione o mês e o ano de vencimento.</p>
						</ContentModal>
					)}
				</ContentInfo>
			)}
		</ContenteLabel>
		<>
			<Input
				type={props.type}
				value={props.text || ''}
				onChange={props.onChange}
				placeholder={props.placeholder || ''}
				isError={props.isError}
				disabled={props.disabled}
				isData={props.text}
				style={props.style}
				required={props.required}
				inputColor={props.inputColor}
				boxShadow={props.boxShadow}
				inputBg={props.inputBg}
			/>
			{props.isEyeIcon && (props.eyeShowing
				? <EyeIcon
					src={EyeOffIcon}
					alt="escondendo senha"
					onClick={props.onClickEyeIcon}
				/>
				: <EyeIcon
					src={EyeOnIcon}
					alt="mostrando senha"
					onClick={props.onClickEyeIcon}
				/>
			)}
		</>
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
	required: true,
	marginBottom: '1.5rem',
};

export default DefaultInput;
