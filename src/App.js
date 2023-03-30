import React from 'react';
import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";
import RouteList from './routes'

function App() {
  return (
    <div >
      <BrowserRouter>
            <RouteList/>
      </BrowserRouter>
    </div>
  );
}

export default App;
