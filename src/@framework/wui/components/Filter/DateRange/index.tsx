import React, {useEffect} from "react";
import DatePicker, {RangePickerProps} from 'antd/es/date-picker';
import moment from "moment";
import {useTranslation} from "react-i18next";

const { RangePicker } = DatePicker;

type Props = {
    defaultValue?: any
    customRanges?: any

    callback?: (dates: any, dateString?: any) => void
} & RangePickerProps


const WuiFilterDateRange: React.FC<Props> = (props) => {
    const {t} = useTranslation()
    const {
        defaultValue,
        format = 'D MMM YYYY',
        allowClear = false,
        size = 'large',
        customRanges = null,
        callback
    } = props
    const [valueState, setvalueState] = React.useState(defaultValue)

    const [ranges, setRange] = React.useState<any>({
        [t('dates.today')]: [moment(), moment()],
        [t('dates.yesterday')]: [
            moment().subtract(1, "days"),
            moment().subtract(1, "days")
        ],
        [t('dates.lastDays', {days: 7})]: [
            moment().subtract(7, "days"),
            moment(),
        ],
        [t('dates.lastDays', {days: 30})]: [
            moment().subtract(30, "days"),
            moment()
        ],
        [t('dates.thisMonth')]: [moment().startOf('month'), moment().endOf('month')],
        [t('dates.thisYear')]: [moment().startOf('year'), moment().endOf('year')]
    })

    useEffect(() => {
        if (customRanges !== null) {
            setRange(customRanges)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setvalueState(defaultValue)

    }, [defaultValue])

    return (
        <>
            <RangePicker
                style={{
                    width: '100%'
                }}
                {...props}
                format={format}
                size={size}
                allowClear={allowClear}
                ranges={ranges}

                value={valueState}

                onChange={(dates, dateString) => {
                    if (callback) {
                        callback(dates, dateString)
                    }
                }}
            />
        </>
    )
}

export default WuiFilterDateRange
