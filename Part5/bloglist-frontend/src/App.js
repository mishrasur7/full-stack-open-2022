import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

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

  const blogFormRef = useRef()

  return (
    <div>
      <h1>Login to the application</h1>
      <Notification 
        operation={operation} 
        successMsg={successMsg} 
        errorMsg={errorMsg}
      />
      {
        user === null ? 
        <Togglable buttonLabel='login'>
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
        </Togglable> : 
            <div>
            <p>{user.name} logged in</p>
            <button onClick={logOutUser}>logout</button>
            <Togglable buttonLabel ='create blog' ref={blogFormRef}>
              <CreateBlog
                setBlogs={setBlogs}
                setSuccessMsg={setSuccessMsg}
                setOperation={setOperation}
                blogFormRef={blogFormRef}
              />
            </Togglable>
            </div>
      }
      <br />
      {blogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          user={user} 
        />
      )}
    </div>
  )
}

export default App
