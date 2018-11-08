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



class Htlcs extends Component {
  render() {
    return (
      <ScrollableAnchor id={'Htlcs'}>
      <div
      style={{
      }}>
        <Container style={{
          paddingTop: '20px',
          height: '45vmax'

        }}>
          <h1>HTLCs</h1>
          <p style={{fontStyle:"italic"}}>
          Note: this page is still under construction. Content courtesy of https://en.bitcoin.it/wiki/Hashed_Timelock_Contracts.
          </p>
          <p>
          A Hashed TimeLock Contract or HTLC is a class of payments that use hashlocks 
          and timelocks to require that the receiver of a payment either acknowledge receiving 
          the payment prior to a deadline by generating cryptographic proof of payment or forfeit 
          the ability to claim the payment, returning it to the payer. The cryptographic proof of 
          payment the receiver generates can then be used to trigger other actions in other payments, 
          making HTLCs a useful technique for producing conditional payments.

          </p>
          <p>
          <span style={{fontWeight:"bold"}}>Example</span>
          <br />
          1. Alice opens a payment channel to Bob, and Bob opens a payment channel to Charlie.
          <br />
          2. Alice wants to buy something from Charlie for 0.001 ETH.
          <br />
          3. Charlie generates a random number and generates its SHA256 hash. Charlie gives that hash to Alice.
          <br />
          4. Alice uses her payment channel to Bob to pay him 0.001 ETH, but she adds the hash Charlie gave her to the payment along with an extra condition: in order for Bob to claim the payment, he has to provide the data which was used to produce that hash.
          <br />
          5. Bob uses his payment channel to Charlie to pay Charlie 0.001 ETH, and Bob adds a copy of the same condition that Alice put on the payment she gave Bob.
          <br />
          6. Charlie has the original data that was used to produce the hash (called a pre-image), so Charlie can use it to finalize his payment and fully receive the payment from Bob. By doing so, Charlie necessarily makes the pre-image available to Bob.
          <br />
          7. Bob uses the pre-image to finalize his payment from Alice
          </p>

          </Container>
        </div>
      </ScrollableAnchor>
    )
  }
}
export default Htlcs;
