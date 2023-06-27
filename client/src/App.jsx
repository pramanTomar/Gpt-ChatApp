import { useState } from "react"
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Chat from "@/components/chat"
import Login from "@/components/login"

function App() {

  const [user, setUser] = useState(null);
  const [secret, setSecret] = useState(null);
  const isAuthenticated = user && secret;

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/chat' element={isAuthenticated ? <Chat user={user} secret={secret} /> : <Navigate to='/'/>} />
          <Route path='/' element={isAuthenticated ? <Navigate to='/chat'/> : <Login setUser={setUser} setSecret={setSecret} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
