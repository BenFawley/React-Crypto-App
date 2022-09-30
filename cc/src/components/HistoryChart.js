import React, { useEffect, useState } from 'react';
import styles from './HistoryChart.module.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

const HistoryChart = ({ id }) => {

    const [data, setData] = useState([])
    const [time, setTime] = useState("7");
    const [price, setPrice] = useState([]);

    useEffect(()=>{
        fetchData(id);
    }, [time])

    const fetchData = async (id) => {
        // const request = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`)
        const request = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${time}&interval=daily`)
        .then((res)=>res.json());
        const x = request.prices.map(value=>{
            const month = new Date(value[0]).getMonth() + 1;
            let date = new Date(value[0]).getDate() + "/" + month;
            return date;
        })
        const y = request.prices.map(value=>{
            return value[1].toFixed(2);
        })
        setData(x);
        setPrice(y);
    }

    const handleFilterByTime = (filterValue) => {
        setTime(filterValue);
    }
      

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
    }
    const chartData = {
        labels: [...data],
        datasets: [
            {
                fill: false,
                data: [...price],
                pointRadius: 0,
                label: 'Test',
                borderColor: '#8347e5',
            }
        ]
    }

  return (
    <div>
        <Line data={chartData} options={options}/>
    </div>
  )
}

export default HistoryChart