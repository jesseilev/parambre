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
    const sliceWidth = (canvas.width * 10) / frequencyData.length;

    context.lineWidth = 2;
    context.strokeStyle = '#000000';
    context.clearRect(0, 0, canvas.width, canvas.height);
    // context.fillStyle = 'blue';
    // context.fillRect(0, 0, canvas.width, canvas.height);

    const maxHeight = canvas.height * 0.5;
    
    
    
    overtones.map(( overtone, index ) => {
      const { amplitude, modulationMagntiude, modulationFrequency } = overtone;
      const x = (index + 1) * sliceWidth;
      const y = amplitude * maxHeight + maxHeight * 0.5;

      // visualize overtone amplitude
      context.fillStyle = 'orange';
      context.beginPath();
      context.arc(x, y, 8, 2 * Math.PI, false);
      context.fill();

      // visualize modulation magnitude
      context.lineWidth = 1;
      context.strokeStyle = 'magenta';
      context.beginPath();
      const modulation = modulationMagntiude * maxHeight;
      context.moveTo(x + 0, y - modulation * 0.5);
      context.lineTo(x - 0, y + modulation * 0.5);
      context.stroke();

      // visualize modulation frequency
      context.strokeStyle = 'cyan';
      context.lineWidth = 1;
      context.beginPath();
      const radius = Math.max((1 - modulationFrequency) * 36, 0);
      context.arc(x, y, radius, 2 * Math.PI, false);
      context.stroke();
    });

    
    // overtones.map(( overtone, index ) => {
    //   const { modulationMagntiude, amplitude } = overtone;
    //   const x = index * sliceWidth;
    //   const y = amplitude * maxHeight;
    //   
    //   // context.moveTo(x - 4, y - modulation * 0.5);
    //   // context.lineTo(x + 4, y - modulation * 0.5);
    //   // context.moveTo(x - 4, y + modulation * 0.5);
    //   // context.lineTo(x + 4, y + modulation * 0.5);
      
    // });
    // context.stroke();
    

    // context.moveTo(0, canvas.height / 2.0);
    // frequencyData.map ((magnitude, index) => {
    //   const x = index * sliceWidth;
    //   const y = (magnitude / 255.0) * canvas.height * 0.5;
    //   context.lineTo(x, y);
    // });
    // context.lineTo(canvas.width, canvas.height / 2.0);
    // context.stroke();
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
  frequencyData: state.frequencyData,
  overtones: computeOvertones(state)
});

export default connect(mapStateToProps)(Visualizer);