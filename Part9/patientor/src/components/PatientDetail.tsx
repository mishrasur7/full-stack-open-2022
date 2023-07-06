import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';

import patientService from '../services/patients';
import { Patient } from "../types";


const PatientDetail = () => {
    const [patient, setPatient] = useState<Patient>(); 
    const { id } = useParams();

    useEffect(() => {
        const fetchPatient = async () => {
            const patientById = await patientService.getPatientById(String(id));
            setPatient(patientById); 
        }
        fetchPatient(); 
    }, [id]); 


  return (
    <div>
        <h2>{patient?.name}
            {patient?.gender === 'male' 
            ? <ManIcon></ManIcon> 
            : <WomanIcon></WomanIcon>}
        </h2>
        <p>SSN: {patient?.ssn}</p>
        <p>Occupation: {patient?.occupation}</p>
    </div>
  )
}

export default PatientDetail