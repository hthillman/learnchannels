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

class Contributors extends Component {
  render() {
    return (
      <div style={{
      }}>
        <Container
        style={{
          height:'100%'
          ,paddingTop:'20px'
        }}>
        <h1 style={{paddingBottom:"30px"}}> Acknowledgments</h1>
                <p className="App-info">
                LearnChannels is a community effort to consolidate the available state channel research. 
                We're committed to increased collaboration for the benefit of the overarching ecosystem, 
                and we're always looking for contributions--if you'd like to contribute, shoot an email to learnchannels(at)gmail.com or 
                message a contributor on Twitter!
              </p>
              <p>
                <br />
                <strong>Current Contributors</strong>
                <br />

          <ul>
              <li><a href= "https://twitter.com/hthillman">Hunter Hillman</a> <span style={{fontStyle:"italic"}}> - Connext Network</span></li>
              <li><a href= "https://twitter.com/Arjun_Bhuptani">Arjun Bhuptani</a> <span style={{fontStyle:"italic"}}> - Connext Network</span></li>
              <li><a href= "https://twitter.com/hrdwrknvrstps">Eric Olszewski</a> <span style={{fontStyle:"italic"}}> - Transmute Industries</span></li>
          </ul>
          </p>

          </Container>
          </div>
    )
  }
}
export default Contributors;
