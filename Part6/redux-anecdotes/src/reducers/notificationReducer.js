import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: 'this is notification from notificationReducer'
}

const notificationSlice = createSlice({
    name: 'notifications',
    initialState, 
    reducers: {
        showNotification(state, action) {
            return state.message
        }
    }

})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer