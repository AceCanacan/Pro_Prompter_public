import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { updateSummary } from '../graphql/mutations';
import { deleteSummary } from '../graphql/mutations';
import '../pages-css/summary.css';

function SummaryViewPage() {
  const { state: summary } = useLocation();
  const [editMode, setEditMode] = useState(false);
  const [editedSummary, setEditedSummary] = useState({ ...summary });
  const navigate = useNavigate();

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const input = {
        id: editedSummary.id,
        title: editedSummary.title,
        description: editedSummary.description,
        firstSummary: editedSummary.firstSummary,
        secondSummary: editedSummary.secondSummary,
      };
      await API.graphql(graphqlOperation(updateSummary, { input }));
      setEditMode(false);
    } catch (error) {
      console.error('Error updating summary:', error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this summary?");
    if (confirmDelete) {
      try {
        const input = { id: editedSummary.id };
        await API.graphql(graphqlOperation(deleteSummary, { input }));
        navigate('/'); // Navigate back to the default page after deletion
      } catch (error) {
        console.error('Error deleting summary:', error);
      }
    }
  };

  return (
    <div className="summary-page-container"> {/* Changed from summary-view-container */}
      <h2 className="summary-page-header">{editedSummary.title}</h2> {/* Changed from summary-view-header */}
      <p className="summary-description">{editedSummary.description}</p>
      <div className="summary-section">
        <h3>How would you like ChatGPT to respond?</h3>
        {editMode ? (
          <textarea
            value={editedSummary.firstSummary}
            onChange={(e) => setEditedSummary({ ...editedSummary, firstSummary: e.target.value })}
          />
        ) : (
          <p>{editedSummary.firstSummary}</p>
        )}
      </div>
      <div className="summary-section">
        <h3>What would you like ChatGPT to know about you to provide better responses?</h3>
        {editMode ? (
          <textarea
            value={editedSummary.secondSummary}
            onChange={(e) => setEditedSummary({ ...editedSummary, secondSummary: e.target.value })}
          />
        ) : (
          <p>{editedSummary.secondSummary}</p>
        )}
      </div>
      {editMode ? (
        <>
          <button className="save-summary-button" onClick={handleSave}>Save</button>
          <button className="delete-summary-button" onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <button className="save-summary-button" onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
  
}

export default SummaryViewPage;
