import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Rnd} from 'react-rnd';
import ResizableRect from 'react-resizable-rotatable-draggable';
import {withSize} from 'react-sizeme';
import {dragDelta, setPlayback} from '../actions';


const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};

const handleSize = { width: 20, height: 20 }

const ControlBox = (props) => (
  <div
    style={{
      width: '600px',
      height: '400px',
      background: '#777'
    }}
  >
    <ResizableRect
      left={props.xPercent * props.size.width - (0.5 * handleSize.width)}
      top={props.yPercent * props.size.height - (0.5 * handleSize.height)}
      width={20}
      height={20}
      onDrag={props.onDrag(props.size)}
      onDragStart={props.onDragStart}
      onDragEnd={props.onDragStop}
    >
    </ResizableRect>

    {/*
    <Rnd
      style={style}
      default={{
        x: 300,
        y: 100,
        width: 200,
        height: 200
      }}
      position={{
        x: props.x,
        y: props.y
      }}

      // size={{width: props.width, height: props.height}}

      onDrag={props.onDrag}
      onResize={props.onResize}
      onResizeStop={ console.log("stop!") }
      onResizeStart={ console.log("start!") }
    >
      Rnd
    </Rnd>
    
    */}

  </div>
);

ControlBox.propTypes = {
  xPercent: PropTypes.number.isRequired,
  yPercent: PropTypes.number.isRequired,
  // width: PropTypes.number.isRequired,
  // height: PropTypes.number.isRequired,
  onDrag: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired
};


const windo = { width: 600, height: 400 }
const windowWidthRange = { min: 0, max: windo.width }
const windowHeightRange = { min: 0, max: windo.height }

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

const waveToBox = (wave) => ({
  x: mapBetweenRanges(ranges.phase, windowWidthRange, wave.phase),
  y: mapBetweenRanges(ranges.offset, windowHeightRange, wave.offset),
  width: pixelsPerPeriod / mapBetweenRanges(ranges.freq, windowWidthRange, wave.freq),
  height: mapBetweenRanges(ranges.amp, windowHeightRange, wave.amp)
});


const boxToWave = (box) => ({
  phase: mapBetweenRanges(windowWidthRange, ranges.phase, box.x),
  offset: mapBetweenRanges(windowHeightRange, ranges.offset, box.y),
  freq: mapBetweenRanges(windowWidthRange, ranges.freq, box.width),
  amp: mapBetweenRanges(windowHeightRange, ranges.amp, box.height)
})

const mapStateToProps = state => ({
  xPercent: state.wave1.phase,
  yPercent: state.wave1.offset
});

const mapDispatchToProps = dispatch => ({
  onDrag: (containerSize) => (
    (deltaX, deltaY) => (
      dispatch(dragDelta(
        deltaX / containerSize.width, 
        deltaY / containerSize.height
      ))
    )
  ),
  onResize: (event, direction, refToElement, resizeDelta, position) => {
    const box = {
      x: position.x,
      y: position.y,
      width: refToElement.clientWidth,
      height: refToElement.clientHeight
    }
    return dispatch({type: 'noop'}); 
  },
  onDragStart: () => {
    return dispatch(setPlayback(true));
  },
  onDragStop: () => {
    return dispatch(setPlayback(false));
  }
});

const ControlBoxWithSize = withSize({ monitorHeight: true })(ControlBox);
export default connect(mapStateToProps, mapDispatchToProps)(ControlBoxWithSize);
