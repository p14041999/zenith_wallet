import React, { Component } from "react";
import dot5 from "../assets/dot5.svg";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "../Styles/CreateWalletPhrase.css";
// import AES from "crypto-js/aes";
// import { AES } from "crypto-js";
import hdKey from 'hdkey';
import { mnemonicToSeedSync } from "bip39";
import {privateToPublic, publicToAddress, toChecksumAddress} from 'ethereumjs-util'

class CreateWalletPhrase extends Component {
  state={
    seedPhrase:[],
    confirmPhrase:[],
    suffledArray:[]
  }
  componentDidMount(){
    let seed = localStorage.getItem('seed');
    let arr = JSON.parse(seed);
    if(seed == undefined || seed == '' || arr.length != 12){
      this.goBack();
    }else{
      this.setState({seedPhrase:arr});
      this.setState({suffledArray: this.shuffle(arr)});
    }
  }
  removePhrase=(i)=>{
    let arr = this.state.confirmPhrase;
    let filtered = arr.filter((x)=> x!==arr[i] )
    this.setState({confirmPhrase: filtered});
  }
  pushPhrase=(val)=>{
    let arr = this.state.confirmPhrase;
    this.setState({confirmPhrase:[...arr,val]});
  }
  isIncluded = (value)=>{
    return this.state.confirmPhrase.includes(value);
  }
  goBack = ()=>{
    this.props.history.push('/create-wallet-phrase');
  }
  shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  createWallet = ()=>{
    let seed = this.state.confirmPhrase.join(' ');
    let actualSeed = JSON.parse(localStorage.getItem('seed')).join(' ');
    console.log(actualSeed);
    console.log(seed);
    console.log("before");
    if(seed === actualSeed){
      let mnemonicSeed = mnemonicToSeedSync(actualSeed);
      let root = hdKey.fromMasterSeed(mnemonicSeed);
      let masterPrivateKey = root.privateKey.toString('hex');
      let addrNode = root.derive("m/44'/60'/0'/0/0");
      let pubKey = privateToPublic(addrNode._privateKey);
      let Oaddress = publicToAddress(pubKey);
      let address = toChecksumAddress(`0x${Oaddress.toString('hex')}`);
      // let privatekey = 
      // console.log(addrNode._privateKey.toString('hex'));
      // console.log(address);
      // console.log(masterPrivateKey);
      // console.log(Oaddress.toString('hex'));
      let data = {
        masterPrivateKey:masterPrivateKey,
        seed: actualSeed,
        addresses:[
          {
            address:address,
            privateKey:addrNode._privateKey.toString('hex')
          }
        ]
      }
      // console.log(data);
      localStorage.setItem('data',JSON.stringify(data));
      localStorage.removeItem('seed');
      this.props.history.push('/create-password');
    }else{
      console.log(actualSeed);
      console.log(seed);
      alert("Seed phrase doesn\'t match");
    }
  }
  render() {
    return (
      <div className="createWalletPhrase">
        <ArrowBackIcon className="text-light backarrow" onClick={this.goBack} />
        <div className="wall-cont">
          <p className="text-light">
            Select these 12 keywords in sequential order as shown previously.
          </p>
          <div id="confirmWalletDiv">
            {this.state.confirmPhrase.map((val,i)=>{
              return (<span className="phraseBox" onClick={(e)=>{
                  this.removePhrase(i);
                }} >{val}</span>)
            })}
          </div>
          <div className="phraseContainer">
            {this.state.suffledArray.map((val,i)=>{
              return <span 
              className={this.state.confirmPhrase.includes(val) ? "confirmedBox":"phraseBox"}
              onClick={e=>{
                if(!this.isIncluded(val)){
                  this.pushPhrase(val);
                }
              }}
              >{val}</span>
            })}
          </div>

          <button className="create-btn" id="btnNext" onClick={this.createWallet}>
            Next Step
          </button>
        </div>
        <img src={dot5} className="dot5" />
      </div>
    );
  }
}

export default CreateWalletPhrase;
