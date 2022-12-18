import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";
import { setUser } from "../reducers/currentuserReducer";
import CreateBlog from "./CreateBlog";

const Login = ({
  username,
  password,
  setUsername,
  setPassword,
  setOperation,
}) => {

  const dispatch = useDispatch()
  const currentuser = useSelector(state => state.currentuser)
  
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      dispatch(setUser(user))
      console.log("user after login: ", user);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setOperation(true);
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error))
      setOperation(false);
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000);
    }
  };

  return (
    <>
    {!currentuser && 
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    }
    </>
  );
};

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setErrorMsg: PropTypes.func.isRequired,
  setOperation: PropTypes.func.isRequired,
};

export default Login;
