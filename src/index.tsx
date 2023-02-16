import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import App from './App';
import {store} from "./app/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter basename={'/new-demo'}>
            <App/>
        </BrowserRouter>
    </Provider>
);
