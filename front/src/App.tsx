import './App.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import { Line } from "react-chartjs-2";
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

import { io } from 'socket.io-client';

export const options: any = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const
    },
    title: {
      display: true,
      text: "Chart.js Line Chart"
    },

  }
};



function App() {

  const [labels, setLabels] = useState<string[]>([])
  const [dataSet1Map, setDataSet1Map] = useState<number[]>([])

  const [messageResponse, setMessageResponse] = useState("")

  const socket = io("http://localhost:4000")

  useEffect(() => {

    socket.on("messageResponse", (data) => {

      setMessageResponse(data)
      setDataSet1Map(state => [...state, Number(data)])
      setLabels(state => [...state, state.length.toString()])
    })

  }, [])

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dataSet1Map,
        borderColor: "#80CC46",
        backgroundColor: "#47B8F8"
      }
    ]
  };



  return (
    <div className="App">
      <button onClick={() => socket.emit("start")}>START</button>
      <span>{messageResponse}</span>
      <Line options={options} data={data} />
    </div>
  )
}

export default App
