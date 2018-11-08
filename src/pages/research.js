import React, {Component} from "react";
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
import {Link} from "react-router-dom";
import Layout from "../Layout";

class Research extends Component {
  render() {
    return (
      <div style={{
        paddingTop:'4%',height:"75vmax"
      }}> 
      <Container
      style={{}}>
        <h1>
          Research
        </h1>
        <br />
        <h2 id="whitepapers">Whitepapers
        </h2>
        <ul>
          <li><a href="https://l4.ventures/papers/statechannels.pdf">Counterfactual: Generalized State Channels</a></li>
          <li><a href = "https://lightning.network/lightning-network-paper.pdf">The Bitcoin Lightning Network</a></li>
          <li><a href="https://arxiv.org/abs/1702.05812">Sprites and State Channels: Payment Networks that Go Faster than Lightning</a></li>
          <li><a href="https://eprint.iacr.org/2018/642.pdf">NOCUST – A Non-Custodial 2nd-Layer Financial Intermediary</a></li>
        </ul>
      </Container>
      </div>
    );
  }
}
export default Research;
