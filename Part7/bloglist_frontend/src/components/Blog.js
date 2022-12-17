import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { updateBlogLike, delete_Blog } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const [detail, setDetail] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const deleteStyle = {
    color: "red",
  };

  const dispatch = useDispatch()

  const toggleDetail = () => {
    setDetail(!detail);
  };

  const increaseLike = (id, blog) => {
    dispatch(updateBlogLike(id, blog))
  };

  const deleteBlog = (id, title, author) => {
    const confirmation = window.confirm(`Remove ${title} by ${author}`);
    if (confirmation) {
      dispatch(delete_Blog(id))
    } 
  };

  if (user !== null) {
    return (
      <>
        {!detail ? (
          <div style={blogStyle} className="blog">
            {blog.title} {blog.author}
            <button onClick={toggleDetail}>view</button>
          </div>
        ) : (
          <div style={blogStyle} className="blogDetail">
            {blog.title} <button onClick={toggleDetail}>hide</button> <br />
            {blog.url} <br />
            Likes {blog.likes}{" "}
            <button onClick={() => increaseLike(blog.id, blog)} className="like">
              like
            </button>{" "}
            <br />
            {blog.author}
            {blog.user.id === user.id && (
              <p>
                <button
                  style={deleteStyle}
                  onClick={() => deleteBlog(blog.id, blog.title, blog.author)}
                  className="delete"
                >
                  delete
                </button>
              </p>
            )}
          </div>
        )}
      </>
    );
  }
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  //setBlogs: PropTypes.func.isRequired,
};

export default Blog;
