import "./style.less";
import React from "react";
import Card from "antd/es/card";
import { Link } from "react-router-dom";

interface Props {
  title?: string;
  viewLink: string;
  viewText: string;
  action?: React.ReactNode;
  loading?: boolean;
}

const WuiCardMore: React.FC<Props> = ({
  title,
  viewLink,
  viewText,
  action,
  children,
  loading = false,
}) => {
  return (
    <>
      <Card
        loading={loading}
        className="wui-card-more"
        title={title}
        extra={action}
        actions={[<Link to={viewLink}>{viewText}</Link>]}
      >
        {children}
      </Card>
    </>
  );
};

export default WuiCardMore;
