import './style.less'
import Card from "antd/es/card";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import {Bar} from "react-chartjs-2";
import React from "react";

interface Props {
    value: string
    label: string
    subtitle: string
    color: any
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
            display: false,
        }
    },
};

const WuiCardStatistic: React.FC<Props> = (
    {
        value,
        label,
        subtitle,
        color
    }
) => {
    return (
        <Card className="wui-statistic-card">
            <Row gutter={[10, 10]} align="middle">
                <Col xs={24} md={14} lg={15}>
                    <div className="info-wrapper">
                        <h3 className="value">{value}</h3>
                        <label className="label" style={{
                            color: color
                        }}>{label}</label>
                        <h5 className="subtitle">
                            {subtitle}
                        </h5>
                    </div>
                </Col>

                <Col xs={24} md={10} lg={9}>
                    <Bar data={
                        {
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            datasets: [
                                {
                                    label: '1',
                                    data: [12, 19, 3, 5, 2, 3, 14, 8, 7, 11, 14, 15],
                                    borderWidth: 1,
                                    backgroundColor: color,
                                    borderColor: color
                                },
                                {
                                    label: '2',
                                    data: [15, 16, 6, 9, 3, 6, 15, 14, 19, 12, 10, 17],
                                    borderWidth: 1,
                                },
                            ],
                        }
                    }
                         options={options}
                    />
                </Col>
            </Row>
        </Card>
    )
}

export default WuiCardStatistic
