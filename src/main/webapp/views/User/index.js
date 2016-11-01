import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { fetchUsers } from 'actions';

class User extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { dispatch, sort } = this.props;
		dispatch(fetchUsers())
	}

	render() {
		return (
			<div>
				<div>User</div>
			</div>
		)
	}
}


export default User;