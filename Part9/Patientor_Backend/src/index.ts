import express from 'express'; 

import diagnosesRouter from './routes/diagnosesRouter';

const app = express();
const PORT = 3000; 

app.use('/api/diagnoses', diagnosesRouter); 

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`); 
}); 

