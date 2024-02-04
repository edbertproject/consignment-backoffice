import "./style.less"
import Modal from "antd/lib/modal";
import {useTranslation} from "react-i18next";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import Button from "antd/lib/button";
import {useState} from "@hookstate/core";

interface Props {
    show: boolean,
    onOk: () => Promise<unknown>,
    onCancel: () => void,
    headerTitle?: string,
    title?: string,
    subtitle?: string,
    confirmLabel?: string,
}

const WuiModalConfirmation: React.FC<Props> = (
    {
        show,
        onOk,
        onCancel,
        headerTitle,
        title,
        subtitle,
        confirmLabel
    }
) => {
    const {t} = useTranslation();
    const loading = useState(false);

    const handleOnOk = async () => {
        loading.set(true)

        onOk().then((res) => {
            loading.set(false)
        }).catch(() => {
            loading.set(false)
        });
    }

    return (
        <Modal
            title={headerTitle ? headerTitle : t('modal.confirmation.headerTitle') }
            centered
            visible={show}
            onOk={handleOnOk}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    {t('common.button.cancel')}
                </Button>,
                <Button key="submit" type="primary" danger loading={loading.get()} onClick={handleOnOk}>
                    {confirmLabel || t('common.button.delete')}
                </Button>,
            ]}
        >
            <div className="content">
                <Title level={5} className="title">{ (title) ? title : t('modal.confirmation.title') }</Title>
                <Text>{ (subtitle) ? subtitle : t('modal.confirmation.subtitle') }</Text>
            </div>
        </Modal>
    )
}

export default WuiModalConfirmation;