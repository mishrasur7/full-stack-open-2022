import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anectodes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNew = async (event) => {
      event.preventDefault()
      const anecdote = event.target.anecdote.value
      event.target.anecdote.value = ''
      const newAnecdote = await anecdoteService.create(anecdote)
      dispatch(createAnecdote(newAnecdote))
      dispatch(setNotification(`You created ${anecdote}`))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000);
    }

  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={createNew}>
        <div><input name='anecdote'/></div>
        <button>create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm