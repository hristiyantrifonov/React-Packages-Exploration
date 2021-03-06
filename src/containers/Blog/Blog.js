import React, { Component } from 'react';
//import axios from 'axios';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
// import NewPost from './NewPost/NewPost';

const AsyncNewPost = asyncComponent(() => {
    //Dynamic import - only imported upon execution of this function
    //This now import new post only when the constant is used somewhere
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/*Link is used instead of anchor el. React prevents*/}
                            {/*the default reload request and only re-renders*/}
                            {/*Link retains the state (it does not reload) (reload = state loss)*/}
                            <li><NavLink
                                to="/posts/"
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}
                                exact>Posts</NavLink></li>
                            <li><NavLink to={{
                                // hash can be used to scroll to it
                                // search could be used to obtain query parameters
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/*These props are pre-defined (it is expected to be used like that)*/}
                {/*If we do not use exact it take the path as a prefix (and / is prefix of*/}
                {/*everything, so it will always show*/}
                {/*<Route path="/" exact render={() => <h1>Home</h1>}/>*/}
                <Switch> {/*only allows for one path to be rendered*/}
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}
                    <Route path="/posts" component={Posts}/>
                    <Route render={() => <h1>Not found</h1>}/> {/*we are not authenticated and new post in not rendered so this catches it*/}
                    {/*<Redirect from="/" to="/posts"/> /!*from prop cannot be set on the Redirect outside the Switch*!/*/}
                    {/*<Route path="/" component={Posts}/>*/}
                </Switch>

            </div>
        );
    }
}

export default Blog;