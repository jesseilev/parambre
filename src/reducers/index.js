import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import playback from './playback'
import {wave1} from './wave1'

export default combineReducers({
  wave1,
  playback,
  todos,
  visibilityFilter
})
