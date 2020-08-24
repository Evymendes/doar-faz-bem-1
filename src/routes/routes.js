// Libs
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Screens
import Onboarding from '../screens/Onboarding';
import Scanner from '../screens/Scanner';
import AddMoreInfo from '../screens/AddMoreInfo';
import Medicaments from '../screens/Medicaments';
import Dashboard from '../screens/Dashboard';
import SearchMedicament from '../components/dashboard/SearchMedicament';
import MedicamentInfo from '../screens/MedicamentInfo';

import PrivateRoute from './PrivateRoute';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Onboarding} />
			<Route exact path='/doar-faz-bem' component={Onboarding} />
			<PrivateRoute path='/scanner' component={Scanner} />
			<PrivateRoute path='/addmoreinfo' component={AddMoreInfo} />
			<PrivateRoute path='/medicaments' component={Medicaments} />
			<PrivateRoute path='/dashboard' component={Dashboard} />
			<PrivateRoute path='/searchMedicament' component={SearchMedicament} />
			<PrivateRoute path='/medicamentInfo' component={MedicamentInfo} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
