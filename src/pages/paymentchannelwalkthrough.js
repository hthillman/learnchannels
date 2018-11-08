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
import Layout from '../Layout'
import ScrollableAnchor from 'react-scrollable-anchor'


class PaymentChannelContracts extends Component {

  render() {
    return (
      <ScrollableAnchor id={'PaymentChannelContracts'}>
        <Container style={{paddingTop:"20px",
        paddingBottom:"20px",
          height:'100%'
        }}>
          <h1 style= {{paddingBottom:"30px"}}>Payment Channel Contract Walkthrough</h1>

          <p>
          We’ve discussed payment channels in a theoretical sense, but how do they actually work? We’ll start by looking at a basic bidirectional payment channel contract, and cover client- and server-side examples in future posts. The example below creates a channel manager that interacts with (and keeps track of) multiple open channels.

          This walkthrough is written so as to be accessible to both experienced and novice Solidity developers. Please note that this is example code and is not audited or optimized for gas consumption.

          <br/><br/>First, we declare what version of Solidity we’re using and import a few helper libraries (a byte parser and OpenZeppelin’s ERC20 contract template):
          </p>
          <pre class="code-example">
          {`pragma solidity ^0.4.24

import "./ECTools.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";`}
          </pre>

          <p>
          We then create a contract object and declare events that will be used to convey information about the channels that we open. Don’t worry about the event arguments, as we’ll elaborate on them later.
          </p>
          <pre class="code-example">
          {`contract ChannelManager {
    event ChannelOpen(
        bytes32 indexed channelId,
        address indexed partyA,
        address indexed partyB,
        address tokenContract,
        uint256 depositA,
        uint256 challenge
    );
    event ChannelJoin(
        bytes32 indexed channelId,
        address indexed partyA,
        address indexed partyB,
        uint256 depositA,
        uint256 depositB
    );
    event ChannelChallenge(
        bytes32 indexed channelId,
        uint256 closeTime,
        address challengeStartedBy
    );
    event ChannelUpdateState(
        bytes32 indexed channelId,
        uint256 nonce,
        uint256 balanceA,
        uint256 balanceB
    );
    event ChannelClose(bytes32 indexed channelId);
    `}
    </pre>
    <p>
    We also create an
      <a href="https://solidity.readthedocs.io/en/develop/types.html#enums">
      &nbsp;enum&nbsp;
      </a>
      of the channel status, which creates an indicator that we will use to control process flow:
    </p>
    <pre class="code-example">
    {`    enum ChannelStatus {
        Open,
        Joined,
        Challenge,
        Closed
    }
    `}
    </pre>
    <p>
    Next, we create a structure which will serve as the storage template for the channels that we will be creating:
    </p>
    <pre class="code-example">
    {`
      struct Channel {
          address partyA; //address of channel creator
          address partyB; //address of channel counterparty
          address tokenContract; //address of token contract, if transacting with tokens??
          uint depositA; // Deposit of party A
          uint depositB; // Deposit of party B
          ChannelStatus status; //channel status, e.g. open, joined, challenge, closed
          uint challenge; //challenge period
          uint nonce; //an incrementing sequence number attached to each state update
          uint closeTime; //when the state channel is close-able
          uint balanceA; // initially the same as deposit, used for state update
          uint balanceB; // initially the same as deposit, used for state update
          address challengeStartedBy; // denotes who started the challenge, used for fast close case
      }
      `}
      </pre>
    <p>
    Finally, because we’re creating a channel manager rather than just a single channel, we’ll want to record information about the channels that we create. So, we create two mappings: one storing channel IDs and another creating a registry of active users and their counterparties:
    </p>
    <pre class="code-example">
    {`    //channel registry
    mapping (bytes32 => Channel) public channels;
    // creator => counterparty => token contract
    mapping (address => mapping(address => mapping(address => bytes32))) public activeIds;
      `}
      </pre>
      <p>
      Whew--all the setup is out of the way and we can actually start writing the functions that will create channels. First, we declare a function openChannel, which allows partyA to create a channel with a counterparty. This function will take 4 arguments: the counterparty’s address, the contract of the token to deposit, the amount of that token to deposit, and a challenge period. Notice that this function is public and payable; declaring it public allows it to be called both internally and externally, while declaring it payable allows the sender to attach funds to the function.
      </p>
      <pre class="code-example">
      {`
        function openChannel(
          address to, //counterparty
          address tokenContract
          uint tokenAmount,
          uint challenge
        )
          public
          payable
        {
          require(challenge != 0, "Challenge period must be non-zero.");
          require(to != address(0), "Need counterparty address.");
          require(to != msg.sender, "Cannot create channel with yourself.");
          require(activeIds[msg.sender][to][tokenContract] == bytes32(0), "Channel exists.");
          require(activeIds[to][msg.sender][tokenContract] == bytes32(0), "Channel exists.");
          if (tokenContract != address(0)) {
              require(msg.value == 0, "Can't use ETH and tokens together.");
          }

          // channel specific
          bytes32 id = keccak256(msg.sender, to, now); //hash of partyA, partyB, and time opened. unique to channel
          Channel memory channel;
          channel.partyA = msg.sender;
          channel.partyB = to;

          // set deposits
          if (tokenContract == address(0)) {
              // deposit is in eth
              channel.depositA = msg.value;
              channel.balanceA = msg.value; // so that fast close can happen without any state updates
          } else {
              // deposit is in tokens
              channel.depositA = tokenAmount;
              channel.balanceA = tokenAmount; // so that fast close can happen without any state updates

               // transfer tokens into contract, must be approved
              ERC20 erc20 = ERC20(tokenContract);
              require(
                  erc20.transferFrom(msg.sender, address(this), tokenAmount),
                  "Error transferring tokens."
              );
          }
          channel.tokenContract = tokenContract;

          // lifecycle
          channel.status = ChannelStatus.Open;
          channel.challenge = challenge;

          // Add it to the lookup table
          activeIds[msg.sender][to][tokenContract] = id;

          // add to storage
          channels[id] = channel;

          emit ChannelOpen(
              id,
              channel.partyA,
              channel.partyB,
              tokenContract,
              channel.depositA,
              channel.challenge
          );
        }
      `}
      </pre>
      <p>
      There’s a lot happening here--let’s break it down. After running a few checks to ensure that the parameters are indeed valid, we assign the channel a unique ID using the hash of partyA, partyB, and the time that the channel was created.

      <br/> <br/>Next, we initiate a new channel structure in memory and begin to fill in the variables: msg.sender is assigned to partyA, the counterparty address is assigned to partyB, and deposits/balances are set according to the parameters passed.

      <br/> <br/>If ERC20 tokens are being used, they are transferred into a channel-specific contract. Then, we update the channel’s status (it’s now open!), add the challenge period, and register it in the channel storage  and active channel mapping. The channel is now open, so the function emits a ChannelOpen event, which we declared at the top of the contract. Congrats! You’ve got your very own channel.

      <br/> <br/>Because openChannel is called by just one party, we need to allow the counterparty to join the channel and deposit their own funds. You may have noticed that when we were updating the channel structure in openChannel, we left the partyB balance and deposit blank--now we fill those in. joinChannel takes the id that we created in openChannel (you can access it via the ChannelOpen event), as well as a deposit amount.
      </p>
      <pre class="code-example">
      {` function joinChannel(bytes32 id, uint tokenAmount)
        public
        payable
    {
        Channel storage channel = channels[id]; //identify channel to update

        require(msg.sender == channel.partyB, "Not your channel."); //make sure msg.sender is partyB of channel
        require(channel.status == ChannelStatus.Open, "Channel status is not Open."); //make sure channel is open

        if (channel.tokenContract == address(0)) {
            //if there is no tokenContract address, set deposit and balance to msg.value.
            channel.depositB = msg.value;
            channel.balanceB = msg.value;
        } else {
            //otherwise, set deposit and balance to tokenAmount
            channel.depositB = tokenAmount;
            channel.balanceB = tokenAmount;

            // transfer tokens, must be approved
            ERC20 erc20 = ERC20(channel.tokenContract);
            require(erc20.transferFrom(msg.sender, address(this), tokenAmount), "Error transferring tokens.");
        }
        //set channel status to "joined"
        channel.status = ChannelStatus.Joined;

        //emit channeljoin event
        emit ChannelJoin(
            id,
            channel.partyA,
            channel.partyB,
            channel.depositA,
            channel.depositB
        );
    }
    `}
    </pre>
    <p>
    First, we identify the channel using the unique channel Id; then, we use the same process that we used in openChannel to assign on-chain balances and deposits for partyB. Last, the function emits a ChannelJoin event to indicate that the channel has been joined and updated with partyB’s deposit.

    <br/><br/>The next function is a simple one--a helper which creates a unique fingerprint using the hash of the channel ID, nonce, and party balances:
    </p>
    <pre class="code-example">
    {`    function getFingerprint(
        bytes32 channelId,
        uint256 nonce,
        uint256 balanceA,
        uint256 balanceB
    )
        public
        pure
        returns (bytes32)
    {
        return keccak256(
            channelId,
            nonce,
            balanceA,
            balanceB
        );
    }
      `}
    </pre>
    <p>
    Because state updates will be used to adjudicate disbursement of funds, we need to be able to determine what state updates are valid. Specifically, we want to confirm that balances add up properly, that the nonce of the state update is more recent than the current on-chain nonce, and that, if signatures are required, they are valid. isValidStateUpdate takes the channelId, nonce, balances, signatures from both parties, and booleans indicating whether those signatures are required for closing. The booleans are useful because they enable “fast closing” of channels--more on this later!
    </p>
    <pre class="code-example">
    {`function isValidStateUpdate(
        bytes32 channelId,
        uint256 nonce,
        uint256 balanceA,
        uint256 balanceB,
        string sigA,
        string sigB,
        bool requireSigA,
        bool requireSigB
    )
        public
        view
        returns (bool)
    {
        Channel memory channel = channels[channelId];

        // channel sanity checks
        //1. Do channel balances add up to deposits?
        require(
            balanceA + balanceB == channel.depositA + channel.depositB,
            "Balances do not add up to deposits."
        );
        //2. Has the channel been joined or is it in a challenge state?
        require(
            channel.status == ChannelStatus.Joined || channel.status == ChannelStatus.Challenge,
            "Channel status is not Joined or Challenge."
        );
        //3. If the channel is in a challenge state, are we still within the challenge period?
        if (channel.status == ChannelStatus.Challenge) {
            require(now < channel.closeTime, "Challenge period is over.");
        }
        //4. Is the nonce being submitted higher than the on-chain nonce?
        require(nonce > channel.nonce, "Nonce is not higher than on-chain channel state.");

        // require state info to be signed by both participants
        // we are using eth_signTypedData, references:
        // https://medium.com/metamask/scaling-web3-with-signtypeddata-91d6efc8b290
        // https://github.com/ukstv/sign-typed-data-test/blob/master/contracts/SignTypedData.sol#L11
        // https://github.com/MetaMask/eth-sig-util/blob/master/index.js
        bytes32 fingerprint = getFingerprint(
            channelId,
            nonce,
            balanceA,
            balanceB
        );

        //check that signatures are valid
        if (requireSigA) {
            require(
                ECTools.isSignedBy(fingerprint, sigA, channel.partyA) == true,
                "partyA signature not valid"
            );
        }

        if (requireSigB) {
            require(
                ECTools.isSignedBy(fingerprint, sigB, channel.partyB) == true,
                "partyA signature not valid"
            );
        }

        // return true if all conditions pass
        return true;
    }

      `}
      </pre>
      <p>
      This function is effectively a series of validity checks: first, we confirm that the channel has been joined by both parties, contains balances that make sense, and (if necessary) is signed by both parties. It returns a boolean which will be used in updateState to confirm that a state update submitted on-chain is valid.

      <br/><br/>updateState takes a channel id, nonce, balances, and signatures. It then confirms that the update is valid using isValidStateUpdate and, if so, updates the balances and nonce in the channel structure on-chain. Lastly, it emits a ChannelUpdateState event:
      </p>
      <pre class="code-example">
      {`function updateState(
        bytes32 channelId,
        uint256 nonce,
        uint256 balanceA,
        uint256 balanceB,
        string sigA,
        string sigB
    )
        public
    {
        Channel storage channel = channels[channelId];

        // sanity checks
        require(
            isValidStateUpdate(
                channelId,
                nonce,
                balanceA,
                balanceB,
                sigA,
                sigB,
                true,
                true
            ) == true,
            "Both signatures not valid."
        );

        // set state variables
        channel.balanceA = balanceA;
        channel.balanceB = balanceB;
        channel.nonce = nonce;

        emit ChannelUpdateState(channelId, nonce, balanceA, balanceB);
    }
        `}
        </pre>
        <p>
        Let’s review what we’ve done so far: we laid out the events, mappings, and structures necessary for a channel; we created (1) a function that allows us to open a channel using those structures, (2) a function allowing a second party to join a channel, and (3) functions allowing us to validate state updates and submit them to change on-chain state. Using what we’ve built so far, two parties are able to exchange state updates off-chain using a client package. In case of dispute or when finished transacting, they can use contract functions to update state on-chain.

        <br/><br/>However, there’s one last piece that needs to be added to the contract: the ability to close channels. To add closing functionality, we first declare startChallenge to create a challenge period where parties can attempt to submit the most recent state on-chain. The party who benefited from the latest state update is financially incentivized to submit that state; by allowing them that chance, we alleviate the impact of bad acting (i.e. submitting old state updates) on behalf of the other party. In this example, availability requirements (i.e. parties need to be online to submit state) are somewhat strict; however, most state channels projects have instituted mechanisms to mitigate these requirements. We will cover such systems in future posts.

        <br/><br/>startChallenge accepts a channelId; it then changes the channel status to challenge, sets a closing time (after which the channel can be closed), and emits a ChannelChallenge event:
        </p>
        <pre class="code-example">
        {`function startChallenge(bytes32 channelId) public {
        Channel storage channel = channels[channelId];

        // sanity checks
        require(
            msg.sender == channel.partyA || msg.sender == channel.partyB,
            "Not your channel."
        );
        require(
            channel.status == ChannelStatus.Open || channel.status == ChannelStatus.Joined,
            "Channel status not Open or Joined"
        );

        // update channel status
        channel.status = ChannelStatus.Challenge;
        //set closing time, using challenge period
        channel.closeTime = now + channel.challenge;
        //indicate which party started the challenge
        channel.challengeStartedBy = msg.sender;

        emit ChannelChallenge(channelId, channel.closeTime, msg.sender);
    }
          `}
          </pre>
          <p>
          Note that startChallenge is required to close a channel; after the challenge period has begun, either party can call closeChannel:
          </p>
          <pre class="code-example">
          {`function closeChannel(bytes32 channelId) public {
        Channel storage channel = channels[channelId];

        // request must come from parties
        require(
            msg.sender == channel.partyA || msg.sender == channel.partyB,
            "Not your channel."
        );

        // channel must be in challenge and challenge period over
        require(
            channel.status == ChannelStatus.Challenge,
            "Channel status not Challenge."
        );

        // if closer is not the person who started the challenge, fast close channel
        if (msg.sender == channel.challengeStartedBy) {
            require(now > channel.closeTime, "Challenge period not over.");
        }

        uint balanceA = channel.balanceA;
        uint balanceB = channel.balanceB;

        // zero out to avoid reentrancy
        channel.balanceA = 0;
        channel.balanceB = 0;
        // if true, then use final state to close channel
        if (channel.tokenContract == address(0)) {
            channel.partyA.transfer(balanceA);
            channel.partyB.transfer(balanceB);
        } else {
            ERC20 token = ERC20(channel.tokenContract);
            require(
                token.transfer(channel.partyA, balanceA),
                "Error transferring tokens."
            );
            require(
                token.transfer(channel.partyB, balanceB),
                "Error transferring tokens."
            );
        }

        channel.status = ChannelStatus.Closed; // redundant bc channel is deleted
        delete activeIds[channel.partyA][channel.partyB][channel.tokenContract];
        delete channels[channelId];

        emit ChannelClose(channelId);
    }
            `}
      </pre>
      <p>
      closeChannel first checks that the party calling it is in the channel, then confirms that the channel is in the challenge state. If the function is called by the party who did not initiate the challenge, it immediately updates on-chain balances, transfers the appropriate amount of tokens to each party, changes the channel status to closed, and deletes the channel from the registries.

      <br/><br/>This “fast close” is possible because it ensures that both parties have an opportunity to submit the most recent state that they have. Consider the following: four updates occur in a channel; 1 and 3 are beneficial to partyA and 2 and 4 are beneficial to partyB. PartyA tries to close with update #1, which is the most beneficial to them. PartyB could initiate a challenge with update 2, 3, or 4, but has a financial incentive to submit the most recent state update they possess the first time around. If they submit an older state, they know that partyA will have the opportunity to supersede it. As a result, they would choose to submit update 4 (even if update 2 were more beneficial to them) because if they chose update 2 partyA could challenge with update 3 and cheat partyB. PartyA can then either agree with partyB’s update or submit their own; regardless, they are able to fast close since partyB has already submitted a state to challenge.
      To the contrary, if the function is called by the party who did initiate the challenge, it requires that the challenge period expire before closing and disbursing funds. This ensures that the counterparty also has a chance to dispute the submitted state.

      <br/><br/>Once the channel has been closed and deleted from the relevant registries, the function emits a ChannelClose event.

      <br/><br/>The final function in our channel manager simply returns the channel structure given a channel Id:
      </p>
      <pre class="code-example">
      {`function getChannel(bytes32 id) public view returns (
        address,
        address,
        address,
        uint,
        uint,
        uint,
        uint,
        uint,
        uint,
        uint,
        uint,
        address
    ) {
        Channel memory channel = channels[id];
        return (
            channel.partyA,
            channel.partyB,
            channel.tokenContract,
            channel.depositA,
            channel.depositB,
            uint(channel.status),
            channel.challenge,
            channel.nonce,
            channel.closeTime,
            channel.balanceA,
            channel.balanceB,
            channel.challengeStartedBy
        );
    }

        `}
        </pre>
        <p>
        Now, all of our on-chain functionality has been created. You may have noticed that the contract does not actually enable the parties to create and exchange signed state updates; in a future post, we will walk through an example of the client package needed to exchange those updates and actually transact off-chain.
        </p>

          </Container>
          </ScrollableAnchor>
    )
  }
}
export default PaymentChannelContracts;
