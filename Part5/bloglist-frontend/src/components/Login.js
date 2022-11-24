import loginService from '../services/login'

const Login = ({user, 
                username, 
                password,
                setUser, 
                setUsername, 
                setPassword
            }) => {

    const handleLogin = async (event) => {
        event.preventDefault()

        try{ 
            const user = await loginService.login({username, password,})
            setUser(user)
            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            console.log('user from try :', user)
        } catch(exception) {
            console.log(exception)
        }

    }

    if(user === null) {
        return (
            <>
            <h1>Login to the application</h1>
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
}

export default Login