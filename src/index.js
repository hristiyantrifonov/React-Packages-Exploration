import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

//SETTING A DEFAULT GLOBAL CONFIGURATION
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

//INTERCEPTORS - functions that can be defined globally, which will be
//executed for every request in the app
//Often is used to set some common headers - e.g. authorisation headers

//Registering new interceptor - for requests (GET)
axios.interceptors.request.use(request => {
    console.log(request);
    //Edit request config...
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error); //So that we can catch it in the other files
});

axios.interceptors.response.use(response => {
    console.log(response);
    //Edit request config...
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
