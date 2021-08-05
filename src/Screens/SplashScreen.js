import React, { Component } from "react";
import dot1 from "../assets/dot1.svg";
import dot2 from "../assets/dot2.svg";
import dot3 from "../assets/dot3.svg";
import logo from "../assets/logo.svg";
import "../Styles/SplashScreen.css";

class SplashScreen extends Component {
  render() {
    return (
      <div className="splashScreen">
        <img src={dot1} className="dot1" />
        <img src={dot2} className="dot2" />
        <img src={dot3} className="dot3" />
        <div className="flex-col-end py-4 logo-cont">
          <img src={logo} id="logoSplash" />
          <h3 className="text-light p-big font-rubik">Zenith Wallet</h3>
        </div>
      </div>
    );
  }
}

export default SplashScreen;
