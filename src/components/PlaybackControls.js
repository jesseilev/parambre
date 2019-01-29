import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {togglePlayback} from '../actions';

let buttonText = (playback) => {
  return playback ? 'PAUSE' : 'PLAY';
}

const PlaybackControls = ({playback, onClick}) => (
  <button onClick={onClick} >
    {buttonText(playback)}
  </button>
);

PlaybackControls.propTypes = {
  playback: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  playback: state.playback
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(togglePlayback())
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaybackControls);
