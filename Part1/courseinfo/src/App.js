const Header = ({course}) => {

  return (
    <>
    <h2>{course}</h2>
    </>
  )

}

const Content = ({parts, exercises}) => {
  /*
  this commented code is for the step1
  return (
    <>
       <p>
        {parts.part1} {exercises.exercises1}
      </p>
      <p>
        {parts.part2} {exercises.exercises2}
      </p>
      <p>
        {parts.part3} {exercises.exercises3}
      </p>
    
    </>
  )
  */
 return (
  <>
    <Part part={parts.part1} exercise={exercises.exercises1}/>
    <Part part={parts.part2} exercise={exercises.exercises2}/>
    <Part part={parts.part3} exercise={exercises.exercises3}/>
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

const Part = ({part, exercise}) => {

  return (
    <>
    <p>
        {part} {exercise}
    </p>
    </>
  )

}

const App = () => {
  /*
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
  */
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
}

export default App