import './style.less';
import React from "react";
import Card from "antd/es/card";
import { Bar } from 'react-chartjs-2';

interface Props {
    title?: string;
    subtitle?: string;
    list: any[];
    labels: any[];
    datasets: any[]
}

const options = {
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    stacked: true,
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
        x: {
            stacked: true,
            grid: {
                display: false
            },
        }
    },
};

const WuiCardStacked: React.FC<Props> = (
    {
        title = '',
        subtitle= '',
        list,
        labels,
        datasets
    }
) => {
    return (
        <>
            <Card className="wui-stacked-card">
                <div className="info-wrapper">
                    <h4 className="title">{title}</h4>
                    <h5 className="subtitle">{subtitle}</h5>
                </div>

                <div className="chart-wrapper">
                    <Bar data={
                        {
                            labels: labels,
                            datasets: [
                                {
                                    label: list[0].label,
                                    data: datasets[0],
                                    borderWidth: 1,
                                },
                                {
                                    label: list[1].label,
                                    data: datasets[1],
                                    borderWidth: 1,
                                },
                            ],
                        }
                    }
                         options={options}
                    />
                </div>


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
            </Card>
        </>
    )
}

export default WuiCardStacked
