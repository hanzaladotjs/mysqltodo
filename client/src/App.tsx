
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Logic'
import Todo from './components/Todo'



function App() {


  return (
    <div>
      <Router>
        <nav className='md:px-15 px-3 mb-10 bg-[#BBCEA8] text-[#283747] h-16 flex justify-between md:justify-around items-center font-mono font-extrabold border-b-[3px] border-black text-md md:text-xl'>
          <div className='hover:text-black'>
            To-do app
          </div>

          <div className='flex hover:text-black md:space-x-10 space-x-3 '>
            <div>Signup</div>
            <div>Login</div>
          </div>
        </nav>

        <div className='flex justify-center min-h-screen'>
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
