const express = require('express');
const router = express.Router();
const { Team, Project } = require('../models');

router.get('/teams/:teamId/projects', async (req, res) => {
  try {
    const { teamId } = req.params;

    const team = await Team.findByPk(teamId);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const projects = await Project.findAll({
      where: { teamId: teamId },
    });

    res.json({ projects: projects });
  } catch (error) {
    console.error(`Error fetching projects for team ${teamId}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project); 
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.put('/:id', async (req, res) => {
  const projectId = req.params.id;
  try {
    const [rowsUpdated, [updatedProject]] = await Project.update(req.body, {
      where: { id: projectId },
      returning: true,
    });
    if (rowsUpdated > 0) {
      res.json(updatedProject);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete('/:id', async (req, res) => {
  const projectId = req.params.id;
  try {
    const rowsDeleted = await Project.destroy({ where: { id: projectId } });
    if (rowsDeleted > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
