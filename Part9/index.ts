import express from 'express';

import { calculateBmi } from './bmiCalculator';

const app = express(); 

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const values = Object.values(req.query);
    const errorMessage = 'Malformatted parameters!';
    if(values.length < 2)  {
        res.send({error: errorMessage});
    } else {
        for(let i = 0; i < values.length; i++) {
            if(isNaN(Number(values[i]))) res.send({error: errorMessage});
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const bmi = calculateBmi(height, weight);
        res.send({
            weight: weight,
            height: height,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            bmi: bmi
        });
    }
});

const PORT  = 3003; 
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
