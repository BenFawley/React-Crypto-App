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

    const HistoryChart = ({ id, time, frequency, filterVariable, fill, color, hideScale }) => {

    const [data, setData] = useState([])
    const [price, setPrice] = useState([]);

    useEffect(()=>{
        fetchData(id);
    }, [time, frequency, filterVariable])

    const fetchData = async (id) => {
        const request = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${time}&interval=${frequency}`)
        .then((res)=>res.json());
        const x = formatTime(request);
        const y = formatPrice(request);
        setData(x);
        setPrice(y);
    }

    const formatTime = (response) => {
        let x;
        if(filterVariable === 'Price'){
            let x = response.prices.map(value=>{
                if(time !== '1D'){
                    const month = new Date(value[0]).getMonth() + 1;
                    let date = new Date(value[0]).getDate() + "/" + month;
                    return date;
                }else{
                    const hours = new Date(value[0]).getHours() + ":00";
                    return hours;
                }
            })
            return x;
        } else{
            let x = response.market_caps.map(value=>{
                if(time !== '1D'){
                    const month = new Date(value[0]).getMonth() + 1;
                    let date = new Date(value[0]).getDate() + "/" + month;
                    return date;
                }else{
                    const hours = new Date(value[0]).getHours() + ":00";
                    return hours;
                }
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

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: hideScale && {
            x: {
                display: false,
            },
            y: {
                display: false,
            }
        },
    }
    const chartData = {
        labels: [...data],
        datasets: [
            {
                fill: fill,
                data: [...price],
                pointRadius: 0,
                label: 'Price Chart',
                borderColor: color,
                // backgroundColor: fill && color, 
            }
        ]
    }

    // TODO: Convert daily chart to an OHLC chart with candle highs and lows

  return (
    <>
        <Line data={chartData} options={options}/>
    </>
  )
}

export default HistoryChart