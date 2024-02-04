import Space from "antd/es/space";
import Tag from "antd/es/tag";
import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import Tooltip from "antd/es/tooltip";
import { Col, Row } from "antd";
import WuiFormTitle from "../Title";
import Text from "antd/lib/typography/Text";

interface Props {
  title: string;
  value?: string;
}

const WuiSideLayout: React.FC<Props> = ({ title, value }) => {
  return (
    <>
      <div className="wui-form-group type-column">
        <Row>
          <Col span={10}>
            <Text strong>{title}</Text>
          </Col>
          <Col span={2}>
            <Text>:</Text>
          </Col>
          <Col span={12}>
            <Text>{value}</Text>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default WuiSideLayout;
