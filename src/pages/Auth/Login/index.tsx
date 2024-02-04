import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

import Form from "antd/es/form";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Typography from "antd/es/typography";
import { useTranslation } from "react-i18next";
import { usePassportService } from "../../../@framework/utilities/hooks";
import Spin from "antd/lib/spin";
import { useState } from "@hookstate/core";
import { openNotification } from "../../../functions/global";

const { Title } = Typography;

const AuthLogin: React.FC<any> = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const loading = useState(false);
  const navigate = useNavigate();
  const { login } = usePassportService();

  const onFinish = (data: any) => {
    loading.set(true);

    login(data.email, data.password)
      .then((res) => {
        loading.set(false);
        navigate("/");
      })
      .catch((e) => {
        loading.set(false);
        openNotification(
          "error",
          e.response?.data?.message || t("notification.error.default")
        );
      });
  };

  return (
    <>
      <Helmet>
        <title>{t("auth.login.metaTitle")}</title>
      </Helmet>

      <div className="main-wrapper login-wrapper">
        <div className="form-wrapper">
          <div className="form-logo">
            <img className="logo" src={"/images/logo.png"} alt="logo" />
          </div>

          <div className="form-header">
            <Title level={3} className="title">
              {t("auth.login.title")}
            </Title>
          </div>

          <Form form={form} layout={"vertical"} onFinish={onFinish}>
            <Form.Item
              name="email"
              label={t("common.form.email.label")}
              rules={[
                {
                  required: true,
                  message: t("validation.required", {
                    item: t("common.form.email.label"),
                  }),
                },
                {
                  type: "email",
                  message: t("validation.type.email", {
                    item: t("common.form.email.label"),
                  }),
                },
              ]}
            >
              <Input
                placeholder={t("common.form.email.placeholder")}
                size={"large"}
              />
            </Form.Item>

            <Form.Item
              className="mb0"
              name="password"
              label={t("common.form.password.label")}
              rules={[
                {
                  required: true,
                  message: t("validation.required", {
                    item: t("common.form.password.label"),
                  }),
                },
                {
                  min: 8,
                  message: t("validation.type.min", {
                    item: t("common.form.password.label"),
                    min: 8,
                  }),
                },
              ]}
            >
              <Input.Password
                placeholder={t("common.form.password.placeholder")}
                size={"large"}
              />
            </Form.Item>

            {/*<div className="mb16" style={{
              textAlign: 'right'
            }}>
              <Link to={'/forgot-password'}>{t('auth.login.forgotPassword')}</Link>
            </div>*/}

            <Spin spinning={loading.get()}>
              <Button
                className="mt16"
                htmlType="submit"
                type="primary"
                block
                size={"large"}
              >
                {t("common.button.signIn")}
              </Button>
            </Spin>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AuthLogin;
