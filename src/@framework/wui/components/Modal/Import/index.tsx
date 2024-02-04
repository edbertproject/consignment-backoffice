import "./style.less"
import Modal from "antd/lib/modal";
import {useTranslation} from "react-i18next";
import Text from "antd/lib/typography/Text";
import Button from "antd/lib/button";
import {useState} from "@hookstate/core";
import Dragger from "antd/lib/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons/lib/icons";
import message from "antd/lib/message";
import React from "react";

interface Props {
    show: boolean,
    onUpload: (files: File[]) => Promise<unknown>,
    onCancel: () => void,
    onDownload?: () => Promise<unknown>,
    headerTitle?: string,
    maxFileOnMB?: string | number
}

const WuiModalImport: React.FC<Props> = (
    {
        show,
        onUpload,
        onCancel,
        onDownload,
        headerTitle,
        maxFileOnMB =  2
    }
) => {
    const {t} = useTranslation();
    const loading = useState(false);
    const downloadLoading = useState(false);
    const [fileList, setFileList] = React.useState<any>([])

    const handleOnUpload = async () => {
        if (fileList.length) {
            loading.set(true)

            onUpload(fileList).then((res) => {
                loading.set(false)
                setFileList([])
            }).catch(() => {
                loading.set(false)
                setFileList([])
            });
        }
    }

    const handleOnDownload = async () => {
        downloadLoading.set(true)

        if (onDownload) {
            onDownload().then((res) => {
                downloadLoading.set(false)
            }).catch(() => {
                downloadLoading.set(false)
            });
        }
    }

    return (
        <Modal
            title={headerTitle ? headerTitle : t('modal.import.headerTitle') }
            centered
            visible={show}
            onOk={handleOnUpload}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    {t('common.button.cancel')}
                </Button>,
                <Button key="submit" type="primary" disabled={!fileList.length} loading={loading.get()} onClick={handleOnUpload}>
                    {t('common.button.import')}
                </Button>,
            ]}
        >
            <div className="content">
                {
                    (onDownload) ? (
                        <div className="download-section">
                            <Text strong className="title">{t('modal.import.downloadTemplate')}</Text>
                            <Button type="primary" loading={downloadLoading.get()} onClick={handleOnDownload}>
                                {t('common.button.download')}
                            </Button>
                        </div>
                    ) : ''
                }

                <Dragger
                    name="file-import"
                    accept={".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"}
                    multiple={false}
                    beforeUpload={(file) => {
                        if ((file.size / 1000000) <= maxFileOnMB) {
                            setFileList([file])
                        } else {
                            message.error(t('modal.import.errorLimit'))
                        }

                        return false;
                    }}
                    onRemove={(file) => {
                        setFileList([])

                        return false;
                    }}
                    fileList={fileList}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">{t('modal.import.uploadText')}</p>
                    {
                        (maxFileOnMB) ? (
                            <p className="ant-upload-hint">
                                Ukuran file <Text strong>max {maxFileOnMB}MB</Text>
                            </p>
                        ) : ''
                    }
                </Dragger>
            </div>
        </Modal>
    )
}

export default WuiModalImport;