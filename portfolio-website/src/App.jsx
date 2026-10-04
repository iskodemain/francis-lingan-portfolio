import { useState } from 'react'
import Landing from './pages/Landing.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing />} />
        {/* Redirect any unknown route back to home */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  )
}

export default App