import express from 'express';

import diaryService from '../services/diaryService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries()); 
})

router.post('/', (req, res) => {
  const {date, weather, visibility, comment} = req.body;
  const addedDiary = diaryService.addDiary({
    date,
    weather,
    visibility,
    comment
  });
  res.send(addedDiary); 
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findDiaryByID(Number(req.params.id)); 

  if(diary) {
    res.send(diary)
  } else {
    res.sendStatus(404)
  }
})

export default router;