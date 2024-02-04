import React from "react";
import WuiContainer from "../../../../@framework/wui/components/Container";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import Form from "antd/lib/form";
import {useState} from "@hookstate/core";
import {Col, Row } from "antd/lib/grid";
import Card from "antd/lib/card";
import Space from "antd/lib/space";
import WuiUploadImages from "../../../../@framework/wui/components/UploadImages";
import WuiFormTitle from "../../../../@framework/wui/components/Form/Title";
import Input from "antd/es/input";
import {useAppDispatch, useAppSelector} from "../../../../stores/hooks";
import Button from "antd/es/button";
import Spin from "antd/lib/spin";
import AccountRepository from "../../../../repositories/AccountRepository";
import {AxiosError, AxiosResponse} from "axios";
import {handleBackendError, openNotification, toFileList} from "../../../../functions/global";
import moment from "moment";
import {update} from "../../../../stores/system";
import WuiSectionTitle from "../../../../@framework/wui/components/Sections/Title";
import Accessible from "../../../../@framework/wui/components/Accessible";

const breadcrumbs = [
    {
        label: 'Akun',
        link: '/account'
    },
    {
        label: 'Profil',
        link: '/account/profile'
    },
]

const AppAccountProfile: React.FC<any> = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const title = t('profile.title')
    const system = useAppSelector((state) => state.system)

    // Form
    const [form] = Form.useForm();
    const disable = useState(false);
    const loading = useState(false);

    const onFinish = async (data: any) => {
        loading.set(true);

        const formData = new FormData();

        /*formData.append('_method', 'PUT')*/
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('mobile_phone', data.mobile_phone)
        if(data.date_of_birth){
            formData.append('date_of_birth',  data.date_of_birth.format('YYYY-MM-DD'))
        }
        //gender gak dibutuhkan. di backend masih ada validasinya
        formData.append('gender', 'Laki-laki')

        if (data.avatar) {
            data.avatar.forEach((file: any) => {
                if (file?.status === 'done') {
                    formData.append('avatar_keep', file.id);
                } else {
                    formData.append('avatar', file);
                }
            });
        }

        await AccountRepository.update(formData).then((res: AxiosResponse) => {
            openNotification('success', t('notification.success.updateItem', {item: title}))
            dispatch(update({
                account: res.data.data
            }))

            loading.set(false);
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
                    initialValues={{
                        id: system.account?.id,
                        name: system.account?.name,
                        email: system.account?.email,
                        mobile_phone: system.account?.mobile_phone,
                        date_of_birth: system.account?.date_of_birth ? moment(system.account?.date_of_birth) : null,
                        gender: system.account?.gender,
                        avatar: toFileList(system.account?.avatar)
                    }}
                >

                    <Row gutter={[16, 16]}>
                        <Col className="gutter-row" md={{
                            span: 16,
                            order: 1
                        }} xs={{
                            span: 24,
                            order: 2
                        }}>
                            <Card title={t('common.text.itemInformation', {item: title})}>
                                <Space style={{
                                    width: '100%'
                                }} direction="vertical" size={5}>
                                    <div className="wui-form-group type-column">
                                        <div className="input-section">
                                            <Form.Item
                                                name="id"
                                                label={"ID"}
                                            >
                                                <Input disabled={true} size={"large"} placeholder={t('common.text.input', {item: 'ID'})} />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="wui-form-group type-column">
                                        <div className="input-section">
                                            <Form.Item
                                                name="name"
                                                label={t('common.form.name.label')}
                                                rules={[{
                                                    required: true,
                                                    message: t('validation.required', {item: t('common.form.name.label')})
                                                }]}
                                            >
                                                <Input disabled={disable.get()} size={"large"} placeholder={t('common.form.name.placeholder')} />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="wui-form-group type-column">
                                        <WuiFormTitle title={"Email"} />
                                        <div className="input-section">
                                            <Form.Item
                                                name="email"
                                            >
                                                <Input disabled={true} size={"large"} placeholder={t('common.text.input', {item: 'Email'})} />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="wui-form-group type-column">
                                        <div className="input-section">
                                            <Form.Item
                                                name="mobile_phone"
                                                label={"Nomor Handphone"}
                                                rules={[
                                                    {
                                                    required: true,
                                                    message: t('validation.required', {item: "Nomor Handphone"})
                                                }, {
                                                    pattern: new RegExp("^[+][0-9]*$"),
                                                    message: "Nomor handphone tidak valid. Contoh: +628131234567"
                                                }, {
                                                    min: 11,
                                                    message: t('validation.type.min', {item: "Nomor Handphone", min: 11})
                                                }, {
                                                    max: 14,
                                                    message: t('validation.type.max', {item: "Nomor Handphone", max: 14})
                                                }]}
                                            >
                                                <Input disabled={disable.get()} size={"large"} placeholder={t('common.text.input', {item: 'Nomor Handphone'})} />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    {/* <div className="wui-form-group type-column">
                                        <div className="input-section">
                                            <Form.Item
                                                name="date_of_birth"
                                                label={"Tanggal Lahir"}
                                                rules={[{
                                                    required: true,
                                                    message: t('validation.required', {item: "Tanggal Lahir"})
                                                }]}
                                            >
                                                <DatePicker
                                                    size={"large"}
                                                    placeholder={t('common.text.input', {item: 'Tanggal Lahir'})}
                                                    format="DD-MM-YYYY"
                                                    disabledDate={(current) => {
                                                        let customDate = moment().format("YYYY-MM-DD");
                                                        return current && current > moment(customDate, "YYYY-MM-DD");
                                                    }}
                                                />
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
                                                    message: t('validation.required', {item: "Gender"})
                                                }]}
                                            >
                                                <Radio.Group>
                                                    <Radio value={'Laki-laki'}>Laki-laki</Radio>
                                                    <Radio value={'Perempuan'}>Perempuan</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                        </div>
                                    </div> */}
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
                                    name="avatar"
                                >
                                    <WuiUploadImages/>
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>

                    <Accessible access={'write account'} >
                        <div className="wui-form-btn-group">
                            <Button className="wui-btn" size={"large"} onClick={() => navigate(-1)}>{t('common.button.cancel')}</Button>
                            <Spin spinning={loading.get()}>
                                <Button className="wui-btn" htmlType="submit" type="primary" size={"large"} disabled={disable.get()}>{t('common.button.save')}</Button>
                            </Spin>
                        </div>
                    </Accessible>
                    

                </Form>

            </WuiContainer>
        </>
    )
}

export default AppAccountProfile;