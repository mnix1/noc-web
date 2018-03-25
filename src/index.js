import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import './index.css';
import App from './component/app/App';
import Login from "./component/auth/Login";

fetch('/profile', {credentials: 'include'})
    .then(res => res.json())
    .then(json => {
        const profileId = json.profileId;
        if (_.isNil(profileId)) {
            return ReactDOM.render(<Login/>, document.getElementById('root'));
        }
        ReactDOM.render(<App profileId={profileId}/>, document.getElementById('root'));
    })
    .catch(e => {
        console.log(e);
        ReactDOM.render(<div>Error</div>, document.getElementById('root'));
    });


ReactDOM.render(<div>Loading</div>, document.getElementById('root'));
