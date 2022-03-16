import React,{useState,lazy} from "react";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import HomePage from "./components/homepage";
import { BrowserRouter as Router , Route , Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Suspense } from "react/cjs/react.production.min";
import { ClipLoader } from "react-spinners";
const MainPage = lazy(()=>import('./components/mainPage'))
function App() {
  return (
    <div className="App">
      <RecoilRoot>
      <Router>
        <Switch>
          <Route path='/mainpage/'>
            <Suspense fallback={<ClipLoader size={300} />}>
            <MainPage />
            </Suspense>
            </Route>
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
