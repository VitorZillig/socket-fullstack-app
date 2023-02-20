import { useEffect, useRef, useState, ClassAttributes } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'

interface InputRefProps {
  value:string
}

function App() {
  const [count, setCount] = useState(0)

  const [data, setData] = useState({})

  const inputRef = useRef<InputRefProps>(null)

  const getFood = async(value:string | undefined)=>{
    const response = await axios.post("https://trackapi.nutritionix.com/v2/natural/nutrients", {
      "query": value,
      "timezone": "America/Sao_Paulo",
      "line_delimited": false,
      "use_raw_foods": false,
      "use_branded_foods": false
    }, {
      headers:{
        "x-app-id":"8d0d9ff9",
        "x-app-key":"1a77707f133f3e3c25f41c8e9673bd1a",
        "x-remote-user-id":"0",
      }
    })
    setData(response)
    console.log(data)
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Alimentos</h1>
      <div className="card">
        <input ref={inputRef}/>
        <button onClick={() =>getFood(inputRef.current?.value) }>
          Pesquisar
        </button>
        
      </div>
      <p className="read-the-docs">
       {JSON.stringify(data)}
      </p>
    </div>
  )
}

export default App
