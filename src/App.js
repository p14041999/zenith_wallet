import "./App.css";
import React,{Component} from 'react'; 
import SplashScreen from "./Screens/SplashScreen";
import WalletCreate from "./Screens/WalletCreate";
import ImportWallet from "./Screens/ImportWallet";
import Login from "./Screens/Login";
import CreateWalletPhrase from "./Screens/CreateWalletPhrase";
import ConfirmWalletPhrase from "./Screens/ConfirmWalletPhrase";
import Home from "./Screens/Home";
import Transfer from "./Screens/Transfer";
import Transfer2 from "./Screens/Transfer2";
import Onboard from "./Screens/Onboard";
// import {} from UserContext
import { UserContext } from "./context/UserContext";
import { AppContext } from "./context/AppContext";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreatePassword from "./Screens/CreatePassword";
import { AES } from "crypto-js";
class App extends Component {
  state = {
    data:{},
    isLoggedIn:false,
    isOnboarded:false,
    isCreated:false,
    isLoading:true,
  }
  hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }
  componentDidMount(){
    let onBoarded = localStorage.getItem('onboarded');
    // console.log(onBoarded);
    // let encData = localStorage.getItem('encryptedData');
    // let data = JSON.parse(this.hex2a(AES.decrypt(encData,'1234')).toString())
    if(onBoarded == undefined || onBoarded == 'false' || onBoarded == false){
      this.setState({isOnboarded:true});
    }else{
      // console.log("Hi");
      this.setState({isOnboarded:true});
    }
    let created = localStorage.getItem('created');
    if(created == undefined || created == 'false'){
      this.setState({isCreated:false});
    }else{
      this.setState({isCreated:true});
    }
    setTimeout(()=>{
      this.setState({isLoading:false});
      console.log(this.state.data);
    },4000)
    // console.log(this.state.isOnboarded);
  }

  setOnBoarding = (val)=>{
    if(val || !val){
      this.setState({isOnboarded:val});
    }
  }
  setCreation = (val)=>{
    if(val || !val){
      this.setState({isCreated:val});
    }
  }
  login = ()=>{
    this.setState({isLoggedIn:true})
  }
  logout = ()=>{
    this.setState({isLoggedIn:false});
  }
  setData = (val)=>{
    this.setState({data:val});
  }
  render(){
    // return (
    //   <Home />
    // )
    let appData = {
      isOnboarded:this.state.isOnboarded,
      isCreated:this.state.isCreated,
      setOnBoarding: this.setOnBoarding,
      setCreation: this.setCreation
    };

    let userData = {
      isLoggedIn:this.state.isLoggedIn,
      data:this.state.data,
      login: this.login,
      logout: this.logout,
      setData:this.setData
    }


    if(this.state.isLoading){
      return <SplashScreen />
    }else{
      return (
        <AppContext.Provider value={appData}>
          <UserContext.Provider value={userData}>
           <Router>
             {!this.state.isOnboarded?<>
              <Switch>
              <Route component={Onboard} path="/" exact/>
              </Switch>
             </>:<>
             {!this.state.isCreated?<>
              <Switch>
                <Route component={WalletCreate} path="/" exact/>
                <Route component={ConfirmWalletPhrase} path="/confirm-wallet-phrase" />
                <Route component={CreateWalletPhrase} path="/create-wallet-phrase" />
                <Route component={ImportWallet} path="/import-wallet" />
                <Route component={CreatePassword} path="/create-password" />
              </Switch>
             </>:<>
             {!this.state.isLoggedIn?<>
              <Switch>
              <Route component={Login} path="/"/>
              </Switch>
             </>:<>
              <Switch>
                <Route component={Home} path="/" exact />
                <Route component={Login} path="/login" />
                <Route component={Transfer} path="/transfer/:action" />
                <Route component={Transfer2} path="/send" />
              </Switch>
             </>}
             
             </>}
             </>}
            
           </Router>
          </UserContext.Provider>
        </AppContext.Provider>
      );
    }
  }
}

export default App;
