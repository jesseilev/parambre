import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import PlaybackControls from './PlaybackControls';

const App = () => (
  <div>
    <PlaybackControls />
    {/* 
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    */}
  </div>
);

export default App;
