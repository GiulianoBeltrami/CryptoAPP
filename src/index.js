import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import store from'./app/store';
import {Provider} from 'react-redux';

ReactDOM.render(
    <BrowserRouter>
        <Route>
            <Provider store={store}>
                <App />
            </Provider>
        </Route>
    </BrowserRouter>,
    document.getElementById("root")
);
