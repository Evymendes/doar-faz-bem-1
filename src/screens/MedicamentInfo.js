/* eslint-disable react/jsx-key */
import React from 'react';
import styled from 'styled-components';

// Components
import Header from '../components/Header';
import Table from '../components/dashboard/Table';

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const Content = styled.div`
	margin-top: 8rem;
	margin-left: 5rem;
	margin-right: 5rem;

	@media(max-width: 768px) {
		margin-left: 2rem;
		margin-right: 2rem;
	}

	@media(max-width: 648px) {
		margin-top: 6.2rem;
    margin-left: 0;
    margin-right: 0;
	}
`;

function MedicamentInfo(props) {
	const handleBack = () => {
		props.history.push({
			pathname: '/searchMedicament',
		});
	};

	return (
		<Container>
			<Header openModal={handleBack} isWhite />
			<Content>
				<Table medicament={props.history.location.state.result} />
			</Content>
		</Container>
	);
}

export default MedicamentInfo;
