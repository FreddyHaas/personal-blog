import Signup from './components/Signup'
import Login from './components/Login'
import Layout from './components/Layout'
import Home from './components/Home'
import PostDetail from './components/PostDetail'
import RequireAuth from './components/RequireAuth'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path='/home' element={<Home />} />
        <Route path='/home/posts/:id' element={<PostDetail />} />
      </Route>

    </Routes> 
  );
}

export default App;
