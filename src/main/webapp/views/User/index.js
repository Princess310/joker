import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { fetchUsers, createUser, deleteUsers  } from 'actions';

let selectedUsers = [];
class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDialog: false,
			username: "",
			pwd: ""
		}
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchUsers())
	}

	handleOpenDialog = () => {
		this.setState({
			openDialog: true
		});
	}

	handleCloseDialog = () => {
		this.setState({
			openDialog: false
		});
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

	handleCreateUser = (e) => {
		const { username, pwd } = this.state;
		const { dispatch } = this.props;
		const self = this;

		dispatch(createUser(username, pwd)).then(() => {
			self.handleCloseDialog();
			this.setState({
				username: "",
				pwd: ""
			});
		});
	}

	handleDeletUsers = (e) => {
		const { dispatch } = this.props;

		if(selectedUsers.length > 0){
			dispatch(deleteUsers(selectedUsers));
		}		
	}

	handleTableSelect = (data) => {
		const { users } = this.props;
		let ids = [];

		if(data === "all"){
			users.map(user => {
				ids.push(user.id);
			});
		}else if(data === "none"){
			ids = [];
		}else {
			data.map((index) => {
				ids.push(users[index].id);
			});
		}
		
		selectedUsers = ids;
	}

	render() {
		const { users } = this.props;

		const tableRows = users.map(user => {
			return (
				<TableRow key={user.id}>
					<TableRowColumn>{user.id}</TableRowColumn>
					<TableRowColumn>{user.username}</TableRowColumn>
					<TableRowColumn>{user.displayName}</TableRowColumn>
				</TableRow>
			);
		});
		const dialogActions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.handleCloseDialog}
			/>,
			<FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleCreateUser}
			/>
		];
		return (
			<div>
				<Table multiSelectable={true} selectable={true} onRowSelection={this.handleTableSelect}>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn colSpan="2" tooltip="Search panel" className="table-search-bar">
								<TextField hintText="Search for user" className="search-text"/>
								<RaisedButton
									label="Search"
									primary={true}
									className="ml-2"
									icon={<FontIcon className="mdi mdi-user" />}
								/>
							</TableHeaderColumn>
							<TableHeaderColumn tooltip="Action panel" className="table-action-bar">
								<div className="t-r">
									<RaisedButton
										label="Add"
										primary={true}
										className="ml-2"
										icon={<FontIcon className="mdi mdi-plus" />}
										onTouchTap={this.handleOpenDialog}
									/>
									<RaisedButton
										label="Delete"
										secondary={true}
										className="ml-2"
										icon={<FontIcon className="mdi mdi-delete" />}
										onTouchTap={this.handleDeletUsers}
									/>
								</div>
							</TableHeaderColumn>
						</TableRow>
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
				<Dialog
					title="Add User"
					actions={dialogActions}
					modal={false}
					open={this.state.openDialog}
					onRequestClose={this.handleCloseDialog}
				>
					<TextField
						hintText="long time no see"
						fullWidth={true}
						floatingLabelText="username"
						errorText=""
						value={this.state.username}
						onChange={(e) => this.handleChange(e, "username")}
						onKeyUp={(e) => { e.which === 13 && this.handleCreateUser(e) }}
					/>
					<TextField
						hintText="Mua"
						fullWidth={true}
						type="password"
						floatingLabelText="password"
						value={this.state.pwd}
						onChange={(e) => this.handleChange(e, "password")}
						onKeyUp={(e) => { e.which === 13 && this.handleCreateUser(e) }}
					/>
				</Dialog>
			</div>
		)
	}
}


export default User;