import React, { Component } from 'react';
import axios from '../../../axios';

import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostID: id});
    }

    //ES6 Feature: Promises - gets function which executes when the promise resolves
    componentDidMount(){
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
                console.log(response);
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
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}/>
            });
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts;