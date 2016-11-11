import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { fetchUsers, createUser, deleteUsers, updateUser } from 'actions';

let selectedUsers = [];
class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDialog: false,
			openViewDialog: false,
			id: 0,
			username: "",
			pwd: "",
			keyword: "",
			admin: false,
			usernameError: "",
			passwordError: "",
			viewUsernameError: ""
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

	handleOpenViewDialog = () => {
		this.setState({
			openViewDialog: true
		});
	}

	handleCloseViewDialog = () => {
		this.setState({
			openViewDialog: false
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

	handleSearchChange = (e) => {
		const value = e.target.value;

		this.setState({
			keyword: value
		});
	}

	handleViewUser = (e) => {
		e.preventDefault();
		const { users } = this.props;
		const tr = e.target.parentElement;
		const user = users[tr.dataset.index];

		this.setState({
			id: user.id,
			username: user.username,
			admin: user.admin,
		});
		this.handleOpenViewDialog();
	}

	handleViewToggle = (e) => {
		this.setState({
			admin: !this.state.admin
		});
	}

	handleCreateUser = (e) => {
		const { username, pwd } = this.state;
		const { dispatch } = this.props;
		const self = this;
		let usernameError, passwordError, checkFlag = true;

		if(username.trim() === ""){
			usernameError = "Username can not be empty!";
			checkFlag = false;
		}else {
			usernameError = "";
		}

		if(pwd.trim() === ""){
			passwordError = "Password can not be empty!";
			checkFlag = false;
		}else {
			passwordError = "";
		}

		this.setState({
			usernameError: usernameError,
			passwordError: passwordError
		});

		if(!checkFlag){
			return false;
		}


		dispatch(createUser(username, pwd)).then(() => {
			self.handleCloseDialog();
			this.setState({
				username: "",
				pwd: ""
			});
		});
	}

	handleDeleteUsers = (e) => {
		const { dispatch } = this.props;

		if(selectedUsers.length > 0){
			dispatch(deleteUsers(selectedUsers));
		}		
	}

	handleUpdateUser = () => {
		const { dispatch } = this.props;
		const { id, username, admin } = this.state;
		const self = this;

		if(username.trim() === ""){
			this.setState({
				viewUsernameError: "Username can not be empty!"
			})
			return false;
		}else{
			this.setState({
				viewUsernameError: ""
			})
		}

		dispatch(updateUser(id, username, admin)).then(() => {
			self.handleCloseViewDialog();
		});
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

	handleSearch = (e) => {
		const { keyword } = this.state;
		const { dispatch } = this.props;

		dispatch(fetchUsers(keyword))
	}

	render() {
		const { users } = this.props;

		const tableRows = users.map((user, index) => {
			return (
				<TableRow key={user.id} data-index={index}>
					<TableRowColumn>{user.id}</TableRowColumn>
					<TableRowColumn className="mark h-v" onTouchTap={this.handleViewUser}>{user.username}</TableRowColumn>
					<TableRowColumn>{user.displayName}</TableRowColumn>
					<TableRowColumn>{user.admin ? "admin" : "common"}</TableRowColumn>
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
		const viwDialogActions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.handleCloseViewDialog}
			/>,
			<FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleUpdateUser}
			/>
		];
		return (
			<div>
				<Table multiSelectable={true} selectable={true} onRowSelection={this.handleTableSelect}>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn colSpan="2" tooltip="Search panel" className="table-search-bar">
								<TextField
									hintText="Search for user"
									className="search-text"
									onChange={this.handleSearchChange}
									onKeyUp={(e) => { e.which === 13 && this.handleSearch(e) }}
								/>
								<RaisedButton
									label="Search"
									primary={true}
									className="ml-2"
									icon={<FontIcon className="mdi mdi-user"/>}
									onTouchTap={this.handleSearch}
								 />
							</TableHeaderColumn>
							<TableHeaderColumn colSpan="2" tooltip="Action panel" className="table-action-bar">
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
										onTouchTap={this.handleDeleteUsers}
									/>
								</div>
							</TableHeaderColumn>
						</TableRow>
						<TableRow>
							<TableHeaderColumn>ID</TableHeaderColumn>
							<TableHeaderColumn>Name</TableHeaderColumn>
							<TableHeaderColumn>displayName</TableHeaderColumn>
							<TableHeaderColumn>role</TableHeaderColumn>
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
						errorText={this.state.usernameError}
						value={this.state.username}
						onChange={(e) => this.handleChange(e, "username")}
						onKeyUp={(e) => { e.which === 13 && this.handleCreateUser(e) }}
					/>
					<TextField
						hintText="Mua"
						fullWidth={true}
						type="password"
						floatingLabelText="password"
						errorText={this.state.passwordError}
						value={this.state.pwd}
						onChange={(e) => this.handleChange(e, "password")}
						onKeyUp={(e) => { e.which === 13 && this.handleCreateUser(e) }}
					/>
				</Dialog>

				<Dialog
					title="User Info"
					actions={viwDialogActions}
					modal={false}
					open={this.state.openViewDialog}
					onRequestClose={this.handleCloseViewDialog}
				>
					<TextField
						hintText="long time no see"
						fullWidth={true}
						floatingLabelText="username"
						errorText={this.state.viewUsernameError}
						value={this.state.username}
						onChange={(e) => this.handleChange(e, "username")}
						onKeyUp={(e) => { e.which === 13 && this.handleUpdateUser(e) }}
					/>
					<Toggle
						label="Admin"
						defaultToggled={this.state.admin}
						onToggle={this.handleViewToggle}
						style={{
							marginTop: '15px',
							maxWidth: '160px'
						}}
					/>
				</Dialog>
			</div>
		)
	}
}


export default User;