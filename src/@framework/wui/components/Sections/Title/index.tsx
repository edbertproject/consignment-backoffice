import './style.less'
import React from "react";
import { Link } from 'react-router-dom';
import Breadcrumb from "antd/es/breadcrumb";
import Typography from "antd/es/typography";
import Space from "antd/es/space";

interface Props {
    breadcrumbs?: any[]
    title?: string
    customChildren?: boolean
}

const {Title} = Typography

const WuiSectionTitle: React.FC<Props> = (
    {
        breadcrumbs= [],
        title= '',
        customChildren= false,
        children
    }
) => {
    return (
        <div className="wui-section-title">
            <div className="left-section">
                {
                    breadcrumbs.length ? (
                        <Breadcrumb className="wui-breadcrumb">
                            {
                                breadcrumbs?.map((item, key) => {
                                    return (
                                        <Breadcrumb.Item key={key}>
                                            {
                                                (key+1 === breadcrumbs?.length || !item.link    ) ? item.label : <Link to={item.link}>{item.label}</Link>
                                            }
                                        </Breadcrumb.Item>
                                    )
                                })
                            }
                        </Breadcrumb>
                    ) : null
                }

                <Title level={4} style={{
                    fontWeight: 500,
                    marginBottom: 0
                }}>{title}</Title>
            </div>

            <div className="right-section">
                {
                    customChildren ? (
                        {children}
                    ) : (
                        <Space size={10} wrap={true} className="btn-wrapper">
                            {children}
                        </Space>
                    )
                }
            </div>
        </div>
    )
}

export default WuiSectionTitle
