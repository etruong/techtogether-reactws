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
            <PostInput data={props.data} setData={props.setData} currentUser={props.currentUser} />
            <PostContainer data={props.data} setData={props.setData}
                 users={props.users} currentUser={props.currentUser} />
        </section>
    )
}

function PostInput(props) {
    const [stateValue, setStateValue] = React.useState("");

    const inputChange = (event) => {
        setStateValue(event.target.value);
    }

    //   {
    //     id: "post1",
    //     userId: 1,
    //     content: "Just did a million push ups today, feeling great!",
    //     img: "",
    //     datePosted: "December 16, 2020 9:30",
    //     like: false,
    //     comments: [
    //         {
    //             userId: 1,
    //             content: "I meant to say TWO MILLION whoops 😏",
    //             datePosted: "December 16, 2020 11:30",
    //         }
    //     ]
    // },

    const onPost = (event) => {
        const dataCopy = [...props.data];
        const newPost = {
            id: "post" + (dataCopy.length + 1),
            userId: props.currentUser.id,
            content: stateValue,
            img: "",
            datePosted: new Date().toString(),
            like: false,
            comments: []
        };
        dataCopy.push(newPost);
        props.setData(dataCopy);
    }

    return (
        <div className="post-input">
            <input onChange={inputChange} value={stateValue} type="text" placeholder="How are you doing today?" />
            <button id="post-btn" onClick={onPost} disabled={stateValue.length === 0}>Post</button>
        </div>
    )
}

function PostContainer(props) {

    const sortByPostedDesc = (postA, postB) => {
        const dateA = new Date(postA.datePosted);
        const dateB = new Date(postB.datePosted);
        return dateB - dateA;
    }

    props.data.sort(sortByPostedDesc);

    const postElement = props.data.map((info) => {
        let user = props.users[info.userId];
        return <Post
            key={user.name + "-" + Math.random()}
            id={info.id}
            name={user.name}
            datePosted={info.datePosted}
            img={info.img}
            content={info.content}
            profileImg={user.profileImg}
            comments={info.comments}
            currentUser={props.currentUser}
            users={props.users}
            data={props.data}
            liked={info.like}
            setData={props.setData}
        />;
    });

    return (
        <div className="posts">
            <div className="post-container">
                {postElement}
            </div>
        </div>
    );
}

function Post(props) {
    const [showComments, setShowComments] = React.useState(false);

    const formatDate = (dateString) => {
        const objDate = new Date(dateString);
        const monthNames = ["January", "February", "March", "April", 
            "May","June","July", "August", "September", "October", "November","December"];
        return `${monthNames[objDate.getUTCMonth()]} ${objDate.getDay()}, ${objDate.getFullYear()} `
    }

    const likePost = () => {
        const copyData = [...props.data];
        for (let i = 0; i < copyData.length; i++) {
            if (copyData[i].id === props.id) {
                copyData[i].like = !copyData[i].like;
            }
        }
        props.setData(copyData)
    }

    let imgElement = null;
    if (props.img) {
        imgElement = <img src={'./img/post/' + props.img} alt={props.imgAlt} />
    }

    let style = {
        backgroundImage: `url('../img/profile/${props.profileImg}')`
    }

    return (
        <div className="post-container">
            <div className="post">
                <div className="profile-img" style={style}>&nbsp;</div>
                <div className="post-content">
                    <p className="bold">{props.name}</p>
                    <p>{formatDate(props.datePosted)}</p>
                    <p>{props.content}</p>
                </div>
                {imgElement}
                <div className="post-actions">
                    <FontAwesomeIcon icon={faEllipsisV} />
                    <FontAwesomeIcon onClick={likePost} icon={props.liked ? faHeart : outlineIcon.faHeart} />
                    <FontAwesomeIcon onClick={() => setShowComments(!showComments)} icon={props.comments.length > 0 ? faComments : outlineIcon.faComment} />
                </div>
            </div>
            <div className="post-comments">
                {
                    showComments ? props.comments.map((commentInfo, index) => {
                        return <Comment key={"comment-" + index} content={commentInfo.content} 
                            originUserPost={props.users[commentInfo.userId]} />
                    }) : null
                }
            </div>
        </div>
    )
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