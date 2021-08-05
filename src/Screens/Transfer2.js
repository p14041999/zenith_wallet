import React, { Component } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import coin from "../assets/coin.svg";
import ReactSwipeButton from "react-swipe-button";

class Transfer2 extends Component {
  onSucces = () => {};
  render() {
    return (
      <div style={{ padding: 20 }}>
        <div className="flex-row">
          <ArrowBackIcon className="text-light" />
          <span></span>
        </div>
        <div className="flex-col-center text-light">
          <h3>You are about to send </h3>
          <h1>1.234 BTC</h1>
          <img src={coin} />
        </div>
        <div className="text-light">
          <p>Recipient:</p>
          <p>f2e3Fedaf2ee3Fedaeedaf2e3Feda</p>
          <p className="text-info">Network Fees:0.000322 BTC</p>
        </div>
        <div className="flex-row" style={{ alignItems: "flex-start" }}>
          <input type="checkbox" />
          <p className="m0 text-light">
            I agree that this charge is irreversible once transfered.
          </p>
        </div>
        <div className="py-3">
          <ReactSwipeButton
            text="SWIPE TO COMPLETE"
            color="#221d3b"
            onSuccess={this.onSucces}
          />
        </div>
      </div>
    );
  }
}

export default Transfer2;
