import { connect } from 'react-redux'
import Tag from '../views/Tag'

const mapStateToProps = (state, ownProps) => {
	const tags = state.tag.tags || [];
	return {
		tags: tags
	}
}

const TagContainer = connect(
	mapStateToProps
)(Tag)

export default TagContainer