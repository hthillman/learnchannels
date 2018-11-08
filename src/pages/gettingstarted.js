import React, {Component} from "react";
import {Jumbotron, Container} from "reactstrap";
import {Link, Switch, Route} from "react-router-dom";



class GettingStarted extends Component {
  render() {
    return (
      <div style={{padding: "4% 8%"}}>
          <h1>
            Welcome!
          </h1>

          <p
            
          >
            If you ended up here, you’re probably interested in learning about
            state channels, a method for enabling cheap, low-latency
            transactions on Ethereum.
            <br /> <br />
            We started LearnChannels because the existing information about
            state channels is spread all over the place. We wanted to gather all
            of that information in a single place and make it much easier for
            someone to browse. At the same time, we found that there simply
            isn’t very much easy-to-understand learning material about state
            channels. Inspired by <a href="https://learnplasma.org">LearnPlasma</a>, our goal is to make state
            channels approachable for developers and laymen alike.
              </p>
        <p>  <strong>*Note:</strong> these pages assume basic familiarity with blockchain concepts such as smart contracts.
        </p>
        <br /> <br />
          <h2>Table of Contents</h2>
          <ul>
            <li>
              <Link class="link" to='/WhyStateChannels'>
                Learn
              </Link>
            </li>
            <li>
              <Link class="link" to="/Research">
                Research
              </Link>
            </li>
            <li>
              <Link class="link" to="/Publications">
                Publications
              </Link>
            </li>
            <li>
              <Link class="link" to="/Projects">
                Projects
              </Link>
            </li>
            <li>
              <Link class="link" to="/Contributors">
                Contributors
              </Link>
            </li>
          </ul>
      </div>
    );
  }
}
export default GettingStarted;
