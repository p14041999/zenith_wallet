import React, { Component } from "react";
import dot5 from "../assets/dot5.svg";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "../Styles/CreateWalletPhrase.css";
import {generateMnemonic,mnemonicToSeedSync} from 'bip39';
class CreateWalletPhrase extends Component {
  state = {
    accepted:false,
    seedPhrase:[]
  }
  componentDidMount(){
    let seed = localStorage.getItem('seed');
    let arr = JSON.parse(seed);
    if(seed == undefined || seed == '' || arr.length != 12){
      let mnemonic = generateMnemonic();
      this.setState({seedPhrase:mnemonic.split(' ')});
      localStorage.setItem('seed',JSON.stringify(mnemonic.split(' ')));
    }else{
      this.setState({seedPhrase:arr});
    }
  }
  goback =()=>{
    this.props.history.push('/');
  }
  nextPage=()=>{
    // localStorage.setItem('seed',JSON.stringify(this.state.seedPhrase));
    if(this.state.accepted){
      this.props.history.push('/confirm-wallet-phrase');
    }else{
      alert("Please Accept !")
    }
  }
  render() {
    return (
      <div className="createWalletPhrase">
        <ArrowBackIcon className="text-light backarrow" onClick={this.goback} />
        <div className="wall-cont">
          <p className="text-light">
            Please write down all 12 keywords in a safe and secure place as with
            out this seed phrase your wallet cannot be restored and recovered.
          </p>
          <div className="phraseContainer">
            {this.state.seedPhrase.map(elm => {
              return <span className="phraseBox">{elm}</span>
            })}
          </div>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <input type="checkbox" id="terms" value={this.state.accepted} onChange={e=>{this.setState({accepted:e.target.value})}} />
            <label
              style={{ marginTop: 0, marginLeft: 10, marginBottom: 0 }}
              className="text-light"
              htmlFor="terms"
            >
              I agree that I have write down all the keywords in a secure place.
              Also I understand the risk of loosing this phrase.
            </label>
          </div>
          <button className="create-btn" id="btnNext" onClick={this.nextPage}>
            Next Step
          </button>
        </div>
        <img src={dot5} className="dot5" />
      </div>
    );
  }
}

export default CreateWalletPhrase;
