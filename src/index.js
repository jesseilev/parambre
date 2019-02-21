import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { ReduxEmitter } from 'kuker-emitters';
import * as Loop from 'redux-loop';
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


const enhancer = compose(
  applyMiddleware(ReduxEmitter()),
  Loop.install(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const store = createStore(rootReducer, initialState, enhancer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);










store.subscribe(() => {
  const state = store.getState();
  // console.log(state.audioPlayer.isPlaying);
});




// function updateFFT(timestamp) {
//   requestAnimationFrame(updateFFT);

//   // console.log(timestamp);
//   // extract fft data
//   const state = store.getState();
//   const analyzerNode = state.audioPlayer.audioGraph.getAudioNodeById(1000);
//   if (analyzerNode !== undefined) {
//     let dataArray = new Uint8Array(analyzerNode.frequencyBinCount);
//     analyzerNode.getByteFrequencyData(dataArray);

//     // dispatch to the store  
//     store.dispatch(fftUpdate(dataArray))
//   }
// };

// updateFFT();