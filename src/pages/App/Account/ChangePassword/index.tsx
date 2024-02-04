import React from "react";
import WuiContainer from "../../../../@framework/wui/components/Container";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import Form from "antd/lib/form";
import {useState} from "@hookstate/core";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Card from "antd/lib/card";
import Space from "antd/lib/space";
import Button from "antd/es/button";
import Spin from "antd/lib/spin";
import Input from "antd/es/input";
import AccountRepository from "../../../../repositories/AccountRepository";
import {AxiosError, AxiosResponse} from "axios";
import {handleBackendError, openNotification} from "../../../../functions/global";
import WuiSectionTitle from "../../../../@framework/wui/components/Sections/Title";

const breadcrumbs = [
    {
        label: 'Akun',
        link: '/account'
    },
    {
        label: 'Ubah Kata Sandi',
        link: '/account/change-password'
    },
]

const AppAccountChangePassword: React.FC<any> = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const title = t('changePassword.title')


    // Form
    const [form] = Form.useForm();
    const disable = useState(false);
    const loading = useState(false);

    const onFinish = async (data: any) => {
        loading.set(true);

        let payload = {
            old_password: data.old_password,
            password: data.password,
            password_confirmation: data.password_confirmation
        }

        await AccountRepository.updatePassword(payload).then((res: AxiosResponse) => {
            openNotification('success', t('notification.success.updateItem', {item: title}))
            loading.set(false);
            form.resetFields();
        }).catch((e: AxiosError) => {
            handleBackendError(e, t('notification.error.default'))
            loading.set(false);
        })
    }

    return (
        <>
            <WuiContainer>
                <WuiSectionTitle breadcrumbs={breadcrumbs} title={title} />

                <Form
                    form={form}
                    layout={"vertical"}
                    onFinish={onFinish}
                >
                    <Row>
                        <Col md={16} xs={24}>
                            <Card title={t('common.text.itemInformation', {item: title})}>
                                <Space style={{
                                    width: '100%'
                                }} direction="vertical" size={25}>


                                    <div className="wui-form-group type-column">
                                        <div className="input-section">
                                            <Form.Item
                                                name="old_password"
                                                label={"Password Sekarang"}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: t('validation.required', {item: "Password Sekarang"})
                                                    },
                                                    {
                                                        min: 8,
                                                        message: t('validation.type.min', {
                                                            item: "Password Sekarang",
                                                            min: 8
                                                        })
                                                    }
                                                ]}
                                            >
                                                <Input.Password placeholder={t('common.text.input', {item: 'Password Sekarang'})} size={"large"} />
                                            </Form.Item>
                                        </div>
                                    </div>


                                    <div className="wui-form-group type-column">
                                        <div className="input-section">
                                            <Form.Item
                                                name="password"
                                                label={"Password Baru"}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: t('validation.required', {item: "Password Baru"})
                                                    },
                                                    {
                                                        min: 8,
                                                        message: t('validation.type.min', {
                                                            item: "Password Baru",
                                                            min: 8
                                                        })
                                                    }
                                                ]}
                                            >
                                                <Input.Password placeholder={t('common.text.input', {item: 'Password Baru'})} size={"large"} />
                                            </Form.Item>
                                        </div>
                                    </div>


                                    <div className="wui-form-group type-column">
                                        <div className="input-section">
                                            <Form.Item
                                                name="password_confirmation"
                                                label={"Konfirmasi Password Baru"}
                                                dependencies={['password']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: t('validation.required', {item: "Konfirmasi Password Baru"})
                                                    },
                                                    {
                                                        min: 8,
                                                        message: t('validation.type.min', {
                                                            item: "Konfirmasi Password Baru",
                                                            min: 8
                                                        })
                                                    },
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                            if (!value || getFieldValue('password') === value) {
                                                                return Promise.resolve();
                                                            }
                                                            return Promise.reject(new Error(t('validation.type.match', {item: "Konfirmasi Password Baru"})));
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input.Password placeholder={t('common.text.input', {item: 'Konfirmasi Password Baru'})} size={"large"} />
                                            </Form.Item>
                                        </div>
                                    </div>




                                </Space>
                            </Card>
                        </Col>
                    </Row>


                    <div className="wui-form-btn-group">
                        <Button className="wui-btn" size={"large"} onClick={() => navigate(-1)}>{t('common.button.cancel')}</Button>
                        <Spin spinning={loading.get()}>
                            <Button className="wui-btn" htmlType="submit" type="primary" size={"large"} disabled={disable.get()}>{t('common.button.save')}</Button>
                        </Spin>
                    </div>
                </Form>

            </WuiContainer>
        </>
    )
}

export default AppAccountChangePassword;