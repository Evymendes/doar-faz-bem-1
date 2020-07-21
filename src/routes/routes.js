// Libs
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Screens
import Login from '../screens/Login';
import Scanner from '../screens/Scanner';
import QrCode from '../screens/QrCode';
import AddMoreInfo from '../screens/AddMoreInfo';
// import PrivateRoute from './PrivateRoute';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Login} />
			<Route exact path='/doar-faz-bem' component={Login} />
			<Route path='/scanner' component={Scanner} />
			<Route path='/qrcode' component={QrCode} />
			<Route path='/addmoreinfo' component={AddMoreInfo} />
			{/* <PrivateRoute path='/documents' component={DocumentsScreen} /> */}
		</Switch>
	</BrowserRouter>
);

export default Routes;
