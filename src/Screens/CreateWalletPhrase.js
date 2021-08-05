import React, { Component } from "react";
import dot5 from "../assets/dot5.svg";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "../Styles/CreateWalletPhrase.css";

class CreateWalletPhrase extends Component {
  render() {
    return (
      <div className="createWalletPhrase">
        <ArrowBackIcon className="text-light backarrow" />
        <div className="wall-cont">
          <p className="text-light">
            Please write down all 12 keywords in a safe and secure place as with
            out this seed phrase your wallet cannot be restored and recovered.
          </p>
          <div className="phraseContainer">
            <span className="phraseBox">apple</span>
            <span className="phraseBox">banana</span>
            <span className="phraseBox">chickoo</span>
            <span className="phraseBox">donkey</span>
            <span className="phraseBox">elephant</span>
            <span className="phraseBox">fish</span>
            <span className="phraseBox">girrafe</span>
            <span className="phraseBox">hidden</span>
            <span className="phraseBox">kevin</span>
            <span className="phraseBox">girrafe</span>
            <span className="phraseBox">hidden</span>
            <span className="phraseBox">kevin</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <input type="checkbox" />
            <p
              style={{ marginTop: 0, marginLeft: 10, marginBottom: 0 }}
              className="text-light"
            >
              I agree that I have write down all the keywords in a secure place.
              Also I understand the risk of loosing this phrase.
            </p>
          </div>
          <button className="create-btn" id="btnNext">
            Next Step
          </button>
        </div>
        <img src={dot5} className="dot5" />
      </div>
    );
  }
}

export default CreateWalletPhrase;
