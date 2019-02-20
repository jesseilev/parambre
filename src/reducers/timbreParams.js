import * as R from 'ramda';
import {Cmd, loop} from 'redux-loop';
// import updateGraph from '../synth.js';
import {graphUpdate} from '../actions';
import {range, mapBetweenRanges} from '../utils';



export const settings = {
  curve1: {
    ranges: {
      phase: range(0, 18),
      offset: range(0, 1),
      period: range(2, 20),
      amp: range(0, 1)
    }
  },
  curve2: {
    ranges: {
      phase: range(0, 18),
      offset: range(0, 1),
      period: range(2, 20),
      amp: range(0, 1)
    }
  },
  curve3: {
    ranges: {
      phase: range(0, 18),
      offset: range(0, 1),
      period: range(2, 20),
      amp: range(0, 1)
    }
  }
};

const genRandomCurve = (ranges) => {
  const mapFrom01To = (r, n) => mapBetweenRanges(range(0, 1), r, n);
  const randomInRange = (min, max) => (
    mapFrom01To(range(min, max), Math.random())
  );
  return {
    phase: mapFrom01To(ranges.phase, randomInRange(0.25, 0.75)),
    offset: mapFrom01To(ranges.offset, randomInRange(0.25, 0.75)),
    period: mapFrom01To(ranges.period, randomInRange(0.1, 0.5)),
    amp: mapFrom01To(ranges.amp, randomInRange(0.1, 0.5))
  };
};

export const initialState = {
  curve1: genRandomCurve(settings.curve1.ranges),
  curve2: genRandomCurve(settings.curve2.ranges),
  curve3: genRandomCurve(settings.curve3.ranges),
  currentParamSetBeingAdjusted: null
};


export const timbreParams = (state = initialState, action) => {
  // debugger;
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

    case 'BOX_ADJUSTMENT_START':
      return {
        ...state,
        currentParamSetBeingAdjusted: action.paramSetName
      }

    case 'BOX_ADJUSTMENT_STOP':
      return {
        ...state,
        currentParamSetBeingAdjusted: null
      }

    default:
      return state;
  }
};
