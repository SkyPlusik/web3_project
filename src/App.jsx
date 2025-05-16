import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PokemonProvider } from './contexts/PokemonContext'
import Home from './pages/Home'
import PokemonDetail from './pages/PokemonDetail'
import './App.css'

function App() {
  return (
    <PokemonProvider>
      <Router basename="/web3_project">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </PokemonProvider>
  )
}

export default App