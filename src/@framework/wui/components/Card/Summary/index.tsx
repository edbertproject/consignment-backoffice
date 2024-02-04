import "./style.less";
import React from "react";
import Card from "antd/es/card";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Bar, Line } from "react-chartjs-2";
import clsx from "clsx";

declare type dataType = "line" | "bar";

interface Props {
  title: string;
  value: string | number;
  percentage: string;
  type: string;
  comparison: string;
  loading?: boolean;
  data?: {
    label: string;
    labels: string[];
    data: any[];
    type?: dataType;
  };
}

/*scales: {
        y: {
            display: false,
        },
        x: {
            display: false,
        },
    },
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            mode: 'index',
            intersect: false,
            titleAlign: 'center',
            bodyAlign: 'center',
            usePointStyle: true,
            callbacks: {
                labelPointStyle: (context: any) => {
                    return {
                        pointStyle: 'round',
                        rotation: 0,
                    };
                }
            }
        },
    },
    elements: {
        line: {
            borderWidth: 4
        },
        point: {
            radius: 1,
            borderWidth: 2,
            hoverRadius: 6,
            hoverBorderWidth: 3,
            hitRadius: 5,
        }
    },*/

const lineOptions: any = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const barOptions: any = {
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const WuiCardSummary: React.FC<Props> = ({
  title,
  value,
  percentage,
  type,
  comparison = "than last week",
  data,
  loading = false,
}) => {
  return (
    <>
      <Card loading={loading} className="wui-summary-card">
        <div className="info-wrapper">
          <p className="title">{title}</p>
          <div className="value-wrapper">
            <label className="value">{value}</label>
            <label className="info-value">
              <span
                className={clsx("percentage", {
                  up: type === "up",
                  down: type === "down",
                  equal: type === "equal",
                })}
              >
                {percentage}{" "}
                {type === "up" ? (
                  <ArrowUpOutlined />
                ) : type === "up" ? (
                  <ArrowDownOutlined />
                ) : (
                  ""
                )}
              </span>{" "}
              {comparison}
            </label>
          </div>
        </div>

        {data ? (
          data.type === "line" ? (
            <div className={"chart-wrapper"}>
              <Line
                data={{
                  labels: data?.labels,
                  datasets: [
                    {
                      label: data?.label,
                      data: data?.data,
                      fill: false,
                      backgroundColor: "#00649a",
                      borderColor: "#00649a",
                      pointHoverBorderColor: "#00649a",
                      pointRadius: 5,
                    },
                  ],
                }}
                options={lineOptions}
              />
            </div>
          ) : (
            <div className={"chart-wrapper"}>
              <Bar
                data={{
                  labels: data?.labels,
                  datasets: [
                    {
                      label: data?.label,
                      data: data?.data,
                      backgroundColor: "#00649a",
                    },
                  ],
                }}
                options={barOptions}
              />
            </div>
          )
        ) : (
          ""
        )}
      </Card>
    </>
  );
};

export default WuiCardSummary;
