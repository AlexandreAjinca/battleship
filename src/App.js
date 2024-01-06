import React, {Component } from 'react';
import boats from './data/boats.json';
import Game from './Game';
import {Link, Route, Routes } from 'react-router-dom';
import Settings from './Settings';
import Rules from './Rules';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      size : 8,
      boats : boats,
    }
  }

  saveBoats(boats){
    console.log("App handle submit");
    this.setState({
      boats:boats,
    })
  }

  render (){
    return(
      <div className='App'>
        <nav>
          <Link to="/game">Jeu</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/rules">Rules</Link>
        </nav>
        <div className='outlet'>
          <Routes>
            <Route path="/game" element={<Game boats = {this.state.boats} size = {this.state.size}/>} />
            <Route path="/settings" element={<Settings boats = {this.state.boats} onClick={(boats) => this.saveBoats(boats)} />} />
            <Route path="/rules" element={<Rules/>} />
          </Routes>
        </div>
      </div>
    )
  }
}

export default App;
