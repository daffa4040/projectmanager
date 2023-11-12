import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteTeamButton from './DeleteTeamButton';
import EditTeamForm from './EditTeamForm';
import SearchTeamForm from './SearchTeamForm';
import AddProjectForm from './AddProjectForm';
import ProjectList from './ProjectList';
import '../css/TeamList.css';

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleViewProjects = async (teamId) => {
    try {
      const response = await axios.get(`http://localhost:3001/teams/${teamId}/projects`);
      setSelectedTeam({ id: teamId, projects: response.data.projects || [] });
    } catch (error) {
      console.error('Error fetching projects:', error.message);
      setSelectedTeam(null);
    }
  };

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

  const handleAddProject = (teamId, project) => {
    const updatedTeams = teams.map(team => (team.id === teamId ? { ...team, projects: [...team.projects, project] } : team));
    setTeams(updatedTeams);
  };

  return (
    <div>
      <h2>Team List</h2>
      <SearchTeamForm onSearch={handleSearch} />
      <ul>
        {(searchResults.length > 0 ? searchResults : teams).map(team => (
          <li key={team.id}>
            {editingTeamId === team.id ? (
              <EditTeamForm team={team} onCancel={() => setEditingTeamId(null)} />
            ) : (
              <div>
                {team.name} - {team.description}
                <button onClick={() => handleEditTeam(team.id)}>Edit Team</button>
                <DeleteTeamButton teamId={team.id} onDeleteTeam={handleDeleteTeam} />
                <AddProjectForm teamId={team.id} onAddProject={handleAddProject} />
                <button onClick={() => handleViewProjects(team.id)}>View Projects</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {selectedTeam && <ProjectList projects={selectedTeam.projects} />}
    </div>
  );
};

export default TeamList;
