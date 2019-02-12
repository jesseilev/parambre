import React, {Component} from 'react';
import { connect } from 'react-redux';


const stripe = (magnitude, index) => (
  <div 
    style={{ 
      x: index,
      height: String(magnitude) + 'px',
      background: '#2850932'
    }}
  >
    Hi
  </div>
);

class Visualizer extends Component {
  
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  render() {
    return <canvas width="700" height="300" ref={this.canvas} />;
  }

  draw() {
    const { frequencyData } = this.props;
    const canvas = this.canvas.current;
    const context = canvas.getContext('2d');
    const sliceWidth = (canvas.width * 10) / frequencyData.length;

    context.lineWidth = 2;
    context.strokeStyle = '#000000';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();

    context.moveTo(0, canvas.height / 2.0);
    frequencyData.map ((magnitude, index) => {
      const x = index * sliceWidth;
      const y = (magnitude / 255.0) * canvas.height * 0.5;
      context.lineTo(x, y);
    });
    context.lineTo(canvas.width, canvas.height / 2.0);
    context.stroke();
  }

  componentDidUpdate() {
    this.draw();
  }
}

const mapStateToProps = (state) => ({
  frequencyData: state.frequencyData
});

export default connect(mapStateToProps)(Visualizer);