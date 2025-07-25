
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Logic'
import Todo from './components/Todo'


function App() {

  console

  return (
    <div>
      <Router>
        <nav className='md:px-15 px-3 mb-20 border-b border-gray-200  h-16 flex justify-between md:justify-around items-center font-mono font-extrabold   text-md md:text-xl'>
         <Link to={"/"}> <div className='text-gray-600 hover:underline'>
            To-do app
          </div></Link>

          <div className='flex  md:space-x-10 space-x-3 '>
            <Link to={"/signup"}><div className='text-gray-600 hover:underline'>Signup</div></Link>
            <Link to={"/login"}><div className='text-gray-600  hover:underline'>Login</div></Link>
          </div>
        </nav>

        <div className='flex justify-center min-h-150 md:items-center'>
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />}></Route>
            <Route path='/' element={<Todo/>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
