"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Root from './components/Root.js';
import combinedReducer from './redux/combineReducers.js'

import { BrowserRouter } from 'react-router-dom';

const store = createStore(combinedReducer)

// если необходимо, вид сборки можно проверить в коде:
// if (process.env.NODE_ENV === 'production') {
// if (process.env.NODE_ENV !== 'production') {

ReactDOM.render(

        <Provider store={store}>
            <Root/>
        </Provider>,

    document.getElementById('container') 
  );
