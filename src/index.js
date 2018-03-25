import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import Login from "./component/auth/Login";

fetch('/user', {credentials: 'include'})
    .then(res => res.json())
    .then(json => {
        if(json.user === null){
            return  ReactDOM.render(<Login/>, document.getElementById('root'));
        }
        ReactDOM.render(<App user={json}/>, document.getElementById('root'));
    })
    .catch(e => {
        console.log(e);
        ReactDOM.render(<div>Error</div>, document.getElementById('root'));
    });


ReactDOM.render(<div>Loading</div>, document.getElementById('root'));
