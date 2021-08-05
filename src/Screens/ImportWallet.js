import React, { Component } from "react";
import "../Styles/ImportWallet.css";
import dot5 from "../assets/dot5.svg";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

class ImportWallet extends Component {
  render() {
    return (
      <div>
        <ArrowBackIcon className="text-light backarrow" />
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
              type="Password"
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
            />
          </div>
          <button
            className="create-btn"
            style={{ marginTop: 40, marginLeft: 20 }}
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
