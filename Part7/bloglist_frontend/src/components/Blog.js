import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogsFromStore = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.currentuser);
  const blogs = [...blogsFromStore];

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (user !== null) {
    return (
      <>
        {blogs
          .sort((a, b) => a.likes - b.likes)
          .map((blog) => {
            return (
              <div style={blogStyle} className="blog" key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </div>
            );
          })}
      </>
    );
  }
};

export default Blog;
