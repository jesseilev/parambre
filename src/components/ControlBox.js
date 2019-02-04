import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Rnd} from 'react-rnd';
import ResizableRect from 'react-resizable-rotatable-draggable';
import {waveChange, setPlayback} from '../actions';


const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};

const onDrag = (arg1, arg2) => {
  console.log("drag!");
  console.log(arg1);
  console.log(arg2);
}

const ControlBox = (props) => (
  <div
    style={{
      width: '600px',
      height: '400px',
      background: '#777'
    }}
  >
    <ResizableRect
      left={100}
      top={100}
      width={100}
      height={100}
      onDrag={onDrag}
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
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
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

const mapStateToProps = state => (
  waveToBox(state.wave1)
);

const mapDispatchToProps = dispatch => ({
  onDrag: (event, dragData) => {
    // const box = {
    //   x: dragData.x,
    //   y: dragData.y,
    //   width: dragData.node.clientWidth,
    //   height: dragData.node.clientHeight
    // };
    return dispatch(waveChange(boxToWave({})));
  },
  onResize: (event, direction, refToElement, resizeDelta, position) => {
    const box = {
      x: position.x,
      y: position.y,
      width: refToElement.clientWidth,
      height: refToElement.clientHeight
    }
    return dispatch(waveChange(boxToWave(box))); 
  },
  onDragStart: () => {
    return dispatch(setPlayback(true));
  },
  onDragStop: () => {
    return dispatch(setPlayback(false));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlBox);
