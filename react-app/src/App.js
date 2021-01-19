import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { NewsFeed } from './components/NewsFeed';
import { SideBar } from './components/SideBar';
import { currentUser, users } from './data/data';
import { posts } from './data/data';

function App(props) {
  const [curUser, setCurrUser] = React.useState(currentUser);
  const [usersData, setUsers] = React.useState(users);
  const [data, setData] = React.useState(posts);

  const calculateCurrentLikes = () => {
    let likeCount = 0;
    data.forEach((post) => {
      if (post.like) likeCount++;
    });
    return likeCount;
  }

  const calculateCurrentPosts = () => {
    let postCount = 0;
    data.forEach((post) => {
      if (post.userId === curUser.id) postCount++;
    });
    return postCount;
  }

  return (<div>
    <Header />
    <main>
        <SideBar likeCount={calculateCurrentLikes()} postCount={calculateCurrentPosts()} currentUser={curUser} />
        <NewsFeed currentUser={curUser} users={usersData} data={data} setData={setData} />
    </main>
  </div>);
}

export default App;