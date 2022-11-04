import React from 'react'
import CountryInfo from './CountryInfo'

const Button = ({showAll, setShowAll, country}) => {
    const showDetail = () => {
        setShowAll(false)
      }

  return (
    <>
        <button onClick={showDetail}>show</button>
        {(() => {
            if(!showAll) {
                alert('kkk')
            }
        })()}
    </>
  )
}

export default Button