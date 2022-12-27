import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const SetBirthYear = () => {
    const [name, setName] = useState('')
    const [setBornTo, setBorn] = useState('')
  
    const [ editAuthor ] = useMutation(EDIT_AUTHOR)
  
    const submit = async (event) => {
      event.preventDefault()
  
      editAuthor({ variables: { name, setBornTo } })
  
      setName('')
      setBorn('')
    }
  
    return (
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            name
            <input
              value={name}
              onChange={({target}) => setName(target.value)}
            />
          </div>
          <div>
            born
            <input
              type='number'
              value={setBornTo}
              onChange={({ target }) => setBorn(Number(target.value))}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    )
  }

  export default SetBirthYear