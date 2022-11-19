import Note from "../models/note";

const initialNotes = [
    {
      content: 'HTML is easy',
      date: new Date(),
      important: false,
    },
    {
      content: 'Browser can execute only Javascript',
      date: new Date(),
      important: true,
    },
  ]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon', date: new Date() })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
    const response = await Note.find({})
    return response.map(note => note.toJSON())
}

export default {
    initialNotes,
    nonExistingId,
    notesInDb
}