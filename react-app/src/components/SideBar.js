import React from 'react';
import { Critterpedia } from './Critterpedia';

export function SideBar(props) {
    const [critter, setCritter] = React.useState("Bass");
    return (
        <section>
            <UserProfile likeCount={props.likeCount} postCount={props.postCount} 
                currentUser={props.currentUser} recentlyCaught={critter} />
            <Critterpedia critter={critter} setCritter={setCritter} />
        </section>
    )
}

export function UserProfile(props) {
    return <div className="user-container">
        <div id="current-user" className="profile-img">&nbsp;</div>
        <ul>
            <li className="bold">Janet the Villager</li>
            <li className="mt3">Birthday: <span>June 12th</span></li>
            <li>Post Made: <span id="post-count">{props.postCount}</span></li>
            <li>Liked: <span id="like-count">{props.likeCount}</span> Posts</li>
            <li>Recently Caught: <br /><span id="recent-caught">{props.recentlyCaught}</span></li>
        </ul>
    </div>;
}