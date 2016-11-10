import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { fetchBlogs, createBlog, fetchTags} from 'actions';
import Editor from 'components/Editor';
import styles from './style.less';

class Blog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDialog: false,
			title: "",
			tagId: 0,
			content: "",
			titleError: ""
		}
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchBlogs())
		dispatch(fetchTags()).then((result) => {
			const tags = result.tags;
			if(tags.length > 0){
				this.setState({
					tagId: tags[0].id
				});
			}
		});
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

	handleEditorChange = (content) => {
		this.setState({
			content: content
		});
	}

	handleSelectTagChange = (event, index, value) => {
		this.setState({
			tagId: value
		});
	}

	handleChangeTitle(e) {
		const value = e.target.value;
		this.setState({
			title: value
		});
	}

	handleCreateBlog(e) {
		const {title, tagId, content} = this.state;
		const { dispatch } = this.props;
		const self = this;

		if(title.trim() === ""){
			this.setState({
				titleError: "title can not be empty!"
			});

			return false;
		}

		dispatch(createBlog(title, tagId, content)).then(() => {
			self.handleCloseDialog();
			this.setState({
				title: "",
				content: ""
			});
		});
	}

	render() {
		const { blogs, tags } = this.props;

		const tableRows = blogs.map(blog => {
			return (
				<TableRow key={blog.id}>
					<TableRowColumn>{blog.id}</TableRowColumn>
					<TableRowColumn>{blog.title}</TableRowColumn>
					<TableRowColumn>{blog.viewCount}</TableRowColumn>
				</TableRow>
			);
		});

		const tagsList = tags.map(tag => {
			return <MenuItem key={tag.id} value={tag.id} primaryText={tag.name} />
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
				onTouchTap={(e) => this.handleCreateBlog(e)}
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
						floatingLabelText="blog"
						errorText={this.state.titleError}
						value={this.state.title}
						onChange={(e) => this.handleChangeTitle(e)}
						onKeyUp={(e) => { e.which === 13 && this.handleCreateBlog(e) }}
					/>
					<br />
					<SelectField
						floatingLabelText="Frequency"
						value={this.state.tagId}
						onChange={this.handleSelectTagChange}
						style={{
							marginBottom: "16px"
						}}
					>
						{tagsList}
					</SelectField>
					<Editor onChange={this.handleEditorChange} />
				</Dialog>
			</div>
		)
	}
}


export default Blog;