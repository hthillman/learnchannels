import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

class Layout extends Component {
  render() {
    return(
      <div>
      <ul className="topnav" style={{
        listStyleType: 'none',
        margin: '1%',
        padding: '0',
        overflow: 'hidden',
        textAlign:'center'
      }}>
        <li style={{float:'right'}}><Link to="/team" className = "topNavLink" style={{
          display: 'inline-block',
          color: '#f2f2f2',
          textAlign: 'center',
          padding: '14px 16px',
          textDecoration: 'none',
          transition: '0.3s',
          fontSize: '17px'
        }}>Team</Link></li>
        <li style={{float:'right'}}><Link to="/blog" className = "topNavLink" style={{
          display: 'inline-block',
          color: '#f2f2f2',
          textAlign: 'center',
          padding: '14px 16px',
          textDecoration: 'none',
          transition: '0.3s',
          fontSize: '17px'
        }}>Blog</Link></li>
        <li style={{float:'right'}}><Link to="https://discord.gg/yKkzZZm" className = "topNavLink" style={{
          display: 'inline-block',
          color: '#f2f2f2',
          textAlign: 'center',
          padding: '14px 16px',
          textDecoration: 'none',
          transition: '0.3s',
          fontSize: '17px'
        }}>Chat</Link></li>
        <li style={{float:'right'}}><Link to="/home" className = "topNavLink" style={{
          display: 'inline-block',
          color: '#f2f2f2',
          textAlign: 'center',
          padding: '14px 16px',
          textDecoration: 'none',
          transition: '0.3s',
          fontSize: '17px'
        }}>
        Home</Link></li>
      </ul>
      <div>
      {this.props.children}
      </div>
      </div>
    )
  }
}

export default Layout;