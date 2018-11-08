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


class Statechannels101 extends Component {

  render() {
    return (
      <ScrollableAnchor id={'Statechannels101'}>

        <Container style={{paddingTop:"20px",
          height:'100%'
        }}>
          <h1 style= {{paddingBottom:"30px"}}>State Channels 101</h1>
                <p className="App-info">
                  <p style= {{fontWeight:"bold"}}>  How do state channels work?</p>

                  <p>Three steps:

                  </p><p>1. Two users lock the initial blockchain state (e.g., each party's balance) into a smart contract closely resembling a multisignature wallet. This ensures that the funds in the wallet can't be used elsewhere or removed until unlocked with an update that both parties have signed.

                  </p><p>2. The two parties transact by passing state updates (e.g., balance updates) amongst themselves. If both parties agree on a state update by "signing" it, it could be submitted to the smart contract at any time to unlock funds.

                  </p><p>3. When parties have finished transacting, they each submit state updates to the smart contract. If the state updates match, the blockchain state (e.g., each party's balance) is unlocked, typically in a different configuration than the initial state.

                  </p><p style= {{fontWeight:"bold"}}>Alright, that makes sense. But what if they disagree?

                  </p><p>Each state update that is signed by both parties is assigned a "nonce", or a number that uniquely identifies that update. More recent nonces trump older nonces.

                </p><p>  As soon as Party A (let's call her Alice) submits a state update, a challenge period starts. During this period, Party B (let's call him Bob) has the opportunity to submit an update with a more recent nonce. When the challenge timer expires, the update with the most recent nonce is used to unlock the blockchain state and distribute funds appropriately.

                  </p><p style= {{fontWeight:"bold"}}>What happens if Bob isn't online or forgets to submit a state update?

                  </p><p>If the challenge period expires and Bob hasn't submitted a more recent state update than Alice, funds are disbursed according to the most recent double-signed state update (in this case, the one submitted by Alice). In this case, Bob isn't actually cheated out of any money--he misses out on the more recent state update (which is likely beneficial to him). Everyone gets paid the amount that they most recently agreed upon.

                  </p><p>Obviously, that's a situation most people would like to avoid, especially since a party who intentionally submits an old state probably lost money in a later state update. There are a few potential solutions to this; one is the challenge timer itself, which at the very least allows Bob some time to submit his state update. Another is a third-party "watchtower" system, which would automatically monitor the channel and (for a small fee) submit the most recent update for Bob even if he's offline.

                  </p><p style= {{fontWeight:"bold"}}>This works great for simple payments, sure. But what about conditional payments or more complex state operations?

                  </p><p>Great question. See the next section!


          </p></p>

          </Container>
          </ScrollableAnchor>
    )
  }
}
export default Statechannels101;
