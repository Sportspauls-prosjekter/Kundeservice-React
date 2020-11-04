import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from "./components/Home.jsx";
import Losning from "./components/Losning.jsx";
import Kontakt from './components/Kontakt.jsx';
import NavBar from './components/Navbar.jsx';
import './Style/app.css';


export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
        <div id="Overlay">
           < NavBar />
          <div id="Content">
              <Route exact path="/" component={ Home } />
              <Route path="/kontakt" component={Kontakt} /> 
              <Route path="/losning" component={Losning} /> 
          </div>
        </div>
          );
  }
}
