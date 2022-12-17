import { createSlice } from "@reduxjs/toolkit";

import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        createBlogs(state, action) {
            return [...state, action.payload]
        }
    }
})

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs)) 
    }
}

export const createNewBlogs = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch(createBlogs(newBlog))
    }
}

export const { setBlogs, createBlogs } = blogSlice.actions
export default blogSlice.reducer