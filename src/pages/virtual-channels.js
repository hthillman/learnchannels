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


class Virtualchannels extends Component {
  render() {
    return (
      <ScrollableAnchor id={'virtualchannels'}>

        <Container style={{
          height:'100%',
          paddingTop: '20px'
        }}>
        <h1> Virtual Channels</h1>
          <p style={{fontStyle:"italic"}}>
            Note: This page is a work in progress. This description outlines Connext's implementation 
            of virtual channels; an outline of Perun's original framework will be added soon.
          </p>
          <p>
            Virtual channels are a method of conducting transactions between parties that haven't actually
            opened a channel with each other. This happens through an intermediary, commonly known as a node or a hub.
            This system is designed such that hubs are non-custodial; that is, they are unable to steal funds from parties
            that interact with them and vice versa.
          </p>            
          <p>
            Virtual channels enable any user who has a channel open with a hub to transact with any other user who also has
            a channel open with that hub, without actually opening a channel with that user. This is valuable because opening
            channels requires on-chain transactions that incur gas fees and and confirmation times.
            Recall that channels require participants to lock their operating funds when they begin to transact.
            Similarly, when two parties want to open a virtual channel, they each send a signed request to the hub 
            recording the funds that they are committing to the virtual channel. Those funds are locked for use in the
            virtual channel and cannot be spent elsewhere until they are withdrawn from the thread.
          </p>
          <p>
            Once the hub has recorded the initial thread state, it no longer needs to observe interactions between the
            two parties. In a bidirectional paradigm (i.e. payments can flow in either direction), they can pass signed 
            state updates back and forth until they wish to stop transacting and close 
            the thread; at that point, they submit their most recent state update to the hub. The hub compares the balances 
            in that update to the initial state and, after a challenge period and if they make sense, distributes funds 
            between the two parties in accordance with the new state. More specifically, it decomposes a single state 
            transition (Party A pays Party B 1ETH) into two: Party A pays the Hub 1ETH, then the Hub pays Party B 1ETH.
            Under the hood, this is a simple calculation on the hub's behalf: decrement the balance of Party A by 1ETH 
            and increment the balance of PartyA by 1ETH.
          </p>
          <p>
            You may be wondering how this system is non-custodial--doesn't the hub need to take money from Party A, hold it,
            and pass it to Party B? This gets at a key facet of the security model: the Hub is never actually moving around
            user money; rather, it's just rebalancing the funds with which it has collateralized the users' channels.
            Moreover, the hub is not a trusted entity. It is possible to conduct all off-chain state transitions that 
            the hub facilitates, on-chain via the contract.
          </p>
          <p>
            So what stops double-spending in threads? For example, could a user open a thread with two payees if a malicious
            hub allowed it? This is actually prevented by the same underlying architecture, whereby the hub is facilitating 
            payments with its own funds. If a hub were to facilitate double-spending by a user, the hub would be losing its 
            own money. What's more, the payee would never be cheated out of funds in this scenario because they could take the dispute on-chain;
            the contract logic would ensure that the funds came out of the bad actor's pocket.
          </p>
          <p>
            What happens if a party tries to submit an old state update to cheat their counterparty out of money? 
            As soon as one party submits a state update to the Hub, a challenge period begins. Each update is marked 
            with a "nonce" indicating its recency, so the challenge period gives the counterparty a chance to submit 
            a more recent update. In such a dispute case, the underlying  contract serves as the arbiter,
            making the dispute resolution process entirely trustless. 
          </p>
          <p>
            Stay tuned for updates to this page!
          </p>
          </Container>
          </ScrollableAnchor>
    )
  }
}
export default Virtualchannels;
