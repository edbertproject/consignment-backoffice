import {Helmet} from "react-helmet-async";
import React from "react";
import {useTranslation} from "react-i18next";
import Typography from "antd/es/typography";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Input from "antd/es/input";
import Button from "antd/es/button";
import {Link} from "react-router-dom";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import Form from "antd/es/form";
import {useState} from "@hookstate/core";
import { useNavigate } from "react-router-dom";
import Spin from "antd/lib/spin";
import AuthRepository from "../../../repositories/AuthRepository";
import {AxiosError, AxiosResponse} from "axios";
import {handleBackendError, openNotification} from "../../../functions/global";

const { Title } = Typography;

const url = () => process.env.REACT_APP_URL;

const AuthForgotPassword: React.FC<any> = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const loading = useState(false);
    const navigate = useNavigate();

    const onFinish = (data: any) => {
        loading.set(true);

        AuthRepository.forgotPassword({
            email: data.email,
            url: url() + '/reset-password'
        }).then((response: AxiosResponse) => {
            resetForm()

            if (response.data.success) {
                navigate('/forgot-password/success')
            } else {
                openNotification('error', response.data?.message || t('notification.error.default'))
            }
        }).catch((e: AxiosError) => {
            handleBackendError(e, t('notification.error.default'))

            resetForm()
        })
    }

    const resetForm = () => {
        form.resetFields()
        loading.set(false);
    }

    return (
        <>
            <Helmet>
                <title>{t('auth.forgotPassword.metaTitle')}</title>
            </Helmet>

            <Link to={'/login'} className="back-text"><ArrowLeftOutlined className="icon"/> {t('auth.forgotPassword.backText')}</Link>

            <div className="forgot-password-wrapper">
                <div className="forgot-password-main-wrapper">
                    <img className="illustration" src={'/images/forgot-password-banner.png'} alt="forgot password banner"/>

                    <Title level={3}>
                        {t('auth.forgotPassword.title')}
                    </Title>
                    <p className="mb24">
                        {t('auth.forgotPassword.subtitle')}
                    </p>

                    <Form
                        form={form}
                        layout={"vertical"}
                        onFinish={onFinish}
                    >
                        <Row gutter={[10, 10]}>
                            <Col xs={24} md={16} lg={16}>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validation.required', {item:t('common.form.email.label')})
                                        },
                                        {
                                            type: 'email',
                                            message: t('validation.type.email', {item:t('common.form.email.label')})
                                        }
                                    ]}
                                >
                                    <Input placeholder={t('common.form.email.placeholder')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8} lg={8}>
                                <Spin spinning={loading.get()}>
                                    <Button htmlType="submit" type="primary" block>{t('common.button.resetPassword')}</Button>
                                </Spin>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default AuthForgotPassword
