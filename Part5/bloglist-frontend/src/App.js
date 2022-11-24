import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import Createblog from './components/Createblog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [operation, setOperation] = useState(false)
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])

  const logOutUser = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h1>Login to the application</h1>
      <Notification 
        operation={operation} 
        successMsg={successMsg} 
        errorMsg={errorMsg}
      />
      <Login 
        user={user} 
        username={username} 
        password={password}
        setUser={setUser}
        setUsername={setUsername}
        setPassword={setPassword}
        setErrorMsg={setErrorMsg}
        setOperation={setOperation}
      />
      <h2>blogs</h2>
      {user && 
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logOutUser}>logout</button>
          <Createblog 
            setBlogs={setBlogs}
            setSuccessMsg={setSuccessMsg}
            setOperation={setOperation}
          />
        </div>
      }
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

export default App
