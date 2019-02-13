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
import {graphUpdate} from '../actions';


const audioGraph = createVirtualAudioGraph({
  audioContext,
  output: audioContext.destination
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
    return loop(newState, Cmd.action(graphUpdate()));
  };

  switch(action.type) {
    case 'TOGGLE_PLAYBACK':
      return setIsPlaying(!state.isPlaying);
    case 'SET_PLAYBACK':
      return setIsPlaying(action.newIsPlaying);
    default:
      return state;
  }
};
