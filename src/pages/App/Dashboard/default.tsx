import React from "react";
import WuiContainer from "../../../@framework/wui/components/Container";
import WuiSectionTitle from "../../../@framework/wui/components/Sections/Title";
import Button from "antd/es/button";
import {
    CarOutlined,
    CheckOutlined, CloseOutlined,
    FileExcelOutlined, MoreOutlined,
    PlusOutlined,
    PrinterOutlined,
    SwapOutlined
} from "@ant-design/icons";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import {WuiCardComparison, WuiCardMore, WuiCardStacked, WuiCardSummary, WuiCardStatistic} from "../../../@framework/wui/components/Card";
import WuiListTransaction from "../../../@framework/wui/components/List/Transaction";
import Dropdown from "antd/es/dropdown";
import Menu from "antd/es/menu";
import WuiListCustomer from "../../../@framework/wui/components/List/Customer";

const AppDashboard: React.FC<any> = () => {

    const breadcrumbs = [
        {
            label: 'Dashboard',
            link: '/dashboard'
        },
        {
            label: 'Sales Monitoring',
            link: '/dashboard/sales-monitoring'
        },
    ]

    return (
        <>
            <WuiContainer>
                <WuiSectionTitle breadcrumbs={breadcrumbs} title={'Welcome To Dashboard'}>
                    <Button icon={<FileExcelOutlined />}>Export</Button>
                    <Button icon={<PrinterOutlined />}>Print</Button>
                    <Button type="primary" icon={<PlusOutlined />}>Add New</Button>
                </WuiSectionTitle>


                <Row gutter={[10, 10]}>

                    <Col className="gutter-row" span={6} xs={24} md={12} lg={6}>
                        <WuiCardSummary
                            title={'CONVERSION RATE'}
                            value={'0.81%'}
                            percentage={'1.2%'}
                            type={"up"}
                            comparison={'than last week'}
                            data={{
                                label: 'Conversions',
                                labels: ['1 July 21', '2 July 21', '3 July 21', '4 July 21', '5 July 21', '6 July 21', '7 July 21', '8 July 21', '9 July 21', '10 July 21', '11 July 21', '12 July 21', '13 July 21', '14 July 21', '15 July 21', '16 July 21', '17 July 21', '18 July 21', '19 July 21', '20 July 21', '21 July 21', '22 July 21', '23 July 21', '24 July 21'],
                                data: [53, 38, 46, 41, 35, 62, 24, 35, 19, 54, 54, 45, 39, 47, 43, 56, 61, 37, 27, 93, 51, 27, 31, 65]
                            }}
                        />
                    </Col>

                    <Col className="gutter-row" span={6} xs={24} md={12} lg={6}>
                        <WuiCardSummary
                            title={'UNIQUE PURCHASES'}
                            value={'3,137\n'}
                            percentage={'0.7%'}
                            type={"down"}
                            comparison={'than last week'}
                            data={{
                                label: 'Purchases',
                                labels: ['1 July 21', '2 July 21', '3 July 21', '4 July 21', '5 July 21', '6 July 21', '7 July 21', '8 July 21', '9 July 21', '10 July 21', '11 July 21', '12 July 21', '13 July 21', '14 July 21', '15 July 21', '16 July 21', '17 July 21', '18 July 21', '19 July 21', '20 July 21', '21 July 21', '22 July 21', '23 July 21', '24 July 21'],
                                data: [153, 138, 146, 141, 135, 162, 124, 135, 119, 154, 154, 145, 139, 147, 143, 156, 161, 137, 127, 193, 151, 127, 131, 165]
                            }}
                        />
                    </Col>

                    <Col className="gutter-row" span={6} xs={24} md={12} lg={6}>
                        <WuiCardSummary
                            title={'AVG. ORDER VALUE'}
                            value={'$306.20'}
                            percentage={'0.3%'}
                            type={"down"}
                            comparison={'than last week'}
                            data={{
                                label: 'Values',
                                labels: ['1 July 21', '2 July 21', '3 July 21', '4 July 21', '5 July 21', '6 July 21', '7 July 21', '8 July 21', '9 July 21', '10 July 21', '11 July 21', '12 July 21', '13 July 21', '14 July 21', '15 July 21', '16 July 21', '17 July 21', '18 July 21', '19 July 21', '20 July 21', '21 July 21', '22 July 21', '23 July 21', '24 July 21'],
                                data: [53, 38, 46, 41, 35, 62, 24, 35, 19, 54, 54, 45, 39, 47, 43, 56, 61, 37, 27, 93, 51, 27, 31, 65]
                            }}
                        />
                    </Col>

                    <Col className="gutter-row" span={6} xs={24} md={12} lg={6}>
                        <WuiCardSummary
                            title={'ORDER QUANTITY'}
                            value={'1,650'}
                            percentage={'2.1%'}
                            type={"up"}
                            comparison={'than last week'}
                            data={{
                                label: 'Quantities',
                                labels: ['1 July 21', '2 July 21', '3 July 21', '4 July 21', '5 July 21', '6 July 21', '7 July 21', '8 July 21', '9 July 21', '10 July 21', '11 July 21', '12 July 21', '13 July 21', '14 July 21', '15 July 21', '16 July 21', '17 July 21', '18 July 21', '19 July 21', '20 July 21', '21 July 21', '22 July 21', '23 July 21', '24 July 21'],
                                data: [153, 138, 146, 141, 135, 162, 124, 135, 119, 154, 154, 145, 139, 147, 143, 156, 161, 137, 127, 193, 151, 127, 131, 165]
                            }}
                        />
                    </Col>


                    <Col className="gutter-row" span={14} xs={24} md={24} lg={14}>
                        <WuiCardComparison
                            title={'Account & Monthly Recurring Revenue Growth'}
                            list={[
                                {
                                    value: '$620,076',
                                    label: 'MRR GROWTH',
                                    description: 'Measure How Fast You’re Growing Monthly Recurring Revenue.',
                                    legend: 'Growth'
                                },
                                {
                                    value: '$1,200',
                                    label: 'AVG. MRR/CUSTOMER',
                                    description: 'The revenue generated per account on a monthly or yearly basis.',
                                    legend: 'Actual'
                                }
                            ]}
                            labels={['1 July', '2 July', '3 July', '4 July', '5 July', '6 July', '7 July', '8 July', '9 July', '10 July', '11 July', '12 July', '13 July', '14 July', '15 July', '16 July', '17 July', '18 July', '19 July', '20 July']}
                            datasets={[
                                [53, 38, 46, 41, 35, 62, 24, 35, 19, 54, 54, 45, 39, 47, 43, 56, 61, 37, 27, 93],
                                [63, 48, 56, 51, 45, 72, 34, 45, 29, 64, 64, 55, 49, 57, 53, 66, 71, 47, 37, 103]
                            ]}
                        />
                    </Col>

                    <Col className="gutter-row" span={10} xs={24} md={24} lg={10}>
                        <WuiCardStacked
                            title={'Account Retention'}
                            subtitle={'Number of customers who have active subscription with you.'}
                            list={[
                                {
                                    value: '$1,680.50',
                                    label: 'EXPANSIONS',
                                    description: 'Customers who have upgraded the level of your products or service.',
                                },
                                {
                                    value: '$1,520.00',
                                    label: 'CANCELLATIONS',
                                    description: 'Customers who have ended their subscription with you.',
                                }
                            ]}
                            labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                            datasets={[
                                [12, 19, 3, 5, 2, 3, 14, 8, 7, 11, 14, 15],
                                [15, 16, 6, 9, 3, 6, 15, 14, 19, 12, 10, 17]
                            ]}
                        />
                    </Col>

                    <Col className="gutter-row" span={8} xs={24} md={12} lg={8}>
                        <WuiCardMore
                            title={'Transaction History'}
                            viewText={'View All Transactions'}
                            viewLink={'/'}
                            action={
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item key="0">
                                                Action One
                                            </Menu.Item>
                                            <Menu.Item key="1">
                                                Action Two
                                            </Menu.Item>
                                            <Menu.Divider />
                                            <Menu.Item key="3">Action Three</Menu.Item>
                                        </Menu>
                                    }
                                    trigger={['click']}
                                    placement="bottomRight"
                                >
                                    <MoreOutlined
                                        style={{
                                            fontSize: 20
                                        }}
                                        onClick={e => e.preventDefault()}
                                    />
                                </Dropdown>
                            }
                        >
                            <WuiListTransaction list={[
                                {
                                    icon: <CheckOutlined className="icon"/>,
                                    type: 'success',
                                    link: '/',
                                    title: 'Payment from #10322',
                                    datetime: 'Mar 21, 2019, 3:30pm',
                                    value: '+ $250.00',
                                    status: 'Completed'
                                },
                                {
                                    icon: <SwapOutlined className="icon"/>,
                                    type: 'process',
                                    link: '/',
                                    title: 'Process refund to #00910',
                                    datetime: 'Mar 21, 2019, 1:00pm',
                                    value: '+ $16.50',
                                    status: 'Completed'
                                },
                                {
                                    icon: <CarOutlined className="icon"/>,
                                    type: 'info',
                                    link: '/',
                                    title: 'Process delivery to #44333',
                                    datetime: 'Mar 20, 2019, 11:40am',
                                    value: '+ 3 Items',
                                    status: 'For Pickup'
                                },
                                {
                                    icon: <CheckOutlined className="icon"/>,
                                    type: 'success',
                                    link: '/',
                                    title: 'Payment from #10322',
                                    datetime: 'Mar 21, 2019, 3:30pm',
                                    value: '+ $129.50',
                                    status: 'Completed'
                                },
                                {
                                    icon: <CloseOutlined className="icon"/>,
                                    type: 'danger',
                                    link: '/',
                                    title: 'Payment failed from #087651',
                                    datetime: 'Mar 19, 2019, 12:54pm',
                                    value: '+ $150.00',
                                    status: 'Declined'
                                }
                            ]}/>
                        </WuiCardMore>
                    </Col>

                    <Col className="gutter-row" span={8} xs={24} md={12} lg={8}>
                        <WuiCardMore
                            title={'New Customers'}
                            viewText={'View More Customers'}
                            viewLink={'/'}
                            action={
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item key="0">
                                                Action One
                                            </Menu.Item>
                                            <Menu.Item key="1">
                                                Action Two
                                            </Menu.Item>
                                            <Menu.Divider />
                                            <Menu.Item key="3">Action Three</Menu.Item>
                                        </Menu>
                                    }
                                    trigger={['click']}
                                    placement="bottomRight"
                                >
                                    <MoreOutlined
                                        style={{
                                            fontSize: 20
                                        }}
                                        onClick={e => e.preventDefault()}
                                    />
                                </Dropdown>
                            }
                        >
                            <WuiListCustomer
                                list={[
                                    {
                                        title: 'Socrates Itumay',
                                        subtitle: 'Customer ID#00222',
                                        aliases: 'SI'
                                    },
                                    {
                                        title: 'Reynante Labares',
                                        subtitle: 'Customer ID#00221',
                                        aliases: 'RL',
                                        src: '/images/profile-user-1.jpg'
                                    },
                                    {
                                        title: 'Marianne Audrey',
                                        subtitle: 'Customer ID#00220',
                                        aliases: 'MA',
                                        src: '/images/profile-user-2.jpg'
                                    },
                                    {
                                        title: 'Owen Bongcaras',
                                        subtitle: 'Customer ID#00219',
                                        aliases: 'OB',
                                    },
                                    {
                                        title: 'Kirby Avendula',
                                        subtitle: 'Customer ID#00218',
                                        aliases: 'KA',
                                    }
                                ]}
                            />
                        </WuiCardMore>
                    </Col>

                    <Col className="gutter-row" span={8} xs={24} md={12} lg={8}>

                    </Col>

                    <Col className="gutter-row" span={8} xs={24} md={12} lg={8}>
                        <WuiCardStatistic value={'3,605'} label={'CLICK THROUGH'} subtitle={'No. of clicks to ad that consist of a single impression.'} color={'#66A4FB'}/>
                    </Col>

                    <Col className="gutter-row" span={8} xs={24} md={12} lg={8}>
                        <WuiCardStatistic value={'3,266'} label={'VIEW THROUGH'} subtitle={'Estimated daily unique views per visitor on the ads.'} color={'#7EE5E5'}/>
                    </Col>

                    <Col className="gutter-row" span={8} xs={24} md={12} lg={8}>
                        <WuiCardStatistic value={'8,765'} label={'TOTAL CONVERSIONS'} subtitle={'Estimated total conversions on ads per impressions to ads.'} color={'#F77EB9'}/>
                    </Col>
                </Row>
            </WuiContainer>
        </>
    )
}

export default AppDashboard
