import * as R from 'ramda';
import {Cmd, loop} from 'redux-loop';
// import updateGraph from '../synth.js';
import {graphUpdate} from '../actions';


const initialState = {
  curve1: {
    phase: 0.3,
    offset: 0.5,
    freq: 0.5,
    amp: 0.5
  },
  curve2: {
    phase: 0.7,
    offset: 0.25,
    freq: 0.15,
    amp: 0.85
  },
  curve3: {
    phase: 0.4,
    offset: 0.95,
    freq: 0.55,
    amp: 0.8
  }
};


export const timbreParams = (state = initialState, action) => {

  switch(action.type) {
    case 'BOX_ADJUSTMENT':
      const updateParam = ({value, lensPath}) => (
        // overwrite the old value at lensPath with new value
        R.curry(R.set(R.lensPath(lensPath), value))
      );
      // a list of update functions, one for each param
      const updaterFuncs = R.map(updateParam, action.params);

      // pipe the state through each of the update functions
      const newState = R.reduce(R.applyTo, state, updaterFuncs);

      // return new state and a command to dispatch the GRAPH_UPDATE action
      return loop(
        newState,
        Cmd.action(graphUpdate())
      );

    default:
      return state;
  }
};
