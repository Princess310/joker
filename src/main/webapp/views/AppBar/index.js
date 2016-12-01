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

class Menu extends Component {
	static muiName = 'IconMenu';

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
			<MenuItem primaryText="Index" onClick={(e) => history.push("/")}/>
			<MenuItem primaryText="About" onClick={(e) => history.push("/about")}/>
		</IconMenu>
		);
	}
}

class AppBarMenu extends Component {
	state = {
		showProgress: false
	};

	render() {
		let rightIcon = <Menu />;
		let hash = window.location.hash.substr(1);

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

AppBarMenu.contextTypes = {
	user: React.PropTypes.object
};


export default AppBarMenu;