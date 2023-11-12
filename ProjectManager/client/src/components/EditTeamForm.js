import React, { useState } from 'react';
import axios from 'axios';
import { isNameValid, isDescriptionValid } from '../utils/validation';

const EditTeamForm = ({ team, onUpdateTeam, onCancelEdit }) => {
  const [name, setName] = useState(team.name);
  const [description, setDescription] = useState(team.description);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isNameValid(name) || !isDescriptionValid(description)) {
      setError('Name and description are required.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3001/teams/${team.id}`, { name, description });
      onUpdateTeam(response.data);
      onCancelEdit();
      setError('');
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <button type="submit">Update Team</button>
      <button type="button" onClick={onCancelEdit}>Cancel</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default EditTeamForm;
