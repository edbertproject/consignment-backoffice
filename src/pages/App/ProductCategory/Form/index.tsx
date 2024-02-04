import React, { useEffect } from "react";
import WuiContainer from "../../../../@framework/wui/components/Container";
import PageHeader from "antd/es/page-header";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "antd/es/card";
import Space from "antd/es/space";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Form from "antd/lib/form";
import {Col, Row, Spin} from "antd";
import { useState } from "@hookstate/core";
import {handleBackendError, haveAccess, openNotification, toFileList} from "../../../../functions/global";
import { AxiosError, AxiosResponse } from "axios";
import ProductCategoryRepository from "../../../../repositories/ProductCategoryRepository";

import Accessible from "../../../../@framework/wui/components/Accessible";
import useAccess from "../../../../@framework/utilities/hooks/useAccess";
import WuiUploadImages from "../../../../@framework/wui/components/UploadImages";


let title = "Product Category";

const AppProductCategoryForm: React.FC<any> = () => {
    const { t } = useTranslation()
    const { id } = useParams();
    const navigate = useNavigate();
    const pageTitle = id ? t('common.text.editItem', { item: title }) : t('common.text.addNewItem', { item: title })

    // Form
    const [form] = Form.useForm();
    const disable = useState(false);
    const loading = useState(false);

    const acl = useAccess()

    const onFinish = async (data: any) => {
        disable.set(true);

        const formData = new FormData();

        let payload: any = {
            code: data.code,
            name: data.name,
        }

        for (let prop in payload) {
            formData.append(prop,payload[prop] ?? null)
        }

        if (data.photo) {
            data.photo.forEach((file: any) => {
                if (file?.status === 'done') {
                    if (file.id) {
                        formData.append('photo_keep', file.id);
                    } else {
                        formData.append('photo', file);
                    }
                } else {
                    formData.append('photo', file);
                }
            });
        }

        if (id){
            formData.append('_method', 'PUT')
        }

        await (!id ? (ProductCategoryRepository.create(formData)) : ProductCategoryRepository.update(id, formData)).then((res: AxiosResponse) => {
            navigate(-1)

            if (!id) {
                openNotification('success', t('notification.success.createItem', { item: title }))
            } else {
                openNotification('success', t('notification.success.updateItem', { item: title }))
            }
        }).catch((e: AxiosError) => {
            handleBackendError(e, t('notification.error.default'))
            disable.set(false);

        })
    }

    useEffect(() => {
        if (id) {
            getData();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getData = async () => {
        disable.set(true)

        await ProductCategoryRepository.show(id, { with: 'photo' }).then((res: AxiosResponse) => {
            const data = res.data?.data || {}

            form.setFieldsValue({
                code: data.code,
                name: data.name,
                photo: toFileList(data?.photo)
            })

            if(haveAccess(acl, 'write product category')){
                disable.set(false)
            }
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
                    onFinish={onFinish}
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
                                        <div className="input-section">
                                            <Form.Item
                                                name="code"
                                                label={"Code"}
                                                rules={[{
                                                    required: true,
                                                    message: t('validation.required', { item: 'Code' })
                                                }]}
                                            >
                                                <Input disabled={disable.get()} size={"large"} placeholder={t('common.text.input', { item: 'Code' })} />
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
                                        <WuiUploadImages max={1}/>
                                    }
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>

                    <div className="wui-form-btn-group">
                        <Button className="wui-btn" size={"large"} onClick={() => navigate(-1)}>{t('common.button.cancel')}</Button>
                        <Accessible access="write product category">
                            <Spin spinning={loading.get()}>
                                <Button className="wui-btn" htmlType="submit" type="primary" size={"large"} disabled={disable.get()}>{t('common.button.save')}</Button>
                            </Spin>
                        </Accessible>
                    </div>
                </Form>
            </WuiContainer>
        </>
    )
}

export default AppProductCategoryForm
