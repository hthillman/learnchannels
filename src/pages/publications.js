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
import ScrollableAnchor from "react-scrollable-anchor";

class Publications extends Component {
  render() {
    return (
      <Container
      style={{
        height:'100%',
        paddingTop:'20px'
      }}>
        <h1 style={{paddingBottom: "30px"}}>Publications on State Channels</h1>

        <h2 id="statechannelsfordummies">State Channels for Dummies</h2>

        <ul>
          <li>
            {" "}
            <a href="https://medium.com/blockchannel/counterfactual-for-dummies-part-1-8ff164f78540">
              Payment Channels
            </a>
          </li>

          <li>
            {" "}
            <a href="https://medium.com/blockchannel/state-channel-for-dummies-part-2-2ffef52220eb">
              App-Specific State Channels
            </a>
          </li>

          <li>
            {" "}
            <a href="https://medium.com/blockchannel/state-channels-for-dummies-part-3-10b25f6c08b">
              Hub-and-Spoke Channels
            </a>
          </li>

          <li>
            {" "}
            <a href="https://medium.com/blockchannel/state-channel-for-dummies-part-4-f3ba9d76c7c4">
              Ledger Channels and Virtual Channels
            </a>
          </li>
        </ul>

        <h2 id="statechannelsforbabies">State Channels for Babies</h2>

        <ul>
          <li>
            {" "}
            <a href="https://medium.com/connext/state-channels-for-babies-c39a8001d9af">
              Part 1: Introduction
            </a>
          </li>

          <li>
            {" "}
            <a href="https://medium.com/connext/state-channels-for-babies-part-2-76ad4538b98a">
              Part 2: How it all works
            </a>
          </li>
          <li>
            {" "}
            <a href="https://medium.com/connext/state-channels-for-babies-part-3-cbda0476f0f4">
              Part 3: Multihop Payments
            </a>
          </li>
        </ul>

        <h2 id="Miscellaneous"> Miscellaneous Resources</h2>
        <ul>
          <li>
            <a href="https://www.jeffcoleman.ca/state-channels/">
              Jeff Coleman's 2015 blog post
            </a>
          </li>

          <li>
            <a href="http://www.arcturnus.com/ethereum-lightning-network-and-beyond/">
              Robert McCone's 2015 blog post
            </a>
          </li>

          <li>
            <a href="https://github.com/ledgerlabs/state-channels/wiki">
              Jeff Coleman's outstanding wiki
            </a>
          </li>

          <li>
            <a href="https://medium.com/blockchannel/the-redemptive-greed-that-will-drive-decentralization-generalized-state-channels-in-depth-part-666bd6244a28">
              Karen Scarbrough's blog post on scalability
            </a>
          </li>
          <li>
            <a href="https://t.co/C96JBT2eTd">
            Lightning Network Deep Dive
            </a>
          </li>


          
        </ul>

      </Container>
    );
  }
}
export default Publications;
