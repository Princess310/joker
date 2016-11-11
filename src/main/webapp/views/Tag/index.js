import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { fetchTags, createTag, deleteTags, updateTag } from 'actions';

let selectedTags = [];
class Blog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDialog: false,
			id: 0,
			name: "",
			color: "",
			nameError: "",
			colorError: "",
			currentAction: "add",
			keyword: ""
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
			openDialog: false,
			name: "",
			color: ""
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

	handleTableSelect = (data) => {
		const { tags } = this.props;
		let ids = [];

		if(data === "all"){
			tags.map(tag => {
				ids.push(tag.id);
			});
		}else if(data === "none"){
			ids = [];
		}else {
			data.map((index) => {
				ids.push(tags[index].id);
			});
		}
		
		selectedTags = ids;
	}

	handleAddTag = (e) => {
		this.setState({
			currentAction: "add"
		});
		this.handleOpenDialog();
	}

	handleSearchChange = (e) => {
		const value = e.target.value;

		this.setState({
			keyword: value
		});
	}

	handleViewTag = (e) => {
		e.preventDefault();
		const { tags } = this.props;
		const tr = e.target.parentElement;
		const tag = tags[tr.dataset.index];

		this.setState({
			id: tag.id,
			name: tag.name,
			color: tag.color,
			currentAction: "update"
		});
		this.handleOpenDialog();
	}

	handleSaveTag(){
		const { id, name, color, currentAction } = this.state;
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
			colorError = "Color can not be empty!";
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

		if(currentAction === "add"){
			dispatch(createTag(name, color)).then(() => {
				self.handleCloseDialog();
			});
		}else {
			dispatch(updateTag(id, name, color)).then(() => {
				self.handleCloseDialog();
			});
		}
	}

	handleDeleteTags = (e) => {
		const { dispatch } = this.props;

		if(selectedTags.length > 0){
			dispatch(deleteTags(selectedTags));
		}		
	}

	handleSearch = (e) => {
		const { keyword } = this.state;
		const { dispatch } = this.props;

		dispatch(fetchTags(keyword))
	}

	render() {
		const { tags } = this.props;

		const tableRows = tags.map((tag, index) => {
			return (
				<TableRow key={tag.id} data-index={index}>
					<TableRowColumn>{tag.id}</TableRowColumn>
					<TableRowColumn className="mark h-v" onTouchTap={this.handleViewTag}>{tag.name}</TableRowColumn>
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
				onTouchTap={(e) => this.handleSaveTag(e)}
			/>
		];
		return (
			<div>
				<Table multiSelectable={true} selectable={true} onRowSelection={this.handleTableSelect}>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn colSpan="2" tooltip="Search panel" className="table-search-bar">
								<TextField
									hintText="Search for tag"
									className="search-text"
									onChange={this.handleSearchChange}
									onKeyUp={(e) => { e.which === 13 && this.handleSearch(e) }}
								/>
								<RaisedButton
									label="Search"
									primary={true}
									className="ml-2"
									icon={<FontIcon className="mdi mdi-tag" />}
									onTouchTap={this.handleSearch}
								/>
							</TableHeaderColumn>
							<TableHeaderColumn tooltip="Action panel" className="table-action-bar">
								<div className="t-r">
									<RaisedButton
										label="Add"
										primary={true}
										className="ml-2"
										icon={<FontIcon className="mdi mdi-plus" />}
										onTouchTap={this.handleAddTag}
									/>
									<RaisedButton
										label="Delete"
										secondary={true}
										className="ml-2"
										icon={<FontIcon className="mdi mdi-delete" />}
										onTouchTap={this.handleDeleteTags}
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
						onKeyUp={(e) => { e.which === 13 && this.handleSaveTag(e) }}
					/><br />
					<TextField
						hintText="Enter color"
						fullWidth={true}
						floatingLabelText="color"
						errorText={this.state.colorError}
						value={this.state.color}
						onChange={(e) => this.handleChange(e, "color")}
						onKeyUp={(e) => { e.which === 13 && this.handleSaveTag(e) }}
					/>
				</Dialog>
			</div>
		)
	}
}


export default Blog;