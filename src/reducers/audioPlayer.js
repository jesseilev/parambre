import createVirtualAudioGraph, {
  createNode,
  createWorkletNode,
  delay,
  gain,
  oscillator,
  stereoPanner,
} from 'virtual-audio-graph';
import { Cmd, loop } from 'redux-loop'; 
import audioContext from '../audioContext';
import * as Actions from '../actions';


const audioGraph = createVirtualAudioGraph({
  audioContext,
  output: audioContext.destination
});

// HACK
// to make sure the first initial trigger fades in from volume 0.
// Better would be dispatching a GRAPH_UPDATE Cmd when the app loads,
// but doing so was causing audioGraph.currentTime to malfunction.
audioGraph.update({
  0: gain('output', { gain: 0 })
});

export const initialState = {
  isPlaying: false,
  mostRecentPlayPauseChange: 0,
  audioGraph: audioGraph
}

export const audioPlayer = (state = initialState, action) => {
  const setIsPlaying = (newIsPlaying) => {
    const newState = {
      ...state,
      isPlaying: newIsPlaying,
      mostRecentPlayPauseChange: state.audioGraph.currentTime
    };
    return loop(
      newState, 
      Cmd.action(Actions.graphUpdate())
    );
  };

  switch(action.type) {
    case 'TOGGLE_PLAYBACK':
      return setIsPlaying(!state.isPlaying);
    case 'BOX_ADJUSTMENT_START':
      return setIsPlaying(true);
    case 'BOX_ADJUSTMENT_STOP':
      return setIsPlaying(false);
    default:
      return state;
  }
};
