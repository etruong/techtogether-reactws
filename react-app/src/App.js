import React from 'react';
import './App.css';

import { NewsFeed } from './components/NewsFeed';
import { SideBar } from './components/SideBar';
import { currentUser, users, posts } from './data/data';

function App(props) {
  const [curUser, setCurrUser] = React.useState(currentUser);
  const [usersData, setUsers] = React.useState(users);

  return (<div>
    <header>
        <h1>Crossing Paths</h1>
        <nav>
            <ul>
                <li><i class="fas fa-home"></i></li>
                <li><i class="fas fa-user-alt"></i></li>
                <li><i class="fas fa-comment"></i></li>
                <li><i class="fas fa-tools"></i></li>
            </ul>
        </nav>
    </header>
    <main>
        <SideBar currentUser={curUser} />
        <NewsFeed currentUser={curUser} users={usersData} />
    </main>
  </div>);
}

export default App;