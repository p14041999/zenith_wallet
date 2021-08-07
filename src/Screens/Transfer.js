import React, { Component } from "react";
import barcode from "../assets/barcode.svg";
import ham from "../assets/ham.svg";
import TabNav from "./TabNav";
import qrcode from "../assets/qrcode.svg";
import QRCode from 'react-qr-code'
import { UserContext } from "../context/UserContext";
import Web3 from 'web3';
import {Transaction as Tx} from '@ethereumjs/tx';
import Common from "@ethereumjs/common";
class Transfer extends Component {
  static contextType = UserContext;
  state = {
    val: "receive",
    address:'',
    recepient:'',
    amount:0,
    web3:null,
    balance:0,
    gasPrice:'0',
    gasRequired:21000,
    networkFees:0
  };
  format(val){
    let formater = new Intl.NumberFormat('en');
    return formater.format(val);
  }
  async componentDidMount(){
    let address = this.context.data.addresses[0].address;
    let web3 = new Web3('https://dataserver-1.zenithchain.co');
    this.setState({
      val:this.props.match.params.action,
      address,
      web3,
    })
    let bal = await web3.eth.getBalance(address);
    let gasPrice = await web3.eth.getGasPrice();
    let networkFees = web3.utils.fromWei((Number.parseInt(gasPrice)*this.state.gasRequired).toString())
    this.setState({
      balance:web3.utils.fromWei(bal),
      gasPrice,
      networkFees
    });
  }
  componentWillUnmount(){
    this.setState({amount:0,recepient:''});
  }
  decToHex = (num)=>{
    return `0x${Number(num).toString(16)}`;
  }
  // 0x2a1505273F8b5b85f9Eb18832404A7DfbA4a7F59
  sendTransaction = ()=>{
    let nonce = localStorage.getItem('nonce');
    if(nonce === undefined || nonce ===null || nonce === NaN){
      localStorage.setItem('nonce','100');
      nonce = 100
    }else{
      console.log(nonce);
      nonce = Number.parseInt(nonce);
    }
    if(this.state.amount+this.state.networkFees <= this.state.balance && this.state.amount > 0 && this.state.recepient.length === 42){
      var rawTx = {
        nonce:this.decToHex(nonce),
        from:this.context.data.addresses[0].address,
        gasPrice: this.decToHex(this.state.gasPrice),
        gasLimit: this.decToHex(this.state.gasRequired),
        to: this.state.recepient,
        value: this.decToHex(this.state.web3.utils.toWei(this.state.amount)),
      }
      let privateKey = Buffer.from(this.context.data.addresses[0].privateKey,'hex');
      let common = Common.custom({name:'zenith',chainId:79,networkId:79,defaultHardfork:'london'});
      
      var tx = new Tx(rawTx,{common});
      let signed = tx.sign(privateKey);
      var serializedTx = signed.serialize();
      // let signedTx = this.state.web3.accounts.

      console.log(`0x${serializedTx.toString('hex')}`);
      console.log(tx);
      let {amount,recepient,networkFees} = this.state;
      this.props.history.push({
        pathname: '/send',
        state: { signedTx: `0x${serializedTx.toString('hex')}`,amount,recepient,networkFees }
      });
    }else{
      alert("Balance Exceeds!");
    }
  }
  copyAddress= ()=>{
    window.navigator.clipboard.writeText(this.state.address).then(()=>{
      alert("Copied to clipboard!");
    })
  }
  render() {
    return (
      <div>
        <div className="flex-row-center px-2">
          <img src={ham} />
          <h3 className="text-light">ZENITH WALLET</h3>
          <img src={barcode} />
        </div>
        <div
          className="darkBack flex-row mx-1 px-1 borRad"
          style={{ alignItems: "center" }}
        >
          <p className="text-light">Select Asset</p>
          <span className="lightBack text-light px-3 py-3 borRad">ZTC</span>
        </div>
        <div
          style={{ margin: 10, padding: 10 }}
          className="darkBack mx-1 px-1 borRad flex-col-center"
        >
          <div className="lightBorder borRad">
            <button
              className={
                this.state.val == "receive"
                  ? "px-4 lightBack text-light borRad"
                  : "px-4 darkBack text-light borRad"
              }
              style={{
                width: 150,
                border: "none",
                padding: 8,
                paddingLeft: 30,
                paddingRight: 30,
              }}
              onClick={() => {
                this.setState({ val: "receive" });
              }}
            >
              Receive
            </button>
            <button
              className={
                this.state.val == "send"
                  ? "px-4 lightBack text-light borRad"
                  : "px-4 darkBack text-light borRad"
              }
              style={{
                width: 150,
                border: "none",
                padding: 8,
                paddingLeft: 30,
                paddingRight: 30,
              }}
              onClick={() => {
                this.setState({ val: "send" });
              }}
            >
              Send
            </button>
          </div>
          {this.state.val == "send" ? (
            <div className="receive">
              <div
                style={{
                  alignSelf: "flex-start",
                  paddingLeft: 20,
                  paddingTop: 10,
                }}
              >
                <div>
                  <p className="text-light">Recipient address</p>
                  <div
                    className="flex-row lightBorder borRad"
                    style={{
                      width: "80vw",
                      alignItems: "center",
                      height: "35px",
                    }}
                  >
                    <input className="input" onChange={e=>{this.setState({recepient:e.target.value})}} value={this.state.recepient}/>
                    <img src={barcode} className="px-1" />
                  </div>
                </div>
                <div>
                  <p className="text-light">Amount to Transfer</p>
                  <div
                    className="flex-row lightBorder borRad"
                    style={{ alignItems: "center", height: "35px" }}
                  >
                    <input className="input" type="number"  onChange={e=>{this.setState({amount:e.target.value})}} value={this.state.amount} />
                    <span className="text-light px-1">MAX</span>
                  </div>
                  <p className="text-light">Balance: {this.format(this.state.balance)} ZTC</p>
                </div>

                <p className="text-light py-4">Network Fee: {this.state.networkFees} ZTC</p>
              </div>
              <div style={{ display:'flex',justifyContent:'center' }}>
                {/* <button
                  className="text-light lightBorder"
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: 20,
                    padding: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                    marginRight: 20,
                  }}
                >
                  Cancel
                </button> */}

                <button
                  className="text-light "
                  style={{
                    backgroundColor: "#26B8FE",
                    border: "none",
                    borderRadius: 20,
                    padding: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                    // marginLeft: 20,
                    width:'100%'
                  }}
                  onClick={this.sendTransaction}
                >
                  Confirm
                </button>
              </div>
            </div>
          ) : null}

          {this.state.val == "receive" ? (
            <div className="send py-3">
              {/* <img src={qrcode} /> */}
              <div style={{backgroundColor:'#ffffff',padding:'10px'}}>
                <QRCode value={this.state.address} />
              </div>
              <p className="text-light lightBack text-center borRad py-1">
                {`${this.state.address.substr(0,6)}...${this.state.address.substr(this.state.address.length-4,4)}`}
              </p>
              <div className="flex-row" style={{justifyContent:'center'}}>
                <span className="text-info" onClick={this.copyAddress}>Tap to copy</span>
                {/* <span className="text-info">Share QR</span> */}
              </div>
            </div>
          ) : null}
        </div>

        <TabNav active="transfer" />
      </div>
    );
  }
}

export default Transfer;
