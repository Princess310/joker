import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import SearchBar from 'components/SearchBar';
import IDCard from 'components/IDCard';
import ContactPanel from 'components/IDCard/ContactPanel.js';
import TagsPanel from 'containers/TagsPanel';
import BlogCard from './BlogCard.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { WindowResizeListener } from 'react-window-resize-listener';
import InfiniteScroll from 'react-infinite-scroller'
import { fetchBlogs, fetchTags } from 'actions';
import styles from './styles.less';

class BlogList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: "",
			tagId: 0,
			showFloatBtn: false,
			showAction: false,
			pageStart: 0,
			page: 0,
			hasNextPage: false
		}
	}

	componentDidMount() {
		const { dispatch } = this.props;
		const self = this;

		dispatch(fetchBlogs()).then((res) => {
			self.updatePageInfo(res.blogs);
		});
		dispatch(fetchTags())
	}

	updatePageInfo(blogs) {
		this.setState({
			hasNextPage: blogs.page < blogs.totalPages
		});
	}

	handleSearch = (keyword) => {
		const { dispatch } = this.props;
		const { tagId, pageStart } = this.state;

		this.setState({
			keyword: keyword
		});

		dispatch(fetchBlogs(keyword, tagId, pageStart));
	}

	handleSearchByTag = (tagId) => {
		const { dispatch } = this.props;
		const { keyword, pageStart } = this.state;

		this.setState({
			tagId: tagId
		});

		dispatch(fetchBlogs(keyword, tagId, pageStart));
	}

	handleScroll = () => {
		const { dispatch } = this.props;
		const { tagId, keyword, page } = this.state;

		dispatch(fetchBlogs(keyword, tagId, page + 1));
	}

	handleToggleAction = () => {
		this.setState({
			showAction: !this.state.showAction
		});
	}

	render() {
		const { blogs } = this.props;

		let blogList = blogs.list.map((blog, index) => {
			let pic = "";
			if(blog.picFileId){ pic =  "attachment?id=" + blog.picFileId};
			return (
				<BlogCard key={index} id={blog.id} title={blog.title} pic={pic} breif={blog.breif} tagName={blog.tagName} tagColor={blog.tagColor} />
			)
		});

		let blankList = (
			<div className="blank-list">
				No articles here~
			</div>
		)

		return (
			<div className="pos-fit">
				<div className={this.state.showAction ? "blog-container show-action" : "blog-container"}>
					<Paper className="blog-panel">
						<SearchBar onSearch={ this.handleSearch }/>
						<div className="list">
							<InfiniteScroll
								pageStart={this.state.pageStart}
								loadMore={() => {
									//this.handleScroll()
								}}
								hasMore={this.state.hasNextPage}
								useWindow={false}
								loader={<div className="loader">Loading ...</div>}
							>
								{blogList.length > 0 ? blogList : blankList}
							</InfiniteScroll>
						</div>
					</Paper>
					<div className="action-panel">
						<IDCard />
						<ContactPanel />
						<TagsPanel onSelectItem={this.handleSearchByTag}/>
					</div>
					{ this.state.showFloatBtn &&
						<FloatingActionButton className="blog-fl-btn" onTouchTap={this.handleToggleAction}>
							<ContentAdd />
						</FloatingActionButton>
					}
					<WindowResizeListener onResize={windowSize => {
						if(windowSize.windowWidth <= 1080){
							this.setState({
								showFloatBtn: true
							});
						}else {
							this.setState({
								showFloatBtn: false
							});
						}
					}}/>
				</div>
			</div>
		)
	}
}


export default BlogList;