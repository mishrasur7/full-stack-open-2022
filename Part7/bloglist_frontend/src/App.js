import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { createNewBlogs, initializeBlogs } from "./reducers/blogReducer";
import { removeUser, setUser } from "./reducers/currentuserReducer";
import Users from "./components/Users";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [operation, setOperation] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const blogFormRef = useRef();

  const blogsFromStore = useSelector(state => state.blogs)
  const blogs = [...blogsFromStore]

  const dispatch = useDispatch()

  const currentuser = useSelector(state => state.currentuser)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  console.log('blogs from store: ', blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user))
      blogService.setToken(user.token);
    }
  }, []);

  const logOutUser = () => {
    dispatch(removeUser())
    window.localStorage.removeItem("loggedInUser");
    setUsername("");
    setPassword("");
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createNewBlogs(blogObject))
  };

  return (
    <div>
      <h1>Login to the application</h1>
      <Notification
        operation={operation}
        successMsg={successMsg}
        errorMsg={errorMsg}
      />
      {currentuser === null ? (
        <Togglable buttonLabel="login">
          <Login
            user={currentuser}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            setErrorMsg={setErrorMsg}
            setOperation={setOperation}
          />
        </Togglable>
      ) : (
        <div>
          <p>{currentuser.name} logged in</p>
          <button onClick={logOutUser}>logout</button>
          <Togglable buttonLabel="create blog" ref={blogFormRef}>
            <CreateBlog
              createBlog={addBlog}
              setSuccessMsg={setSuccessMsg}
              setOperation={setOperation}
            />
          </Togglable>
        </div>
      )}
      <br />
      <Users />
      <br />
      {blogs
        .sort((a, b) => a.likes - b.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={currentuser} />
        ))}
    </div>
  );
};

export default App;
