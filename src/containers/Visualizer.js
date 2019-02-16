import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { sine } from '../utils';



class Visualizer extends Component {
  
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  render() {
    return (
      <canvas 
      width={this.props.parentSize.width} 
      height={this.props.parentSize.height}
      ref={this.canvas} 
      />
    );
  }

  draw() {
    const { frequencyData, overtones } = this.props;
    const canvas = this.canvas.current;
    const context = canvas.getContext('2d');
    const sliceWidth = canvas.width / overtones.length;
    const maxHeight = canvas.height * 0.5;

    context.clearRect(0, 0, canvas.width, canvas.height);
    
    overtones.map(( overtone, index ) => {
      const { amplitude, modulationMagntiude, modulationFrequency } = overtone;
      const x = (index + 0.5) * sliceWidth;
      const y = amplitude * maxHeight + maxHeight * 0.5;

      // draw the circle
      context.strokeStyle = 'orange';
      context.lineWidth = 1;
      context.beginPath();
      // bigger radius for slower modulation frequency
      const radius = Math.max((1 - modulationFrequency) * 36, 0);
      // y positition based on amplitude
      context.arc(x, y, radius, 2 * Math.PI, false);
      context.stroke();

      // draw the line
      context.lineWidth = 1;
      context.strokeStyle = 'magenta';
      context.beginPath();
      // line length based on modulation magnitude
      const modulation = modulationMagntiude * maxHeight;
      context.moveTo(x, y - modulation * 0.5);
      context.lineTo(x, y + modulation * 0.5);
      context.stroke();

      
    });
  }

  componentDidUpdate() {
    this.draw();
  }
}

const computeOvertones = (state) => (
  R.range(1, state.settings.toneCount + 1).map( i => ({
    amplitude: sine(state.timbreParams.curve1, i),
    modulationMagntiude: sine(state.timbreParams.curve2, i),
    modulationFrequency: sine(state.timbreParams.curve3, i)
  }))
);

const mapStateToProps = (state) => ({
  overtones: computeOvertones(state)
});

export default connect(mapStateToProps)(Visualizer);