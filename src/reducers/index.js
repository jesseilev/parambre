
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
    colors: {
      overtoneAmplitudes: '#f50',
      modulationMagnitudes: '#309',
      modulationFrequencies: '#737'
    },
    synth: {
      attack: 0.5,
      release: 3,
      toneCount: 16,
      rootFrequency: 180,
      chord: [ 1, 9/5, 12/5, 16/3 ]
    }
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
