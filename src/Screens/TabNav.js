import React, { Component } from "react";
import {Link} from 'react-router-dom';
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
        <Link to="/"><div className={this.props.active==="home"?"flex-col-center text-light":"flex-col-center laxun"}>
          {/* <img src={assets} /> */}
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10H17L14 19L8 1L5 10H1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>Assets Stat</p>
        </div></Link>
        <Link to="/transfer/receive"><div className={this.props.active==="transfer"?"flex-col-center text-light":"flex-col-center laxun"}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1H19M19 1V7M19 1L12 8M7 19H1M1 19V13M1 19L8 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>Transfer</p>
        </div>
        </Link>
        <div className={this.props.active==="buy"?"flex-col-center text-light":"flex-col-center laxun"}>
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 1L1 13H10L9 21L19 9H10L11 1Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
          <p>Buy/Sell</p>
        </div>
        <Link to="/settings">
        <div className={this.props.active==="security"?"flex-col-center text-light":"flex-col-center laxun"}>
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21C9 21 17 17 17 11V4L9 1L1 4V11C1 17 9 21 9 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>Security</p>
        </div></Link>
      </div>
    );
  }
}

export default TabNav;
