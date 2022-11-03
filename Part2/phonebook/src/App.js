import { useState } from 'react'

import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const newObj = {
      name: newName,
      number: newPhoneNumber
    }

    setPersons(persons.concat(newObj))
    setNewName('')
    setNewPhoneNumber('')
  }

  const handleChange = (event) => {
    const newInputName = event.target.value
    let found = false; 
    persons.forEach(person => {
      if(person.name === newInputName) {
        alert(`${newInputName} is already added to phonebook`)
        found = true
        setNewName('')
      }
    })

    if(found === false) {
      setNewName(newInputName)
    }
  }

  const handleNumberChange = (event) => {
    const newInputPhoneNumber = event.target.value
    setNewPhoneNumber(newInputPhoneNumber)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          number: 
          <input value={newPhoneNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Person key={person.name} person={person}/>)}
      </ul>
    </div>
  )
}

export default App