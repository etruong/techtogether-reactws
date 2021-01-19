import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  // Post Action Icons
  faHeart,
  faEllipsisV, 
  faComments 
} from '@fortawesome/free-solid-svg-icons'
import * as outlineIcon from '@fortawesome/free-regular-svg-icons'

export function NewsFeed(props) {
    return (
        <section>
            <h2 className="text-center">News Feed</h2>
            <PostInput />
            <PostContainer />
        </section>
    )
}

function PostInput(props) {

    const inputChange = (event) => {
        
    }

    // post data contains id, userId, content, img, datePosted, like, comments
    const onPost = (event) => {
        
    }

    return (null)
}

function PostContainer(props) {

    const sortByPostedDesc = (postA, postB) => {
        const dateA = new Date(postA.datePosted);
        const dateB = new Date(postB.datePosted);
        return dateB - dateA;
    }

    return null;
}

function Post(props) {
    
    /*
    <div class="post-container">
        <div class="post" id="al">
            <div class="profile-img">&nbsp;</div>
            <div class="post-content">
                <p class="bold">Al</p>
                <p>Yesterday</p>
                <p>Just did a million push ups today, feeling great!</p>
            </div>
            <div class="post-actions">
                <i class="fas fa-ellipsis-v"></i>
                <i class="far fa-heart"></i>
                <i class="fas fa-comments"></i>
            </div>
        </div>
        <div class="post-comments">
            <div class="comment">
                <div class="profile-img">&nbsp;</div>
                <div class="comment-content">
                    <p class="bold">Al</p>
                    <p>I meant to say 2 million 😏</p>
                </div>
            </div>
        </div>
    </div>
     */
    return (null);
}

function Comment(props) {

    let style = {
        backgroundImage: `url('../img/profile/${props.originUserPost.profileImg}')`
    }

    return <div className="comment">
        <div className="profile-img" style={style}>&nbsp;</div>
        <div className="comment-content">
            <p className="bold">{props.originUserPost.name}</p>
            <p>{props.content}</p>
        </div>
    </div>;
}