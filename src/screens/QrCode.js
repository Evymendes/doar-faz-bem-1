import React, { Component } from 'react';
import styled from 'styled-components';
// import { Cameras, Scanner } from "react-instascan";

import QrReader from 'react-qr-reader'

//Import

// Styles
const Container = styled.div`
	width: 20vw;
	/* height: 30%; */
`;

class QrCode extends Component {
	state = {
		result: 'No result',
	}

	handleScan = (data) => {
		if (data) {
			this.setState({
				result: data,
			});
		}
	}

	handleError = (err) => {
		console.error(err);
	}

	render() {
		return (
			<div>
				<Container>
					<QrReader
						delay={100}
						onError={this.handleError}
						onScan={this.handleScan}
						style={{ width: '100%', borderColor: 'pink'}}
					/>
					<p>{this.state.result}</p>
				</Container>
			</div>
		);
	}
}

export default QrCode;
