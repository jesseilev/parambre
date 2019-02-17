import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Rnd} from 'react-rnd';
import ResizableRect from 'react-resizable-rotatable-draggable';
import {withSize} from 'react-sizeme';
import * as R from 'ramda';

import {boxAdjustment, setPlayback} from '../actions';
import {range, mapBetweenRanges, clampToRange} from '../utils';


const resizeHandleStyles = (color) => ({ 
  width: 15, height: 15,
  background: color
});

const AdjustableBoxFor4Params = (props) => {
  const { 
    xParam, yParam, widthParam, heightParam, parentSize,
    onDrag, onResize, onBoxAdjustmentStart, onBoxAdjustmentEnd 
  } = props;

  const x = mapBetweenRanges(
    xParam.range, 
    range(0, parentSize.width), 
    xParam.value
  );
  const y = mapBetweenRanges(
    yParam.range, 
    range(0, parentSize.height), 
    yParam.value
  );
  const width = mapBetweenRanges(
    widthParam.range, 
    range(0, parentSize.width), 
    widthParam.value
  );
  const height = mapBetweenRanges(
    heightParam.range,
    range(0, parentSize.height),
    heightParam.value
  );

  return (
    <Rnd
    position={{
      x: x - width * 0.5,
      y: y - height * 0.5
    }}
    size={{
      width: width,
      height: height
    }}
    style={{
      border: '2px solid ' + props.color
      // background: props.color
    }}
    
    onDrag={onDrag(parentSize, xParam, yParam)}
    onResize={onResize(parentSize, widthParam, heightParam)}

    onDragStart={onBoxAdjustmentStart}
    onDragStop={onBoxAdjustmentEnd}
    onResizeStart={onBoxAdjustmentStart}
    onResizeStop={onBoxAdjustmentEnd}
    
    enableResizing={{
      topLeft: true,
      topRight: true,
      bottomLeft: true,
      bottomRight: true
    }}

    resizeHandleStyles={{
      topLeft: resizeHandleStyles(props.color),
      topRight: resizeHandleStyles(props.color),
      bottomLeft: resizeHandleStyles(props.color),
      bottomRight: resizeHandleStyles(props.color)
    }}

    // bounds={'parent'}
    >
    </Rnd>
  );

  // return (
  //   <ResizableRect
  //     left={x - width * 0.5}
  //     top={y - height * 0.5}
  //     width={width}
  //     height={height}
  //     zoomable={'nw, ne, sw, se'}
  //     onDrag={onDrag(parentSize, xParam, yParam)}
  //     onResize={onResize(parentSize, widthParam, heightParam)}
  //     onDragStart={onBoxAdjustmentStart}
  //     onDragEnd={onBoxAdjustmentEnd}
  //     onResizeStart={onBoxAdjustmentStart}
  //     onResizeEnd={onBoxAdjustmentEnd}
  //     style={{'cursor': 'move'}}
  //   >
  //   </ResizableRect>
  // );
};

AdjustableBoxFor4Params.propTypes = {
  xParam: PropTypes.object.isRequired,
  yParam: PropTypes.object.isRequired,
  widthParam: PropTypes.object.isRequired,
  heightParam: PropTypes.object.isRequired,
  parentSize: PropTypes.object.isRequired,
  onDrag: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,

};


const pixelsPerPeriod = 50;

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  onDrag: (containerSize, xParam, yParam) => (
    (dragEvent) => {
      const compressedDeltaX = mapBetweenRanges(
        range(0, containerSize.width),
        xParam.range,
        dragEvent.movementX
      );
      const compressedDeltaY = mapBetweenRanges(
        range(0, containerSize.height),
        yParam.range,
        dragEvent.movementY
      );

      const newX = clampToRange(xParam.range, xParam.value + compressedDeltaX);
      const newY = clampToRange(yParam.range, yParam.value + compressedDeltaY);

      return dispatch(boxAdjustment([
        { ...xParam, value: newX },
        { ...yParam, value: newY }
      ]));
    }
  ),
  onResize: (containerSize, widthParam, heightParam) => (
    (resizeEvent, resizeType, refToElement) => {
      // debugger;
      console.log(resizeEvent);
      const compressedWidth = mapBetweenRanges(
        range(0, containerSize.width),
        widthParam.range,
        refToElement.clientWidth
      );
      const compressedHeight = mapBetweenRanges(
        range(0, containerSize.height),
        heightParam.range,
        refToElement.clientHeight
      );

      const newWidth = clampToRange(widthParam.range, compressedWidth);
      const newHeight = clampToRange(heightParam.range, compressedHeight);

      return dispatch(boxAdjustment([
        { ...widthParam, value: newWidth },
        { ...heightParam, value: newHeight }
      ]));
    }
  ),
  onBoxAdjustmentStart: () => {
    return dispatch(setPlayback(true));
  },
  onBoxAdjustmentEnd: () => {
    return dispatch(setPlayback(false));
  }
});

const AdjustableBoxFor4ParamsWithSize = withSize({ monitorHeight: true })(AdjustableBoxFor4Params);
export default connect(mapStateToProps, mapDispatchToProps)(AdjustableBoxFor4ParamsWithSize);