import { AsyncPaginate } from "react-select-async-paginate";
import {useTranslation} from "react-i18next";
import loadAsyncOptions from "./loadAsyncOptions";
import _ from "lodash";
import { AxiosResponse } from "axios";
import { SELECT_ALL_VALUE } from "../../../../../constant";

interface Props {
    key?: string
    value?: any[]
    onChange?: (e: any) => void
    options?: Array<any>
    repository?: any
    placeholder?: string
    valueKey?: string
    labelKey?: string
    max?: number
    selectParams?: any
    disabled?: boolean,
    showOptionDescription?: boolean,
}

const WuiSelectMulti: React.FC<Props> = (
    {
        key = '1',
        value,
        onChange,
        options = [],
        repository = null,
        placeholder,
        valueKey = 'id',
        labelKey = 'name',
        max = 0,
        selectParams= {},
        disabled = false,
        showOptionDescription = false,
    }
) => {
    const {t} = useTranslation();

    const loadOptions = async (search: string, prevOptions: any, { page }: any) => {
        if (options?.length) {
            let filteredOptions;
            if (!search) {
                filteredOptions = options;
            } else {
                const searchLower = search.toLowerCase();

                filteredOptions = options.filter((item) => item[labelKey].toLowerCase().includes(searchLower));
            }

            return await {
                options: filteredOptions,
                hasMore: false
            };
        } else {
            return await loadAsyncOptions(search, prevOptions, page, repository, selectParams);
        }
    }

    const handleOnChange = (val: any) => {
        if (!Boolean(max) || (max ? _.get(value, 'length', 0) < max : true)) {
            let isAll = val.find((item: any) => item.id === SELECT_ALL_VALUE) 
            if(isAll && selectParams.selectAll && onChange){
                handleSelectAll()
            } else if (onChange) {
                onChange(val);
            }
        }
    }

    const handleSelectAll = async () => {
        try {
            if(onChange){
                onChange([{id: SELECT_ALL_VALUE, name: 'Memuat...'}])
                let res: AxiosResponse =  await repository?.select({...selectParams, per_page: 99999, page: 1 })
                let val = res.data?.data;
                onChange(val)
            }   
           
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <AsyncPaginate
                key={key}
                className={'custom-select'}
                classNamePrefix='select'
                isClearable
                isMulti
                closeMenuOnSelect={false}
                debounceTimeout={150}
                additional={{
                    page: 1
                }}

                placeholder={(placeholder ? placeholder : t('select.placeholder', {item: "Opsi"}))}
                getOptionValue={options => options[valueKey]}
                getOptionLabel={options => options[labelKey]}

                value={value}
                loadOptions={loadOptions}
                onChange={handleOnChange}
                isDisabled={disabled}
                formatOptionLabel={showOptionDescription ? OptionDescription : undefined}
            />
        </>
    )
}

const OptionDescription = (item: any) => {
    return <div key={`${item.id}-${item.name}`}>
        <div className="custom-dealer-option">
            <div>{item.name}</div>
            <div className={"address"}>{item.fullpath}</div>
        </div>
    </div>
}

export default WuiSelectMulti;