import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
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
		let { users } = this.props;

		let tableRows = users.map(user => {
			return (
				<TableRow key={user.id}>
					<TableRowColumn>{user.id}</TableRowColumn>
					<TableRowColumn>{user.username}</TableRowColumn>
					<TableRowColumn>{user.displayName}</TableRowColumn>
				</TableRow>
			);
		});
		return (
			<div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn>ID</TableHeaderColumn>
							<TableHeaderColumn>Name</TableHeaderColumn>
							<TableHeaderColumn>displayName</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tableRows}
					</TableBody>
				  </Table>
			</div>
		)
	}
}


export default User;