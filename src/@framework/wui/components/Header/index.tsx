import "./style.less";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Menu from "antd/es/menu";
import Dropdown from "antd/es/dropdown";
import {
  MenuOutlined,
  LogoutOutlined,
  SearchOutlined,
  BellOutlined,
  //UserOutlined,
  //EditOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../../../stores/hooks";
import Space from "antd/es/space";
import Badge from "antd/es/badge";
import Avatar from "antd/es/avatar/avatar";
import Typography from "antd/es/typography";
import Drawer from "antd/es/drawer";
import Switch from "antd/es/switch";
import Tooltip from "antd/es/tooltip";
import WuiMainMenu from "../MainMenu";
import { VscGear } from "react-icons/vsc";
import Input from "antd/es/input";
import Tag from "antd/es/tag";
import { defaultMenus } from "../../../../constant/menu";
import { passportService } from "../../../services";
import { update } from "../../../../stores/system";
import { getAliasesName, haveAccess } from "../../../../functions/global";
import moment from "moment";
import Empty from "antd/lib/empty";
import useAccess from "../../../utilities/hooks/useAccess";

//import Select from "antd/es/select";
//const { Option } = Select;
const { Text, Paragraph } = Typography;

const menus = defaultMenus;

const WuiHeader: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [showDrawerMenu, setShowDrawerMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [unread, setUnread] = useState(false);

  const system = useAppSelector((state) => state.system);

  const [activeNotif, setActiveNotif] = useState<string>("");
  const acl = useAccess();

  /*const handleChangeLanguage = (val: any) => {
        localStorage.setItem('i18nextLng', val);
        i18n.changeLanguage(val)
    }*/

  const closeDrawerMenu = () => {
    setShowDrawerMenu(false);
  };

  const logout = async () => {
    await passportService
      .logout()
      .then(() => {})
      .catch(() => {});

    dispatch(
      update({
        isLoggedIn: false,
        account: {},
      })
    );
  };

  const showNotifBell = (): boolean => {
    let show = false;
    for (let item of props.notif || []) {
      if (!item.read_at) {
        show = true;
        break;
      }
    }

    return show;
  };

  const getImageUrl = (value: any): string => {
    return value?.original_url;
  };

  return (
    <>
      <header className="wui-header">
        <div className="brand-wrapper">
          <div className="hide-lg">
            {system.isLoggedIn ? (
              <>
                <MenuOutlined
                  className="menu-icon"
                  style={{
                    fontSize: 18,
                  }}
                  onClick={() => setShowDrawerMenu(true)}
                />

                <Drawer
                  title={
                    <img
                      className="drawer-logo"
                      src={"/images/logo.png"}
                      alt="logo"
                    />
                  }
                  placement={"left"}
                  closable={true}
                  onClose={closeDrawerMenu}
                  visible={showDrawerMenu}
                  className="header-menu-drawer"
                >
                  <WuiMainMenu
                    menus={menus}
                    mode="inline"
                    onChange={closeDrawerMenu}
                  />
                </Drawer>
              </>
            ) : null}
          </div>
          <Link to={"/"}>
            <img className="logo" src={"/images/logo.png"} alt="logo" />
          </Link>
        </div>

        <div></div>

        <div className="profile-wrapper">
          {/*<Select defaultValue={i18n.language} onChange={handleChangeLanguage}>
                        <Option value="id">Bahasa</Option>
                        <Option value="en">English</Option>
                    </Select>*/}

          {system.isLoggedIn ? (
            <div className="auth-wrapper">
              <Space className="auth-spaces" size={15}>
                {/*<SearchOutlined style={{fontSize: 20}} onClick={() => setShowSearch(true)}/>*/}

                <Badge dot={showNotifBell()}>
                  <BellOutlined
                    style={{ fontSize: 20 }}
                    onClick={() => setShowNotification(true)}
                  />
                </Badge>

                <Dropdown
                  overlayClassName={"main-header-dropdown"}
                  overlay={
                    <Menu>
                      <Menu.Item key="0" className="avatar-menu-item">
                        <div className="avatar-wrapper">
                          <Avatar
                            size="large"
                            className="mb6"
                            src={getImageUrl(system.account?.avatar)}
                          >
                            {getAliasesName(system.account?.name)}
                          </Avatar>
                          <Text strong>{system.account?.name}</Text>
                          {/*<Text type="secondary" style={{
                                                        fontSize: 12
                                                    }}>Administrator</Text>*/}
                        </div>
                      </Menu.Item>

                      <Menu.Divider />

                      {haveAccess(acl, "read account") && (
                        <Menu.Item key="3">
                          <Link to={"/account/profile"}>
                            <VscGear className="icon" />{" "}
                            {t("header.profile.view")}
                          </Link>
                        </Menu.Item>
                      )}

                      <Menu.Item key="4">
                        <Link to={"/account/change-password"}>
                          <EyeOutlined className="icon" />{" "}
                          {t("header.profile.changePassword")}
                        </Link>
                      </Menu.Item>

                      <Menu.Item key="5">
                        <div onClick={logout}>
                          <LogoutOutlined className="icon" />{" "}
                          {t("header.profile.signOut")}
                        </div>
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                >
                  <div>
                    <Avatar src={getImageUrl(system.account?.avatar)}>
                      {getAliasesName(system.account?.name)}
                    </Avatar>
                  </div>
                </Dropdown>
              </Space>
            </div>
          ) : null}
        </div>
      </header>

      <Drawer
        placement="top"
        closable={false}
        onClose={() => setShowSearch(false)}
        visible={showSearch}
        key={"search-drawer"}
        className="header-search-drawer"
      >
        <div className="search-header">
          <Input
            size="large"
            placeholder={t("header.search.placeholder")}
            suffix={
              <SearchOutlined
                style={{
                  fontSize: 18,
                }}
                onClick={() => {}}
              />
            }
            className="search-input"
          />

          <CloseOutlined
            style={{
              fontSize: 18,
            }}
            onClick={() => setShowSearch(false)}
          />
        </div>

        <div className="search-content">
          <Space direction="vertical" size={25}>
            <Space direction="vertical">
              <Text className="search-title" type="secondary">
                {t("header.search.recent")}
              </Text>

              <div>
                <Tag>modern dashboard</Tag>
                <Tag>calendar app</Tag>
                <Tag>modal examples</Tag>
                <Tag>avatar</Tag>
              </div>
            </Space>

            <Space direction="vertical">
              <Text className="search-title" type="secondary">
                {t("header.search.suggestion")}
              </Text>

              <div>
                <Tag>cryptocurrency</Tag>
                <Tag>button groups</Tag>
                <Tag>form elements</Tag>
                <Tag>contact app</Tag>
              </div>
            </Space>
          </Space>
        </div>
      </Drawer>

      <Drawer
        title={t("header.notification.title")}
        closable={true}
        placement="right"
        onClose={() => setShowNotification(false)}
        visible={showNotification}
        className="header-notification-drawer"
        key={"notification-drawer"}
      >
        <div className="action-wrapper">
          <span
            className="mark-all"
            onClick={() => {
              if (props.handleReadAll) props.handleReadAll();
            }}
          >
            {t("header.notification.markAll")}
          </span>

          {/*<div className="switch-wrapper">*/}
          {/*  <span>{t("header.notification.onlyShowUnread")}</span>*/}
          {/*  <Switch*/}
          {/*    size={"small"}*/}
          {/*    checkedChildren={<CheckOutlined />}*/}
          {/*    unCheckedChildren={<CloseOutlined />}*/}
          {/*    defaultChecked={false}*/}
          {/*    onChange={() => {*/}
          {/*      if (props.handleUnreadSwitch) {*/}
          {/*        props.handleUnreadSwitch(!unread);*/}
          {/*      }*/}
          {/*      setUnread(!unread);*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>

        <div className="main-notif-wrapper">
          <div className="segment-wrapper">
            <div className="notif-list">
              {(props.notif || []).map((data: any) => {
                let item = data?.data || {};
                return (
                  <div
                    className="notif-item"
                    key={data.id}
                    onClick={() => {
                      setActiveNotif(data.id);
                      if (!data.read_at) {
                        props.handleReadNotif(data.id);
                      }
                    }}
                  >
                    {item.avatar?.name && (
                      <Avatar src={item.avatar?.url}>
                        {getAliasesName(item.avatar?.name)}
                      </Avatar>
                    )}

                    <div className="info-wrapper">
                      <Paragraph
                        className="info-title"
                        ellipsis={{
                          rows: 1,
                        }}
                      >
                        {item.subject}
                      </Paragraph>

                      <Paragraph
                        className="info-description"
                        ellipsis={{
                          rows: activeNotif === data.id ? 2 : 999,
                        }}
                      >
                        {item.message}
                      </Paragraph>

                      <label className="info-timestamp">
                        {moment(item.timestamp).format("DD-MM-YYYY HH:mm")}
                      </label>
                    </div>

                    <div
                      className="status-wrapper"
                      onClick={() => props.handleReadNotif(data.id)}
                    >
                      <Tooltip
                        placement="left"
                        title={t(
                          data.read_at
                            ? "header.notification.markUnread"
                            : "header.notification.markRead"
                        )}
                      >
                        <span
                          className={`status ${data.read_at ? "" : "unread"}`}
                        ></span>
                      </Tooltip>
                    </div>
                  </div>
                );
              })}

              {(props.notif || []).length === 0 && (
                <div className="empty-wrapper">
                  <Empty description={"Tidak ada pemberitahuan"} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default WuiHeader;
