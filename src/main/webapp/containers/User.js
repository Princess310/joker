import { connect } from 'react-redux'
import User from '../views/User'

const mapStateToProps = (state, ownProps) => {
	const users = state.user || [];
	return {
		users: users
	}
}

const UserContainer = connect(
	mapStateToProps
)(User)

export default UserContainer