import * as R from 'ramda';
import {Cmd, loop} from 'redux-loop';
// import updateGraph from '../synth.js';
import {graphUpdate} from '../actions';
import {range, mapBetweenRanges} from '../utils';



export const settings = {
  curve1: {
    ranges: {
      phase: range(0, 8),
      offset: range(0, 1),
      period: range(4, 12),
      amp: range(0, 0.5)
    }
  },
  curve2: {
    ranges: {
      phase: range(0, 8),
      offset: range(0, 1),
      period: range(4, 12),
      amp: range(0, 0.5)
    }
  },
  curve3: {
    ranges: {
      phase: range(0, 8),
      offset: range(0, 1),
      period: range(4, 12),
      amp: range(0, 0.5)
    }
  }
};

const genRandomCurve = (ranges) => {
  const mapFrom01To = (r, n) => mapBetweenRanges(range(0, 1), r, n);
  return {
    phase: mapFrom01To(ranges.phase, Math.random()),
    offset: mapFrom01To(ranges.offset, Math.random()),
    period: mapFrom01To(ranges.period, Math.random()),
    amp: mapFrom01To(ranges.amp, Math.random())
  };
};

export const initialState = {
  curve1: genRandomCurve(settings.curve1.ranges),
  curve2: genRandomCurve(settings.curve2.ranges),
  curve3: genRandomCurve(settings.curve3.ranges)
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

    default:
      return state;
  }
};
