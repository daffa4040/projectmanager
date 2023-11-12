import React, { useState } from 'react';
import TeamList from './components/TeamList';
import AddTeamForm from './components/AddTeamForm';
import './css/App.css'

const App = () => {
  const [teams, setTeams] = useState([]);

  const handleAddTeam = (newTeam) => {
    setTeams((prevTeams) => [...prevTeams, newTeam]);
  };

  return (
    <div>
      <h1>Project Manager App</h1>
      <TeamList teams={teams} />
      <AddTeamForm onAddTeam={handleAddTeam} />
    </div>
  );
};

export default App;
