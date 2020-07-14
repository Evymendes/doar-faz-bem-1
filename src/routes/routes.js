// Libs
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Onboarding
// import Login from '../screens/onboarding/Login/LoginScreen';

import Scanner from '../screens/Scanner';

// import PrivateRoute from './PrivateRoute';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Scanner} />
			{/* <Route exact path='/' component={Login} /> */}
			{/* <PrivateRoute path='/documents' component={DocumentsScreen} /> */}
		</Switch>
	</BrowserRouter>
);

export default Routes;
