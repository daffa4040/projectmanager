import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteTeamButton from './DeleteTeamButton';
import EditTeamForm from './EditTeamForm';
import SearchTeamForm from './SearchTeamForm';
// import AddProjectForm from './AddProjectForm';

const TeamList = () => {


    



  const [teams, setTeams] = useState([]);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/teams')
      .then(response => setTeams(response.data))
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  const handleEditTeam = (teamId) => {
    setEditingTeamId(teamId);
  };

  const handleUpdateTeam = (updatedTeam) => {
    setTeams((prevTeams) => prevTeams.map(team => (team.id === updatedTeam.id ? updatedTeam : team)));
    setEditingTeamId(null);
  };

  const handleDeleteTeam = (deletedTeamId) => {
    setTeams((prevTeams) => prevTeams.filter(team => team.id !== deletedTeamId));
  };

  const handleCancelEdit = () => {
    setEditingTeamId(null);
  };

  const handleSearch = (searchTerm) => {
    const results = teams.filter(team => team.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  };

  return (
    <div>
      <h2>Team List</h2>
      <SearchTeamForm onSearch={handleSearch} />
      <ul>
        {(searchResults.length > 0 ? searchResults : teams).map(team => (
          <li key={team.id}>
            {editingTeamId === team.id ? (
              <EditTeamForm team={team} onUpdateTeam={handleUpdateTeam} onCancelEdit={handleCancelEdit} />
            ) : (
              <div>
                {team.name} - {team.description}
                <button onClick={() => handleEditTeam(team.id)}>Edit Team</button>
                <DeleteTeamButton teamId={team.id} onDeleteTeam={handleDeleteTeam} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
