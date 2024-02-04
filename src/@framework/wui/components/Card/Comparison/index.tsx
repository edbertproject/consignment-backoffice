import './style.less'
import React, {useState} from "react";
import Card from "antd/es/card";
import { Line } from 'react-chartjs-2';
import {isBrowser} from "react-device-detect";
import Typography from "antd/es/typography";
import {ChartOptions} from "chart.js";

const { Text } = Typography;

interface Props {
    title?: string;
    list: any[];
    labels: any[];
    datasets: any[];
}

const options: ChartOptions  = {
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        title: {
            display: false,
        },
        legend: {
            display: false
        }
    },
    scales: {
        y: {
            display: false,
        },
        /*x: {
            display: true,
            grid: {
                display:false
            },
            ticks: {
                autoSkip: true,
                align: 'start',
                crossAlign: 'center',
                maxRotation: 0,
                padding: 5,
                autoSkipPadding: 15,
            }
        },*/
    },
    elements: {
        line: {
            borderWidth: 1.5
        },
        point: {
            radius: 0,
            borderWidth: 1,
            hoverRadius: 6,
            hoverBorderWidth: 2.5,
            hitRadius: 5,
        }
    }
}

const backgroundConfig = [
    {
        borderColor: '#69B2F8',
        backgroundColor: '#AED3F8'
    },
    {
        borderColor: '#00E396',
        backgroundColor: '#94E4C9'
    }
]

const WuiCardComparison: React.FC<Props> = (
    {
        title = '',
        list,
        labels,
        datasets
    }
) => {
    const [dataset, setDataset] = useState(datasets)

    const handleClick = (index: number) => {
        let newArr = [...dataset];

        if (dataset[index].length) {
            newArr[index] = []
        } else {
            newArr[index] = datasets[index]
        }

        setDataset(newArr)
    }

    return (
        <>
            <Card className="wui-comparison-card" title={title} extra={
                <>
                    <ul className="legends">
                        {
                            list.map((item, key) => {
                                return (
                                    <li key={key} className="item" onClick={() => handleClick(key)}>
                                        <span className="dot" style={{
                                            backgroundColor: backgroundConfig[key].backgroundColor
                                        }}/> <Text delete={!dataset[key].length}>{item.legend}</Text>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </>
            }>
                <div className="list-wrapper">
                    {
                        list.map((item, key) => {
                            return (
                                <div className="item" key={key}>
                                    <label className="value">{item.value}</label>
                                    <label className="label">{item.label}</label>

                                    <p className="description">
                                        {item.description}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="chart-wrapper">
                    <Line
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Growth',
                                    data: dataset[0],
                                    fill: true,
                                    backgroundColor: backgroundConfig[0].backgroundColor,
                                    borderColor: backgroundConfig[0].borderColor,
                                    pointHoverBorderColor: '#ffffff',
                                    tension: 0.3
                                },
                                {
                                    label: 'Actual',
                                    data: dataset[1],
                                    fill: true,
                                    backgroundColor: backgroundConfig[1].backgroundColor,
                                    borderColor: backgroundConfig[1].borderColor,
                                    pointHoverBorderColor: '#ffffff',
                                    tension: 0.3
                                },
                            ],
                        }}
                        options={options}
                        height={isBrowser ? 100 : 150}
                    />
                </div>
            </Card>
        </>
    )
}

export default WuiCardComparison
