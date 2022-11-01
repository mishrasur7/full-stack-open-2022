/*
const Part = ({parts}) => {
  let totalExercises = 0; 
  parts.forEach(part => totalExercises += part.exercises);

  //calculating sum of exercises using reduce function
  const initialValue = 0;
  const sumWithInitial = parts.reduce(
    (previousValue, currentValue) => previousValue + currentValue.exercises,
    initialValue
  );

  return (
    <>
    {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
    <b>total of {sumWithInitial} exercises</b>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
      <Part parts={parts}/>
    </>
  )
}

const Header = ({name}) => {
  return <h1>{name}</h1>
}
*/

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