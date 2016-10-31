import React, {Component} from 'react';
import { history } from 'routes';
import Login from 'views/Login';
import Dashboard from 'views/Dashboard';
import AdminContent from './AdminContent';

class Admin extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let page =  <Login />;

		if(user !== null && user.id){
			if(user.admin){
				page = <AdminContent />;
			}else {
				page = <Dashboard />;
			}
		}

		return (
			<div>
				{page}
			</div>
		)
	}
}


export default Admin;