import { useState, useEffect } from 'react'

import Header from './components/Header'
import Search from './components/Search'
import Form from './components/Form'
import Filter from './components/Filter'
import personServices from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState('')

  const fetchData = () => {
    personServices
    .getAll()
      .then(data => setPersons(data))
  }

  useEffect(fetchData, [])

  const addName = (event) => {
    event.preventDefault()

    let updataFlag = false

    persons.map(p => {
      if(p.name === newName && p.number !== newPhoneNumber) {
        updataFlag = true
        let confirmation = window.confirm(`${p.name} is already added to phonebook, replace the new number with old one?`)
        if(confirmation) {
          const newPersonObj = {...p, number: newPhoneNumber}
          personServices
            .update(p.id, newPersonObj)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== p.id ? person : returnedPerson))
              setMessage(`${p.name}'s phone number changed to ${newPhoneNumber} from ${p.number}`)
              setTimeout(() => {
                setMessage(null)
              }, 2000)
            })
        }}
    })

    if(updataFlag === false) {
      if(event.target.value === undefined) {
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
            setMessage(`${data.name} added to phonebook`)
            setTimeout(() => {
              setMessage(null)
            }, 2000)
        })
      }
    }

  }

  const handleChange = (event) => {
    const newInputName = event.target.value
    setNewName(newInputName)
    // let found = false; 
    // persons.forEach(person => {
    //   if(person.name === newInputName) {
    //     alert(`${newInputName} is already added to phonebook`)
    //     found = true
    //     setNewName('')
    //   }
    // })

    // if(found === false) {
    //   setNewName(newInputName)
    // }
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
      <Notification message={message}/>
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
        fetchData={fetchData()}
      />
    </div>
  )
}

export default App