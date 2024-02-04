import {$clone} from "../../../../utilities";
import Select from "antd/lib/select";
import React, {ReactNode, useEffect} from "react";
import {useState} from "@hookstate/core";
import useDebounce from "../../../../utilities/hooks/useDebounce";
import {AxiosError, AxiosResponse} from "axios";
import {useIsMounted} from "../../../../utilities/hooks";
import {useTranslation} from "react-i18next";

const {Option} = Select

interface valueProps {
    value: string | number,
    label?: ReactNode
}

interface Props {
    value?: any
    onChange?: (value: valueProps | object) => void
    repository: any
    placeholder?: string
    disabled?: boolean,
    excludeIds?: Array<any> 
    defaultOptions?: Array<any> 
    style?: any,
    labelInValue?: boolean,
    selectParams?: object
    customOptions?: (value: object) => void,
    showOptionDescription?: boolean
    allowClear?: boolean
}

const WuiSelectSingle: React.FC<Props> = (
    {
        value,
        onChange,
        repository,
        placeholder,
        disabled = false,
        excludeIds = [],
        defaultOptions = [],
        style = {},
        labelInValue = true,
        selectParams = {},
        customOptions,
        showOptionDescription = false,
        allowClear
    }
) => {
    const {t} = useTranslation();
    const loading = useState<boolean>(false)
    const options = useState<any[]>([])
    const searchPage = useState<number>(1)
    const isNext = useState<boolean>(false)
    const isMounted = useIsMounted()

    const [search, setSearch] = React.useState<string>('')
    const debouncedSearch = useDebounce<string>(search, 500)

    useEffect(() => {
        if (!isMounted) {
            getData(true)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch])


    useEffect(() => {
        getData(true)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getData = (reset = false) => {
        if (repository.select) {
            if (!reset) {
                searchPage.set(searchPage.get()+1)
            } else {
                searchPage.set(1)
            }

            const params = {
                ...selectParams,
                search: '',
                per_page: 99999,
                page: searchPage.get()
            }

            if (debouncedSearch) {
                params.search = debouncedSearch
            }

            loading.set(true);
            isNext.set(false);

            repository.select(params).then((res: AxiosResponse) => {
                let data = res.data?.data
                if(excludeIds.length > 0){
                    data = data.filter((item: any) => !excludeIds.includes(item.id.toString()))
                }
                if (reset) {
                    if(defaultOptions.length > 0){
                        data = [...defaultOptions, ...data]
                    }
                    options.set(data)
                } else {
                    options.merge(data)
                }

                if (res.data?.links?.next) {
                    isNext.set(true);
                }

                loading.set(false)
            }).catch((e: AxiosError) => {
                loading.set(false)
            })
        }
    }

    const handlePopUpScroll = (event: any) => {
        let target = event.target;
        if (isNext.get() && (target.scrollTop + target.offsetHeight === target.scrollHeight)) {
            getData()
        }
    }

    return (
        <>
            <Select
                showSearch
                allowClear={allowClear}
                size={"large"}
                value={value}
                style={style}
                placeholder={(placeholder ? placeholder : t('select.placeholder', {item: "Opsi"}))}
                defaultActiveFirstOption={false}
                filterOption={false}
                labelInValue={labelInValue}
                onSearch={(value) => {
                    setSearch(value)
                }}
                onChange={(value) => {
                    if (typeof onChange === "function") {
                        onChange(value)
                    }
                }}
                notFoundContent={null}
                onPopupScroll={handlePopUpScroll}
                loading={loading.get()}
                disabled={disabled}
            >
                {
                    $clone(options.get()).map((item: any) => {
                        if (!customOptions) {
                            if(showOptionDescription){
                                return <Option value={item.id} label={item.name} key={`${item.id}-${item.name}`}>
                                    <div className="custom-dealer-option">
                                        <div>{item.name}</div>
                                        <div className={"address"}>{item.fullpath}</div>
                                    </div>
                                </Option>
                            } else {
                                return (
                                    <Option key={`${item.id}-${item.name}`} value={item.id} label={item?.name}>
                                        {item?.name}
                                    </Option>
                                )
                            }
                        } else {
                            return customOptions(item)
                        }
                    })
                }
            </Select>
        </>
    )
}

export default WuiSelectSingle;