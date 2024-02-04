import Upload from "antd/lib/upload";
import React from "react";

interface Props {
    value?: any[]
    disabled?: boolean
    onChange?: (value: any[]) => void,
    max?: number
}

const WuiUploadImages: React.FC<Props> = (
    {
        value = [],
        onChange,
        disabled,
        max = 1
    }
) => {
    const [fileList, setFileList] = React.useState<any>(value)

    const handleOnChange: any = ({ fileList: newFileList } : any) => {
        setFileList(newFileList);

        let originalsFileObjects = newFileList.map((item: any) => {
            return item?.originFileObj
        });

        onChange?.(originalsFileObjects)
    };

    const handleOnPreview = async (file: any) => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);

        if (imgWindow) imgWindow.document.write(image.outerHTML);
    };

    return (
        <>
            <Upload
                disabled={disabled}
                accept={"image/*"}
                listType="picture-card"
                fileList={fileList}
                onChange={handleOnChange}
                onPreview={handleOnPreview}
                beforeUpload={(test) => {
                    return false
                }}
            >
                {fileList.length < max && !disabled && '+ Upload'}
            </Upload>
        </>
    )
}

export default WuiUploadImages;