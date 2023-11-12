import React, { useState } from 'react';
import axios from 'axios';

const AddProjectForm = ({ teamId, onAddProject }) => {
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`http://localhost:3001/teams/${teamId}/projects`, projectData);
      const { project } = response.data;
      onAddProject(project);
    } catch (error) {
      console.error('Error adding project:', error);
  
      if (error.response) {
        console.error('Server responded with:', error.response.data);
        console.error('Status code:', error.response.status);
  
        if (error.response.status === 500) {
          console.error('Internal Server Error. Please try again later.');
        } else {
          console.error('An error occurred. Please try again.');
        }
      } else if (error.request) {
        console.error('No response received from server:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };

  const handleChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Project Name:
        <input type="text" name="name" value={projectData.name} onChange={handleChange} />
      </label>
      <label>
        Description:
        <textarea name="description" value={projectData.description} onChange={handleChange} />
      </label>
      <button type="submit">Add Project</button>
    </form>
  );
};

export default AddProjectForm;
