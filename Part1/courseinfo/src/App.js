const Header = ({course}) => {

  return (
    <>
    <h2>{course}</h2>
    </>
  )

}

const Content = ({parts}) => {
  {parts.map((value, index) => <p key={index}>{`${value.name} ${value.exercises}`}</p>)}
 return (
  <>
    <Part parts={parts}/>
  </>
 )
}

const Total = ({total}) => {
  return (
    <>
    <p>Number of exercises {total}</p>
    </>
  )

}

const Part = ({parts}) => {

  return (
    <>
    {parts.map((value, index) => <p key={index}>{`${value.name} ${value.exercises}`}</p>)}
    </>
  )

}

const App = () => {
  /*
  commented code for step2
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course}/>
      <Content 
        parts ={{part1: part1, part2: part2, part3: part3}}
        exercises={{exercises1: exercises1, exercises2:exercises2, exercises3:exercises3}}
        />
      <Total total = {exercises1 + exercises2 + exercises3}/>
    </div>
  )

  commented code for step3

  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <h2>{course}</h2>
      <p>{part1.name} {part1.exercises}</p>
      <p>{part2.name} {part2.exercises}</p>
      <p>{part3.name} {part3.exercises}</p>
      <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
    </div>
  )
  */
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  let totalExercises = 0; 
  parts.forEach(value => totalExercises += value.exercises)

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total total={totalExercises}/>
    </div>
  )
}

export default App