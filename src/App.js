// src/App.jsx
import {BrowserRouter as Router,HashRouter, Route, Switch} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from "reactstrap";
import React, {Component} from "react";
import Home from "./pages/Home";


class App extends Component {

render() {
    return (
       <Home />
    );
  }
}

export default App;
