import React, {Component} from 'react';
import { history } from 'routes';
import { Link } from 'react-router';
import fetch from 'utils/fetch';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import LinearProgress from 'material-ui/LinearProgress';

class Login extends Component {
	static muiName = 'FlatButton';

	handleClick(e) {
		history.push('login');
	}

	render() {
		return (
			<FlatButton {...this.props} label="Login" onClick={(e) => this.handleClick(e)}/>
		);
	}
}

class Logged extends Component {
	static muiName = 'IconMenu';

	handleLogoff(e) {
		fetch.doGet("logoff").then((response) => {
			window.location.href = "";
		});
	}

	render() {
		const admin = user !== null && user.id && user.admin;
		return (
			<IconMenu
				{...this.props}
				iconButtonElement={
					<IconButton><MoreVertIcon /></IconButton>
				}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
			>
			<MenuItem primaryText="Index" onClick={(e) => window.location.href = "../"}/>
			<MenuItem primaryText="Sign out" onClick={(e) => this.handleLogoff(e)} />
		</IconMenu>
		);
	}
}

class AdminAppBar extends Component {
	state = {
		logged: (this.context.user !== null && this.context.user.id),
		showProgress: false
	};

	render() {
		let rightIcon = this.state.logged ? <Logged /> : <Login />;
		let hash = window.location.hash.substr(1);

		// If its login page, add the link to index
		if(hash.includes("login") || (hash.includes("admin") && !this.state.logged)) {
			rightIcon = (<div></div>);
		}

		return (
			<div>
				<AppBar
					title="Joker" 
					iconElementRight={rightIcon}
				/>
				{this.state.showProgress && <LinearProgress mode="indeterminate" />}
			</div>
		)
	}
}

AdminAppBar.contextTypes = {
	user: React.PropTypes.object
};


export default AdminAppBar;