import './App.css';
import Login  from './components/Login/Login.jsx';
import Home from './components/Home/Home';
import React, { useContext, useReducer } from 'react';
import { BrowserRouter, Route, Routes,Switch } from 'react-router-dom';
import Store from "./Store/store";
import rootReducer from './RootReducer/RootReducer';
import SearchPage from './components/Search/SearchPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Success from "./components/Success/Success";

import AlreadyCheckin from "./components/AlreadyCheckin/AlreadyCheckin"

function App() {
  const initState = useContext(Store);
  const [state, dispatch] = useReducer(rootReducer, initState);
  return (
    <Store.Provider value={{ state, dispatch }} >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path='/search' element={<SearchPage />} />

          <Route path='/alreadyCheckin' element={<AlreadyCheckin />} />
          <Route path='/success' element={<Success />} />
          
          </Routes>
      </BrowserRouter>
    </Store.Provider>
  );
}

export default App;
