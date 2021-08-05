import React, { Component } from "react";
import barcode from "../assets/barcode.svg";
import ham from "../assets/ham.svg";
import TabNav from "./TabNav";
import qrcode from "../assets/qrcode.svg";
class Transfer extends Component {
  state = {
    val: "receive",
  };
  render() {
    return (
      <div>
        <div className="flex-row-center px-2">
          <img src={ham} />
          <h3 className="text-light">ZENITH WALLET</h3>
          <img src={barcode} />
        </div>
        <div
          className="darkBack flex-row mx-1 px-1 borRad"
          style={{ alignItems: "center" }}
        >
          <p className="text-light">Select Asset</p>
          <span className="lightBack text-light px-3 py-3 borRad">ZTC</span>
        </div>
        <div
          style={{ margin: 10, padding: 10 }}
          className="darkBack mx-1 px-1 borRad flex-col-center"
        >
          <div className="lightBorder borRad">
            <button
              className={
                this.state.val == "receive"
                  ? "px-4 lightBack text-light borRad"
                  : "px-4 darkBack text-light borRad"
              }
              style={{
                width: 150,
                border: "none",
                padding: 8,
                paddingLeft: 30,
                paddingRight: 30,
              }}
              onClick={() => {
                this.setState({ val: "receive" });
              }}
            >
              Receive
            </button>
            <button
              className={
                this.state.val == "send"
                  ? "px-4 lightBack text-light borRad"
                  : "px-4 darkBack text-light borRad"
              }
              style={{
                width: 150,
                border: "none",
                padding: 8,
                paddingLeft: 30,
                paddingRight: 30,
              }}
              onClick={() => {
                this.setState({ val: "send" });
              }}
            >
              Send
            </button>
          </div>
          {this.state.val == "receive" ? (
            <div className="receive">
              <div
                style={{
                  alignSelf: "flex-start",
                  paddingLeft: 20,
                  paddingTop: 10,
                }}
              >
                <div>
                  <p className="text-light">Recipient address</p>
                  <div
                    className="flex-row lightBorder borRad"
                    style={{
                      width: "80vw",
                      alignItems: "center",
                      height: "35px",
                    }}
                  >
                    <input className="input" />
                    <img src={barcode} className="px-1" />
                  </div>
                </div>
                <div>
                  <p className="text-light">Amount to Transfer</p>
                  <div
                    className="flex-row lightBorder borRad"
                    style={{ alignItems: "center", height: "35px" }}
                  >
                    <input className="input" />
                    <span className="text-light px-1">MAX</span>
                  </div>
                  <p className="text-light">Balance:1.093973ZTC</p>
                </div>

                <p className="text-light py-4">Network Fee:0.089977ZTC</p>
              </div>
              <div style={{ marginLeft: 40, marginTop: -20 }}>
                <button
                  className="text-light lightBorder"
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: 20,
                    padding: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                    marginRight: 20,
                  }}
                >
                  Cancel
                </button>

                <button
                  className="text-light "
                  style={{
                    backgroundColor: "#26B8FE",
                    border: "none",
                    borderRadius: 20,
                    padding: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                    marginLeft: 20,
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          ) : null}

          {this.state.val == "send" ? (
            <div className="send py-3">
              <img src={qrcode} />
              <p className="text-light lightBack text-center borRad py-1">
                f2e3Fedaf....af2e3Feda
              </p>
              <div className="flex-row">
                <span className="text-info">Tap to copy</span>
                <span className="text-info">Share QR</span>
              </div>
            </div>
          ) : null}
        </div>

        <TabNav />
      </div>
    );
  }
}

export default Transfer;
