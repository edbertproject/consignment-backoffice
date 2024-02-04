import './style.less'
import React from "react";
import WuiItemCustomer from "../../Item/Customer";

interface Props {
    list: any[]
}

const WuiListCustomer: React.FC<Props> = (
    {
        list
    }
) => {
    return (
        <>
            <ul className="wui-list-customer">
                {
                    list.map((item, key) => {
                        return (
                            <li className="item" key={key}>
                                <WuiItemCustomer title={item.title} subtitle={item.subtitle} aliases={item.aliases} src={item?.src}/>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default WuiListCustomer
