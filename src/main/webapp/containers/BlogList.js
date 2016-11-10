import { connect } from 'react-redux'
import BlogList from '../views/Blog/BlogList'

const mapStateToProps = (state, ownProps) => {
	const blogs = state.blog || [];
	const tags = state.tag || [];
	return {
		blogs: blogs,
		tags: tags
	}
}

const BlogListContainer = connect(
	mapStateToProps
)(BlogList)

export default BlogListContainer