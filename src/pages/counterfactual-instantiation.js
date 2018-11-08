import React, { Component } from 'react';
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
} from 'reactstrap';
import { Link } from 'react-router-dom'
import Layout from '../Layout.js'
import ScrollableAnchor from 'react-scrollable-anchor'


class Counterfactualinstantiation extends Component {
  render() {
    return (
      <ScrollableAnchor id={'counterfactualinstantiation'}>

        <Container style={{
          paddingTop: '20px',
          height:'75vmax'
        }}>
        <h1> Counterfactual instantiation</h1>
          <p>This page is under construction. In the meantime, we recommend:</p>
          <ul>
            <li><a href="https://medium.com/spankchain/a-state-channels-adventure-with-counterfactual-rick-part-1-ce68e16252ea">An Adventure with Counterfactual Rick</a></li>
            <li><a href="https://medium.com/statechannels/counterfactual-generalized-state-channels-on-ethereum-d38a36d25fc6">L4's explainer</a></li>
          </ul>
          </Container>
          </ScrollableAnchor>
    )
  }
}
export default Counterfactualinstantiation;
