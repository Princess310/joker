import { connect } from 'react-redux'
import Tag from '../views/Tag'

const mapStateToProps = (state, ownProps) => {
	const tags = state.tag || [];
	return {
		tags: tags
	}
}

const TagContainer = connect(
	mapStateToProps
)(Tag)

export default TagContainer