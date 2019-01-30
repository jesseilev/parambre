import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {sliderChange} from '../actions';


const Slider = ({sliderVal, onChange}) => (
  <input 
    type='range' 
    value={sliderVal}
    min='0.1'
    max='3'
    step='0.1'
    onChange={onChange} >
  </input>
);

Slider.propTypes = {
  sliderVal: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sliderVal: state.wave1frequency
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (payload) => dispatch(sliderChange(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
