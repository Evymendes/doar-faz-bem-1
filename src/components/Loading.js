/* eslint-disable class-methods-use-this */
// Libs
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

//
const Container = styled.div`
	width: 100vw;
	height: 100vh;
	z-index: 1;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	min-width: 100%;
	min-height: 100%;
	background-color: #49E5D6;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const TextLoading = styled.h2`
	margin-bottom: 1rem;
	color: #fff;
	font-size: 1.5rem;
  font-weight: 600;
	font-family: "Overpass", Regular;
`;

const animation = keyframes`
  0%{
    background-position: -400px 0;
  }
  100%{
    background-position: 400px 0;
  }
`;

const LoadingAnimation = styled.span`
  margin-bottom: 1.313rem;
  width: 300px;
  height: 3.5px;
  border-radius: 4px;
	animation-duration:  3s;
	animation-fill-mode: forwards;
	animation-iteration-count: infinite;
	animation-name: ${animation};
	animation-timing-function: linear;
	background: linear-gradient(to right, #38c7ba 0%, #fff 100%, #38c7ba 0% );
	background-size: 1000px 104px;
	overflow: hidden;
`;

const Loading = () => (
	<Container>
		<TextLoading>Carregando...</TextLoading>
		<LoadingAnimation />
	</Container>
);

export default Loading;
