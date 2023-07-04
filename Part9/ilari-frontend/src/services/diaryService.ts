import axios from 'axios'; 
import { Diary } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

const getDiaries = () => axios
                    .get<Diary[]>(baseUrl)
                    .then(response => response.data);

export default {
    getDiaries
}