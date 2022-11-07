import React from 'react'

import '../index.css'

const Notification = ({message, operation}) => {

    const messageSuccesStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const messageErrorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
 
    if(message === null) {
        return null
    }

  return (
    <>
        {
            operation
            ? <div style={messageSuccesStyle}>{message}</div>
            : <div style={messageErrorStyle}>{message}</div>
        }
        {message}
    </>
  )
}

export default Notification