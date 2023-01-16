import { Link } from "react-router-dom"

function Header() {
    return (
        <section className="header">
            <Link to="/" id="logo">
                MyBlog
            </Link>
        </section>
    )
}

export default Header
