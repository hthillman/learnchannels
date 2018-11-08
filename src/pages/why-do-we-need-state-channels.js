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

class WhyStateChannels extends Component {
  render() {
    return (
      <ScrollableAnchor id={"whyStateChannels"}>
        <div
        style={{
        }}
        >
        <Container style={{paddingTop: "50px",
          height:'100%',
          paddingLeft:'75px',
        }}>
          <h1 style={{paddingBottom: "30px"}}>
            Why do we need state channels?
          </h1>
          <p className="App-info">
            <p>
              {" "}
              Before we dive into what state channels are, let's take a look at
              the overall ecosystem and why they are necessary in the first
              place. At a high level, blockchains suffer from "scalability"
              issues. By modern standards, blockchains are very slow and
              comparatively expensive to run. For comparison, Visa is capable of
              processing around 50,000 transactions per second while Ethereum
              can only handle a maximum around 20.
            </p>
            <p>
              This gap creates an urgent need for technologies to help scale
              blockchains. It is essential, however, that these technologies
              preserve the security and decentralization of the
              blockchain--otherwise, applications might as well use legacy
              technologies.
            </p>
            <p>
              Projects are tackling the scalability problem in lots of different
              ways. Some of these projects are attempting to make blockchains
              more scalable by upgrading the blockchains themselves. This is
              known as “layer 1” scaling because it modifies the base
              blockchain. Other projects are trying to build on top of existing
              systems. We call this “layer 2” scaling because we’re adding a new
              layer and not changing the underlying system.
            </p>
            <p>
              Most layer 2 solutions boil down to a simple observation: not
              every interaction needs the security and decentralization of the
              blockchain. If you're transacting with a store, for example, what
              matters is that you and the store agree on what you were charged.
              Later on, you and the store can transfer funds on the underlying
              blockchain, but both of you will already know exactly how your
              balances will need to change.
            </p>
            <p>
              State channels are a type of Layer 2 solution focused specifically
              on this sort of 2-party interaction. Put simply, they let users
              transact with each other off the blockchain, so long as they come
              to a consensus about the transactions that are occurring. If they
              can't agree, they can use the blockchain as the ultimate arbiter
              of who owes how much money. In this way, state channels maintain
              the security and decentralization of the underlying blockchain.
            </p>
            <p>
              As a result, these transactions can happen very rapidly and very
              cheaply. If you'll recall, the two biggest blockchain scalability
              issues are cost and transaction speed; for interactions between
              two parties, state channels can solve those issues.
            </p>
            <p>
              A great resource for understanding Layer 2 solutions and the
              differences between them is Josh Stark's{" "}
              <a href="https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4">
                Making Sense of Ethereum’s Layer 2 Scaling Solutions
              </a>
            </p>
          </p>
        </Container>
        </div>
      </ScrollableAnchor>
    );
  }
}
export default WhyStateChannels;
