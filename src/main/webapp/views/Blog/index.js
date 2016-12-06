import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { fetchBlogs, createBlog, deleteBlogs, updateBlog, fetchTags} from 'actions';
import SumEditor from 'components/SumEditor';
import styles from './styles.less';

let selectedBlogs = [];
class Blog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDialog: false,
			id: 0,
			title: "",
			tagId: 0,
			content: "",
			titleError: "",
			currentAction: "add",
			keyword: ""
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
			openDialog: false,
			title: "",
			content: ""
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

	handleTableSelect = (data) => {
		const { blogs } = this.props;
		let ids = [];

		if(data === "all"){
			blogs.map(blog => {
				ids.push(blog.id);
			});
		}else if(data === "none"){
			ids = [];
		}else {
			data.map((index) => {
				ids.push(blogs[index].id);
			});
		}
		
		selectedBlogs = ids;
	}

	handleAddBlog = (e) => {
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

	handleViewBlog = (e) => {
		e.preventDefault();
		const { blogs } = this.props;
		const tr = e.target.parentElement;
		const blog = blogs[tr.dataset.index];

		this.setState({
			id: blog.id,
			title: blog.title,
			content: blog.content,
			currentAction: "update"
		});
		this.handleOpenDialog();
	}

	handleSaveBlog(e) {
		const { id, title, tagId, content, currentAction} = this.state;
		const { dispatch } = this.props;
		const self = this;

		if(title.trim() === ""){
			this.setState({
				titleError: "title can not be empty!"
			});

			return false;
		}

		if(currentAction === "add"){
			dispatch(createBlog(title, tagId, content)).then(() => {
				self.handleCloseDialog();
			});
		}else {
			dispatch(updateBlog(id, title, content, tagId)).then(() => {
				self.handleCloseDialog();
			});
		}
	}

	handleDeleteBlogs = (e) => {
		const { dispatch } = this.props;

		if(selectedBlogs.length > 0){
			dispatch(deleteBlogs(selectedBlogs));
		}		
	}

	handleSearch = (e) => {
		const { keyword } = this.state;
		const { dispatch } = this.props;

		dispatch(fetchBlogs(keyword))
	}

	render() {
		const { blogs, tags } = this.props;

		const tableRows = blogs.map((blog, index) => {
			return (
				<TableRow key={blog.id} data-index={index}>
					<TableRowColumn>{blog.id}</TableRowColumn>
					<TableRowColumn className="mark h-v" onTouchTap={this.handleViewBlog}>{blog.title}</TableRowColumn>
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
				onTouchTap={(e) => this.handleSaveBlog(e)}
			/>
		];

		return (
			<div>
				<Table multiSelectable={true} selectable={true} onRowSelection={this.handleTableSelect}>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn colSpan="2" tooltip="Search bar" className="table-search-bar">
								<TextField
									hintText="Search for blog"
									className="search-text"
									onChange={this.handleSearchChange}
									onKeyUp={(e) => { e.which === 13 && this.handleSearch(e) }}
								/>
								<RaisedButton
									label="Search"
									primary={true}
									className="ml-2"
									icon={<FontIcon className="mdi mdi-blogger" />}
									onTouchTap={this.handleSearch}
								/>
							</TableHeaderColumn>
							<TableHeaderColumn tooltip="Action bar" className="table-action-bar">
								<div className="t-r">
									<RaisedButton
										label="Add"
										primary={true}
										className="ml-2"
										icon={<FontIcon className="mdi mdi-plus" />}
										onTouchTap={this.handleAddBlog}
									/>
									<RaisedButton
										label="Delete"
										secondary={true}
										className="ml-2"
										icon={<FontIcon className="mdi mdi-delete" />}
										onTouchTap={this.handleDeleteBlogs}
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
						onKeyUp={(e) => { e.which === 13 && this.handleSaveBlog(e) }}
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
					<SumEditor onChange={this.handleEditorChange} value={this.state.content}/>
				</Dialog>
			</div>
		)
	}
}


export default Blog;