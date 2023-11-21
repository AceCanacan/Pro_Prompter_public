import React from 'react';
import SummaryModal from './modal';
import { useLocation, useNavigate } from 'react-router-dom';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createSummary as createSummaryMutation } from '../graphql/mutations';
import { useState } from 'react';

import '../pages-css/summary.css';

function SummaryPage() {
  const { state } = useLocation();
  const [showModal, setShowModal] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isEditingFirstSummary, setIsEditingFirstSummary] = React.useState(false);
  const [isEditingSecondSummary, setIsEditingSecondSummary] = React.useState(false);
  const [editableFirstSummary, setEditableFirstSummary] = React.useState('');
  const [editableSecondSummary, setEditableSecondSummary] = React.useState('');
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (state) {
      setEditableFirstSummary(state.firstSummary);
      setEditableSecondSummary(state.secondSummary);
    }
  }, [state]);

  const handleEditFirstSummary = () => {
    setIsEditingFirstSummary(true);
  };

  const handleSaveFirstSummary = () => {
    setIsEditingFirstSummary(false);
    state.firstSummary = editableFirstSummary; // Update the state with the edited summary
  };

  const handleEditSecondSummary = () => {
    setIsEditingSecondSummary(true);
  };

  const handleSaveSecondSummary = () => {
    setIsEditingSecondSummary(false);
    state.secondSummary = editableSecondSummary; // Update the state with the edited summary
  };

  const saveSummaries = async () => {
    if (isSaving) {
      return; // If already saving, exit the function
    }
    setIsSaving(true);

  try {
    const user = await Auth.currentAuthenticatedUser();
    const summaryDetails = {
      title,
      description,
      firstSummary: editableFirstSummary,
      secondSummary: editableSecondSummary,
      owner: user.username
    };

    if (state && editableFirstSummary && editableSecondSummary && title && description) {
      await API.graphql(graphqlOperation(createSummaryMutation, { input: summaryDetails }));
      alert('Summaries saved!');
      setTitle('');
      setDescription('');
      setShowModal(false);
      navigate('/');
    } else {
      alert('Please fill in all fields.');
    }
  } catch (err) {
    if (err === 'No current user') {
      alert('You must be logged in to save summaries.');
    } else {
      console.error('Error saving summaries:', err);
      alert('Failed to save summaries.');
    }
  }

  setIsSaving(false); // Reset the saving state after the operation
};

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="summary-page-container">
      <h2 className="summary-page-header">Custom Instructions</h2>
      <div className="summary-section">
        <h3>How would you like ChatGPT to respond?</h3>
        {isEditingFirstSummary ? (
          <textarea
            value={editableFirstSummary}
            onChange={(e) => setEditableFirstSummary(e.target.value)}
            onBlur={handleSaveFirstSummary}
          />
        ) : (
          <p onClick={handleEditFirstSummary}>{editableFirstSummary}</p>
        )}
      </div>
      <div className="summary-section">
        <h3>What would you like ChatGPT to know about you to provide better responses?</h3>
        {isEditingSecondSummary ? (
          <textarea
            value={editableSecondSummary}
            onChange={(e) => setEditableSecondSummary(e.target.value)}
            onBlur={handleSaveSecondSummary}
          />
        ) : (
          <p onClick={handleEditSecondSummary}>{editableSecondSummary}</p>
        )}
      </div>
      <button className="save-summary-button" onClick={handleOpenModal}>Save</button>
      {showModal && (
        <SummaryModal
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          onSave={saveSummaries}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );  
}

export default SummaryPage;
