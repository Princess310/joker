import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import SearchBar from 'components/SearchBar';
import IDCard from 'components/IDCard';
import ContactPanel from 'components/IDCard/ContactPanel.js';
import TagsPanel from 'containers/TagsPanel';
import BlogCard from './BlogCard.js';
import { fetchBlogs, fetchTags } from 'actions';
import styles from './styles.less';

class BlogList extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchBlogs())
		dispatch(fetchTags())
	}

	handleSearch = (keyword) => {
		const { dispatch } = this.props;
		dispatch(fetchBlogs(keyword));
	}

	render() {
		const { blogs } = this.props;

		let blogList = blogs.map((blog) => {
			let pic = "";
			if(blog.picFileId){ pic =  "attachment?id=" + blog.picFileId};
			return (
				<BlogCard key={blog.id} id={blog.id} title={blog.title} pic={pic} breif={blog.breif} />
			)
		});

		return (
			<div className="blog-container">
				<Paper className="blog-panel">
					<SearchBar onSearch={ this.handleSearch }/>
					<div className="list">
						{blogList}
					</div>
				</Paper>
				<div className="action-panel">
					<IDCard />
					<ContactPanel />
					<TagsPanel />
				</div>
			</div>
		)
	}
}


export default BlogList;