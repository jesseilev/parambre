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

  const { attack, release, toneCount, rootFrequency } = state.settings.synth;
  const { currentTime } = state.audioPlayer.audioGraph || 0;
  const targetGain = state.audioPlayer.isPlaying ? 0.2 : 0;
  const rampDuration = state.audioPlayer.isPlaying ? attack : release;
  let targetFinishTime = state.audioPlayer.mostRecentPlayPauseChange + rampDuration;
  const stillRamping = currentTime < targetFinishTime;
  const curveType = stillRamping ? 'linearRampToValueAtTime' : 'setValueAtTime';
  targetFinishTime = stillRamping ? targetFinishTime : currentTime;
  
  const {
    overtoneAmplitudesCurve, 
    modulationMagnitudesCurve, 
    modulationFrequenciesCurve
  } = state.timbreParams;

  const genCustom = freq => customSynth(0, {
    rootFrequency: freq,
    toneCount: state.settings.synth.toneCount,
    overtoneAmp: i => sine(overtoneAmplitudesCurve, i),
    overtoneModulationAmp: (i) => sine(modulationMagnitudesCurve, i),
    overtoneModulationFreq: (i) => 1 + sine(modulationFrequenciesCurve, i) * 12,
  })
  return {

    0: gain('output', {
        gain: [ curveType, targetGain, targetFinishTime ]
    }),

    1: genCustom(rootFrequency * 1),   // 1
    2: genCustom(rootFrequency * 16 / 3),   // 3
    3: genCustom(rootFrequency * 12 / 5),  // 27/10
    4: genCustom(rootFrequency * 9 / 5)    // 2
  };
};

const updateGraph = (state) => { 
  const newNodes = buildAudioNodes(state);
  state.audioPlayer.audioGraph.update(newNodes); 
};

export default updateGraph;