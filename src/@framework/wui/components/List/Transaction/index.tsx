import './style.less'
import React from "react";
import {Link} from "react-router-dom";
import WuiItemTransaction from "../../Item/Transaction";

interface Props {
    list: any[]
}

const WuiListTransaction: React.FC<Props> = (
    {
        list
    }
) => {

    return (
        <>
            <ul className="wui-list-transaction">
                {
                    list.map((item, key) => {
                        return (
                            <li className="item" key={key}>
                                <Link to={item.link}>
                                    <WuiItemTransaction type={item.type} icon={item.icon} title={item.title} subtitle={item.datetime} value={item.value} status={item.status}/>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default WuiListTransaction
