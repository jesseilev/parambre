// import { combineReducers } from 'redux'
import { combineReducers, Cmd, loop } from 'redux-loop'
import audioPlayer from './audioPlayer'
import {timbreParams} from './timbreParams'
import {frequencyData} from './frequencyData'
import updateGaph from '../synth'

export const initialState = {
  
};

export const rootReducer = (state, action) => {
  switch(action.type) {
    case 'GRAPH_UPDATE':
      return loop(state, Cmd.run(() => updateGaph(state)));

    default:
      const comboReducer = combineReducers({
        timbreParams,
        audioPlayer,
        frequencyData
      });
      const newStateAndCmd = comboReducer(state, action);
      return newStateAndCmd
  }
};
