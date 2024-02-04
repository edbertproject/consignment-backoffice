import React from "react";
import {Helmet} from "react-helmet-async";
import {useTranslation} from "react-i18next";

import Typography from "antd/es/typography";
import {Space} from "antd";
import Button from "antd/es/button";

const { Title } = Typography;

const AuthVerify: React.FC<any> = () => {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t('auth.verify.metaTitle')}</title>
            </Helmet>

            <div className="verify-wrapper">
                <div className="verify-main-wrapper">
                    <img className="illustration" src={'/images/verify-banner.png'} alt="verify banner"/>
                    <Title level={3}>
                        {t('auth.verify.title')}
                    </Title>
                    <p className="mb24">
                        {t('auth.verify.subtitle')}
                    </p>


                    <Space direction={"horizontal"}>
                        <Button type={"primary"} block>{t('common.button.resendVerification')}</Button>
                        <Button block>{t('common.button.contactSupport')}</Button>
                    </Space>
                </div>
            </div>
        </>
    )
}

export default AuthVerify
