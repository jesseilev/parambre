import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import audioPlayer from './audioPlayer'
import {wave1} from './wave1'
// import audioGraphPlayer from './audioGraphPlayer'

export const initialState = {

};

export const rootReducer = combineReducers({
  // audioGraphPlayer,
  wave1,
  audioPlayer,
});
