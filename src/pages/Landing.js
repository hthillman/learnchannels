import React, {Component} from "react";
import './Landing.css';
import {
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
import {BrowserRouter as Router} from "react-router-dom";
import {Link,Switch, Route} from "react-router-dom";





class Home extends Component {
  constructor(props){
    super(props);
    //this.myRef=React.createRef();
  }
  render() {
    var settings = {
      dots: true,
      infinite:false
      };
      


    return (
      <div className="landing-toplevel" style={{paddingTop:"20%",height:"80vmax",display:"flex",flexDirection:"row-reverse"}}>
        <div style={{
        paddingLeft:"5%"}}>
        <p style={{
          fontSize:'46px',
          fontWeight: 'lighter'
        }}> LearnChannels
        </p>
        <p>
        State channels are a framework allowing fast and cheap off-chain payments that retain the security of the underlying blockchain.
        </p>
        <Button color="primary" style={{backgroundColor:"#FFFFFF"}}> <Link to="/GettingStarted">Get started</Link></Button>
        </div>
        <div style={{
       }}> {" "}
        <img class="mainimage" style={{
          paddingLeft:'50px',
          width:'100%'}}
          src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png" />
        </div>
      </div>
    );
  }
};

export default Home;



