import React, { Component } from "react";
import right from "../assets/right2.svg";
import object from "../assets/OBJECTS.svg";
import { AppContext } from "../context/AppContext";
class Onboard extends Component {
  static contextType = AppContext;
  handleOnboarded= ()=>{
    localStorage.setItem('onboarded',true);
    this.context.setOnBoarding(true);
  }
  render() {
    return (
      <div className="flex-col-center" style={{ paddingTop: 30 }}>
        <img src={object} />
        <h1 className="text-center text-light">
          Every Thing in your fingertips
        </h1>
        <button
          style={{
            backgroundColor: "transparent",
            borderColor: "#26b8fe",
            width: 60,
            borderRadius: "50%",
            height: 60,
            marginTop: 30,
          }} 
          onClick={this.handleOnboarded}
        >
          <img src={right} />
        </button>
      </div>
    );
  }
}

export default Onboard;
