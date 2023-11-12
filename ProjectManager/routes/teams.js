const express = require('express');
const router = express.Router();
const { Team, Project } = require('../models');

router.get('/:teamId/projects', async (req, res) => {
  try {
    const { teamId } = req.params;

    const team = await Team.findByPk(teamId, { include: 'projects' });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const projects = team.projects;

    res.json({ projects });
  } catch (error) {
    console.error(`Error fetching projects for team ${teamId}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:teamId/projects', async (req, res) => {
  const { teamId } = req.params;
  const projectData = req.body;

  try {
    const newProject = await Project.create({
      ...projectData,
      teamId: parseInt(teamId), 
    });


    res.status(201).json({ project: newProject });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const teams = await Team.findAll({ include: 'projects' });
    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const team = await Team.findByPk(id, { include: 'projects' });
    if (!team) {
      res.status(404).json({ error: 'Team not found' });
    } else {
      res.json(team);
    }
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    const newTeam = await Team.create({ name, description });
    res.status(201).json(newTeam);
  } catch (error) {
    console.error('Error adding team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const team = await Team.findByPk(id);
    if (!team) {
      res.status(404).json({ error: 'Team not found' });
    } else {
      team.name = name;
      team.description = description;
      await team.save();
      res.json(team);
    }
  } catch (error) {
    console.error('Error updating team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const team = await Team.findByPk(id);
    if (!team) {
      res.status(404).json({ error: 'Team not found' });
    } else {
      await team.destroy();
      res.json({ message: 'Team deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
