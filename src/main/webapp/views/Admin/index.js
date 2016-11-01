import React, {Component} from 'react';
import { history } from 'routes';
import Paper from 'material-ui/Paper';
import AdminBottomNavigation from './AdminBottomNavigation';
import styles from "./styles.less";

class Admin extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if(user === null || (user !== null && !user.admin)){
			window.location.href = "";
		}

		return (
			<div className="AdminView">
				<Paper className="container">
					{this.props.children}
				</Paper>
				<AdminBottomNavigation />
			</div>
		)
	}
}


export default Admin;