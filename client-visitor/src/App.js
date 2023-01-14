import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import PostDetail from './components/PostDetail'

function App() {
  return (
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/posts/:id' element={<PostDetail />} />
   </Routes> 
  )
}

export default App;
