import {v1 as uuid} from 'uuid'; 

import { patientsData } from "../data/patients";
import { NewPatient, Patient, SSN_HIDDEN } from "../types";

const getAllPatientsWithoutSSN = (): SSN_HIDDEN [] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    })); 
}; 

const addPatients = (newEntry: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...newEntry
    };
    patientsData.push(newPatient); 
    return newPatient;
}; 

export default {
    getAllPatientsWithoutSSN,
    addPatients
}; 