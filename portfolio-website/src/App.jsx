import Landing from './pages/Landing.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Hash-based section routes all render Landing */}
        <Route path='/' element={<Landing />} />
        <Route path='/project/:id' element={<ProjectDetail />} />
        <Route path='/design/:id' element={<ProjectDetail />} />
        {/* Redirect any unknown route back to home */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  )
}

export default App
