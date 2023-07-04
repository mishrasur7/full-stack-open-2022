import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const total = courseParts.reduce((a, c) => a + c.exerciseCount, 0); 

  return (
    <div>
      <Header courseName = {courseName}/>
      <Content content = {courseParts}/>
      <Total total = {total}/>
    </div>
  );
};

export default App;