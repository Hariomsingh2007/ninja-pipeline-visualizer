import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pipeline from './components/Pipeline_viz'

function App() {

  return (
    <div className="App">
<div class="header">
  <a href="#default" class="logo">Ninja Pipeline Visualizer</a>
  <div class="header-right">
    <a class="active" href="/">Home</a>
    <a href="https://google.com">Contact</a>
    <a href="/aboutus">About</a>
  </div>
</div>
   <Pipeline />

    </div>
  );
}

export default App;