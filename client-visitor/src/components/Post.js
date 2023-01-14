import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'

const Post = ({ title, text, date, id, readtime, short }) => {

    console.log(short)

    if(short) {
        return (
            <div className='post'>
                <h2>{title}</h2>
                <p>{format(parseISO(date), 'dd LLL yyyy' )}     {readtime} min read</p>
                <p>{text}</p>
                <Link to={{
                    pathname: `/posts/${id}`,
                }}>Read post</Link>
            </div>
        )
    } else {
        return (
            <div className='post-long'>
                <h2>{title}</h2>
                <p>{date ? format(parseISO(date), 'dd LLL yyyy' ) : ''}     {readtime} min read</p>
                <p>{text}</p>
            </div>
        )
    }
}

export default Post