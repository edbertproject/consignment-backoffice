import React from "react";
import { Helmet } from "react-helmet-async";
import {Link} from "react-router-dom";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";

import Typography from "antd/es/typography";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

const AuthForgotPasswordSuccess: React.FC<any> = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('auth.forgotPasswordSuccess.metaTitle')}</title>
      </Helmet>

      <Link to={'/login'} className="back-text"><ArrowLeftOutlined className="icon"/> {t('auth.forgotPasswordSuccess.backText')}</Link>

      <div className="main-wrapper forgot-password-success-wrapper">
        <div className="form-wrapper">
          <div className="form-image">
            <img src={'/images/forgot-password-success.png'} alt="Lupa Kata Sandi Berhasil"/>
          </div>

          <div className="form-header">
            <Title level={3}>
              {t('auth.forgotPasswordSuccess.title')}
            </Title>
            <p className="mb24">
              {t('auth.forgotPasswordSuccess.subtitle')}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthForgotPasswordSuccess
