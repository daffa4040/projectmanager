import React from 'react';
import axios from 'axios';

const DeleteTeamButton = ({ teamId, onDeleteTeam }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/teams/${teamId}`);

      onDeleteTeam(teamId);
    } catch (error) {
      console.error('Error deleting team:', error.message);
    }
  };

  return <button onClick={handleDelete}>Delete Team</button>;
};

export default DeleteTeamButton;
