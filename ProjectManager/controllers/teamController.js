exports.getProjectList = async (req, res) => {
  try {
    const teamId = req.params.teamId;

    const projects = await Project.findAll({
      where: { teamId: teamId },
    });

    res.json({ projects });
  } catch (error) {
    console.error('Error fetching project list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.addProject = async (req, res) => {
  try {
    const teamId = req.params.teamId;

    const projectData = req.body;

    if (!projectData.name || !projectData.description) {
      return res.status(400).json({ error: 'Data proyek tidak valid' });
    }

    const newProject = await Project.create({
      ...projectData,
      teamId: parseInt(teamId), 
    });

    res.json({ message: 'Project added successfully' });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};