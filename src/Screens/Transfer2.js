import React, { Component } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import coin from "../assets/coin.svg";
import ReactSwipeButton from "react-swipe-button";
import logo from "../assets/Subtract.svg";
import Web3 from "web3";

class Transfer2 extends Component {
  goBack=()=>{
    this.props.history.push('/transfer/send')
  }
  state={
    loading:false
  }
  
  onSucces = () => {
    this.setState({loading:true});
    let nonce = Number.parseInt(localStorage.getItem('nonce'));
    localStorage.setItem('nonce',(nonce+1).toString())
    let web3 = new Web3('https://dataserver-1.zenithchain.co');
    let tx = JSON.parse(this.props.location.state.signedTx);
    console.log(tx);
    web3.eth.sendSignedTransaction(tx.rawTransaction)
    .then((r)=>{
      // amount,recepient,networkFees
      let tx = {
        amount:this.props.location.state.amount,
        networkFees:this.props.location.state.networkFees,
        hash:r.transactionHash,
        nonce:this.props.location.state.nonce+1,
        to:this.props.location.state.recepient,
        timestamp: Date.now(),
        type:'Sent'
      // "0xb989ec67615caad64db0bff0caa965e070d33ae56753443a6ad995af23c219a0"
      }
      let txLog = localStorage.getItem('log');

      if(txLog === undefined || txLog === '' ||txLog === null){
        let txnLog = [tx];
        localStorage.setItem('log',JSON.stringify(txnLog))
      }else{
        let log = JSON.parse(txLog);
        let txnLog = [...log , tx];
        localStorage.setItem('log',JSON.stringify(txnLog))
      }

      this.setState({loading:true});
      this.props.history.push('/');
      console.log(r);
    }).catch(e=>{
      this.setState({loading:true});
      console.log(e);
      this.goBack();
    });
  };
  render() {
    return (
      <div style={{ padding: 20 }}>
        <div className="flex-row">
          <ArrowBackIcon className="text-light" onClick={this.goBack} />
          <span></span>
        </div>
        <div className="flex-col-center text-light">
          <h3>You are about to send </h3>
          <h1>{this.props.location.state.amount} ZENITH</h1>
          <img src={logo} width="70" />
        </div>
        <div className="text-light">
          <p>Recipient:</p>
          <p>{`${this.props.location.state.recepient.substr(0,10)}.....${this.props.location.state.recepient.substr(34,8)}`}</p>
          <p className="text-info">Network Fees: {this.props.location.state.networkFees} ZENITH</p>
        </div>
        {/* <div className="flex-row" style={{ alignItems: "flex-start" }}>
          <input type="checkbox" />
          <p className="m0 text-light">
            I agree that this charge is irreversible once transfered.
          </p>
        </div> */}
        <div className="py-3">
          {this.state.loading?<p className="text-light">Please Wait ...</p>:
          <ReactSwipeButton
            text="SWIPE TO COMPLETE"
            color="#221d3b"
            onSuccess={this.onSucces}
          />
           }
        </div>
      </div>
    );
  }
}

export default Transfer2;
