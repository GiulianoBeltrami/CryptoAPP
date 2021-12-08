import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

ReactDOM.render(
    <BrowserRouter>
        <Route>
            <App />
        </Route>
    </BrowserRouter>,
    document.getElementById("root")
);
