// Libs
import React, { Component } from 'react';
import styled from 'styled-components';

// Components
// import ImageLogo from '../../../components/ImageLogo';
import CloseIcon from '../assets/fechar.svg';

// Styles
const Container = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1rem;

	img {
		width: 1.2rem;
		cursor: pointer;
	}
`;

class Header extends Component {
	state = {
	}

	render() {
		return (
			<Container>
				<div
					style={{
						width: '4rem',
						height: '4rem',
						borderRadius: '50%',
						background: '#000',
						boxShadow: '5px 5px 6px #888888',
					}}
				/>
				<img
					src={CloseIcon}
					alt='Fechar'
					onClick={this.props.openModal}
				/>
			</Container>
		);
	}
}

export default Header;
