import React,{useState} from "react";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import HomePage from "./components/homepage";
import { BrowserRouter as Router , Route , Switch } from "react-router-dom";
import MainPage from "./components/mainPage";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <div className="App">
      <RecoilRoot>
      <Router>
        <Switch>
          <Route path='/mainpage/'><MainPage /></Route>
          <Route path='/login/'><LoginForm /></Route> 
          <Route path='/register/'><RegisterForm /></Route>
          <Route path='/'><HomePage/></Route>
        </Switch>
      </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
