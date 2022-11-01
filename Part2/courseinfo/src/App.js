const Part = ({parts}) => {
  //calculating sum of exercises using foreach function for step7
  //let totalExercises = 0; 
  //parts.forEach(part => totalExercises += part.exercises);

  //calculating sum of exercises using reduce function for step 8
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

const Course = ({course}) => {
  const {id, name, parts} = course

  return (
    <>
      <Header name={name}/>
      <Content parts={parts}/>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
  }

  return <Course course={course} />
}

export default App