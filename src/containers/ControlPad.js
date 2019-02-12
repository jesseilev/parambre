import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withSize} from 'react-sizeme';
import AdjustableBoxFor4Params from './AdjustableBoxFor4Params';
import Visualizer from '../containers/Visualizer';
import {range} from '../utils/range';


const ControlPad = (props) => (
  <div
  style={{
    width: '100%',
    height: '700px',
    background: '#333'
  }}
  >
    <Visualizer />

    <AdjustableBoxFor4Params 
    parentSize={props.size}
    xParam={props.curve1Params.x}
    yParam={props.curve1Params.y}
    widthParam={props.curve1Params.width}
    heightParam={props.curve1Params.height}
    color={'#509308'}
    >
    </AdjustableBoxFor4Params>

    <AdjustableBoxFor4Params 
    parentSize={props.size}
    xParam={props.curve2Params.x}
    yParam={props.curve2Params.y}
    widthParam={props.curve2Params.width}
    heightParam={props.curve2Params.height}
    color={'#309273'}
    >
    </AdjustableBoxFor4Params>

    <AdjustableBoxFor4Params 
    parentSize={props.size}
    xParam={props.curve3Params.x}
    yParam={props.curve3Params.y}
    widthParam={props.curve3Params.width}
    heightParam={props.curve3Params.height}
    color={'#1502703'}
    >
    </AdjustableBoxFor4Params>
  </div>
);

const settings = {
  curve1: {
    ranges: {
      phase: range(0, 1),
      offset: range(0, 1),
      freq: range(0, 8),
      amp: range(0, 1)
    }
  },
  curve2: {
    ranges: {
      phase: range(0, 1),
      offset: range(0, 1),
      freq: range(0, 8),
      amp: range(0, 1)
    }
  },
  curve3: {
    ranges: {
      phase: range(0, 1),
      offset: range(0, 1),
      freq: range(0, 8),
      amp: range(0, 1)
    }
  }
};


const mapStateToProps = (state) => {

  const makeParams = (curve, curveSettings, curveKeyName) => ({
    x: { 
      value: curve.phase,
      range: curveSettings.ranges.phase,
      lensPath: [ curveKeyName, 'phase' ]
    },
    y: {
      value: curve.offset,
      range: curveSettings.ranges.offset,
      lensPath: [ curveKeyName, 'offset' ]
    },
    width: {
      value: curve.freq,
      range: curveSettings.ranges.freq,
      lensPath: [ curveKeyName, 'freq' ]
    },
    height: {
      value: curve.amp,
      range: curveSettings.ranges.amp,
      lensPath: [ curveKeyName, 'amp' ]
    }
  });

  return {
    curve1Params: makeParams(state.timbreParams.curve1, settings.curve1, 'curve1'),
    curve2Params: makeParams(state.timbreParams.curve2, settings.curve2, 'curve2'),
    curve3Params: makeParams(state.timbreParams.curve3, settings.curve3, 'curve3')
  };
};

const mapDispatchToProps = (dispatch) => (
    {}
);

const ControlPadWithSize = withSize({ monitorHeight: true })(ControlPad);
export default connect(mapStateToProps, mapDispatchToProps)(ControlPadWithSize);