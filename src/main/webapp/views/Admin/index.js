import React, {Component} from 'react';
import Login from 'views/Login';
import AdminContent from './AdminContent';

class Admin extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let page =  <Login />;

		if(user !== null && user.id){
			page = <AdminContent />;
		}

		return (
			<div>
				{page}
			</div>
		)
	}
}


export default Admin;