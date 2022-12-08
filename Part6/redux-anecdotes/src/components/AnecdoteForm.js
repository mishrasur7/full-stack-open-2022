import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNew = (event) => {
      event.preventDefault()
      const anecdote = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(createAnecdote(anecdote))
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