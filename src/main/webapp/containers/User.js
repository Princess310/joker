import { connect } from 'react-redux'
import User from '../views/User'

const mapStateToProps = (state, ownProps) => {
	return {
		sort: "DESC"
	}
}

const UserContainer = connect(
	mapStateToProps
)(User)

export default UserContainer