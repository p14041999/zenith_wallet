import React, { Component } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import coin from "../assets/coin.svg";
import ReactSwipeButton from "react-swipe-button";
import logo from "../assets/Subtract.svg";
import Web3 from "web3";

class Transfer2 extends Component {
  state={
    loading:false
  }
  onSucces = () => {
    this.setState({loading:true});
    let nonce = Number.parseInt(localStorage.getItem('nonce'));
    localStorage.setItem('nonce',(nonce+1).toString())
    let web3 = new Web3('https://dataserver-1.zenithchain.co');
    web3.eth.sendSignedTransaction(this.props.location.state.signedTx).on('receipt',(data)=>{
      this.setState({loading:false});
      console.log(data);
      this.props.history.push('/');
    }).once('error',(e)=>{
      this.setState({loading:false});
      console.log(e)
      this.props.history.push('/transfer/send');
    });
  };
  render() {
    return (
      <div style={{ padding: 20 }}>
        <div className="flex-row">
          <ArrowBackIcon className="text-light" />
          <span></span>
        </div>
        <div className="flex-col-center text-light">
          <h3>You are about to send </h3>
          <h1>{this.props.location.state.amount} ZTC</h1>
          <img src={logo} width="70" />
        </div>
        <div className="text-light">
          <p>Recipient:</p>
          <p>{`${this.props.location.state.recepient.substr(0,10)}.....${this.props.location.state.recepient.substr(34,8)}`}</p>
          <p className="text-info">Network Fees: {this.props.location.state.networkFees} ZTC</p>
        </div>
        {/* <div className="flex-row" style={{ alignItems: "flex-start" }}>
          <input type="checkbox" />
          <p className="m0 text-light">
            I agree that this charge is irreversible once transfered.
          </p>
        </div> */}
        <div className="py-3">
          <ReactSwipeButton
            text="SWIPE TO COMPLETE"
            color="#221d3b"
            onSuccess={this.onSucces}
          />
        </div>
      </div>
    );
  }
}

export default Transfer2;
