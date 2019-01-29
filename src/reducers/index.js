import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import playback from './playback'

export default combineReducers({
  playback,
  todos,
  visibilityFilter
})
