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


import App from './components/App';
import rootReducer from './reducers';

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);



// ===================
// Virtual Audio Graph

function gaussianRand() {
  var rand = 0;

  for (var i = 0; i < 6; i += 1) {
    rand += Math.random();
  }

  return rand / 6;
}


const audioContext = new AudioContext;
const virtualAudioGraph = createVirtualAudioGraph({
  audioContext,
  output: audioContext.destination
});

const oscWithGain = createNode(({
  gain: gainValue,
  ...rest
}) => {
  return { 
    0: gain('output', {gain: gainValue}),
    1: oscillator(0, { ...rest })
  }; 
});

const customSynth = createNode(({
  rootFrequency,
  toneCount,
  overtoneAmp,
  overtoneAttack,
  overtoneRelease,
  ...rest
}) => {
  const reducer = (accumulatedOscs, i) => {
    const { currentTime } = virtualAudioGraph;
    const freq = rootFrequency * i;
    const amp = overtoneAmp(i, freq);
    const peakAmpTime = currentTime + overtoneAttack(i);
    const zeroAmpTime = peakAmpTime + overtoneRelease(i);
    
    accumulatedOscs[i] = oscWithGain('output',
      { 
        frequency: freq, 
        gain: [
          [ 'setValueAtTime', 0, currentTime ],
          [ 'linearRampToValueAtTime', amp, peakAmpTime ],
          [ 'linearRampToValueAtTime', 0, zeroAmpTime ],
        ],
        // gain: amp,
        ...rest 
      }
    );
    return accumulatedOscs;
  }
  // let oscs = { 0: gain('output', {gain: 0.5}) }
  return R.range(1, toneCount + 1).reduce(reducer, {});
});

const currentGraph = (state) => {
  const { currentTime } = virtualAudioGraph;
  return {
    0: gain('output', { gain: 0.1 }),
    1: customSynth('output', {
      rootFrequency: 240,
      toneCount: 60,
      overtoneAmp: (i, freq) => Math.random() / i,
      overtoneAttack: (i, freq) => Math.random(),
      overtoneRelease: (i, freq) => Math.random(),
      startTime: currentTime,
      stopTime: currentTime + 2
    })
  };
};

store.subscribe(() => {
  console.log("state change!");
  let state = store.getState();

  virtualAudioGraph.update(
    state.playback ? currentGraph(state) : {}
  );
});