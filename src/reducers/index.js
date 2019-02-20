
import { combineReducers, Cmd, loop } from 'redux-loop';
import * as AP from './audioPlayer';
import * as TP from './timbreParams';
import * as FD from './frequencyData';
import updateGaph from '../synth';


export const initialState = {
  timbreParams: TP.initialState,
  audioPlayer: AP.initialState,
  frequencyData: FD.initialState,
  settings: {
    ...(TP.settings),
    toneCount: 30
  }
};

export const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GRAPH_UPDATE':
      return loop(state, Cmd.run(() => updateGaph(state)));

    default:
      const comboReducer = combineReducers({
        timbreParams: TP.timbreParams,
        audioPlayer: AP.audioPlayer,
        frequencyData: FD.frequencyData
      });
      const newStateAndCmd = comboReducer(state, action);
      return newStateAndCmd
  }
};
