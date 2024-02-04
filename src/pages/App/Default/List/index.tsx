import React, {useEffect} from "react";
import WuiContainer from "../../../../@framework/wui/components/Container";
import Button from "antd/es/button";
import {FileExcelOutlined, PlusOutlined, SearchOutlined, UploadOutlined} from "@ant-design/icons";
import WuiSectionTitle from "../../../../@framework/wui/components/Sections/Title";
import {useTranslation} from "react-i18next";

import Select from 'react-select';
import Table from 'antd/es/table';
import Space from "antd/es/space";
import Tag from "antd/es/tag";
import Collapse from "antd/es/collapse";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Input from "antd/es/input";
import {useState} from "@hookstate/core";
import {Link, useNavigate, useSearchParams} from 'react-router-dom'
import {$clone} from "../../../../@framework/utilities";
import _ from "lodash";
import WuiFilterDateRange from "../../../../@framework/wui/components/Filter/DateRange";
import moment from "moment";
import {useIsMounted} from "../../../../@framework/utilities/hooks";
import useDebounce from "../../../../@framework/utilities/hooks/useDebounce";

var qs = require('qs');

const { Panel } = Collapse;

const data = [
    {
        key: '1',
        name: 'John Brown',
        role: 'Admin',
        created_at: '2021-01-01',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        role: 'Super Admin',
        created_at: '2021-02-11',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        role: 'Super Admin',
        created_at: '2021-03-22',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '4',
        name: 'John Doe',
        role: 'Staff',
        created_at: '2021-01-07',
        age: 37,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '5',
        name: 'Paul Green',
        role: 'Staff',
        created_at: '2021-02-18',
        age: 31,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '6',
        name: 'John Brown',
        role: 'Admin',
        created_at: '2021-01-01',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '7',
        name: 'Jim Green',
        role: 'Super Admin',
        created_at: '2021-02-11',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '8',
        name: 'Joe Black',
        role: 'Super Admin',
        created_at: '2021-03-22',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '9',
        name: 'John Doe',
        role: 'Staff',
        created_at: '2021-01-07',
        age: 37,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '10',
        name: 'Paul Green',
        role: 'Staff',
        created_at: '2021-02-18',
        age: 31,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const breadcrumbs = [
    {
        label: 'Default',
        link: '/default'
    },
    {
        label: 'List',
        link: '/default/list'
    },
]

const singleOptions = [
    { value: 1, label: 'Super Admin' },
    { value: 2, label: 'Admin' },
    { value: 3, label: 'Finance' },
    { value: 4, label: 'Staff' }
]

const multiOptions = [
    { value: 1, label: 'Nice' },
    { value: 2, label: 'Developer' },
    { value: 3, label: 'Loser' },
    { value: 4, label: 'Cool' },
    { value: 5, label: 'Teacher' },
    { value: 6, label: 'Staff' },
    { value: 7, label: 'Janitor' }
]

const AppDefaultList: React.FC<any> = () => {
    const {t} = useTranslation()
    const isMounted = useIsMounted()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();

    const tablePage = useState<number>(parseInt(searchParams.get('page') || '1'))
    const tablePerPage = useState<number>(parseInt(searchParams.get('perPage') || '10'))
    const [tableLoading, setTableLoading] = React.useState<boolean>(false)
    const tableSort = useState<{
        sortField: any,
        sortOrder: any,
    }>({
        sortField: searchParams.get('sortField'),
        sortOrder: searchParams.get('sortOrder')
    })

    // For Search Input
    const [search, setSearch] = React.useState<string>('')
    const debouncedSearch = useDebounce<string>(search, 500)

    const filters = useState<{
        single: any,
        multi: any,
    }>({
        single: null,
        multi: null,
    })

    // For DateRange Picker
    const [filterDate, setFilterDate] = React.useState<any>([
        moment(),
        moment()
    ])

    useEffect(() => {
        if (!isMounted) {
            setFilterDataToQuery()
        }
        // eslint-disable-next-line
    }, [filterDate[0], filterDate[1], debouncedSearch])

    useEffect(() => {
        getFilterDataFromQuery()
        // eslint-disable-next-line
    }, [])

    const getFilterDataFromQuery = () => {
        const keyword = searchParams.get('keyword')

        if (keyword) {
            setSearch(keyword)
        }

        const dateFrom = searchParams.get('dateFrom')
        const dateTo = searchParams.get('dateTo')

        if (dateFrom && dateTo) {
            setFilterDate([
                moment(dateFrom),
                moment(dateTo)
            ])
        }

        const singleId = searchParams.get('single')

        if (singleId) {
            const selectedSingle = _.find(singleOptions, item => {
                return item.value === parseInt(singleId)
            })

            filters.single.set(selectedSingle)
        }

        const multiIds = searchParams.getAll('multi')

        if (multiIds) {
            const selectedMulti = _.filter(multiOptions, item => {
                return _.includes(multiIds, item.value.toString());
            })

            filters.multi.set(selectedMulti)
        }

        getTableData()
    }

    const setFilterDataToQuery = () => {
        let params = {}

        if (debouncedSearch) {
            Object.assign(params, {
                keyword: debouncedSearch
            })
        }

        if (filterDate) {
            Object.assign(params, {
                dateFrom: filterDate[0].format('YYYY-MM-DD'),
                dateTo: filterDate[1].format('YYYY-MM-DD')
            })
        }

        if (filters.single.get()) {
            Object.assign(params, {
                single: filters.single.get().value
            })
        }

        if (filters.multi.get()) {
            const multiValue = _.map($clone(filters.multi.get()), 'value');

            Object.assign(params, {
                multi: multiValue
            })
        }

        if (tablePage.get() !== 1) {
            Object.assign(params, {
                page: tablePage.get()
            })
        }

        if (tablePerPage.get() !== 10) {
            Object.assign(params, {
                perPage: tablePerPage.get()
            })
        }

        if (tableSort.sortField.get()) {
            Object.assign(params, {
                sortField: tableSort.sortField.get()
            })
        }

        if (tableSort.sortOrder.get()) {
            Object.assign(params, {
                sortOrder: tableSort.sortOrder.get()
            })
        }

        const queryParams = qs.stringify(params , { indices: false });

        if (queryParams) {
            setSearchParams(`?${queryParams}`)
        } else {
            navigate('')
        }

        getTableData()
    }

    const handleDateRangeCallback = (dates: any, dateString?: any) => {
        setFilterDate(dates)
    }

    const getTableData = () => {
        setTableLoading(true)

        setTimeout(() => {
            setTableLoading(false)
        }, 500)
    }

    const handleTableChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        tablePage.set(pagination.current)
        tablePerPage.set(pagination.pageSize)

        if (sorter.order) {
            tableSort.sortField.set(sorter.field)
            tableSort.sortOrder.set(sorter.order)
        } else {
            tableSort.sortField.set(null)
            tableSort.sortOrder.set(null)
        }

        setFilterDataToQuery()
    }

    const columns: any = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            defaultSortOrder: tableSort.sortField.get() === 'name' && tableSort.sortOrder.get(),
            render: (text: any) => <span>{text}</span>
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            sorter: true,
            defaultSortOrder: tableSort.sortField.get() === 'role' && tableSort.sortOrder.get(),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: true,
            defaultSortOrder: tableSort.sortField.get() === 'age' && tableSort.sortOrder.get(),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags: any) => (
                <>

                    {tags.map((tag: any) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: true,
            defaultSortOrder: tableSort.sortField.get() === 'created_at' && tableSort.sortOrder.get(),
            render: (text: any) => {
                return moment(text).format('D MMM YYYY')
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <Link to={''}>Edit</Link>
                    <Link to={'/'}>Delete</Link>
                </Space>
            ),
        },
    ];

    return (
        <>
            <WuiContainer>
                <WuiSectionTitle breadcrumbs={breadcrumbs} title={'Default List'}>
                    <Button icon={<UploadOutlined />}>{t('common.button.import')}</Button>
                    <Button icon={<FileExcelOutlined />}>{t('common.button.export')}</Button>
                    <Button onClick={() => navigate('/default/form')} type="primary" icon={<PlusOutlined />}>{t('common.button.addNew')}</Button>
                </WuiSectionTitle>

                <Row gutter={[10, 10]} className="mb16">
                    <Col className="gutter-row" span={6} xs={24} md={12} lg={10}>
                        <Input
                            allowClear
                            placeholder={t('common.filter.search.placeholder')}
                            prefix={<SearchOutlined />}
                            value={search}
                            onChange={(value) => {
                                setSearch(value.target.value)
                            }}
                        />
                    </Col>
                </Row>

                <Collapse
                    className="mb16"
                    defaultActiveKey={['1']}
                    onChange={(key) => {
                        console.log(key)
                    }}
                    expandIconPosition={"right"}
                >
                    <Panel header="Filter" key="1">
                        <Row className="mb6" gutter={[10, 10]}>
                            <Col className="gutter-row" xs={24} md={12} lg={8}>
                                <WuiFilterDateRange defaultValue={filterDate} callback={handleDateRangeCallback}/>
                            </Col>

                            <Col className="gutter-row" xs={24} md={12} lg={6}>
                                <Select
                                    className={'custom-select'}
                                    classNamePrefix='select'
                                    placeholder={'Select single'}
                                    isClearable={true}
                                    options={singleOptions}
                                    value={$clone(filters.single.get())}
                                    onChange={(item) => {
                                        filters.single.set(item)
                                        setFilterDataToQuery()
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row gutter={[10, 10]}>
                            <Col className="gutter-row" xs={24} md={24} lg={12}>
                                <Select
                                    className={'custom-select'}
                                    classNamePrefix='select'
                                    placeholder={'Select multi'}
                                    isClearable={true}
                                    closeMenuOnSelect={false}
                                    isMulti
                                    value={$clone(filters.multi.get())}
                                    options={multiOptions}
                                    onChange={(item) => {
                                        filters.multi.set(item)
                                        setFilterDataToQuery()
                                    }}
                                />
                            </Col>
                        </Row>

                    </Panel>
                </Collapse>

                <Table
                    bordered
                    columns={columns}
                    dataSource={data}
                    loading={tableLoading}
                    onChange={handleTableChange}
                    pagination={{
                        current: tablePage.get(),
                        total: 50,
                        showSizeChanger: true,
                        showTotal: total => `Total ${total} items`
                    }}
                />
            </WuiContainer>
        </>
    )
}


export default AppDefaultList
