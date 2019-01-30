import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as R from 'ramda';
import * as _ from 'lodash';
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

const oscWithFluctuatingGain = createNode(({
  gain: gainValue,
  pulseFrequency,
  pulseAmplitiude,
  ...rest
}) => {
  return {
    0: gain('output', {gain: gainValue}),
    1: oscillator(0, { ...rest }),
    2: gain({ key: 0, destination: 'gain'}, { gain: pulseAmplitiude }),
    3: oscillator(2, { frequency: pulseFrequency, type: 'square' })
  }
})

const customSynth = createNode(({
  rootFrequency,
  toneCount,
  overtoneAmp,
  overtonePulseFreq,
  overtonePulseAmp,
  ...rest
}) => {
  const reducer = (accumulatedOscs, i) => {
    const { currentTime } = virtualAudioGraph;
    const freq = rootFrequency * i;
    const amp = overtoneAmp(i, freq) / i;
    accumulatedOscs[i] = oscWithFluctuatingGain('output',
      { 
        frequency: freq, 
        gain: amp,
        pulseFrequency: overtonePulseFreq(i),
        pulseAmplitiude: overtonePulseAmp(i) * amp,
        ...rest 
      }
    );
    return accumulatedOscs;
  }
  const filterer = (i) => i * rootFrequency < 22050;
  return R.range(1, toneCount + 1).filter(filterer).reduce(reducer, {});
});

const sine = ({amp, freq, offset, phase}, x) => (
  offset + amp * Math.sin(x * freq + phase)
);

const currentGraph = (state) => {
  // const wave1 = { amp: 0.35, freq: state.wave1.freq, offset: 0.5, phase: 0.25 };
  const { currentTime } = virtualAudioGraph;
  const attack = 0.05;
  const release = 5;
  const root = 180;
  const genCustom = freq => customSynth(0, {
    rootFrequency: freq,
    toneCount: 75,
    overtoneAmp: i => sine(state.wave1, i),
    overtonePulseFreq: (i) => Math.random() * 20, //_.sample([1,1.5,2,2.5,3,4,5,6,8,10,12,15,16])
    overtonePulseAmp: (i) => 0//Math.random()
  })
  return {
    0: gain('output', { gain: 0.2
      // gain: [ 
      //   ['setValueAtTime', 0, currentTime],
      //   ['linearRampToValueAtTime', 0.2, currentTime + attack],
      //   ['linearRampToValueAtTime', 0, currentTime + attack + release],
      // ]
    }),
    1: genCustom(root),
    // 2: genCustom(root * 9 / 3),
    // 3: genCustom(root * 12 / 5),
    // 4: genCustom(root * 8 / 5)
    // 1: oscWithFluctuatingGain(0, {
    //   frequency: root,
    //   gain: 0.6,
    //   pulseAmplitiude: 0.6,
    //   pulseFrequency: 2
    // })
  };
};

store.subscribe(() => {
  const state = store.getState();
  console.log(state.wave1);

  virtualAudioGraph.update(
    state.playback ? currentGraph(state) : {}
  );
});