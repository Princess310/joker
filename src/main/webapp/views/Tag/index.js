import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { fetchTags } from 'actions';

class Blog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDialog: false
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
				onTouchTap={this.handleCloseDialog}
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
					TODO: Add tag
				</Dialog>
			</div>
		)
	}
}


export default Blog;