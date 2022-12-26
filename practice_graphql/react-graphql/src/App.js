import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { ALL_PERSONS } from './queries'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notify from './components/Notify'

const App = () => {
  const [errorMessage, setErrorMessage] = useState()

  const result = useQuery(ALL_PERSONS, {
    pollInterval: 1000
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <Notify errorMessage={errorMessage}/>
      <PersonForm setError={notify}/>
      <Persons persons={result.data.allPersons}/>
    </div>
  )
}

export default App