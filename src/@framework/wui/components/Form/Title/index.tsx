import Space from "antd/es/space";
import Tag from "antd/es/tag";
import React from "react";
import {InfoCircleOutlined} from "@ant-design/icons";
import Tooltip from "antd/es/tooltip";


interface Props {
    title: string
    tag?: string
    tooltip?: string
    notes?: string,
    required?: boolean
}

const WuiFormTitle: React.FC<Props> = (
    {
        title,
        tag,
        tooltip,
        notes,
        required = false
    }
) => {


    return (
        <>
            <div className="info-section">
                <div className="info-header">
                    <Space size={7}>
                        { required ?
                            <div className="ant-form-item-label">
                                <label className="ant-form-item-required" title={title}>{title}</label> 
                            </div>
                            :
                            <h5 className="title">{title}</h5>
                        }
                        {
                            (tag) ? <Tag>{tag}</Tag> : null
                        }

                        {
                            (tooltip) ? (
                                <Tooltip title={tooltip}>
                                    <InfoCircleOutlined />
                                </Tooltip>
                            ) : null
                        }
                    </Space>
                </div>

                {
                    (notes) ? (
                        <div className="notes">
                            {notes}
                        </div>
                    ) : null
                }
            </div>
        </>
    )
}

export default WuiFormTitle
