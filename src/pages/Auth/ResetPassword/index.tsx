import React, { useEffect } from "react";
import {useTranslation} from "react-i18next";
import Form from "antd/es/form";
import {useState} from "@hookstate/core";
import {Helmet} from "react-helmet-async";
import Typography from "antd/es/typography";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Spin from "antd/lib/spin";
import {openNotification, useQuery} from "../../../functions/global";
import AuthRepository from "../../../repositories/AuthRepository";
import {AxiosError, AxiosResponse} from "axios";
import { Link, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const AuthResetPassword: React.FC<any> = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const loading = useState(false);
    const query = useQuery();
    const navigate = useNavigate();
    const [isInit, setInit] = React.useState(true)
    const [isExpired, setExpired] = React.useState(false)

    useEffect(() => {
        checkToken()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const checkToken = async () => {
        try {
            let payload = {
                token: query.get('token'),
                email: query.get('email'), 
            }
            let res = await AuthRepository.checkToken(payload)
            if(res.data.data !== true){
                setExpired(true)
            }
            setInit(false)
        } catch (err) {
            console.log(err)
            setInit(false)
        }
    }

    const onFinish = (data: any) => {
        loading.set(true)

        let payload = {
            token: query.get('token'),
            email: query.get('email'),
            password: data.password,
            password_confirmation: data.password_confirmation
        }

        AuthRepository.resetPassword(payload).then((res: AxiosResponse) => {
            if (res.data.data) {
                navigate('/login')
                openNotification('success', t('notification.success.resetPassword'))
            } else {
                openNotification('error', t('notification.error.default'))
                resetForm()
            }
        }).catch((e: AxiosError) => {
            let errors = e.response?.data;

            if (errors) {
                let firstKey = Object.keys(e.response?.data)[0]
                openNotification('error', errors[firstKey])
            } else {
                openNotification('error', t('notification.error.default'))
            }

            resetForm()
        })
    }

    const resetForm = () => {
        form.resetFields()
        loading.set(false);
    }

    if(isInit){
        return <></>
    }

    return (
        <>
            <Helmet>
                <title>{t('auth.resetPassword.metaTitle')}</title>
            </Helmet>
            
            {
                isExpired ? 
                <div className="token-expired">
                    <Title  level={3} className="mb4">
                        Token sudah Expired
                    </Title>
                    <p>
                        Silahkan melakukan Request Reset Password kembali.
                    </p>
                    <Link to={'/login'} className="text-center">
                        <Button>Kembali</Button>
                    </Link>
                </div> 
                :
                <div className="default-small-wrapper">
                    <div className="inner-section">
                        <div className="form-wrapper">
                            <div className="form-header">
                                <Title level={3} className="title">{t('auth.resetPassword.title')}</Title>
                                <Text type={"secondary"}>{t('auth.resetPassword.subtitle')}</Text>
                            </div>

                            <Form
                                form={form}
                                layout={"vertical"}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="password"
                                    label={t('common.form.password.label')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validation.required', {item: t('common.form.password.label')})
                                        },
                                        {
                                            min: 8,
                                            message: t('validation.type.min', {
                                                item: t('common.form.password.label'),
                                                min: 8
                                            })
                                        }
                                    ]}
                                >
                                    <Input.Password placeholder={t('common.form.password.placeholder')} size={"large"} />
                                </Form.Item>

                                <Form.Item
                                    name="password_confirmation"
                                    label={t('common.form.passwordConfirmation.label')}
                                    dependencies={['password']}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validation.required', {item: t('common.form.passwordConfirmation.label')})
                                        },
                                        {
                                            min: 8,
                                            message: t('validation.type.min', {
                                                item: t('common.form.passwordConfirmation.label'),
                                                min: 8
                                            })
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error(t('validation.type.match', {item: t('common.form.passwordConfirmation.label')})));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder={t('common.form.passwordConfirmation.placeholder')} size={"large"} />
                                </Form.Item>

                                <Spin spinning={loading.get()}>
                                    <Button htmlType="submit" type="primary" block size={"large"}>{t('common.button.save')}</Button>
                                </Spin>
                            </Form>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default AuthResetPassword;