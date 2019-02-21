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
  const { 
    overtoneAmplitudesBox, modulationMagnitudesBox, modulationFrequenciesBox 
  } = props;
  const paramsList = [
    overtoneAmplitudesBox, modulationMagnitudesBox, modulationFrequenciesBox
  ];

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
        xParam={props.overtoneAmplitudesBox.x}
        yParam={props.overtoneAmplitudesBox.y}
        widthParam={props.overtoneAmplitudesBox.width}
        heightParam={props.overtoneAmplitudesBox.height}
        zIndex={computeZIndex(paramsList, overtoneAmplitudesBox)}
        color={props.colors.overtoneAmplitudes}
        paramSetName={'overtoneAmplitudes'}
        >
        </AdjustableBoxFor4Params>

        <AdjustableBoxFor4Params 
        parentSize={props.size}
        xParam={props.modulationMagnitudesBox.x}
        yParam={props.modulationMagnitudesBox.y}
        widthParam={props.modulationMagnitudesBox.width}
        heightParam={props.modulationMagnitudesBox.height}
        color={props.colors.modulationMagnitudes}
        paramSetName={'modulationMagnitudes'}
        zIndex={computeZIndex(paramsList, modulationMagnitudesBox)}
        >
        </AdjustableBoxFor4Params>

        <AdjustableBoxFor4Params 
        parentSize={props.size}
        xParam={props.modulationFrequenciesBox.x}
        yParam={props.modulationFrequenciesBox.y}
        widthParam={props.modulationFrequenciesBox.width}
        heightParam={props.modulationFrequenciesBox.height}
        color={props.colors.modulationFrequencies}
        paramSetName={'modulationFrequencies'}
        zIndex={computeZIndex(paramsList, modulationFrequenciesBox)}
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
    overtoneAmplitudesBox: makeParams(
      state.timbreParams.overtoneAmplitudesCurve, 
      settings.overtoneAmplitudesCurve, 
      'overtoneAmplitudesCurve'
    ),
    modulationMagnitudesBox: makeParams(
      state.timbreParams.modulationMagnitudesCurve, 
      settings.modulationMagnitudesCurve, 
      'modulationMagnitudesCurve'
    ),
    modulationFrequenciesBox: makeParams(
      state.timbreParams.modulationFrequenciesCurve, 
      settings.modulationFrequenciesCurve, 
      'modulationFrequenciesCurve'
    ),
    colors: state.settings.colors,
    isAdjustmentHappening: state.timbreParams.currentParamSetBeingAdjusted !== null
  };
};

const mapDispatchToProps = (dispatch) => (
    {}
);

const ControlPadWithSize = withSize({ monitorHeight: true })(ControlPad);
export default connect(mapStateToProps, mapDispatchToProps)(ControlPadWithSize);