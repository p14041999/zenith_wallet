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
import { AES } from "crypto-js";
import RevealPhrase from "./RevealPhrase";
class Settings extends Component {
  static contextType = UserContext;
  state={
    balance:0,
    logs:[],
    password:'',
    seed:''
  }
  async componentDidMount(){
    
  }
  hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }
  reveal=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    try{
        let encText = localStorage.getItem('encryptedData');
        let data = AES.decrypt(encText,this.state.password)
        let obj = JSON.parse(this.hex2a(data.toString()));
        this.setState({seed:obj.seed,password:''});
        // console.log(obj);
    }catch(e){
        console.log(e);
    }
  }
  render() {
    return (
      <div style={{overflow:'hidden'}}>
        <div className="flex-row-center px-2">
          <ArrowBackIcon className="text-light" />
          <h3 className="text-light">ZENITH WALLET</h3>
          <img src={barcode} />
        </div>
        {this.state.seed === ''?
        (
        <div style={{padding:'30px'}}>
            <form onSubmit={this.reveal} autoComplete="off">
            <div style={{marginBottom:'40px'}}>
                <p style={{color:'red'}}>DO NOT share this phrase with anyone!</p>
                <p style={{color:'red'}}>These words can be used to steal all your accounts.</p>
            </div>
            <div style={{ marginBottom: 20 }}>
                <p className="text-light">Enter Password</p>
                <input
                style={{
                    backgroundColor: "transparent",
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
                type="password"
                autoComplete="nope"
                onChange={e=>{this.setState({password:e.target.value})}}
                value={this.state.password}
                />
            </div>
            <div>
                <button
                style={{
                    color:'red',
                    border:'1px solid red',
                    height:'50px',
                    borderRadius:'10px',
                    backgroundColor:'transparent',
                    width:'100%'
                }}
                >
                    Reveal Seed Phrase
                </button>
            </div>
            </form>
        </div>
        ):(<RevealPhrase seed={this.state.seed} />)}
        <TabNav active="security" />
      </div>
    );
  }
}

export default Settings;
