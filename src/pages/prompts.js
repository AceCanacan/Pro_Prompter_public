import React, { useState, useEffect } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listSummaries } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';


import '../pages-css/prompts-style.css';

function PromptsPage() {
  const [summaries, setSummaries] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const viewSummary = (summary) => {
    navigate('/summary-view', { state: summary });
  };

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const userData = await Auth.currentAuthenticatedUser();
        setUser(userData);
        const summaryData = await API.graphql(graphqlOperation(listSummaries));
        if (summaryData.data.listSummaries) {
          setSummaries(summaryData.data.listSummaries.items);
        }
      } catch (err) {
        console.error('Error fetching summaries', err);
      }
    };

    fetchSummaries();
  }, []);

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      setUser(null);
      setSummaries([]);
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <div className="PromptsPage-container">  
      {summaries.length ? (
        <ul className="PromptsPage-summaryList">
          {summaries.map((summary, index) => (
            <li className="PromptsPage-summaryItem" key={summary.id || index} onClick={() => viewSummary(summary)}>
              <h3 className="PromptsPage-summaryTitle">{summary.title}</h3>
              <p className="PromptsPage-summaryDescription">Description: {summary.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No summaries saved.</p>
      )}
    </div>
  );
}

export default PromptsPage;