/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express'; 

import patientsService from '../services/patientsService';
import { toNewPatientEntry } from '../utils';

const router = express.Router(); 

router.get('', (_req, res) => {
    res.send(patientsService.getAllPatientsWithoutSSN()); 
});

router.post('', (req, res) => {
    try {
        const newPatient = toNewPatientEntry(req.body); 
        const addedPatient = patientsService.addPatients(newPatient); 
        res.json(addedPatient);
    } catch(error: unknown) {
        let errMsg = 'Something went wrong '; 
        if(error instanceof Error) {
            errMsg += error.message; 
        }
        res.status(400).send(errMsg); 
    } 
}); 

export default router; 