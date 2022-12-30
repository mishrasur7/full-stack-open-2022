import { useQuery } from "@apollo/client";
import { useState } from "react";

import { ALL_PERSONS } from "./queries";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notify from "./components/Notify";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [token, setToken] = useState(null)

  const result = useQuery(ALL_PERSONS, {
    pollInterval: 1000,
  });

  console.log('rest', result)
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if(!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <PersonForm setError={notify} />
      <Persons persons={result.data.allPersons} />
      <PhoneForm setError={notify} />
    </div>
  );
};

export default App;
