import React from 'react';
import { connect } from 'react-redux';


const Visualizer = (props) => {
  // debugger;
  return (
  <div>Visualizer: {props.frequencyData}</div>
)};


const mapStateToProps = (state) => ({
  frequencyData: state.frequencyData
});

export default connect(mapStateToProps)(Visualizer);