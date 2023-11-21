import React from 'react';

import '../pages-css/modal.css';

const SummaryModal = ({ title, setTitle, description, setDescription, onSave, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Save Summary</h2>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter a short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={onSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default SummaryModal;
