import { useState, useEffect } from 'react'
import axios from 'axios'

import Header from './components/Header'
import Search from './components/Search'
import Form from './components/Form'
import Filter from './components/Filter'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const fetchData = () => {
    personServices
    .getAll()
      .then(data => setPersons(data))
  }

  useEffect(fetchData, [])

  const addName = (event) => {
    event.preventDefault()

    const newObj = {
      name: newName,
      number: newPhoneNumber
    }

    personServices
      .create(newObj)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewPhoneNumber('')
    })
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

  const handleSearch = (event) => {
    const search = event.target.value
    setSearchName(search)
}

  return (
    <div>
      <Header title={'Phonebook'}/>
      <Search searchName={searchName} handleChange={handleSearch}/>
      <Form 
        addName={addName} 
        newName={newName} 
        newPhoneNumber={newPhoneNumber} 
        handleChange={handleChange} 
        handleNumberChange={handleNumberChange}
      />
      <Header title={'Numbers'}/>
      <Filter 
        persons={persons}
        searchName={searchName}
      />
    </div>
  )
}

export default App