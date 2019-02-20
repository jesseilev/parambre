import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withSize} from 'react-sizeme';
import * as R from 'ramda';


import AdjustableBoxFor4Params from './AdjustableBoxFor4Params';
import Visualizer from '../containers/Visualizer';
import {range, mapBetweenRanges} from '../utils';

// TODO inject settings into state instead of doing thing
import {settings} from '../reducers/timbreParams';



const boxArea = ({width, height}) => {
  const w = mapBetweenRanges(width.range, range(0,1), width.value);
  const h = mapBetweenRanges(height.range, range(0,1), height.value);
  return w * h;
};

const computeZIndex = (listOfParamsBoxes, paramsBox) => (
  R.reverse(R.sortBy(boxArea, listOfParamsBoxes)).indexOf(paramsBox)
);

const ControlPad = (props) => {
  const { curve1Params, curve2Params, curve3Params } = props;
  const paramsList = [curve1Params, curve2Params, curve3Params];

  return (
    <div
    style={{
    width: '100%',
    height: '100%',
    borderColor: 'white',
    borderStyle: 'dashed',
    borderWidth: props.isAdjustmentHappening ? '0px' : '0px'
    // background: 'rgba(255, 255, 255, 0.05)'
    }}
    >
    

        <AdjustableBoxFor4Params 
        parentSize={props.size}
        xParam={props.curve1Params.x}
        yParam={props.curve1Params.y}
        widthParam={props.curve1Params.width}
        heightParam={props.curve1Params.height}
        zIndex={computeZIndex(paramsList, curve1Params)}
        color={'cyan'}
        paramSetName={'overtoneAmplitudes'}
        >
        </AdjustableBoxFor4Params>

        <AdjustableBoxFor4Params 
        parentSize={props.size}
        xParam={props.curve2Params.x}
        yParam={props.curve2Params.y}
        widthParam={props.curve2Params.width}
        heightParam={props.curve2Params.height}
        color={'magenta'}
        paramSetName={'modulationMagnitudes'}
        zIndex={computeZIndex(paramsList, curve2Params)}
        >
        </AdjustableBoxFor4Params>

        <AdjustableBoxFor4Params 
        parentSize={props.size}
        xParam={props.curve3Params.x}
        yParam={props.curve3Params.y}
        widthParam={props.curve3Params.width}
        heightParam={props.curve3Params.height}
        color={'orange'}
        paramSetName={'modulationFrequencies'}
        zIndex={computeZIndex(paramsList, curve3Params)}
        >
        </AdjustableBoxFor4Params>
    </div>
  );
}




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
      value: curve.period,
      range: curveSettings.ranges.period,
      lensPath: [ curveKeyName, 'period' ]
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
    curve3Params: makeParams(state.timbreParams.curve3, settings.curve3, 'curve3'),
    isAdjustmentHappening: state.timbreParams.currentParamSetBeingAdjusted !== null
  };
};

const mapDispatchToProps = (dispatch) => (
    {}
);

const ControlPadWithSize = withSize({ monitorHeight: true })(ControlPad);
export default connect(mapStateToProps, mapDispatchToProps)(ControlPadWithSize);