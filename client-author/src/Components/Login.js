import { useRef, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

import axios from "../api/axios"

const LOGIN_URL = "/user/login"

function Login() {
    const { setAuth } = useAuth()
    const navigate = useNavigate()

    const userRef = useRef()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg("")
    }, [email, password])

    // Authenticate user upon login
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            )
            const accessToken = response?.data?.accessToken
            setAuth({ email, password, accessToken })
            setEmail("")
            setPassword("")
            navigate("/home")
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No sever response")
            } else if (err.response?.status === 400) {
                setErrMsg("Incorrect username or password")
            } else {
                setErrMsg("Login Failed")
            }
        }
    }

    return (
        <section className="login">
            <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            <h1>MyBlog | Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button type="submit">Login</button>
                <p className="alternative-message">
                    No account? <br />
                    <span className="line">
                        <Link to="/signup">Create account</Link>
                    </span>
                </p>
            </form>
        </section>
    )
}

export default Login
