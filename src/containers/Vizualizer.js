import React from 'react';


const Vizualizer = (props) => (
  <div>Vizzzzz</div>
);


const mapStateToProps = (state) => {
  frequencyData: state.frequencyData
}

export default connect(mapStateToProps)(Vizualizer);