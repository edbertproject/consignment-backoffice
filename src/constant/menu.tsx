import AppstoreOutlined from "@ant-design/icons/AppstoreOutlined";
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined";
import {
  AreaChartOutlined,
  BarsOutlined,
  InboxOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const defaultMenus = [
  {
    title: "Dashboard",
    key: "dashboard",
    link: "/dashboard",
    access: "IGNORE",
    icon: <AreaChartOutlined />,
  },
  {
    title: "Product Category",
    key: "product-category",
    link: "/product-category",
    access: "read product category",
    icon: <BarsOutlined />,
  },
  {
    title: "Product",
    key: "product",
    link: "/product",
    access: "read product",
    icon: <AppstoreOutlined />,
  },
  {
    title: "Order",
    key: "order",
    link: "/order",
    access: "read order",
    icon: <InboxOutlined />,
  },
  {
    title: "User",
    key: "user",
    link: "/user",
    icon: <UserOutlined />,
    subMenus: [
      {
        title: "Public",
        key: "public",
        access: "read user public",
        link: "/user/public",
      },
      {
        title: "Partner",
        key: "partner",
        access: "read user partner",
        link: "/user/partner",
      },
    ],
  },
  {
    title: "Setting",
    key: "setting",
    link: "/setting",
    icon: <SettingOutlined />,
    subMenus: [
      {
        title: "User Internal",
        key: "user-internal",
        access: "read user internal",
        link: "/setting/user-internal",
      },
      {
        title: "Peran",
        key: "peran",
        access: "read role",
        link: "/setting/peran",
      },
    ],
  },
];
