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
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import styles from './styles.less';

class Menu extends Component {
	static muiName = 'IconMenu';

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
				<MenuItem primaryText="Index" onClick={(e) => history.push("/")}/>
				<MenuItem primaryText="About" onClick={(e) => history.push("/about")}/>
			</IconMenu>
		);
	}
}

class AppBarMenu extends Component {
	state = {
		showProgress: false,
		showDrawer: false
	};

	handleToggleDrawer = (e) => {
		this.setState({
			showDrawer: true
		});
	}

	handleToggle = () => this.setState({showDrawer: !this.state.showDrawer});

	handleClose = () => this.setState({showDrawer: false});

	handleAuthorizeGithub = (e) => {
		this.doAuthorize("github");
	}

	handleAuthorizeGoogle = (e) => {
		this.doAuthorize("google");
	}

	handleAuthorizeLinkedIn = (e) => {
		this.doAuthorize("linkedIn");
	}

	doAuthorize(type){
		if(window.showModalDialog){
			window.showModalDialog("/authorize?type=" + type);
		}else{
			window.open("/authorize?type=" + type);
		}
	}

	render() {
		let rightIcon = <Menu />;
		let avatar = "images/joker.jpg";

		const user = this.context.user;
		if(user != null && user.avatar && user.avatar != ""){
			avatar = user.avatar;
		}

		return (
			<div>
				<AppBar
					title="Joker" 
					iconElementRight={rightIcon}
					onLeftIconButtonTouchTap={this.handleToggleDrawer}
				/>
				<Drawer
					docked={false}
					width={200}
					open={this.state.showDrawer}
					onRequestChange={(showDrawer) => this.setState({showDrawer})}
				>
					<div className="drawer-user-info">
						<Avatar src={avatar} size={60} backgroundColor={"#f0f0f0"} style={{"padding": "4px"}}/>
						<div>{user != null && user.userName}</div>
						<div className="third-login-wrapper">
							<IconButton 
								iconClassName="mdi mdi-github-circle" 
								tooltip="Github" 
								tooltipPosition="top-right" 
								onTouchTap={this.handleAuthorizeGithub} />
							<IconButton 
								iconClassName="mdi mid-google" 
								tooltip="Google" 
								tooltipPosition="top-right" 
								iconStyle={{"color": "#db463c"}}
								disabled={true}
								onTouchTap={this.handleAuthorizeGoogle} />
							<IconButton 
								iconClassName="mdi mdi-linkedin-box" 
								tooltip="LinkedIn" 
								tooltipPosition="top-center"
								iconStyle={{"color": "#0077b5"}}
								onTouchTap={this.handleAuthorizeLinkedIn} />
						</div>
					</div>
				</Drawer>
				{this.state.showProgress && <LinearProgress mode="indeterminate" />}
			</div>
		)
	}
}

AppBarMenu.contextTypes = {
	user: React.PropTypes.object
};


export default AppBarMenu;