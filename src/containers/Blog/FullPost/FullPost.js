import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount(){
        console.log(this.props);
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData(){
        if(this.props.match.params.id){

            //We make the request if we do not have loaded post OR we have one but the ids are different <--- THE AMENDMENT FOR THE BELOW PROBLEM
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)){ //the plus converts it to number
                axios.get('/posts/' + this.props.match.params.id)
                    .then(response => {
                        this.setState({loadedPost: response.data})
                        //!!! We are updating state within componentDidUpdate
                        // This causes infinite loop of sending requests
                    });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
            });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        //Because we get the ID before we get the post (asynchronous)
        if(this.props.match.params.id){
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }

        //Because it is initially null and we wait for it
        if (this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>

            );
        }


        return post;
    }
}

export default FullPost;