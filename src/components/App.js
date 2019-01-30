import React from 'react';
import {Rnd} from 'react-rnd';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import PlaybackControls from './PlaybackControls';
import Slider from './Slider';
import ControlBox from './ControlBox';



const App = () => (
  <div>
    
    <PlaybackControls />
    <ControlBox />
    
    
    {/* 
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    */}
  </div>
);

export default App;
