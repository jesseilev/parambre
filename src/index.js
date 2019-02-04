import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
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

const store = createStore(rootReducer, initialState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);










store.subscribe(() => {
  const state = store.getState();
  updateGraph(state);
  console.log(state);


  // audioGraph.update(currentAudioGraph(state, audioGraph));
  // virtualAudioGraph.update(
  //   state.playback ? currentGraph(state) : {}
  // );
});