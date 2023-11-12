import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteTeamButton from './DeleteTeamButton';
import EditTeamForm from './EditTeamForm';
import SearchTeamForm from './SearchTeamForm';
import AddProjectForm from './AddProjectForm';

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:3001/teams');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []); 

  const handleSearch = (searchTerm) => {
    const results = teams.filter(team => team.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  };

  const handleEditTeam = (teamId) => {
    setEditingTeamId(teamId);
  };

  const handleDeleteTeam = (teamId) => {
    setTeams((prevTeams) => prevTeams.filter(team => team.id !== teamId));
  };

  const handleAddProject = async (teamId, projectData) => {
    try {
      const response = await axios.post(`http://localhost:3001/teams/${teamId}/projects`, projectData);
      const updatedTeams = teams.map(team => (team.id === teamId ? { ...team, projects: [...team.projects, response.data] } : team));
      setTeams(updatedTeams);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div>
      <h2>Team List</h2>
      <SearchTeamForm onSearch={handleSearch} />
      <ul>
        {(searchResults.length > 0 ? searchResults : teams).map(team => (
          <li key={team.id}>
            {editingTeamId === team.id ? (
              <EditTeamForm teamId={team.id} onCancel={() => setEditingTeamId(null)} />
            ) : (
              <div>
                {team.name} - {team.description}
                <button onClick={() => handleEditTeam(team.id)}>Edit Team</button>
                <DeleteTeamButton teamId={team.id} onDeleteTeam={handleDeleteTeam} />
                <AddProjectForm teamId={team.id} onAddProject={handleAddProject} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
