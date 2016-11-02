import { connect } from 'react-redux'
import Blog from '../views/Blog'

const mapStateToProps = (state, ownProps) => {
	const blogs = state.blog.blogs || [];
	return {
		blogs: blogs
	}
}

const BlogContainer = connect(
	mapStateToProps
)(Blog)

export default BlogContainer