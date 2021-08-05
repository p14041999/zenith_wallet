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
            Select these 12 keywords in sequential order as shown previously.
          </p>
          <div id="confirmWalletDiv"></div>
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
