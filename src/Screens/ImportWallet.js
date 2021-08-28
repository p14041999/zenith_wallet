import React, { Component } from "react";
import "../Styles/ImportWallet.css";
import dot5 from "../assets/dot5.svg";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { AppContext } from "../context/AppContext";
// import { mnemonicToSeedSync } from "bip39";
import hdKey from 'hdkey';
import { mnemonicToSeedSync } from "bip39";
import {privateToPublic, publicToAddress, toChecksumAddress} from 'ethereumjs-util';
import {AES} from 'crypto-js';
class ImportWallet extends Component {
  static contextType = AppContext;
  state={
    pass:'',
    cPass:'',
    seed:''
  }
  goBack=()=>{
    this.props.history.push('/');
  }
  importWallet = ()=>{
    if(this.state.pass === this.state.cPass && this.state.pass !=""){
      let seed = this.state.seed;
      let mnemonicSeed = mnemonicToSeedSync(seed);
      let root = hdKey.fromMasterSeed(mnemonicSeed);
      let masterPrivateKey = root.privateKey.toString('hex');
      let addrNode = root.derive("m/44'/60'/0'/0/0");
      let pubKey = privateToPublic(addrNode._privateKey);
      let Oaddress = publicToAddress(pubKey);
      let address = toChecksumAddress(`0x${Oaddress.toString('hex')}`);

      let data = {
        masterPrivateKey:masterPrivateKey,
        seed,
        addresses:[
          {
            address:address,
            privateKey:addrNode._privateKey.toString('hex')
          }
        ]
      }
      let encryptedData = AES.encrypt(JSON.stringify(data),this.state.pass);
      localStorage.setItem('encryptedData',encryptedData);
      localStorage.setItem('created',true);
      this.context.setCreation(true);
      this.props.history.push('/');
    }else{
      alert("Please Enter Valid Password!");
    }
  }
  render() {
    return (
      <div>
        <ArrowBackIcon className="text-light backarrow" onClick={this.goBack}/>
        <div
          style={{
            backgroundColor: "#221D3B",
            // display: "flex",
            // flexDirection: "column",
            // alignItems: "flexStart",
            // height: "70vh",
            padding: 20,
            margin: 10,
            // marginTop: 50,
            borderRadius: 10,
          }}
        >
          <div>
            <p className="text-light">Seed Phrase*</p>
            <input
              style={{
                backgroundColor: "#221D3B",
                borderColor: "white",
                outline: "none",
                height: 150,
                width: "100%",
                color: "white",
                fontSize: 18,
                wordWrap: "break-word",
                overflowWrap: "break-word",
                borderRadius: 10,
              }}
              autoComplete={false}
              onChange={(e)=>{
                this.setState({seed:e.target.value})
              }}
              value={this.state.seed}
            />
          </div>
          <div>
            <p className="text-light">New Password*</p>
            <input
              style={{
                backgroundColor: "#221D3B",
                borderColor: "white",
                outline: "none",
                height: 50,
                width: "100%",
                color: "white",
                borderRadius: 10,
                fontSize: 18,
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
              onChange={e=>{
                this.setState({pass:e.target.value})
              }}
              value={this.state.pass}
              type="password"
              autoComplete="off"
            />
          </div>
          <div>
            <p className="text-light">Comfirm Password*</p>
            <input
              style={{
                backgroundColor: "#221D3B",
                borderColor: "white",
                outline: "none",
                borderRadius: 10,
                height: 50,
                width: "100%",
                color: "white",
                fontSize: 18,
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
              type="Password"
              value={this.state.cPass}
              onChange={e=>{
                this.setState({cPass:e.target.value})
              }}
            />
          </div>
          <button
            className="create-btn"
            style={{ marginTop: 40, marginLeft: 20 }}
            onClick={this.importWallet}
          >
            Import this Wallet
          </button>
        </div>
        <img src={dot5} className="dot5" />
      </div>
    );
  }
}

export default ImportWallet;
