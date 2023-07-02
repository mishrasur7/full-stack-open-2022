import { patientsData } from "../data/patients";
import { SSN_HIDDEN } from "../types";

const getAllPatientsWithoutSSN = (): SSN_HIDDEN [] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    })); 
}; 

export default {
    getAllPatientsWithoutSSN
}; 