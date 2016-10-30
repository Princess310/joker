import React, {Component} from 'react';
import fetch from 'utils/fetch';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Snackbar from 'material-ui/Snackbar'
import styles from './styles.less';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			pwd: "",
			autoHideDuration: 4000,
			message: 'Login error',
			open: false,
		}
	}

	handleChange(e, key) {
		const value = e.target.value;
		if(key === "username"){
			this.setState({
				username: value
			});
		}else {
			this.setState({
				pwd: value
			});
		}
	}

	handleLogin(e) {
		const { username, pwd } = this.state;

		fetch.doPost("login", {
			username: username,
			pwd: pwd
		}).then((response) => {
			if(response.success) {
				window.location.href = "";
			}else {
				this.setState({
					open: true,
					message: response.errorMessage
				});
			}
		});
	}

	handleRequestClose = () => {
		this.setState({
			open: false,
		});
	};

	render() {
		return (
			<div className="LoginView">
				<Paper className="wrapper" zDepth={1}>
					<Avatar size={72} backgroundColor="#fff" src="images/joker.jpg" />
					<TextField
						hintText="long time no see"
						fullWidth={true}
						floatingLabelText="username"
						value={this.state.username}
						onChange={(e) => this.handleChange(e, "username")}
						onKeyUp={(e) => { e.which === 13 && this.handleLogin(e) }}
					/>
					<TextField
						hintText="Mua"
						fullWidth={true}
						type="password"
						floatingLabelText="password"
						value={this.state.password}
						onChange={(e) => this.handleChange(e, "password")}
						onKeyUp={(e) => { e.which === 13 && this.handleLogin(e) }}
					/>
					<div className="mt-3">
						<RaisedButton label="注册" secondary={true} />
						<RaisedButton label="登录" primary={true} className="ml-2" onClick={(e) => this.handleLogin(e)} />
					</div>
					
				</Paper>
				<Snackbar
					open={this.state.open}
					message={this.state.message}
					action="undo"
					autoHideDuration={this.state.autoHideDuration}
					onActionTouchTap={this.handleActionTouchTap}
					onRequestClose={this.handleRequestClose}
				/>
			</div>
		)
	}
}


export default Login;