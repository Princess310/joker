import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { fetchBlogs, createBlog, deleteBlogs, updateBlog, fetchTags, uploadFile} from 'actions';
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
			breif: "",
			tagId: 0,
			content: "",
			titleError: "",
			breifError: "",
			currentAction: "add",
			keyword: "",
			imgSrc: "",
			picFileId: 0,
			audioSrc: "",
			audioFileId: 0

		};
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchBlogs());
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
			breif: "",
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

	handleChangeBreif(e) {
		const value = e.target.value;
		this.setState({
			breif: value
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
			breif: blog.breif,
			picFileId: blog.picFileId,
			audioFileId: blog.audioFileId,
			content: blog.content,
			currentAction: "update"
		});

		// set img src
		if(blog.picFileId !== 0){
			this.setState({
				imgSrc: 'attachment?id=' + blog.picFileId
			});
		}

		// set audio src
		if(blog.audioFileId !== 0){
			this.setState({
				audioSrc: 'attachment?id=' + blog.audioFileId
			});
		}
		this.handleOpenDialog();
	}

	handleSaveBlog(e) {
		const { id, title, breif, tagId, picFileId, audioFileId, content, currentAction} = this.state;
		const { dispatch } = this.props;
		const self = this;

		if(title.trim() === ""){
			this.setState({
				titleError: "title can not be empty!"
			});

			return false;
		}

		if(breif.trim() === ""){
			this.setState({
				breifError: "breif can not be empty!"
			});
			return false;
		}

		if(currentAction === "add"){
			dispatch(createBlog(title, breif, tagId, picFileId, audioFileId, content)).then(() => {
				self.handleCloseDialog();
			});
		}else {
			dispatch(updateBlog(id, title, breif, content, tagId, picFileId, audioFileId)).then(() => {
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

	handleChangeImage = (e) => {
		const { dispatch } = this.props;
		const file = e.target.files[0];
		const self = this;

		if(file){
			dispatch(uploadFile(file)).then((response) => {
				const result = response.result;
				const id = result.id;

				self.setState({
					imgSrc: 'attachment?id=' + id,
					picFileId: id
				});
			});
		}
	}

	handleChangeAudio = (e) => {
		const { dispatch } = this.props;
		const file = e.target.files[0];
		const self = this;

		if(file){
			dispatch(uploadFile(file)).then((response) => {
				const result = response.result;
				const id = result.id;

				self.setState({
					audioSrc: 'attachment?id=' + id,
					audioFileId: id
				});
			});
		}
	}

	handleClearImg = (e) => {
		this.setState({
			imgSrc: '',
			picFileId: 0
		});
	}

	handleClearAudio = (e) => {
		this.setState({
			audioSrc: '',
			audioFileId: 0
		});
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
						floatingLabelText="Blog"
						errorText={this.state.titleError}
						value={this.state.title}
						onChange={(e) => this.handleChangeTitle(e)}
						onKeyUp={(e) => { e.which === 13 && this.handleSaveBlog(e) }}
					/>
					<br />
					<TextField
						hintText="Blog Breif"
						floatingLabelText="Breif"
						errorText={this.state.breifError}
						value={this.state.breif}
						onChange={(e) => this.handleChangeBreif(e)}
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
					<input type="file" accept="image/jpg,image/jpeg,image/png,image/gif" onChange={this.handleChangeImage} />
					{this.state.imgSrc != "" && (
						<div className="preview-img-wrapper">
							<img className="preview-img" src={this.state.imgSrc} />
							<i className="mdi mdi-close-circle clear-img" onTouchTap={this.handleClearImg}></i>
						</div>
					)}
					<input type="file" accept="audio/*" onChange={this.handleChangeAudio} />
					{this.state.audioSrc != "" && (
						<div className="preview-audio-wrapper">
							<audio src={this.state.audioSrc} controls="controls"/>
							<i className="mdi mdi-close-circle clear-audio" onTouchTap={this.handleClearAudio}></i>
						</div>
					)}
					<SumEditor onChange={this.handleEditorChange} value={this.state.content}/>
				</Dialog>
			</div>
		)
	}
}


export default Blog;