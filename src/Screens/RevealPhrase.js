import React, { Component } from "react";
import dot5 from "../assets/dot5.svg";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "../Styles/CreateWalletPhrase.css";
// import {generateMnemonic,mnemonicToSeedSync} from 'bip39';
class RevealPhrase extends Component {
  state = {
    accepted:false,
    seedPhrase:[]
  }
  componentDidMount(){
    let seed = this.props.seed;
    let arr = seed.split(' ');
    if(arr.length === 12){
        this.setState({seedPhrase:arr});
    }else{
        alert("Something went wrong");
    }
  }
  
  render() {
    return (
      <div>
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
        </div>
      </div>
    );
  }
}

export default RevealPhrase;
