import React, { Component } from 'react';
import axios from '../../../axios';
import {Route} from 'react-router-dom';


import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from "../FullPost/FullPost";

class Posts extends Component {
    state = {
        posts: []
    }

    // Navigating programmatically to the other page
    // Mostly used for navigation after a give operation finished
    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/posts/' + id});
        // this.props.history.push('/posts/' + id);
    }

    //ES6 Feature: Promises - gets function which executes when the promise resolves
    componentDidMount(){
        console.log(this.props);
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0,4); //the first four posts
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
            })
            .catch(error => { //Handling the error
                 console.log(error);
                //this.setState({error: true});
            });
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>

        if(!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    //<Link key={post.id} to={'/posts/' + post.id}>
                        <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)}/>
                    //</Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                {/*This is the way to create dynamic nested routes*/}
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
        )
    }
}

export default Posts;