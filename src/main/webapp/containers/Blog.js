import { connect } from 'react-redux'
import { addBlog } from '../actions'
import Blog from '../views/Blog'

const mapStateToProps = (state, ownProps) => {
	return {
		sort: "DESC"
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClickAddBlog: () => {
			dispatch(addBlog(
				{
					id: 1,
					content: "blog content"
				}
			));
		}
	}
}

const BlogContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Blog)

export default BlogContainer