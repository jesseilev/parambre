import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import audioPlayer from './audioPlayer'
import {timbreParams} from './timbreParams'

export const initialState = {

};

export const rootReducer = combineReducers({
  timbreParams,
  audioPlayer,
});
