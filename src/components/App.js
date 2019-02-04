import React from 'react';
import {Rnd} from 'react-rnd';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import PlaybackControls from './PlaybackControls';
import Slider from './Slider';
import ControlPad from '../containers/ControlPad';



const App = () => (
  <div>
    
    <PlaybackControls />
    <ControlPad />
    
    
    {/* 
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    */}
  </div>
);

export default App;
