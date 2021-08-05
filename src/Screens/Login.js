import React, { Component } from "react";
import dot4 from "../assets/dot4.svg";
import dot5 from "../assets/dot5.svg";
import logo from "../assets/logo.svg";
import "../Styles/WalletCreate.css";

class WalletCreate extends Component {
  render() {
    return (
      <div className="walletCreate">
        <img src={dot4} className="dot4" />
        <img src={dot5} className="dot5" />
        <div className="logo-cont-cre flex-col-center py-3">
          <img src={logo} />
          <h3 className="text-light p-big font-rubik">Zenith Wallet</h3>
        </div>
        <div
          className="btn-cont-cre flex-col-center"
          style={{ alignItems: "flex-start" }}
        >
          <div style={{ marginBottom: 20 }}>
            <p className="text-light">Enter Password</p>
            <input
              style={{
                backgroundColor: "transparent",
                borderColor: "white",
                outline: "none",
                height: 50,
                width: "70vw",
                color: "white",
                borderRadius: 10,
                fontSize: 18,
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
              type="Password"
            />
          </div>
          <button className="create-btn">Create New Wallet</button>
        </div>
      </div>
    );
  }
}

export default WalletCreate;
