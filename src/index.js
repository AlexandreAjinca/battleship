import React from 'react';
import ReactDOM from 'react-dom';
import {Routes, Route, Link,  BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import Rules from './Rules';

const routs = (
  <React.StrictMode>
    < Router >
    <nav>
      <Link to="/">App</Link>
      <Link to="/rules">Rules</Link>
    </nav>
    <h1>BATTLESHIP</h1>
    <Routes>
      <Route path="/*" element={<App/>}>
        {/* <Route path="/game" element ={<Game/>} />
        <Route path="/settings" element ={<Settings/>} /> */}
      </Route>
      <Route path ="/rules" element={<Rules/>} />
    </Routes>
  </Router>
  </React.StrictMode>
)

ReactDOM.render(routs,document.getElementById('root'));
