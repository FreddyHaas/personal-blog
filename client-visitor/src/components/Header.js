import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <section className='header'>
            <Link to='/home' id='logo'>MyBlog</Link>
        </section>
    )
}

export default Header