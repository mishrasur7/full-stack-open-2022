const Blog = ({blog, user}) =>  {
  if(user !== null) {
    return (
      <>
        <div>
          {blog.title} {blog.author}
        </div>
      </>
    )
  }
}

export default Blog