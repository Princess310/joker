import { connect } from 'react-redux'
import Blog from '../views/Blog'

const mapStateToProps = (state, ownProps) => {
	const blogs = state.blog || [];
	const tags = state.tag || [];
	return {
		blogs: blogs,
		tags: tags
	}
}

const BlogContainer = connect(
	mapStateToProps
)(Blog)

export default BlogContainer