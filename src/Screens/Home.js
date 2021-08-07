import React, { Component } from "react";
import barcode from "../assets/barcode.svg";
import ArrowBackIcon from "@material-ui/icons/Menu";
import logo from "../assets/Subtract.svg";
import arrowup from "../assets/arrowup.svg";
import arrowdown from "../assets/arrowdown.svg";
import light from "../assets/light.png";
import TabNav from "./TabNav";
import Web3 from 'web3';
import { UserContext } from "../context/UserContext";
import { formatters } from "web3-core-helpers";
class Home extends Component {
  static contextType = UserContext;
  state={
    balance:0,
  }
  async componentDidMount(){
    let web3 = new Web3('https://dataserver-1.zenithchain.co');
    let bal = await web3.eth.getBalance(this.context.data.addresses[0].address);
    this.setState({balance:web3.utils.fromWei(bal)});
  }
  format = (val)=>{
    let fomatter = new Intl.NumberFormat('en');
    return fomatter.format(val);
  }
  toSend = ()=>{
    this.props.history.push('/transfer/send');
  }
  toReceive = ()=>{
    this.props.history.push('/transfer/receive');
  }
  render() {
    return (
      <div>
        <div className="flex-row-center px-2">
          <ArrowBackIcon className="text-light" />
          <h3 className="text-light">ZENITH WALLET</h3>
          <img src={barcode} />
        </div>
        <div className="darkBack  px-2 mx-3 my-2 borRad flex-row">
          <div className="flex-row-center">
            <img className="px-1" src={logo} />
            <h2 className="text-light">ZTC</h2>
          </div>
          <div>
            <p className="text-light">BALANCE</p>
            <h2 className="text-light">{this.state.balance}</h2>
          </div>
        </div>
        <div className="m2 flex-row">
          <button className="btn-home mx-1" onClick={this.toSend}>
            <img src={arrowup} className="px-1" />
            <span className="text-light px-2">Send</span>
          </button>
          <button className="btn-home mx-1">
            <img src={light} className="px-1" />
          </button>
          <button className="btn-home mx-1" onClick={this.toReceive}>
            <img className="px-1" src={arrowdown} />
            <span className="text-light px-2">Receive</span>
          </button>
        </div>
        <div>
          <p className="px-2 text-light">All Transactions</p>
          <div className="homeCont">
{/*             
            <div className="homeCard">
              <div>
                <h5 className="text-light">Contract Interaction</h5>
                <span className="text-light">0.00042</span>
                <span className="text-light">($0.003)</span>
              </div>
              <p className="text-light">24 Jun 21</p>
            </div> */}
          </div>
        </div>
        <TabNav active="home" />
      </div>
    );
  }
}

export default Home;
