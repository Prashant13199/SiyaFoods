import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import LoadingScreen from 'react-loading-screen';
import logo from '../src/logo.png'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Screens/Home";
import Cart from "./Screens/Cart";
import { Provider } from "./Context";
import Search from "./Screens/Search";
import PreviousOrder from "./Screens/PreviousOrder";

export default function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  })

  return (
    <LoadingScreen
      loading={loading}
      bgColor='#312951'
      spinnerColor='#FFA500'
      logoSrc={logo}
      textColor='white'
      text='Siya Food'
    >
      <Provider>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact><Home /></Route>
            <Route path="/cart"><Cart /></Route>
            <Route path="/search"><Search /></Route>
            <Route path="/previousorder"><PreviousOrder /></Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    </LoadingScreen>
  );
}
