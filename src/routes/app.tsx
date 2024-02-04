import AppLayout from "../layouts/App";
import { Navigate } from "react-router-dom";
import AppDashboard from "../pages/App/Dashboard";
import AppAccountChangePassword from "../pages/App/Account/ChangePassword";
import AppAccountProfile from "../pages/App/Account/Profile";
import AppSettingsRoleForm from "../pages/App/Settings/Role/Form";
import AppSettingsRoleList from "../pages/App/Settings/Role/List";
import AppSettingsUserInternalList from "../pages/App/Settings/UserInternal/List";
import AppSettingsUserInternalForm from "../pages/App/Settings/UserInternal/Form";
import AppUserPublicList from "../pages/App/User/Public/List";
import AppUserPublicForm from "../pages/App/User/Public/Form";
import AppUserPartnerList from "../pages/App/User/Partner/List";
import AppUserPartnerForm from "../pages/App/User/Partner/Form";
import AppProductCategoryList from "../pages/App/ProductCategory/List";
import AppProductCategoryForm from "../pages/App/ProductCategory/Form";
import AppProductList from "../pages/App/Product/List";
import AppProductForm from "../pages/App/Product/Form";
import AppOrderList from "../pages/App/Order/List";
import AppOrderForm from "../pages/App/Order/Form";

const appRoutes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Navigate to={"/dashboard"} /> },
      { path: "/dashboard", element: <AppDashboard /> },
      {
        path: "/account",
        children: [
          { path: "/", element: <Navigate to={"/account/profile"} /> },
          { path: "/profile", element: <AppAccountProfile /> },
          { path: "/change-password", element: <AppAccountChangePassword /> },
        ],
      },
      {
        path: "/product-category",
        children: [
          { path: "/", element: <AppProductCategoryList /> },
          { path: "/form", element: <AppProductCategoryForm /> },
          { path: "/:id", element: <AppProductCategoryForm /> },
        ],
      },
      {
        path: "/product",
        children: [
          { path: "/", element: <AppProductList /> },
          { path: "/form", element: <AppProductForm /> },
          { path: "/:id", element: <AppProductForm /> },
        ],
      },
      {
        path: "/order",
        children: [
          { path: "/", element: <AppOrderList /> },
          { path: "/:id", element: <AppOrderForm /> },
        ],
      },
      {
        path: "/user",
        children: [
          { path: "/", element: <Navigate to={"/user/public"} /> },
          {
            path: "/public",
            children: [
              { path: "/", element: <AppUserPublicList /> },
              { path: "/:id", element: <AppUserPublicForm /> },
            ],
          },
          {
            path: "/partner",
            children: [
              { path: "/", element: <AppUserPartnerList /> },
              { path: "/form", element: <AppUserPartnerForm /> },
              { path: "/:id", element: <AppUserPartnerForm /> },
            ],
          },
        ],
      },
      {
        path: "/setting",
        children: [
          { path: "/", element: <Navigate to={"/setting/user-internal"} /> },
          {
            path: "/user-internal",
            children: [
              { path: "/", element: <AppSettingsUserInternalList /> },
              { path: "/form", element: <AppSettingsUserInternalForm /> },
              { path: "/:id", element: <AppSettingsUserInternalForm /> },
            ],
          },
          {
            path: "/peran",
            children: [
              { path: "/", element: <AppSettingsRoleList /> },
              { path: "/form", element: <AppSettingsRoleForm /> },
              { path: "/:id", element: <AppSettingsRoleForm /> },
            ],
          },
        ],
      },
    ],
  },
];

export default appRoutes;
