import { connect } from 'react-redux'
import BlogDetail from '../views/Blog/BlogDetail'

const mapStateToProps = (state, ownProps) => {
	const blogDetail = state.blogDetail || {};
	return {
		blog: blogDetail.blog,
		tag: blogDetail.tag
	}
}

const BlogDetailContainer = connect(
	mapStateToProps
)(BlogDetail)

export default BlogDetailContainer