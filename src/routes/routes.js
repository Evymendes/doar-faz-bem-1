// Libs
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Onboarding
import PrivateRoute from './PrivateRoute';

import Scanner from '../screens/Scanner';
import QrCode from '../screens/QrCode';


const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Scanner} />
			<Route exact path='/QrCode' component={QrCode} />
			{/* <Route exact path='/' component={Login} /> */}
			{/* <PrivateRoute path='/documents' component={DocumentsScreen} /> */}
		</Switch>
	</BrowserRouter>
);

export default Routes;
