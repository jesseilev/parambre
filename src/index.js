import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ReduxEmitter } from 'kuker-emitters';
import * as R from 'ramda';


import createVirtualAudioGraph, {
  createNode,
  createWorkletNode,
  delay,
  gain,
  oscillator,
  stereoPanner,
} from 'virtual-audio-graph';
import audioContext from './audioContext';

import updateGraph from './synth';


import App from './components/App';
import {rootReducer, initialState} from './reducers';

// import {updateAudio, currentAudioGraph} from './reducers/audioGraphPlayer';

const middleware = ReduxEmitter();
const store = createStore(rootReducer, applyMiddleware(middleware));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);










store.subscribe(() => {
  const state = store.getState();
  // console.log(state.timbreParams.curve1);
  updateGraph(state);


  // audioGraph.update(currentAudioGraph(state, audioGraph));
  // virtualAudioGraph.update(
  //   state.playback ? currentGraph(state) : {}
  // );
});