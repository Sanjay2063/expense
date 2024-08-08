import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Dashboard from './routes/Dashboard'
import Expense from './routes/Expense'
import Income from './routes/Income'
import Login from './routes/Login'
const App = () => {
  return (
    <div className='bg-dark'style={{height:'100vh',width:'100%'}}>
      
      <Router>
        <Routes>
            <Route path='/' Component={Login}></Route>
            <Route path='/dashboard' Component={Dashboard}></Route>
            <Route path='/Expense' Component={Expense}></Route>
            <Route path='/Income' Component={Income}></Route>
        </Routes>
        
      </Router>
    </div>
  )
}

export default App
