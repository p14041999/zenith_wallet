import React, { Component } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import coin from "../assets/coin.svg";
// import ReactSwipeButton from "react-swipe-button";
// import logo from "../assets/Subtract.svg";
// import Web3 from "web3";

class Details extends Component {
  goBack=()=>{
    this.props.history.push('/');
  }
  state={
    loading:false,
    tx:null,
  }
  componentDidMount(){
      let logs = JSON.parse(localStorage.getItem('log'))
      let tx = logs[this.props.match.params.id];
      this.setState({tx});
  }
  
  render() {
    return (
      <div style={{ padding: 20,overflow:'hidden' }}>
        <div className="flex-row">
          <ArrowBackIcon className="text-light" onClick={this.goBack} />
          {/* <span>Sent</span> */}
        </div>
        <div className="text-light" 
        // style={{display:'flex',flexDirection:'column',alignItems:'center'}}
        >
            <br/>
            <br/>
            <br/>
            <h2>Amount: {this.state.tx?.amount} ZENITH</h2>
            <p>Network Fees: {this.state.tx?.networkFees} ZENITH</p>
            <p>To: {this.state.tx?.to.substr(0,10)}....{this.state.tx?.to.substr(this.state.tx?.to.length-8,8)}</p>
            <p>Tx Hash: {this.state.tx?.hash.substr(0,10)}....{this.state.tx?.hash.substr(this.state.tx?.hash.length-8,8)}</p>
            <br/>
            <br/>
            <br/>
            <a href={`https://explorer.zenithchain.co/tx/${this.state.tx?.hash}`} target="_blank"><p style={{color:'blue',textAlign:'center'}}>View on explorer</p></a>
        </div>
      </div>
    );
  }
}

export default Details;
