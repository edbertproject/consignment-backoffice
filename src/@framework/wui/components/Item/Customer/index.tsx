import "./style.less";
import React from "react";
import { Avatar } from "antd";
import { BsEnvelope } from "react-icons/bs";
import { AiOutlineCloseCircle, AiOutlineUser } from "react-icons/ai";

interface Props {
  title: string;
  subtitle: string;
  aliases: string;
  src?: string;
}

const WuiItemCustomer: React.FC<Props> = ({
  title,
  subtitle,
  aliases,
  src,
}) => {
  return (
    <div className="wui-item-customer">
      <span className="icon-wrapper">
        {src ? (
          <Avatar size={40} src={src} />
        ) : (
          <Avatar size={40}>{aliases}</Avatar>
        )}
      </span>

      <div className="info-wrapper">
        <div className="main-info">
          <h4 className="title">{title}</h4>
          <h5 className="subtitle">{subtitle}</h5>
        </div>

        <div className="action-list">
          <BsEnvelope className="action-item" />
        </div>
      </div>
    </div>
  );
};

export default WuiItemCustomer;
