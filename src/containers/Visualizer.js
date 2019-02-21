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
    const { overtones, isPlaying, colors } = this.props;
    const canvas = this.canvas.current;
    const context = canvas.getContext('2d');

    const xPaddingUnits = 2;
    const sliceWidth = canvas.width / (overtones.length + (xPaddingUnits * 2));
    const maxHeight = canvas.height * 0.5;
    const maxRadius = canvas.width * 0.05;

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (! isPlaying) {
      return;
    }
    
    overtones.map(( overtone, index ) => {
      const { overtoneAmplitude, modulationMagnitude, modulationFrequency } = overtone;
      const x = (index + xPaddingUnits + 0.5) * sliceWidth;
      const y = overtoneAmplitude * maxHeight + (maxHeight * 0.5);

      // draw the modulation magnitude line
      context.lineWidth = 4;
      context.strokeStyle = colors.modulationMagnitudes;
      context.beginPath();
      // line height based on modulation magnitude
      const lineHeight = modulationMagnitude * maxHeight;
      context.moveTo(x, y - lineHeight * 0.5);
      context.lineTo(x, y + lineHeight * 0.5);
      context.stroke();

      // draw the overtone overtoneAmplitude 
      context.lineWidth = 4;
      context.fillStyle = colors.overtoneAmplitudes;
      context.beginPath();
      context.arc(x, y, 8, 2 * Math.PI, false);
      context.fill();
      
      // draw the modulation frequency circle
      context.strokeStyle = colors.modulationFrequencies;
      context.lineWidth = 4;
      context.beginPath();
      // bigger radius for slower modulation frequency
      const radius = Math.max((1 - modulationFrequency) * maxRadius, 0);
      context.arc(x, y, radius, 2 * Math.PI, false);
      context.stroke();
      

    });
  }

  componentDidUpdate() {
    this.draw();
  }
}

const computeOvertones = (state) => (
  R.range(1, state.settings.synth.toneCount + 1).map( i => ({
    overtoneAmplitude: sine(state.timbreParams.overtoneAmplitudesCurve, i),
    modulationMagnitude: sine(state.timbreParams.modulationMagnitudesCurve, i),
    modulationFrequency: sine(state.timbreParams.modulationFrequenciesCurve, i)
  }))
);

const mapStateToProps = (state) => ({
  overtones: computeOvertones(state),
  isPlaying: state.audioPlayer.isPlaying,
  colors: state.settings.colors
});

export default connect(mapStateToProps)(Visualizer);