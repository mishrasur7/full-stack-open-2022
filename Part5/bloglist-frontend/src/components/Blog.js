import { useState } from "react"

import blogService from '../services/blogs'

const Blog = ({blog, setBlogs, id, user}) =>  {
  const [detail, setDetail] = useState(true)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetail = () => {
    setDetail(!detail)
  }

  const increaseLike = async () => {
    let like = blog.likes
    like++
    const updatedBlog = {
      likes: like
    }

    await blogService.update(id, updatedBlog)
    const response = await blogService.getAll()
    setBlogs(response)
  }

  if(user !== null) {
    return (
      <>
          {detail ?
            <div style={blogStyle}>
              {blog.title}
              <button onClick={toggleDetail}>view</button>
            </div> :
            <div style={blogStyle}>
              {blog.title} <button onClick={toggleDetail}>hide</button> <br />
              {blog.url} <br />
              Likes {blog.likes} <button onClick={increaseLike}>like</button> <br />
              {blog.author}
            </div>
          }
      </>
    )
  }
}

export default Blog