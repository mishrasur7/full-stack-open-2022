import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

const Users = () => {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

  return (
    <div>
        <h1>Users</h1>
        <table>
            <thead>
                <tr>
                    <td><strong>Name</strong></td>
                    <td style={{paddingLeft: 100}}><strong>Blogs created</strong></td>
                </tr>
            </thead>
            <tbody>
                {users.map(user => 
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td style={{paddingLeft: 100}}>{user.blogs.length}</td>
                </tr>)}
            </tbody>
        </table>
    </div>
  )
}

export default Users