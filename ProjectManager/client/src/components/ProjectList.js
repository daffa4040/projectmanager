// src/components/ProjectList.js
import React from 'react';

const ProjectList = ({ projects }) => {
  return (
    <div>
      <h2>Project List</h2>
      {Array.isArray(projects) ? (
        <ul>
          {projects.map(project => (
            <li key={project.id}>{project.name} - {project.description}</li>
          ))}
        </ul>
      ) : (
        <p>No projects available</p>
      )}
    </div>
  );
};

export default ProjectList;
