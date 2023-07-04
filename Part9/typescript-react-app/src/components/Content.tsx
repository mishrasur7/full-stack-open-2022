import React from 'react'
import { Contents } from '../types'

const Content = (props: Contents) => {
  return (
    <div>
        {props.content.map((c => <p>{c.name} {c.exerciseCount}</p>))}
    </div>
  )
}

export default Content