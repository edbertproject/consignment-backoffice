import React from "react";
import {Helmet} from "react-helmet-async";
import { Link } from 'react-router-dom';

import Form from "antd/es/form";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Divider from "antd/es/divider";
import Space from "antd/es/space";
import Typography from "antd/es/typography";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import {Trans, useTranslation} from "react-i18next";

const { Title, Text } = Typography;

const AuthRegister: React.FC<any> = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    return (
        <>
            <Helmet>
                <title>{t('auth.register.metaTitle')}</title>
            </Helmet>

            <div className="main-wrapper reverse for-register">
                <div className="illustration-wrapper">
                    <img className="illustration-image" src={'/images/register-banner.png'} alt="signin banner"/>
                </div>

                <div className="form-wrapper">
                    <div className="form-header">
                        <Title level={3} className="title">{t('auth.register.title')}</Title>
                        <Text type={"secondary"}>{t('auth.register.subtitle')}</Text>
                    </div>

                    <Form
                        form={form}
                        layout={"vertical"}
                        requiredMark={false}
                    >
                        <Row gutter={16}>
                            <Col className="gutter-row" span={12} xs={24} lg={12}>
                                <Form.Item name="name" label={t('common.form.name.label')} rules={[{ required: true }]}>
                                    <Input placeholder={t('common.form.name.placeholder')} size={"large"}/>
                                </Form.Item>
                            </Col>

                            <Col className="gutter-row" span={12} xs={24} lg={12}>
                                <Form.Item name="mobile_phone" label={t('common.form.phoneNumber.label')} rules={[{ required: true }]}>
                                    <Input placeholder={t('common.form.phoneNumber.label')} size={"large"}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item name="email" label={t('common.form.email.label')} rules={[{ required: true }]}>
                            <Input placeholder={t('common.form.email.placeholder')} size={"large"}/>
                        </Form.Item>

                        <Form.Item name="password" label={t('common.form.password.label')} rules={[{ required: true }]}>
                            <Input.Password placeholder={t('common.form.password.placeholder')} size={"large"}/>
                        </Form.Item>

                        <Form.Item>
                            <Text>
                                <Trans i18nKey="auth.register.agreement"></Trans>
                            </Text>
                        </Form.Item>

                        <Button htmlType="submit" type="primary" block size={"large"}>{t('common.button.register')}</Button>
                    </Form>

                    <Divider plain>{t('common.divider.or')}</Divider>

                    <Space direction={"vertical"} className="btn-full-wrapper">
                        <Button block className="btn-google">{t('common.button.signInWithGoogle')}</Button>
                        <Button block className="btn-facebook">{t('common.button.signInWithFacebook')}</Button>
                    </Space>

                    <Text className="note">{t('auth.register.alreadyHaveAccount')} <Link to={'/login'}>{t('auth.register.signIn')}</Link></Text>
                </div>
            </div>
        </>
    )
}

export default AuthRegister
