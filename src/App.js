import React from 'react';
import { Router } from 'react-router-dom'
import history from './services/history'
import Routes from './routes'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router history={history}>
<Routes/>
      </Router>
    </div>
  );
}

export default App;
