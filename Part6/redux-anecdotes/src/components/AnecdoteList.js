import { useDispatch, useSelector } from "react-redux"

import { increaseVote } from "../reducers/anecdoteReducer"
import { removeNotification, setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)

    console.log('filter: ', filter)

    const anecdotes = useSelector(state => state.anecdotes)

    const filteredAnecdotes = anecdotes.filter((anecdote) => {
      if(filter === '') {
        return anecdote
      } else if(anecdote.content.toLowerCase().includes(filter.toLowerCase())) {
        return anecdote
      }
    })
    
    const dispatch = useDispatch()

    const vote = (id, content) => {
        dispatch(increaseVote(id))
        dispatch(setNotification(`You voted ${content}`))
        setTimeout(() => {
          dispatch(removeNotification())
        }, 5000);
    }

    console.log('anecdotes: ', anecdotes)

  return (
    <div>
        {filteredAnecdotes
        .sort((a, b) => a.votes - b.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList