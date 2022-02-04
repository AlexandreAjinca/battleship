import React, {Component } from 'react';
import boats from './data/boats.json';
import Game from './Game';
import {Link, Route, Routes } from 'react-router-dom';
import Settings from './Settings';

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
        </nav>
        <div className='outlet'>
          <Routes>
            <Route path="/game" element={<Game boats = {this.state.boats} size = {this.state.size}/>} />
            <Route path="/settings" element={<Settings boats = {this.state.boats} onClick={(boats) => this.saveBoats(boats)} />} />
          </Routes>
          {/* <Outlet context = {[this.state.boats,this.state.size]}/> */}
        </div>
      </div>
    )
  }
}

export default App;
