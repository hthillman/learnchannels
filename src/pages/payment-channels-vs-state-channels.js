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


class Paymentchannels extends Component {
  render() {
    return (
      <ScrollableAnchor id={'paymentchannels'}>
      <div
      style={{
      }}>
        <Container style={{paddingTop:"20px",
          height:'100%'
        }}>
          <h1 style={{paddingBottom:"30px"}}> Payment Channels vs. State Channels</h1>
                <p className="App-info">
                  <p>There are a variety of different state channel-based projects out there; you'll notice that some focus on payment channels and some focus on state channels. So what's the difference?

                </p><p style={{fontWeight:"bold"}}>  Payment channels are a subset of state channels

                </p><p>Payment channels are the simplest kind of state channel: they allow a user (the sender) to transfer money to another user (the recipient).

                </p><p style={{fontWeight:"bold"}}>   Payment channels require radically simpler dispute resolution than state channels

                </p><p>  Recall that state channels use the blockchain as the ultimate arbiter. This means that there are a few types of disagreements ("dispute cases") that channels must account for. For example, if Bob and Alice are sending money back and forth and Bob tries to send a fake balance update, Alice can submit the last double-signed update to the channel contract. At that point, Bob will have the option to submit a more recent double-signed update; if he cannot, the contract will disburse funds in accordance with the update that Alice submitted.

                </p><p>  Payment channels only need to account for a few simple dispute cases, and resolution comes down to who has the more recent double-signed state update. When you're dealing with a peer-to-peer transaction, there's really only one thing to disagree about: who should have how much money. To play a game of chess using a state channel, however, the participants need to agree on the rules of chess and the state channel needs to account for all the possible ways that two players can disagree. Just as participants in a payment channel behave as though their transactions are happening on-chain, participants in a state channel behave as though all their interactions are happening on-chain.

                </p><p>  This happens through a process known as counterfactual instantiation, which we will discuss in the next section.

</p></p>

          </Container>
          </div>
          </ScrollableAnchor>
    )
  }
}
export default Paymentchannels;
