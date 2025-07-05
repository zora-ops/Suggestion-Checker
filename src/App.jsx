import { useState } from 'react'
import Suggestions from './components/Suggestions'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Suggestions/>
    </>
  )
}

export default App
