import useAuth from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'

const Header = () => {
    const { setAuth } = useAuth()
    const navigate = useNavigate()

    const logout = async () => {
        setAuth({})
        navigate('/')
    } 

    return (
        <section className='header'>
            <Link to='/home' id='logo'>MyBlog</Link>
            <div>
                <Link to='/home/createpost' id='create-post-button'>Add post</Link>
                <button id='logout-button' onClick={logout}>Logout</button>
            </div>
        </section>
    )
}

export default Header