import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet-async";
import React from "react";

import Typography from "antd/es/typography";
import Button from "antd/es/button";
const { Title } = Typography;

const Error404: React.FC<any> = () => {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t('error.404.metaTitle')}</title>
            </Helmet>

            <div className="error-wrapper">
                <div className="error-main-wrapper">
                    <img className="illustration" src={'/images/404.png'} alt="404"/>
                    <Title level={2} className="mb0">
                        {t('error.404.title')}
                    </Title>
                    <Title level={4} className="mt0 mb24" style={{
                        fontWeight: 500
                    }}>
                        {t('error.404.subtitle')}
                    </Title>
                    <p className="mb24">
                        {t('error.404.note')}
                    </p>

                    <Button href={'/'}>Back to Home</Button>
                </div>
            </div>
        </>
    )
}

export default Error404
