import React, { useState } from 'react';
import axios from 'axios';
import { isNameValid, isDescriptionValid } from '../utils/validation';
import '../css/AddTeamForm.css';

const AddTeamForm = ({ onAddTeam }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isNameValid(name) || !isDescriptionValid(description)) {
      setError('Name and description are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/teams', { name, description });
      onAddTeam(response.data);
      setName('');
      setDescription('');
      setError('');
    } catch (error) {
      console.error('Error adding team:', error);
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
      <button type="submit">Add Team</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default AddTeamForm;

