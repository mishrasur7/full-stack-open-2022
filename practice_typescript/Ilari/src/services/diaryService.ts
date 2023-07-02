import diaryEntries from '../data/entries';
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
  return diaryEntries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryEntries.map(({id, date, weather, visibility}) => ({
    id,
    date,
    weather,
    visibility
  }));
}

const addDiary = () => {
  return null;
};

const findDiaryByID = (id: number): DiaryEntry | undefined => {
  return diaryEntries.find(d => d.id === id); 
}

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findDiaryByID
};