import React from 'react'
import { TotalExercise } from '../types'

const Total = (props: TotalExercise) => {
  return (
    <div>
        <p>Number of total exercises: {props.total}</p>
    </div>
  )
}

export default Total