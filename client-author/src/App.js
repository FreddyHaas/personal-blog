import { Routes, Route } from "react-router-dom"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Layout from "./components/Layout"
import Home from "./components/Home"
import PostEdit from "./components/PostEdit"
import PostForm from "./components/PostForm"
import RequireAuth from "./components/RequireAuth"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path="/home" element={<Home />} />
                <Route path="/home/posts/:id" element={<PostEdit />} />
                <Route path="/home/createpost" element={<PostForm />} />
            </Route>
        </Routes>
    )
}

export default App
