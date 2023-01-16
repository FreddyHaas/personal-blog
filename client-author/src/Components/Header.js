import { useNavigate, Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function Header() {
    const { setAuth } = useAuth()
    const navigate = useNavigate()

    const logout = async () => {
        setAuth({})
        navigate("/")
    }

    return (
        <section className="header">
            <Link to="/home" id="logo">
                MyBlog
            </Link>
            <div>
                <Link to="/home/createpost" id="create-post-button">
                    Add post
                </Link>
                <button type="button" id="logout-button" onClick={logout}>
                    Logout
                </button>
            </div>
        </section>
    )
}

export default Header
