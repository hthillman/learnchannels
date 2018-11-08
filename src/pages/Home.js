import React, {Component} from "react";
import {Link, Switch, Route} from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

import Landing from "./Landing";
import './styles.css';
import Contributors from "./contributors";
import WhyStateChannels from "./why-do-we-need-state-channels";
import Statechannels101 from "./state-channels-101";
import Paymentchannels from "./payment-channels-vs-state-channels";
import Counterfactualinstantiation from "./counterfactual-instantiation";
import Htlcs from "./hashed-timelock-contracts";
import Virtualchannels from "./virtual-channels";
import Publications from "./publications";
import Research from "./research";
import Projects from "./projects";
import GettingStarted from "./gettingstarted";
import PaymentChannelContracts from "./paymentchannelwalkthrough";


class Home extends Component {
  constructor() {
    super();
  this.state = {
    showMenu: false,
    showMenu2: false,
  };

  this.showMenu = this.showMenu.bind(this);
  this.closeMenu = this.closeMenu.bind(this);
  this.showMenu2 = this.showMenu2.bind(this);
  this.closeMenu2 = this.closeMenu2.bind(this);
}

showMenu(event) {
  event.preventDefault();

  this.setState({ showMenu: true }, () => {
    document.addEventListener('click', this.closeMenu);
  });
}
showMenu2(event) {
  event.preventDefault();

  this.setState({ showMenu2: true }, () => {
    document.addEventListener('click', this.closeMenu2);
  });
}

closeMenu(event) {

    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
}
closeMenu2(event) {

    this.setState({ showMenu2: false }, () => {
      document.removeEventListener('click', this.closeMenu2);
    });
}
componentDidMount(){
  this.setState({ showMenu2: false }, () => {
    document.removeEventListener('click', this.closeMenu2);
  });
}

render() {

    return (
      <div className="top" style={{ height:"100%", backgroundImage:'linear-gradient(135deg, #fff 0%, #ddd 50%, #BFC9CA 100%)'}}>
          <Container className="baseMobile">
            <div className="header"></div>
            <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu" />
            <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
              <div className="spinner diagonal part-1"></div>
              <div className="spinner horizontal"></div>
              <div className="spinner diagonal part-2"></div>
            </label>
            <div id="sidebarMenu">
              <div className="sidebarMenuInner" style={{
                listStyleType: 'none',
                margin: '1%',
                padding: '0',
                overflow: 'hidden',
                textAlign:'center'
              }}>
                <li><Link to="/">Home</Link></li>
                <li><div onClick={this.showMenu}>
                Learn

                {this.state.showMenu
                ? (
                  <ul ref={(element) => {
                    this.dropdownMenu = element;
                  }}
                  className="link"
                    style={{
                      textAlign: 'left',
                      display: 'inline-block',
                      position: 'absolute',
                      width: '100%',
                      left: '0',
                      top: '65px',
                      backgroundColor: '#ddd',
                      minWidth: '160px',
                      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                      padding: '12px 16px',
                      zIndex: '1000'
                    }}>
                    <li><Link to='/WhyStateChannels'> Why do we need state channels?</Link></li>
                    <li><Link to='/Statechannels101'>State channels 101</Link></li>
                    <li><Link to='/Paymentchannels'>Payment channels vs. State channels</Link></li>
                    <li><Link to='/Counterfactualinstantiation'>Counterfactual instantiation</Link></li>
                    <li><Link to='/Htlcs'>Hashed timelock contracts</Link></li>
                    <li><Link to='/Virtualchannels'>Virtual channels</Link></li>
                  </ul>)
                : (
                  null
                )
              }
              </div>
            </li>
            <li><div onClick={this.showMenu2}>
                Developers
                

                              {this.state.showMenu2
                ? (
                  <ul ref={(element) => {
                    this.dropdownMenu2 = element;
                  }}
                  className="link"
                    style={{
                      textAlign: 'left',
                      display: 'inline-block',
                      position: 'absolute',
                      width: '100%',
                      left: '0',
                      top: '65px',
                      backgroundColor: '#ddd',
                      minWidth: '160px',
                      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                      padding: '12px 16px',
                      zIndex: '1000'
                    }}>
                <li style={{float:'right', align:'center'}}><Link to="/PaymentChannelContracts">Payment Channel Contract Walkthrough</Link></li>
                  </ul>)
                : (
                  null
                )
              }
            </div>
            </li>
                <li ><Link to="/Publications">Publications</Link></li>
                <li ><Link to="/Research">Research</Link></li>
                <li ><Link to="/Projects">Projects</Link></li>
                <li ><Link to="/Contributors">Contributors</Link></li>
              </div>
            </div>
            <Container>
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route path="/Contributors" component={Contributors} />
                  <Route path="/WhyStateChannels" component={WhyStateChannels} />
                  <Route path="/Statechannels101" component={Statechannels101} />
                  <Route path="/Paymentchannels" component={Paymentchannels} />
                  <Route path="/Counterfactualinstantiation" component={Counterfactualinstantiation} />
                  <Route path="/Htlcs" component={Htlcs} />
                  <Route path="/Virtualchannels" component={Virtualchannels} />
                  <Route path="/Publications" component={Publications} />
                  <Route path="/Research" component={Research} />
                  <Route path="/Projects" component={Projects} />
                  <Route path="/GettingStarted" component={GettingStarted} />
                  <Route path="/PaymentChannelContracts" component={PaymentChannelContracts} />
                </Switch>
            </Container>
            </Container> 
          <Container className="baseDesktop">
            <div className="header">
              <ul className="topnav" style={{
                listStyleType: 'none',
                margin: '1%',
                padding: '0',
                overflow: 'hidden',
                textAlign:'center'
              }}>
            <li style={{float:'left', align:'center'}}><Link to="/" className = "topNavLinkDesktop"><Button style="primary" style={{opacity:"0.8",color:"#696969",backgroundColor:"#F2F2F2"}}>LearnChannels</Button></Link></li>
            <li style={{float:'right', align:'center'}}><Link to="/Contributors" className = "topNavLinkDesktop">Contributors</Link></li>            
            <li style={{float:'right', align:'center'}}><Link to="/Publications" className = "topNavLinkDesktop">Publications</Link></li>
            <li style={{float:'right', align:'center'}}><Link to="/Research" className = "topNavLinkDesktop">Research</Link></li>
            <li style={{float:'right', align:'center'}}><Link to="/Projects" className = "topNavLinkDesktop">Projects</Link></li>             
            <li style={{float:'right', align:'center'}}><div onClick={this.showMenu2} className = "topNavLinkDesktop">
                Developers
                </div></li>
                <li>

                              {this.state.showMenu2
                ? (
                  <div ref={(element) => {
                    this.dropdownMenu2 = element;
                  }}
                  className="link"
                    style={{
                      alignItems:"right",
                      textAlign: 'center',
                      display: 'inline-block',
                      position: 'absolute',
                      width: '50%',
                      right: '10%',
                      top: '65px',
                      backgroundColor: '#ddd',
                      minWidth: '160px',
                      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                      padding: '12px 16px',
                      zIndex: '1000'
                    }}>
                <Link to="/PaymentChannelContracts" className = "topNavLinkDesktop">Payment Channel Contract Walkthrough</Link>
                  </div>)
                : (
                  null
                )
              }
            </li>
            <li style={{float:'right', align:'center'}}><div onClick={this.showMenu} className = "topNavLinkDesktop">
                Learn
                </div></li>
                <li>

                              {this.state.showMenu
                ? (
                  <div ref={(element) => {
                    this.dropdownMenu = element;
                  }}
                 
                    style={{
                      width:"50%",
                      textAlign: 'center',
                      display: 'inline-block',
                      position:'absolute',
                      right: '10%',
                      top: '65px',
                      backgroundColor: '#ddd',
                      minWidth: '160px',
                      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                      padding: '12px 16px',
                      zIndex: '1'
                    }}>
                    <Link to='/WhyStateChannels' className = "topNavLinkDesktop"> Why do we need state channels?</Link>
                    <Link to='/Statechannels101' className = "topNavLinkDesktop">State channels 101</Link>
                    <Link to='/Paymentchannels' className = "topNavLinkDesktop">Payment channels vs. State channels</Link>
                    <Link to='/Counterfactualinstantiation' className = "topNavLinkDesktop">Counterfactual instantiation</Link>
                    <Link to='/Htlcs' className = "topNavLinkDesktop">Hashed timelock contracts</Link>
                    <Link to='/Virtualchannels' className = "topNavLinkDesktop">Virtual channels</Link>
                  </div>)
                : (
                  null
                )
              }
            </li>  
                  
                   </ul>
            </div>
            <Container>
            <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route path="/Contributors" component={Contributors} />
                  <Route path="/WhyStateChannels" component={WhyStateChannels} />
                  <Route path="/Statechannels101" component={Statechannels101} />
                  <Route path="/Paymentchannels" component={Paymentchannels} />
                  <Route path="/Counterfactualinstantiation" component={Counterfactualinstantiation} />
                  <Route path="/Htlcs" component={Htlcs} />
                  <Route path="/Virtualchannels" component={Virtualchannels} />
                  <Route path="/Publications" component={Publications} />
                  <Route path="/Research" component={Research} />
                  <Route path="/Projects" component={Projects} />
                  <Route path="/GettingStarted" component={GettingStarted} />
                  <Route path="/PaymentChannelContracts" component={PaymentChannelContracts} />
                </Switch>
            </Container>
          </Container>
          <div className="footer" id="footer">
            <Row style={{height:"2.5%",marginBottom:"2%",marginLeft:"2.5%",marginRight:"2.5%",color:"#BCBEC0"}}>
             <div>
             © 2018 LearnChannels
             </div>
            </Row>
          </div>
          </div>
    );
  }
};

export default Home;



