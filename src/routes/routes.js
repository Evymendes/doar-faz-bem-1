// Libs
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Onboarding
import TestScreens from '../screens/testScreens';

import PrivateRoute from './PrivateRoute';


const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={TestScreens} />
			{/* <PrivateRoute path='/documents' component={DocumentsScreen} /> */}
		</Switch>
	</BrowserRouter>
);

export default Routes;
