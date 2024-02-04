import './style.less'
import clsx from "clsx";
import React from "react";

type types = 'success' | 'process' | 'danger' | 'warning' | 'info';

interface Props {
    type: types
    icon: React.ReactNode
    title: string
    subtitle: string
    value: string
    status: string
}

const WuiItemTransaction: React.FC<Props> = (
    {
        type,
        icon,
        title,
        subtitle,
        value,
        status
    }
) => {

    return (
        <div className="wui-item-transaction">
            <span className={clsx("icon-wrapper", type)}>
                {icon}
            </span>

            <div className="info-wrapper">
                <div className="main-info">
                    <h4 className="title">{title}</h4>
                    <h5 className="datetime">{subtitle}</h5>
                </div>

                <div className="status-info">
                    <label className="value">{value}</label>
                    <label className={clsx("status", type)}>{status}</label>
                </div>
            </div>
        </div>
    )
}

 export default WuiItemTransaction
