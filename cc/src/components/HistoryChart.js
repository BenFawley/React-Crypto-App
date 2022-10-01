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

    const HistoryChart = ({ id, time, frequency, filterVariable }) => {

    console.log(filterVariable);

    const [data, setData] = useState([])
    const [price, setPrice] = useState([]);

    useEffect(()=>{
        fetchData(id);
    }, [time, frequency])

    const fetchData = async (id) => {
        // const request = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`)
        const request = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${time}&interval=${frequency}`)
        .then((res)=>res.json());
        const x = formatTime(request);
        const y = formatPrice(request);
        console.log(request);
        setData(x);
        setPrice(y);
    }

    const formatTime = (response) => {
        let x;
        if(filterVariable === 'Price'){
            let x = response.prices.map(value=>{
                const month = new Date(value[0]).getMonth() + 1;
                let date = new Date(value[0]).getDate() + "/" + month;
                return date;
            })
            return x;
        } else{
            let x = response.market_caps.map(value=>{
                const month = new Date(value[0]).getMonth() + 1;
                let date = new Date(value[0]).getDate() + "/" + month;
                return date;
            })
            return x;
        }
    }
    const formatPrice = (response) => {
        let y;
        if(filterVariable === 'Price'){
        let y = response.prices.map(value=>{
            return value[1].toFixed(2);
        })
        return y;
    } else{
        let y = response.market_caps.map(value=>{
            return value[1].toFixed(2);
        })
        return y;
    }
    }

    // FIX DATE LABELS SHOWING ON HOURLY CHART FOR 1D FILTER
    // EDIT LOGIC TO FETCH MARKET CAP WHEN SELECTED
      

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