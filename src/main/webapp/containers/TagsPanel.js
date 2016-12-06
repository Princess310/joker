import { connect } from 'react-redux'
import TagsPanel from '../components/TagsPanel'

const mapStateToProps = (state, ownProps) => {
	const tags = state.tag || [];
	return {
		tags: tags
	}
}

const TagsPanelContainer = connect(
	mapStateToProps
)(TagsPanel)

export default TagsPanelContainer