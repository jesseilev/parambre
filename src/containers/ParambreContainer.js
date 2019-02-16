import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withSize} from 'react-sizeme';

import ControlPad from './ControlPad';
import Visualizer from './Visualizer';


const ParambreContainer = (props) => (
  <div
  style={{ 
    width: '100%',
    height: '100vh',
    background: '#111'
  }}
  >
    
    <Visualizer parentSize={props.size} />

    <div
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10
    }}
    >
      <ControlPad />
    </div>

  </div>
);

const ParambreContainerWithSize = withSize({ monitorHeight: true })(ParambreContainer);
export default connect()(ParambreContainerWithSize);