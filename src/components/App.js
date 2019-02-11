import React from 'react';
import {Rnd} from 'react-rnd';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import ControlPad from '../containers/ControlPad';
import Visualizer from '../containers/Visualizer';


const App = () => (
  <div
  >
    
    <Visualizer />
    <ControlPad />
    
    
    {/* 
    <PlaybackControls />
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    */}
  </div>
);

export default App;
