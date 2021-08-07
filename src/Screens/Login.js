import { AES } from "crypto-js";
import React, { Component } from "react";
import dot4 from "../assets/dot4.svg";
import dot5 from "../assets/dot5.svg";
import logo from "../assets/logo.svg";
import { UserContext } from "../context/UserContext";
import "../Styles/WalletCreate.css";

class WalletCreate extends Component {
  state={
    password:''
  }
  static contextType = UserContext;
  hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }
  login = ()=>{
    if(this.state.password !== ''){
      let encData = localStorage.getItem('encryptedData');
      try{
        let data = AES.decrypt(encData,this.state.password);
        // console.log(this.hex2a(data.toString()));
        let obj = JSON.parse(this.hex2a(data.toString()));
        if(obj.addresses[0].address !== ''){
          console.log('validated')
          this.context.setData(obj);
          this.context.login();
        }else{
          console.log('failed')
        }
      }catch(e){
        console.log(e)
        alert("Invalid Password!");
      }
    }
  }
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
              autoComplete="none"
              onChange={e=>{this.setState({password:e.target.value})}}
              value={this.state.password}
            />
          </div>
          <button className="create-btn" onClick={this.login}>Login</button>
        </div>
      </div>
    );
  }
}

export default WalletCreate;
