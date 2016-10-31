import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import asd from './Test'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  asd
})

export default todoApp