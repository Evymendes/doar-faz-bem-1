// Libs
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Screens
import Onboarding from '../screens/Onboarding';
import Scanner from '../screens/Scanner';
// import QrCode from '../screens/QrCode';
import AddMoreInfo from '../screens/AddMoreInfo';
import Dashboard from '../screens/Dashboard';

import PrivateRoute from './PrivateRoute';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Onboarding} />
			<Route exact path='/doar-faz-bem' component={Onboarding} />
			<PrivateRoute path='/scanner' component={Scanner} />
			<PrivateRoute path='/addmoreinfo' component={AddMoreInfo} />
			<PrivateRoute path='/dashboard' component={Dashboard} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
