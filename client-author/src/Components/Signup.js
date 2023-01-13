import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'

// Spellcheck
const EMAIL_REGEX = /\S+@\S+/
const PASSWORD_REGEX = /[a-zA-Z0-9]/
const SIGNUP_URL = '/user/signup'

const Signup = () => {
    const { setAuth } = useAuth()
    const navigate = useNavigate()
    const emailRef = useRef()
    
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')

    // Set focus to first item
    useEffect(() => {
        emailRef.current.focus();
    }, [])

    // Check valid email
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    // Check if password is valid and matches confirm password
    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        setValidPwd(result);
        const match = password === matchPwd
        setValidMatch(match)
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(SIGNUP_URL,
                JSON.stringify({email, password}), 
                { 
                    headers: { 'Content-Type': 'application/json'}, 
                    withCredentials: true 
                }
            )
            const accessToken = response?.data?.accessToken
            setAuth({ email, password, accessToken })
            setEmail('')
            setPassword('')
            setMatchPwd('')
            navigate('/home')
            // clear input fields
        } catch (err) {
            if(!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email already taken')
            } else {
                setErrMsg('Signup failed')
            }
        }
    }

    return (
        <>
                <section className='signup'>
                    <p className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
                    <h1>Sign up</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='email'>
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? 'valid' : 'hide'} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? 'hide' : 'invalid'}/>
                        </label>
                        <input 
                            type='email'
                            id='email'
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id='emailnote' className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
                            Please provide valid email address
                        </p>

                        <label htmlFor='password'>
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? 'hide' : 'invalid'}/>
                        </label>
                        <input 
                            type='password'
                            id='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id='pwdnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                            Please provide password with at least one character
                        </p>

                        <label htmlFor='confirmPwd'>
                            Confirm password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? 'valid' : 'hide'} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? 'hide' : 'invalid'}/>
                        </label>
                        <input 
                            type='password'
                            id='confirmPwd'
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id='confirmnote' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                            Must match the first password input field
                        </p>

                        <button disabled={!validEmail || !validPwd || !validMatch ? true : false}>Sign up</button>
                    </form>
                    <p className='alternative-message'>
                        Already signed up?<br/>
                        <span className="line">
                            <Link to='/login'>Login</Link>
                        </span>
                    </p>
                </section>
        </>
    )
}

export default Signup