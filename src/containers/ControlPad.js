import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withSize} from 'react-sizeme';
import SliderFor2Params from './SliderFor2Params';



const ControlPad = (props) => (
  <div
  style={{
    width: '100%',
    height: '700px',
    background: '#333'
  }}
  >
    <SliderFor2Params 
    parentSize={props.size}
    lensPaths={{
      x: ['curve1', 'phase'],
      y: ['curve1', 'offset']
    }}
    color={'#8092412'}
    >
    </SliderFor2Params>

    <SliderFor2Params 
    parentSize={props.size}
    lensPaths={{
      x: ['curve1', 'freq'],
      y: ['curve1', 'amp']
    }}
    color={'#509308'}
    >
    </SliderFor2Params>

    <SliderFor2Params 
    parentSize={props.size}
    lensPaths={{
      x: ['curve2', 'phase'],
      y: ['curve2', 'offset']
    }}
    color={'#923842'}
    >
    </SliderFor2Params>

    <SliderFor2Params 
    parentSize={props.size}
    lensPaths={{
      x: ['curve2', 'freq'],
      y: ['curve2', 'amp']
    }}
    color={'#309273'}
    >
    </SliderFor2Params>

    <SliderFor2Params 
    parentSize={props.size}
    lensPaths={{
      x: ['curve3', 'phase'],
      y: ['curve3', 'offset']
    }}
    color={'#580230'}
    >
    </SliderFor2Params>

    <SliderFor2Params 
    parentSize={props.size}
    lensPaths={{
      x: ['curve3', 'freq'],
      y: ['curve3', 'amp']
    }}
    color={'#1502703'}
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