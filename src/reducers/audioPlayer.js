import createVirtualAudioGraph, {
  createNode,
  createWorkletNode,
  delay,
  gain,
  oscillator,
  stereoPanner,
} from 'virtual-audio-graph';
import audioContext from '../audioContext';


const audioGraph = createVirtualAudioGraph({
  audioContext,
  output: audioContext.destination
});

const initialState = {
  isPlaying: false,
  mostRecentPlayPauseChange: 0,
  audioGraph: audioGraph
}

const audioPlayer = (state = initialState, action) => {
  const setIsPlaying = newIsPlaying => ({
    ...state,
    isPlaying: !state.isPlaying,
    mostRecentPlayPauseChange: state.audioGraph.currentTime
  });

  switch(action.type) {
    case 'TOGGLE_PLAYBACK':
      return setIsPlaying(!state.isPlaying);
    case 'SET_PLAYBACK':
      return setIsPlaying(action.newIsPlaying);
    default:
      return state;
  }
};

export default audioPlayer;