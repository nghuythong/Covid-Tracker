import React, { useEffect } from 'react';
import { Line } from "react-chartjs-2";
import { useState } from 'react';
import numeral from "numeral";

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            }
        }
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
               gridLines: {
                   display: false,
               },
               ticks: {
                   callback: function(value, index, values){
                       return numeral(value).format("0a");
                   },
               },
            },
        ],
    }
}

const buildChartData = (data, casesType='cases') => {
    const chartData = [];
    let lastDataPoint;

    for(let date in data.cases) {
        if(lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data['cases'][date] - lastDataPoint
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data['cases'][date];
    };
    return chartData;
};
function LineGraph({casesType = "cases"}) {
    const [data, setdata] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then(response => response.json())
            .then(data => {
                let chartData = buildChartData(data, 'cases');
                setdata(chartData);
            });
        };
        fetchData();
    },[]);

    return (
        <div>
            <h1>This is a graph</h1>
            {data?.length > 0 &&(
            <Line 
                options={options}
                data={{
                    datasets: [{
                        data: data
                    }]
                }}  
            />
            )}
        </div>
    )
}

export default LineGraph
