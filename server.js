const express = require('express');
const cors = require('cors');
const teamRoutes = require('./routes/teams');
const projectRoutes = require('./routes/projects'); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/teams', teamRoutes);
app.use('/projects', projectRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
