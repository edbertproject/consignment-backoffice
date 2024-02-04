import React, {useRef} from "react";
import WuiContainer from "../../../../@framework/wui/components/Container";
import PageHeader from "antd/es/page-header";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Card from "antd/es/card";
import Space from "antd/es/space";
import Input from "antd/es/input";
import Button from "antd/es/button";
import WuiFormTitle from "../../../../@framework/wui/components/Form/Title";
import Switch from "antd/es/switch";
import Radio from "antd/es/radio";
import InputNumber from "antd/es/input-number";
import Rate from "antd/es/rate";
import Slider from "antd/es/slider";
import Select from "antd/es/select";
import Checkbox from "antd/es/checkbox";
import DatePicker from "antd/es/date-picker";
import TimePicker from "antd/es/time-picker";
import moment from "moment";
import Cascader from "antd/es/cascader";
import {Editor} from "@tinymce/tinymce-react";

const {Option} = Select
const { RangePicker } = DatePicker;

const cascaderOptions = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

const tinyApiKey = () => process.env.REACT_APP_TINY_API_KEY;

const AppDefaultForm: React.FC<any> = () => {
    const {t} = useTranslation()
    const editorRef = useRef<any>(null);
    const navigate = useNavigate()

    return (
        <>
            <WuiContainer>
                <PageHeader
                    className="default-page-header"
                    onBack={() => navigate(-1)}
                    title={t('common.text.addNewItem', {item: 'Form'})}
                />

                <Card title={t('common.text.itemInformation', {item: 'Form'})}>
                    <Space style={{
                        width: '100%'
                    }} direction="vertical" size={25}>
                        <div className="wui-form-group">
                            <WuiFormTitle title={"Text"} tag={"Required"} notes={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}/>

                            <div className="input-section">
                                <Input size={"large"} placeholder="Input Text" />
                            </div>
                        </div>

                        <div className="wui-form-group">
                            <WuiFormTitle title={"Description"} tooltip={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}/>

                            <div className="input-section">
                                <Input.TextArea size={"large"} rows={4} placeholder="Input Description" />
                            </div>
                        </div>

                        <div className="wui-form-group">
                            <WuiFormTitle title={"Password"} notes={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}/>

                            <div className="input-section">
                                <Input.Password size={"large"} placeholder="Input Password" />
                            </div>
                        </div>

                        <div className="wui-form-group">
                            <WuiFormTitle title={"Number"}/>

                            <div className="input-section">
                                <InputNumber
                                    size={"large"}
                                    onChange={() => {}}
                                />
                            </div>
                        </div>

                        <div className="wui-form-group">
                            <WuiFormTitle title={"Switch"} tooltip={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}/>

                            <div className="input-section">
                                <Switch onChange={() => {}} />
                            </div>
                        </div>

                        <div className="wui-form-group">
                            <WuiFormTitle title={"Radio"} notes={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}/>

                            <div className="input-section">
                                <Radio.Group onChange={() => {}} defaultValue={1}>
                                    <Radio value={1}>Option 1</Radio>
                                    <Radio value={2}>Option 2</Radio>
                                    <Radio value={3}>Option 3</Radio>
                                    <Radio value={4}>Option 4</Radio>
                                </Radio.Group>
                            </div>
                        </div>

                        <div className="wui-form-group">
                            <WuiFormTitle title={"Checkbox"} tooltip={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}/>

                            <div className="input-section">
                                <Checkbox onChange={() => {}}>Lorem Ipsum is simply dummy text?</Checkbox>
                            </div>
                        </div>

                        <div className="wui-form-group">
                            <WuiFormTitle title={"Rate"} tooltip={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}/>

                            <div className="input-section">
                                <Rate defaultValue={3}/>
                            </div>
                        </div>

                        <div className="wui-form-group">
                            <WuiFormTitle title={"Slider"}/>

                            <div className="input-section">
                                <Slider defaultValue={30} />
                            </div>
                        </div>

                        <div className="wui-form-group">
                            <WuiFormTitle title={"Cascader"} notes={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}/>

                            <div className="input-section">
                                <Cascader size={"large"} options={cascaderOptions} onChange={() => {}} placeholder="Please select" />
                            </div>
                        </div>

                        <div className="wui-form-group">
                            <WuiFormTitle title={"Select Single"} notes={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}/>

                            <div className="input-section">
                                <Select size={"large"} style={{
                                    maxWidth: '100%',
                                    width: 200
                                }} defaultValue="1" onChange={() => {}}>
                                    <Option value="1">Option 1</Option>
                                    <Option value="2">Option 2</Option>
                                    <Option value="3" disabled>
                                        Option 3
                                    </Option>
                                    <Option value="4">Option 4</Option>
                                </Select>
                            </div>
                        </div>

                        <div className="wui-form-group">
                            <WuiFormTitle title={"Select Multiple"} notes={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}/>

                            <div className="input-section">
                                <Select
                                    size={"large"}
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    defaultValue={[]}
                                    onChange={() => {}}
                                >
                                    <Option value="1">Option 1</Option>
                                    <Option value="2">Option 2</Option>
                                    <Option value="3" disabled>
                                        Option 3
                                    </Option>
                                    <Option value="4">Option 4</Option>
                                </Select>
                            </div>
                        </div>

                        <div className="wui-form-group">
                            <WuiFormTitle title={"Datepicker"}/>

                            <div className="input-section">
                                <DatePicker size={"large"} onChange={() => {}} />
                            </div>
                        </div>

                        <div className="wui-form-group">
                            <WuiFormTitle title={"Daterange"}/>

                            <div className="input-section">
                                <RangePicker size={"large"}/>
                            </div>
                        </div>

                        <div className="wui-form-group">
                            <WuiFormTitle title={"Timepicker"}/>

                            <div className="input-section">
                                <TimePicker size={"large"} onChange={() => {}} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                            </div>
                        </div>


                        <div className="wui-form-group">
                            <WuiFormTitle title={"Text Editor"} notes={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}/>

                            <div className="input-section">
                                <Editor
                                    apiKey={tinyApiKey()}
                                    cloudChannel='5-stable'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue="<p>This is the initial content of the editor.</p>"
                                    init={{
                                        branding: false,
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | ' +
                                            'bold italic backcolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                    }}
                                />
                            </div>
                        </div>
                    </Space>
                </Card>

                <div className="wui-form-btn-group">
                    <Button className="wui-btn" size={"large"}>{t('common.button.cancel')}</Button>
                    <Button className="wui-btn" type="primary" size={"large"}>{t('common.button.save')}</Button>
                </div>
            </WuiContainer>
        </>
    )
}

export default AppDefaultForm
