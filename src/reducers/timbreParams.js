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
  const addBy = R.curry(R.add);
  

  switch(action.type) {
    case 'DRAG_DELTA':
      const { lensPaths, delta } = action.payload;
      const xLens = R.lensPath(lensPaths.x);
      const yLens = R.lensPath(lensPaths.y);
      const updateX = R.curry(R.over(xLens, addBy(delta.x)));
      const updateY = R.curry(R.over(yLens, addBy(delta.y)));
      return loop(
        R.compose(updateX, updateY)(state),
        Cmd.action(graphUpdate())
      );
    case 'RESIZE_DELTA':
      const p = action.payload;
      const widthLens = R.lensPath(p.lensPaths.width);
      const heightLens = R.lensPath(p.lensPaths.height);
      const updateWidth = R.curry(R.over(widthLens, addBy(p.delta.width)));
      const updateHeight = R.curry(R.over(heightLens, addBy(p.delta.height)));
      return loop(
        R.compose(updateWidth, updateHeight)(state),
        Cmd.action(graphUpdate())
      );
    default:
      return state;
  }
};
