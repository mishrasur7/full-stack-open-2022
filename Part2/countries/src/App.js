import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

import CountryInfo from './components/CountryInfo'
import ShowDetail from './components/ShowDetail'

function App() {
  const [countries, setCountries] = useState([])
  const[searchCountry, setSearchCountry] = useState('')
  const [showDetail, setShowDetail] = useState(false)
  //holds index of particular country
  const [index, setIndex] = useState()

  const fetchData = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log(response.data[0])
      setCountries(response.data)
    })
  }

  useEffect(fetchData, [])

  const handleChange = (event) => {
     setSearchCountry(event.target.value)
     console.log(event.target.value)
  }

  const filteredCountries = countries.filter(country => {
        if(searchCountry === '') {
          return ''
        } else if(country.name.official.toLowerCase().includes(searchCountry.toLowerCase())) {
          return country
        }
      })

  console.log('filteredcountries', filteredCountries)
  
  let filteredCountriesLength = filteredCountries.length

  return (
    <>
      <div>
        find countries
        <input 
          value={searchCountry}
          onChange={handleChange}
        />
      </div>
      {filteredCountries.map((country, index) => {
        if(filteredCountriesLength === 1) {
          return <CountryInfo key={country.area} country={country}/>
        } else if(filteredCountriesLength <= 10) {
          return <div key={country.area}>{country.name.common}
          <button 
            onClick={() => {
            setShowDetail(true)
            setIndex(index)
          }}>show</button>
          </div>
        }
      })}

      <ShowDetail showDetail={showDetail} filteredCountries ={filteredCountries} index={index}/>
      
      {(() => {
        if(filteredCountriesLength > 10) {
          return <p>Too many matches, specify another filter</p>
        }
      })()}
    </>
  )
}

export default App