import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { fetchBlogs } from 'actions';
import Editor from 'components/Editor';
import styles from './style.less';

class Blog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDialog: false
		}
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchBlogs())
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
		const { blogs } = this.props;

		const tableRows = blogs.map(blog => {
			return (
				<TableRow key={blog.id}>
					<TableRowColumn>{blog.id}</TableRowColumn>
					<TableRowColumn>{blog.title}</TableRowColumn>
					<TableRowColumn>{blog.viewCount}</TableRowColumn>
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
							<TableHeaderColumn colSpan="2" tooltip="Search bar" className="table-search-bar">
								<TextField hintText="Search for blog" className="search-text"/>
								<RaisedButton
									label="Search"
									primary={true}
									className="ml-2"
									icon={<FontIcon className="mdi mdi-blogger" />}
								/>
							</TableHeaderColumn>
							<TableHeaderColumn tooltip="Action bar" className="table-action-bar">
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
							<TableHeaderColumn>Title</TableHeaderColumn>
							<TableHeaderColumn>ViewCount</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tableRows}
					</TableBody>
				</Table>
				<Dialog
					title="Add Blog"
					actions={dialogActions}
					modal={false}
					open={this.state.openDialog}
					onRequestClose={this.handleCloseDialog}
					contentStyle = {{
						width: '95%',
						maxWidth: '95%'
					}}
					className="dialog"
				>
					<TextField
						hintText="Blog Title"
					/>
					<br />
					<SelectField
						floatingLabelText="Frequency"
						value={this.state.value}
						onChange={this.handleChange}
						style={{
							marginBottom: "16px"
						}}
					>
						<MenuItem value={1} primaryText="tag01" />
						<MenuItem value={2} primaryText="tag02" />
						<MenuItem value={3} primaryText="tag03" />
						<MenuItem value={4} primaryText="tag04" />
						<MenuItem value={5} primaryText="tag05" />
					</SelectField>
					<Editor />
				</Dialog>
			</div>
		)
	}
}


export default Blog;