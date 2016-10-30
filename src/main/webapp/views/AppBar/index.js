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
		history.push('login')
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
		return (
			<IconMenu
				{...this.props}
				iconButtonElement={
					<IconButton><MoreVertIcon /></IconButton>
				}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
			>
			<MenuItem primaryText="Refresh" />
			<MenuItem primaryText="Help" />
			<MenuItem primaryText="Sign out" onClick={(e) => this.handleLogoff(e)} />
		</IconMenu>
		);
	}
}

class AppBarMenu extends Component {
	state = {
		logged: (user !== null && user.id),
		showProgress: false
	};

	render() {
		let rightIcon = this.state.logged ? <Logged /> : <Login />;
		let hash = window.location.hash.substr(1);

		// If its login page, add the link to index
		if(hash.includes("login") || (hash.includes("admin") && !this.state.logged)) {
			rightIcon = (<Link to="/" ><FlatButton style={{
				color:"#ffffff",
				marginTop:7
			}} label='Welcome'/></Link>);
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


export default AppBarMenu;