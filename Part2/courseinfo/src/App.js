
const Course = ({courses}) => {
  return (
    <>
      {courses.map(course => {
       return (
        <div key={course.id}>
          <h2>{course.name}</h2>
          {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
          }
          <b>total of {course.parts.reduce((previousValue, currentValue) => previousValue + currentValue.exercises, 0)} exercises
          </b>
          <br />
        </div>
       )
      })}
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web development curriculum</h1>
      <Course courses={courses} />
    </>
  )
}

export default App