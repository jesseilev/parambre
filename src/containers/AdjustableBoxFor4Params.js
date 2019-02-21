import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Rnd} from 'react-rnd';
import ResizableRect from 'react-resizable-rotatable-draggable';
import {withSize} from 'react-sizeme';
import * as R from 'ramda';

import {boxAdjustment, boxAdjustmentStart, boxAdjustmentStop} from '../actions';
import {range, mapBetweenRanges, clampToRange, rangeDistance} from '../utils';


const resizeHandleStyles = (color) => ({ 
  width: 20, height: 20,
  background: color,
});


const AdjustableBoxFor4Params = (props) => {
  const { 
    xParam, yParam, widthParam, heightParam, parentSize, zIndex,
    paramSetName, boxBeingAdjusted,
    onDrag, onResize, onBoxAdjustmentStart, onBoxAdjustmentStop
  } = props;

  const centerX = mapBetweenRanges(
    xParam.range, 
    range(0, parentSize.width), 
    xParam.value
  );
  const centerY = mapBetweenRanges(
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

    const PositionBounds = ( 
      <div
        style={{
        width: parentSize.width,
        height: parentSize.height,
        left: -centerX + (width * 0.5),
        top: -centerY + (height * 0.5),
        borderColor: 'red',
        borderStyle: 'dashed',
        borderWidth: boxBeingAdjusted === 'ME' ? '1px' : '0px',
        position: 'fixed'
        }}
      >
      </div>
    );

    const SizeBounds = (
      <div
      style={{
        width: parentSize.width,
        height: parentSize.height,
        borderColor: 'white',
        borderStyle: 'dashed',
        borderWidth: boxBeingAdjusted === 'ME' ? '1px' : '0px',
        position: 'fixed'
      }}
      >
      </div>
    );


  return (
    <Rnd
    position={{
      x: centerX - width * 0.5,
      y: centerY - height * 0.5
    }}
    size={{
      width: width,
      height: height
    }}

    bounds={'parent'}

    maxWidth={ parentSize.width * 0.5 }
    maxHeight={ parentSize.height }
    minWidth={60}
    minHeight={60}

    style={{
      border: '5px solid #ddd',
      background: boxBeingAdjusted === 'ME' ? 'rgba(0,0,0,0)' : props.color,
      opacity: boxBeingAdjusted === 'SOMEONE_ELSE' ? 0 : 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '10px 10px 20px 2px rgba(0,0,0,0.2)',
      zIndex: zIndex,
    }}
    
    onDrag={onDrag(parentSize, xParam, yParam)}
    onResize={onResize(parentSize, widthParam, heightParam)}

    onDragStart={onBoxAdjustmentStart(paramSetName)}
    onDragStop={onBoxAdjustmentStop(paramSetName)}
    onResizeStart={onBoxAdjustmentStart(paramSetName)}
    onResizeStop={onBoxAdjustmentStop(paramSetName)}
    
    enableResizing={{
      topLeft: true,
      topRight: true,
      bottomLeft: true,
      bottomRight: true
    }}

    resizeHandleStyles={{
      topLeft: resizeHandleStyles('#ddd'),
      topRight: resizeHandleStyles('#ddd'),
      bottomLeft: resizeHandleStyles('#ddd'),
      bottomRight: resizeHandleStyles('#ddd')
    }}

    >
      {boxBeingAdjusted === 'ME' ? '' : ''}
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
  const cpsba = state.timbreParams.currentParamSetBeingAdjusted;
  let boxBeingAdjusted = null;
  if (cpsba === ownProps.paramSetName) {
    boxBeingAdjusted = 'ME';
  } 
  else if (cpsba !== null) {
    boxBeingAdjusted = 'SOMEONE_ELSE';
  }

  return {
    boxBeingAdjusted: boxBeingAdjusted
  };
};

const mapDispatchToProps = (dispatch) => ({
  onDrag: (containerSize, xParam, yParam) => (
    (mouseEvent, dragData) => {
      const compressedDeltaX = mapBetweenRanges(
        range(0, containerSize.width), 
        range(0, rangeDistance(xParam.range)), 
        dragData.deltaX
      );
      const compressedDeltaY = mapBetweenRanges(
        range(0, containerSize.height), 
        range(0, rangeDistance(yParam.range)), 
        dragData.deltaY
      );

      return dispatch(boxAdjustment([
        { ...xParam, value: xParam.value + compressedDeltaX },
        { ...yParam, value: yParam.value + compressedDeltaY }
      ]));
    }
  ),
  onResize: (containerSize, widthParam, heightParam) => (
    (event, directionType, refToElement, delta, position) => {
      const widthParamNewValue = mapBetweenRanges(
        range(0, containerSize.width),
        widthParam.range,
        refToElement.clientWidth
      );
      const heightParamNewValue = mapBetweenRanges(
        range(0, containerSize.height),
        heightParam.range,
        refToElement.clientHeight
      );

      return dispatch(boxAdjustment([
        { ...widthParam, value: widthParamNewValue },
        { ...heightParam, value: heightParamNewValue }
      ]));
    }
  ),
  onBoxAdjustmentStart: (paramSetName) => {
    return () => dispatch(boxAdjustmentStart(paramSetName));
  },
  onBoxAdjustmentStop: (paramSetName) => {
    return () => dispatch(boxAdjustmentStop(paramSetName));
  }
});

const AdjustableBoxFor4ParamsWithSize = withSize({ monitorHeight: true })(AdjustableBoxFor4Params);
export default connect(mapStateToProps, mapDispatchToProps)(AdjustableBoxFor4ParamsWithSize);