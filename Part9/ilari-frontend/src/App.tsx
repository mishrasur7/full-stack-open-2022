import { useState, useEffect } from 'react';

import { Diary } from './types';
import diaryService from './services/diaryService';

function App() {
  const [diaries, setDiaries] = useState<Diary []>([]);

  useEffect(() => { 
    diaryService.getDiaries()
      .then(data => setDiaries(data))
  }, []);

  return (
    <div>
      {diaries.map(diary => {
        return <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
          <p>Comment: {diary.comment}</p>
        </div>
      })}
    </div>
  );
}

export default App;
