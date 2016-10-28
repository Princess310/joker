import React, {Component} from 'react';
import AdminLogin from './AdminLogin';
import AdminContent from './AdminContent';

class Admin extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let page =  <AdminLogin />;

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