import { connect } from 'react-redux'
import MessagePanel from '../components/MessagePanel'

const mapStateToProps = (state, ownProps) => {
	const message = state.message || [];
	return {
		message: message
	}
}

const MessagePanelContainer = connect(
	mapStateToProps
)(MessagePanel)

export default MessagePanelContainer