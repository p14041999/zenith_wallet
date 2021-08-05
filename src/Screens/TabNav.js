import React, { Component } from "react";
import assets from "../assets/assets.svg";
import transfer from "../assets/transfer.svg";
import light from "../assets/light2.svg";
import sec from "../assets/sec.svg";
class TabNav extends Component {
  render() {
    return (
      <div
        className="flex-row px-1"
        style={{
          backgroundColor: "rgb(12 10 22)",
          height: 60,
          padding: 10,
          position: "absolute",
          bottom: 0,
          width: "95vw",
        }}
      >
        <div className="flex-col-center">
          <img src={assets} />
          <p className="text-light">Assets Stat</p>
        </div>
        <div className="flex-col-center">
          <img src={transfer} />
          <p className="text-light">Transfer</p>
        </div>
        <div className="flex-col-center">
          <img src={light} />
          <p className="text-light">Buy/Sell</p>
        </div>
        <div className="flex-col-center">
          <img src={sec} />
          <p className="text-light">Security</p>
        </div>
      </div>
    );
  }
}

export default TabNav;
