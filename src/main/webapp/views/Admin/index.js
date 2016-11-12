import React, {Component} from 'react';
import { history } from 'routes';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AdminAppBar from './AdminAppBar';
import AdminBottomNavigation from './AdminBottomNavigation';
import Grid from 'components/Grid';
import styles from "./styles.less";

class Admin extends Component {
	getChildContext(){
		return {user: user};
	}

	constructor(props) {
		super(props);
	}

	render() {
		const { location } = this.props;
		const logged = (user !== null && user.admin)
		if(!logged){
			history.push("login");
		}

		return (
			<MuiThemeProvider>
				<div className="AdminView">
					<AdminAppBar />
					<Paper className={logged ? "container" : "container fill"}>
						{this.props.children}
					</Paper>
					{ logged && <AdminBottomNavigation path={location.pathname} />}
					<Grid />
				</div>
			</MuiThemeProvider>
		)
	}
}

Admin.childContextTypes = {
	user: React.PropTypes.object
};


export default Admin;