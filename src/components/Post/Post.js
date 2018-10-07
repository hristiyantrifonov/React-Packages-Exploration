import React from 'react';
import  { withRouter } from 'react-router-dom';

import './Post.css';

const post = (props) => {
    console.log(props);
    return(
        <article className="Post" onClick={props.clicked}>
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="Author">{props.author}</div>
            </div>
        </article>
    );
};

//We wrap this so that we have the history, location and match properties
//This is an easy way of making a component route-aware
export default withRouter(post);