import * as R from 'ramda';
import createVirtualAudioGraph, {
  createNode,
  createWorkletNode,
  delay,
  gain,
  oscillator,
  stereoPanner,
} from 'virtual-audio-graph';


const sine = ({amp, freq, offset, phase}, x) => (
  offset + amp * Math.sin(x * freq + phase)
);



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
  overtonePulseFreq,
  overtonePulseAmp,
  ...rest
}) => {
  const reduceFunc = (accumulatedOscs, i) => {
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
  return R.range(1, toneCount + 1).filter(filterer).reduce(reduceFunc, {});
});


// BUILD THE AUDIO GRAPH BASED ON CURRENT STATE

export const buildAudioNodes = (state) => {
  // const wave1 = { amp: 0.35, freq: state.wave1.freq, offset: 0.5, phase: 0.25 };
  // console.log(state);
  // cases
  // silence
  //   ['setValueAtTime', 0, currentTime],
  // max
  //   ['setValueAtTime', maxvolume, currentTime],
  // attacking
  //   ['linearRamToValueAtTime', maxvolume, currentTime],
  // releasing

  // debugger;

  const attack = 0.1;
  const release = 2;
  const { currentTime } = state.audioPlayer.audioGraph;
  const targetGain = state.audioPlayer.isPlaying ? 0.2 : 0;
  const rampDuration = state.audioPlayer.isPlaying ? attack : release;
  let targetFinishTime = state.audioPlayer.mostRecentPlayPauseChange + rampDuration;
  const stillRamping = currentTime < targetFinishTime;
  const curveType = stillRamping ? 'linearRampToValueAtTime' : 'setValueAtTime';
  targetFinishTime = stillRamping ? targetFinishTime : 0;

  const rootFreq = 180;
  
  const genCustom = freq => customSynth(0, {
    rootFrequency: freq,
    toneCount: 25,
    overtoneAmp: i => sine(state.wave1, i),
    overtonePulseFreq: (i) => Math.random() * 20, //_.sample([1,1.5,2,2.5,3,4,5,6,8,10,12,15,16])
    overtonePulseAmp: (i) => 0//Math.random()
  })
  return {
    0: gain('output', {
        gain: [ curveType, targetGain, targetFinishTime ]
      // gain: [ 
      //   ['setValueAtTime', 0, currentTime],
      //   ['linearRampToValueAtTime', 0.2, currentTime + attack],
      //   ['linearRampToValueAtTime', 0, currentTime + attack + release],
      // ]
    }),
    1: genCustom(rootFreq),
    // 2: genCustom(rootFreq * 9 / 3),
    3: genCustom(rootFreq * 12 / 5),
    4: genCustom(rootFreq * 9 / 5)
    // 1: oscWithFluctuatingGain(0, {
    //   frequency: rootFreq,
    //   gain: 0.6,
    //   pulseAmplitiude: 0.6,
    //   pulseFrequency: 2
    // })
  };
};

const updateGraph = (state) => { 
  state.audioPlayer.audioGraph.update(buildAudioNodes(state)) 
};

export default updateGraph;