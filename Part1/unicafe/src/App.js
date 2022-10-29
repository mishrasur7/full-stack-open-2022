import { useState } from 'react'

const Statistics = ({good, neutral, bad, allFeedbacks, avgPoints, positiveFeedbacks, feedbackCount}) => {
  if(feedbackCount.length === 0) {
    return (<p>No feedback given</p>)
  }
  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {allFeedbacks}</p>
      <p>average {avgPoints}</p>
      <p>positive {positiveFeedbacks} %</p>
    </>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedbackCount, setFeedbackCount] = useState([]); 

  const clickGood = () => {
    setGood(good + 1)
    setFeedbackCount(feedbackCount.concat(1))
  }

  const clickNeutral = () => {
    setNeutral(neutral + 1)
    setFeedbackCount(feedbackCount.concat(0))
  }

  const clickBad = () => {
    setBad(bad + 1)
    setFeedbackCount(feedbackCount.concat(-1))
  }

  const allFeedbacks = good + neutral + bad;

  let totalScore = 0; 
  feedbackCount.forEach(value => totalScore += value)
  const avgPoints = totalScore/feedbackCount.length;

  const positiveFeedbacks = (good/allFeedbacks) * 100

  return (
    <>
    <h1>give feedback</h1>
    <button onClick={clickGood}>good</button>
    <button onClick={clickNeutral}>neutral</button>
    <button onClick={clickBad}>bad</button>
    <h1>statistics</h1>
    <Statistics 
      good={good}
      neutral={neutral}
      bad={bad}
      allFeedbacks={allFeedbacks}
      avgPoints={avgPoints}
      positiveFeedbacks={positiveFeedbacks}
      feedbackCount={feedbackCount}
    />
    </>
  )
}

export default App