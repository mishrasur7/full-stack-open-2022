const Blog = ({blog, user}) =>  {
  console.log('user: ', user)
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