import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import LoadingScreen from 'react-loading-screen';
import logo from '../src/logo.png'
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
      text='Siya Foods'
    >
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<Search />} />
              <Route path="/previousorder" element={<PreviousOrder />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </LoadingScreen>
  );
}
