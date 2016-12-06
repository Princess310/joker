import React, {Component} from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Popover from 'material-ui/Popover';
import styles from './styles.less';

class ContactPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
	        openPopup: false,
	    };
	}

	handleTouchTap = (event) => {
	    // This prevents ghost click.
	    event.preventDefault();

	    this.setState({
	      openPopup: true,
	      anchorEl: event.currentTarget,
	    });
    }

	handleRequestClose = () => {
	    this.setState({
	      openPopup: false,
	    });
    }

    handleRedirectToGithub = () => {
    	window.location.href = "https://github.com/Princess310"
    }

	render() {
		return (
			<Paper className="contact-panel">
				<Subheader>Contact me</Subheader>
				<List>
					<ListItem 
						primaryText="WeChat" 
						leftIcon={<span className="mdi mdi-wechat"></span>}
						rightIcon={<span className="mdi mdi-qrcode"></span>}
						 onTouchTap={this.handleTouchTap}
					/>
					<ListItem 
						primaryText="wanghaojz@gmail.com" 
						leftIcon={<span className="mdi mdi-gmail"></span>}
					/>
					<ListItem 
						primaryText="Github" 
						leftIcon={<span className="mdi mdi-github-circle"></span>}
						onTouchTap={this.handleRedirectToGithub}
					/>
					<Popover
						open={this.state.openPopup}
						anchorEl={this.state.anchorEl}
						anchorOrigin={{horizontal: 'left', vertical: 'top'}}
						targetOrigin={{horizontal: 'left', vertical: 'top'}}
						onRequestClose={this.handleRequestClose}
						className="qrcode-wrapper"
					>
						<img src="images/qrcode.jpg" />
					</Popover>
				</List>
			</Paper>
		)
	}
}


export default ContactPanel;