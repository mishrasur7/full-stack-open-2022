import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: 'This is a default notification message'
}

const notificationSlice = createSlice({
    name: 'notifications',
    initialState, 
    reducers: {
        showNotification(state) {
            return state
        },
        setNotification(state, action) {
            state.message = action.payload
            return state
        },
        removeNotification(state) {
            state.message = initialState.message
            return state
        }
    }

})

export const { showNotification, setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer