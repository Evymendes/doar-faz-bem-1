// Libs
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Onboarding
// import PrivateRoute from './PrivateRoute';

import Login from '../screens/Login';
import Scanner from '../screens/Scanner';
import QrCode from '../screens/QrCode';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Login} />
			<Route exact path='/doar-faz-bem' component={Login} />
			<Route path='/scanner' component={Scanner} />
			<Route path='/qrcode' component={QrCode} />
			{/* <PrivateRoute path='/documents' component={DocumentsScreen} /> */}
		</Switch>
	</BrowserRouter>
);

export default Routes;
