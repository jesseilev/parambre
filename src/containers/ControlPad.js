import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withSize} from 'react-sizeme';
import SliderFor2Params from './SliderFor2Params';



const ControlPad = (props) => (
  <div
  style={{
    width: '600px',
    height: '400px',
    background: '#777'
  }}
  >
    <SliderFor2Params 
    parentSize={props.size}
    xParamKey={'phase'}
    yParamKey={'offset'}
    >
    </SliderFor2Params>
  </div>
);


const mapStateToProps = (state) => (
    {}
);

const mapDispatchToProps = (dispatch) => (
    {}
);

const ControlPadWithSize = withSize({ monitorHeight: true })(ControlPad);
export default connect(mapStateToProps, mapDispatchToProps)(ControlPadWithSize);