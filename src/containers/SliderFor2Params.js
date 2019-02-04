import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Rnd} from 'react-rnd';
import ResizableRect from 'react-resizable-rotatable-draggable';
import {withSize} from 'react-sizeme';
import * as R from 'ramda';

import {dragDelta, setPlayback} from '../actions';


const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};

const handleSize = { width: 20, height: 20 }

const SliderFor2Params = (props) => (
    <ResizableRect
      left={props.xPercent * props.parentSize.width - (0.5 * handleSize.width)}
      top={props.yPercent * props.parentSize.height - (0.5 * handleSize.height)}
      width={20}
      height={20}
      onDrag={props.onDrag(props.parentSize, props.lensPaths)}
      onDragStart={props.onDragStart}
      onDragEnd={props.onDragStop}
      style={{'background': props.color}}
    >
    </ResizableRect>
);

SliderFor2Params.propTypes = {
  xPercent: PropTypes.number.isRequired,
  yPercent: PropTypes.number.isRequired,
  // width: PropTypes.number.isRequired,
  // height: PropTypes.number.isRequired,
  onDrag: PropTypes.func.isRequired,
  // onResize: PropTypes.func.isRequired
};

const ranges = {
  phase: { min: 0, max: 1 },
  offset: { min: 0, max: 1 },
  freq: { min: 0.1, max: 2 },
  amp: { min: 0, max: 1 }
}

const rangeDistance = (range) => (range.max - range.min);

const mapBetweenRanges = (fromRange, toRange, value) => {
  const percent = (value - fromRange.min) / rangeDistance(fromRange);
  return toRange.min + (percent * rangeDistance(toRange));
}

const pixelsPerPeriod = 50;

// const waveToBox = (wave) => ({
//   x: mapBetweenRanges(ranges.phase, windowWidthRange, wave.phase),
//   y: mapBetweenRanges(ranges.offset, windowHeightRange, wave.offset),
//   width: pixelsPerPeriod / mapBetweenRanges(ranges.freq, windowWidthRange, wave.freq),
//   height: mapBetweenRanges(ranges.amp, windowHeightRange, wave.amp)
// });


// const boxToWave = (box) => ({
//   phase: mapBetweenRanges(windowWidthRange, ranges.phase, box.x),
//   offset: mapBetweenRanges(windowHeightRange, ranges.offset, box.y),
//   freq: mapBetweenRanges(windowWidthRange, ranges.freq, box.width),
//   amp: mapBetweenRanges(windowHeightRange, ranges.amp, box.height)
// })

const mapStateToProps = (state, ownProps) => ({
  xPercent: R.view(R.lensPath(ownProps.lensPaths.x), state.timbreParams),
  yPercent: R.view(R.lensPath(ownProps.lensPaths.y), state.timbreParams),
});

const mapDispatchToProps = (dispatch) => ({
  onDrag: (containerSize, lensPaths) => (
    (deltaX, deltaY) => (
      dispatch(dragDelta({
        delta: { 
          x: deltaX / containerSize.width, 
          y: deltaY / containerSize.height
        },
        lensPaths: lensPaths
      }))
    )
  ),
  onDragStart: () => {
    return dispatch(setPlayback(true));
  },
  onDragStop: () => {
    return dispatch(setPlayback(false));
  }
});

const SliderFor2ParamsWithSize = withSize({ monitorHeight: true })(SliderFor2Params);
export default connect(mapStateToProps, mapDispatchToProps)(SliderFor2ParamsWithSize);