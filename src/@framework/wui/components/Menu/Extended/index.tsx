import './style.less'
import React from "react";
import {Link, useLocation} from "react-router-dom";
import _ from "lodash";
import Tooltip from "antd/es/tooltip";
import clsx from "clsx";
import {isMobile} from 'react-device-detect';

interface Props {
    list: any[]
}

const WuiMenuExtended: React.FC<Props> = (
    {
        list
    }
) => {
    const location = useLocation();

    return (
        <>
            <ul className="wui-extended-menu">
                {
                    list.map((item, key) => {
                        return (
                            <li className="item" key={key}>
                                <Tooltip placement={isMobile ? 'bottom' : 'right'} title={_.get(item, 'name')}>
                                    <Link className={
                                        clsx('link', {
                                            active: location.pathname.includes(item.link)
                                        })
                                    } to={_.get(item, 'link', '')}>
                                        {_.get(item, 'icon')}
                                    </Link>
                                </Tooltip>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default WuiMenuExtended
