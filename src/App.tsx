import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {SideBar} from "./components/Tab/Tab";

function App() {
    return (
        <div className="App">
            <Navbar/>
            <SideBar/>
        </div>
    );
}

export default App;
