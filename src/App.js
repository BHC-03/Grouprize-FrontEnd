import React,{useState} from "react";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import HomePage from "./components/homepage";
import { BrowserRouter as Router , Route , Switch } from "react-router-dom";
import MainPage from "./components/mainPage";
function App() {
  const [signedUserInfo,setSignedUserInfo] = useState({});
  const [userInfo,setUserInfo] = useState({email:'',password:'',username:''});
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/mainpage/'><MainPage setSignedUserInfo={setSignedUserInfo} signedUserInfo={signedUserInfo} userInfo={userInfo} setUserInfo={setUserInfo}/></Route>
          <Route path='/login/'><LoginForm setSignedUserInfo={setSignedUserInfo} signedUserInfo={signedUserInfo} userInfo={userInfo} setUserInfo={setUserInfo}/></Route> 
          <Route path='/register/'><RegisterForm setSignedUserInfo={setSignedUserInfo} signedUserInfo={signedUserInfo} userInfo={userInfo} setUserInfo={setUserInfo}/></Route>
          <Route path='/'><HomePage/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
