import { useState } from "react"

const Blog = ({blog, user}) =>  {
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
              Likes 0 <button>like</button> <br />
              {blog.author}
            </div>
          }
      </>
    )
  }
}

export default Blog