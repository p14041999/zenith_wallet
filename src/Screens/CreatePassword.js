import React, { Component } from "react";
import "../Styles/ImportWallet.css";
import dot5 from "../assets/dot5.svg";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { AppContext } from "../context/AppContext";
import { AES } from "crypto-js";

class CreatePassword extends Component {
  static contextType = AppContext;
  state = {
    password:'',
    confirmPassword:''
  }
  goBack=()=>{
    this.props.history.push('/confirm-wallet-phrase');
  }
  importWallet = ()=>{
    let data = localStorage.getItem('data');
    if(this.state.password === this.state.password && this.state.password !== ''){
      let encryptedData = AES.encrypt(data,this.state.password);
      localStorage.setItem('encryptedData',encryptedData);
      localStorage.setItem('created',true);
      this.context.setCreation(true);
      localStorage.removeItem('data');
      this.props.history.push('/');
    }else{
      alert("Password does\'nt match !");
    }
  }
  render() {
    return (
      <div>
        <ArrowBackIcon className="text-light backarrow" onClick={this.goBack}/>
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
              type="password"
              autoComplete="none"
              onChange={e=>{this.setState({password:e.target.value})}}
              value={this.state.password}
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
              onChange={e=>{this.setState({confirmPassword:e.target.value})}}
              value={this.state.confirmPassword}
            />
          </div>
          <button
            className="create-btn"
            style={{ marginTop: 40, marginLeft: 20 }}
            onClick={this.importWallet}
          >
            Import this Wallet
          </button>
        </div>
        <img src={dot5} className="dot5" />
      </div>
    );
  }
}

export default CreatePassword;
