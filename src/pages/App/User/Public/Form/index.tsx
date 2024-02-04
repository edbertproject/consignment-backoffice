import React, { useEffect } from "react";
import WuiContainer from "../../../../../@framework/wui/components/Container";
import PageHeader from "antd/es/page-header";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "antd/es/card";
import Space from "antd/es/space";
import Input from "antd/es/input";
import Form from "antd/lib/form";
import {Col, Row} from "antd";
import { useState } from "@hookstate/core";
import {toFileList} from "../../../../../functions/global";
import { AxiosError, AxiosResponse } from "axios";
import UserPublicRepository from "../../../../../repositories/UserPublicRepository";
import WuiUploadImages from "../../../../../@framework/wui/components/UploadImages";


let title = "Public";

const AppUserPublicForm: React.FC<any> = () => {
    const { t } = useTranslation()
    const { id } = useParams();
    const navigate = useNavigate();
    const pageTitle = id ? t('common.text.editItem', { item: title }) : t('common.text.addNewItem', { item: title })

    // Form
    const [form] = Form.useForm();
    const disable = useState(false);

    useEffect(() => {
        if (id) {
            getData();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getData = async () => {
        disable.set(true)

        await UserPublicRepository.show(id, { with: 'photo;addresses' }).then((res: AxiosResponse) => {
            const data = res.data?.data || {}

            form.setFieldsValue({
                ...data,
                photo: toFileList(data?.photo)
            })

            disable.set(false)
        }).catch((e: AxiosError) => {

        })
    }

    return (
        <>
            <WuiContainer>
                <PageHeader
                    className="default-page-header"
                    onBack={() => navigate(-1)}
                    title={pageTitle}
                />

                <Form
                    form={form}
                    layout={"vertical"}
                >
                    <Row gutter={[16, 16]}>
                        <Col className="gutter-row" md={{
                            span: 16,
                            order: 1
                        }} xs={{
                            span: 24,
                            order: 2
                        }}>
                            <Card>
                                <Space style={{
                                    width: '100%'
                                }} direction="vertical" size={5}>
                                    <div className="wui-form-group type-column">
                                        {
                                            id &&
                                            <div className="wui-form-group type-column">
                                                <div className="input-section">
                                                    <Form.Item
                                                        name="id"
                                                        label={"ID"}
                                                    >
                                                        <Input defaultValue={id} disabled size={"large"} placeholder={t('common.text.input', { item: 'ID' })} />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        }
                                        <div className="input-section">
                                            <Form.Item
                                                name="username"
                                                label={"Username"}
                                                rules={[{
                                                    required: true,
                                                    message: t('validation.required', { item: 'Username' })
                                                }]}
                                            >
                                                <Input disabled={disable.get()} size={"large"} placeholder={t('common.text.input', { item: 'Username' })} />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="wui-form-group type-column">
                                        <div className="input-section">
                                            <Form.Item
                                                name="name"
                                                label={"Name"}
                                                rules={[{
                                                    required: true,
                                                    message: t('validation.required', { item: 'Name' })
                                                }]}
                                            >
                                                <Input disabled={disable.get()} size={"large"} placeholder={t('common.text.input', { item: 'Name' })} />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="wui-form-group type-column">
                                        <div className="input-section">
                                            <Form.Item
                                                name="email"
                                                label={"Email"}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: t('validation.required', { item: "Email" })
                                                    },
                                                    {
                                                        type: 'email',
                                                        message: t('validation.type.email', { item: "Email" })
                                                    }
                                                ]}
                                            >
                                                <Input disabled={disable.get()} size={"large"} placeholder={t('common.text.input', { item: 'Email' })} />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="wui-form-group type-column">
                                        <div className="input-section">
                                            <Form.Item
                                                name="phone_number"
                                                label={"Phone Number"}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: t('validation.required', { item: "Phone Number" })
                                                    }, {
                                                        pattern: new RegExp("^[0-9]*$"),
                                                        message: "Nomor handphone tidak valid. Contoh: 08131234567"
                                                    }, {
                                                        min: 11,
                                                        message: t('validation.type.min', { item: "Phone Number", min: 11 })
                                                    }, {
                                                        max: 14,
                                                        message: t('validation.type.max', { item: "Phone Number", max: 14 })
                                                    }
                                                ]}
                                            >
                                                <Input disabled={disable.get()} size={"large"} placeholder={t('common.text.input', { item: 'Phone Number' })} />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="wui-form-group type-column">
                                        <div className="input-section">
                                            <Form.Item
                                                name="date_of_birth"
                                                label={"Date Of Birth"}
                                                rules={[{
                                                    required: true,
                                                    message: t('validation.required', { item: 'Date Of Birth' })
                                                }]}
                                            >
                                                <Input disabled={disable.get()} size={"large"} placeholder={t('common.text.input', { item: 'Date Of Birth' })} />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="wui-form-group type-column">
                                        <div className="input-section">
                                            <Form.Item
                                                name="gender"
                                                label={"Gender"}
                                                rules={[{
                                                    required: true,
                                                    message: t('validation.required', { item: 'Gender' })
                                                }]}
                                            >
                                                <Input disabled={disable.get()} size={"large"} placeholder={t('common.text.input', { item: 'Gender' })} />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </Space>
                            </Card>
                        </Col>

                        <Col className="gutter-row" md={{
                            span: 8,
                            order: 2
                        }} xs={{
                            span: 24,
                            order: 1
                        }}>
                            <Card title={t('common.text.image')}>
                                <Form.Item
                                    name="photo"
                                >
                                    {
                                        !disable.get() &&
                                        <WuiUploadImages/>
                                    }
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </WuiContainer>
        </>
    )
}

export default AppUserPublicForm
