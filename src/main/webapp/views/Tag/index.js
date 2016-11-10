import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { fetchTags, createTag } from 'actions';

class Blog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDialog: false,
			name: "",
			color: "",
			nameError: "",
			colorError: ""
		}
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchTags())
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
		if(key === "name"){
			this.setState({
				name: value
			});
		}else {
			this.setState({
				color: value
			});
		}
	}

	handleCreateTag(){
		const { name, color } = this.state;
		const { dispatch } = this.props;
		const self = this;

		let nameError, colorError, checkFlag = true;

		if(name.trim() === ""){
			nameError = "name can not be empty!";
			checkFlag = false;
		}else {
			nameError = "";
		}

		if(color.trim() === ""){
			colorError = "Password can not be empty!";
			checkFlag = false;
		}else {
			colorError = "";
		}

		this.setState({
			nameError: nameError,
			colorError: colorError
		});

		if(!checkFlag){
			return false;
		}


		dispatch(createTag(name, color)).then(() => {
			self.handleCloseDialog();
			this.setState({
				username: "",
				pwd: ""
			});
		});
	}

	render() {
		const { tags } = this.props;

		const tableRows = tags.map(tag => {
			return (
				<TableRow key={tag.id}>
					<TableRowColumn>{tag.id}</TableRowColumn>
					<TableRowColumn>{tag.name}</TableRowColumn>
					<TableRowColumn>{tag.color}</TableRowColumn>
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
				onTouchTap={(e) => this.handleCreateTag(e)}
			/>
		];
		return (
			<div>
				<Table multiSelectable={true} selectable={true}>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn colSpan="2" tooltip="Search panel" className="table-search-bar">
								<TextField hintText="Search for tag" className="search-text"/>
								<RaisedButton
									label="Search"
									primary={true}
									className="ml-2"
									icon={<FontIcon className="mdi mdi-tag" />}
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
									/>
								</div>
							</TableHeaderColumn>
						</TableRow>
						<TableRow>
							<TableHeaderColumn>ID</TableHeaderColumn>
							<TableHeaderColumn>Name</TableHeaderColumn>
							<TableHeaderColumn>Color</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tableRows}
					</TableBody>
				</Table>
				<Dialog
					title="Add Tag"
					actions={dialogActions}
					modal={false}
					open={this.state.openDialog}
					onRequestClose={this.handleCloseDialog}
				>
					<TextField
						hintText="Enter name"
						fullWidth={true}
						floatingLabelText="name"
						errorText={this.state.nameError}
						value={this.state.name}
						onChange={(e) => this.handleChange(e, "name")}
						onKeyUp={(e) => { e.which === 13 && this.handleCreateTag(e) }}
					/><br />
					<TextField
						hintText="Enter color"
						fullWidth={true}
						floatingLabelText="color"
						errorText={this.state.colorError}
						value={this.state.color}
						onChange={(e) => this.handleChange(e, "color")}
						onKeyUp={(e) => { e.which === 13 && this.handleCreateTag(e) }}
					/>
				</Dialog>
			</div>
		)
	}
}


export default Blog;