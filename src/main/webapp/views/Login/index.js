import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import styles from './styles.less';

class Login extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="LoginView">
				<Paper className="wrapper" zDepth={1}>
					<Avatar size={72} backgroundColor="#fff" src="images/joker.jpg" />
					<TextField
						hintText="long time no see"
						fullWidth={true}
						floatingLabelText="username"
					/>
					<TextField
						hintText="Mua"
						fullWidth={true}
						type="password"
						floatingLabelText="password"
					/>
					<div className="mt-3">
						<RaisedButton label="注册" secondary={true} />
						<RaisedButton label="登录" primary={true} className="ml-2" />
					</div>
					
				</Paper>
			</div>
		)
	}
}


export default Login;