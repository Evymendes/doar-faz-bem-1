// Libs
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Screens
import Onboarding from '../screens/Onboarding';
import Scanner from '../screens/Scanner';
import QrCode from '../screens/QrCode';
import AddMoreInfo from '../screens/AddMoreInfo';
import Dashboard from '../screens/Dashboard';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Onboarding} />
			<Route exact path='/doar-faz-bem' component={Onboarding} />
			<Route path='/scanner' component={Scanner} />
			<Route path='/qrcode' component={QrCode} />
			<Route path='/addmoreinfo' component={AddMoreInfo} />
			<Route path='/dashboard' component={Dashboard} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
