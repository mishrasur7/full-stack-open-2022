import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({user, 
                username, 
                password,
                setUser, 
                setUsername, 
                setPassword, 
                setErrorMsg, 
                setOperation
            }) => {

    const handleLogin = async (event) => {
        event.preventDefault()

        try{ 
            const user = await loginService.login({username, password,})
            setUser(user)
            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setOperation(true)
        } catch(exception) {
            setErrorMsg(exception.response.data.error)
            setOperation(false)
            setTimeout(() => {
                setErrorMsg(null)
            }, 5000);
        }

    }

     
        return (
            <>
            <form onSubmit={handleLogin}>
            <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
            </div>
            <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type="submit">login</button>
            </form> 
            </>
        )
    
}

export default Login