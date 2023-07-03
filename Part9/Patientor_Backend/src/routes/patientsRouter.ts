/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express'; 

import patientsService from '../services/patientsService';

const router = express.Router(); 

router.get('', (_req, res) => {
    res.send(patientsService.getAllPatientsWithoutSSN()); 
});

router.post('', (req, res) => {
    const {name, dateOfBirth, ssn, gender, occupation} = req.body; 
    const newPatient = patientsService.addPatients({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    }); 
    res.json(newPatient); 
}); 

export default router; 