import {Amplify} from 'aws-amplify';
import config from './aws-exports';
import { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import QuestionPage from './pages/question';
import FollowUpPage from './pages/FollowUpPage';
import SummaryPage from './pages/summary';
import PromptsPage from './pages/prompts'; // Make sure you have imported PromptsPage
import SummaryViewPage from './pages/viewsummary';
import Guide from './pages/guide';

Amplify.configure(config);
function App() {


  const [userName, setUserName] = useState('');

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setUserName(user.username);
      })
      .catch(err => console.log(err));
  }, []);

  const handleLogout = async () => {
    // Confirm user's intent to log out
    const confirmLogout = window.confirm("Are you sure you want to log out?");
  
    // Proceed only if user confirms
    if (confirmLogout) {
      try {
        await Auth.signOut();
        window.location.reload();
      } catch (error) {
        console.log('error signing out: ', error);
      }
    } else {
      // User canceled logout
      console.log('Logout canceled by user.');
    }
  };
  

  return (
    <Router>
      <div className="App">
        <div className="sidebar">
          <div className="user-info">
            <p className="user-name">{userName}</p> {/* No need for sidebar-link here */}
          </div>
          <nav>
            <Link className="sidebar-link" to="/guide">How to Use</Link>
            <Link className="sidebar-link" to="/">Your Prompts</Link>
            <Link className="sidebar-link" to="/question">Make a Prompt</Link>
          </nav>
          <div className="logout-link">
            <p onClick={handleLogout}>Logout</p> {/* No need for sidebar-link here */}
          </div>
        </div>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<PromptsPage />} />
            <Route path="/question" element={<QuestionPage />} />
            <Route path="/follow-up" element={<FollowUpPage />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/summary-view" element={<SummaryViewPage />} />
            <Route path="/guide" element={<Guide />} />
          </Routes>
        </div>
      </div>
    </Router>
);


}

export default withAuthenticator(App);