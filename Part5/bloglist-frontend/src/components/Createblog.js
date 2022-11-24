import React, { useState } from 'react'

import blogService from '../services/blogs'

const Createblog = ({ setBlogs, setSuccessMsg, setOperation }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = async (event) => {
        event.preventDefault()

        const newBlog = {
            title: title, 
            author: author, 
            url: url
        }

        await blogService
            .create(newBlog)
            setSuccessMsg(`a new Blog ${title}! by ${author} added`)
            setTimeout(() => {
                setSuccessMsg(null)
            }, 5000);
            setOperation(true)
            setTitle('')
            setAuthor('')
            setUrl('')

        const response = await blogService.getAll()
        setBlogs(response)
    }

  return (
    <>
        <h2>Create new</h2>
        <form onSubmit={handleCreate}>
            <div>
            title
              <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
            </div>
            <div>
            auther
              <input
              type="text"
              value={author}
              name="Password"
              onChange={({ target }) => setAuthor(target.value)}
            />
            </div>
            <div>
            url
              <input
              type="text"
              value={url}
              name="Password"
              onChange={({ target }) => setUrl(target.value)}
            />
            </div>
            <button type="submit">Create</button>
            </form> 
    </>
  )
}

export default Createblog