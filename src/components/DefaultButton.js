// Libs
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Styles
const pressAnimation = keyframes`
  100% {
		transform: translateY(2px);
    box-shadow: none;
  }
`;

const Button = styled.button`
	margin: ${(props) => props.margin};
	width: 100%;
	max-width: 20rem;
	height: 3.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	font-weight: bold;
	color: ${(props) => props.color};
	text-decoration: none;
	background: ${(props) => props.background};
	border: ${(props) => props.border};
	border-radius: 50px;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
	cursor: pointer;
	animation: ${(props) => (props.pressed ? pressAnimation : '')} 0.5s ease forwards;

	&:hover {
		background: ${(props) => props.backgroundHover};
	}

	@media(min-width: 320px) {
		font-size: .95rem;
	}
`;

const DefaultButton = (props) => {
	const [pressed, setPressed] = useState(false);

	const handleClick = () => {
		setPressed((pressed) => !pressed);
		if (!pressed) {
			setTimeout(() => {
				props.handleClick();
			}, 550);
		}
	};

	return (
		<Button
			margin={props.margin}
			color={props.color}
			background={props.background}
			backgroundHover={props.backgroundHover}
			border={props.border}
			pressed={pressed}
			onClick={handleClick}
			style={props.styles}
			disabled={props.disabled}
		>
			{props.text}
		</Button>
	);
};

DefaultButton.defaultProps = {
	text: 'Confirmar',
	margin: '1rem 0',
	color: '#FFF',
	background: '#49E5D6',
	backgroundHover: '#38D5D5',
	border: 'none',
};

export default DefaultButton;
