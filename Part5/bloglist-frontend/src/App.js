import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <Login 
        user={user} 
        username={username} 
        password={password}
        setUser={setUser}
        setUsername={setUsername}
        setPassword={setPassword}
      />
      <h2>blogs</h2>
      {user && <p>{user.name} logged in</p>}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

export default App
