import { connect } from 'react-redux'
import { Test } from '../actions'
import TestComp from '../components/Test'

const mapStateToProps = (state, ownProps) => {
  return {
    active: 1
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(Test("test"))
    }
  }
}

const TestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComp)

export default TestContainer