import { Link } from "react-router-dom"
import { format, parseISO } from "date-fns" // eslint-disable-line

function Post({ title, text, date, id, readtime, short }) {
    if (short) {
        return (
            // Shortened display of post for page 'Home'
            <div className="post">
                <h2>{title}</h2>
                <p>
                    {format(parseISO(date), "dd LLL yyyy")}
                    {"     "}
                    {readtime} min read
                </p>
                <p>{text}</p>
                <Link
                    to={{
                        pathname: `/posts/${id}`,
                    }}
                >
                    Read post
                </Link>
            </div>
        )
    }
    return (
        // Full display of post for page 'PostDetail'
        <div className="post-long">
            <h2>{title}</h2>
            <p>
                {date ? format(parseISO(date), "dd LLL yyyy") : ""}
                {"     "} {readtime} min read
            </p>
            <p>{text}</p>
        </div>
    )
}

export default Post
