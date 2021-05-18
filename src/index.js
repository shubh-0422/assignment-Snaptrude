import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Test from "./components/map/index";
// import Test from './components/test/test' ;
ReactDOM.render(
  <React.StrictMode>
    {/* <Map /> */}
    
    <Test/>
     {/* <MapView/> */}
  </React.StrictMode>,
  document.getElementById('root')
);

