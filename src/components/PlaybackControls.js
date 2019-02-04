import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {togglePlayback} from '../actions';

let buttonText = (isPlaying) => {
  return isPlaying ? 'PAUSE' : 'PLAY';
}

const PlaybackControls = ({isPlaying, onClick}) => (
  <button onClick={onClick} >
    {buttonText(isPlaying)}
  </button>
);

PlaybackControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isPlaying: state.audioPlayer.isPlaying
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(togglePlayback())
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaybackControls);
