import * as R from 'ramda';
import createVirtualAudioGraph, {
  createNode,
  createWorkletNode,
  delay,
  gain,
  biquadFilter,
  bufferSource,
  oscillator,
  stereoPanner,
  analyser
} from 'virtual-audio-graph';
import audioContext from './audioContext';
import {sine} from './utils';






// CUSTOM GRAPH SECTIONS


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
  overtoneModulationFreq,
  overtoneModulationAmp,
  ...rest
}) => {
  const reduceFunc = (accumulatedOscs, i) => {
    const freq = rootFrequency * i;
    const amp = overtoneAmp(i, freq) / i;
    accumulatedOscs[i] = oscWithFluctuatingGain('output',
      { 
        frequency: freq, 
        gain: amp,
        pulseFrequency: overtoneModulationFreq(i),
        pulseAmplitiude: overtoneModulationAmp(i) * amp,
        ...rest 
      }
    );
    return accumulatedOscs;
  }
  const filterer = (i) => i * rootFrequency < 22050;
  return R.range(1, toneCount + 1).filter(filterer).reduce(reduceFunc, {});
});


// noise buffer
const sampleRate = audioContext.sampleRate;
const bufferDuration = 2;
const bufferSize = bufferDuration * sampleRate;
const buffer = audioContext.createBuffer(bufferDuration, bufferSize, sampleRate);
let data = buffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
  data[i] = Math.random() * 2 - 1;
}

// BUILD THE AUDIO GRAPH BASED ON CURRENT STATE

export const buildAudioNodes = (state) => {

  const attack = 0.03;
  const release = 2;
  const { currentTime } = state.audioPlayer.audioGraph || 0;
  const targetGain = state.audioPlayer.isPlaying ? 0.2 : 0;
  const rampDuration = state.audioPlayer.isPlaying ? attack : release;
  let targetFinishTime = state.audioPlayer.mostRecentPlayPauseChange + rampDuration;
  const stillRamping = currentTime < targetFinishTime;
  const curveType = stillRamping ? 'linearRampToValueAtTime' : 'setValueAtTime';
  targetFinishTime = stillRamping ? targetFinishTime : currentTime;

  const rootFreq = 150;
  
  const {curve1, curve2, curve3} = state.timbreParams;

  const genCustom = freq => customSynth(0, {
    rootFrequency: freq,
    toneCount: 60,
    overtoneAmp: i => sine(curve1, i),
    overtoneModulationAmp: (i) => sine(curve2, i),
    overtoneModulationFreq: (i) => sine(curve3, i) * 12,
  })
  return {
    1000: analyser('output', {
      fftSize: 1024
    }),

    0: gain(1000, {
        gain: [ curveType, targetGain, targetFinishTime ]
      // gain: [ 
      //   ['setValueAtTime', 0, currentTime],
      //   ['linearRampToValueAtTime', 0.2, currentTime + attack],
      //   ['linearRampToValueAtTime', 0, currentTime + attack + release],
      // ]
    }),

    1: genCustom(rootFreq * 8 / 9),
    2: genCustom(rootFreq * 8 / 3),
    3: genCustom(rootFreq * 12 / 5),
    4: genCustom(rootFreq * 9 / 5)

    // 1: biquadFilter(0, {
    //   type: 'lowpass',
    //   frequency: curve1.offset * 1000,
    //   q: 10000000000000,
    // }),

    // 2: biquadFilter(1, {
    //   type: 'highpass',
    //   frequency: curve1.phase * 1000,
    //   q: 1000000000000,
    // }),

    // 3: bufferSource(2, {
    //   buffer: buffer,
    //   loop: true
    // })

    // 1: oscWithFluctuatingGain(0, {
    //   frequency: rootFreq,
    //   gain: 0.6,
    //   pulseAmplitiude: 0.6,
    //   pulseFrequency: 2
    // })
  };
};

const updateGraph = (state) => { 
  const newNodes = buildAudioNodes(state);
  state.audioPlayer.audioGraph.update(newNodes); 
};

export default updateGraph;