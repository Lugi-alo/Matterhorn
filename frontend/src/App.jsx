import { useState } from 'react'
import PhaseEditor from './pages/PhaseEditor/PhaseEditor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <PhaseEditor />    
  )
}

export default App
