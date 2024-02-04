import React, { useEffect, useMemo, useState } from "react";
import WuiContainer from "../../../@framework/wui/components/Container";
import WuiSectionTitle from "../../../@framework/wui/components/Sections/Title";
import { SwapOutlined } from "@ant-design/icons";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import {
  WuiCardMore,
  WuiCardSummary,
} from "../../../@framework/wui/components/Card";
import WuiListTransaction from "../../../@framework/wui/components/List/Transaction";
import { AxiosError, AxiosResponse } from "axios";
import DashboardRepository from "../../../repositories/DashboardRepository";
import NumberFormatter from "../../../@framework/wui/formatters/number";
import moment from "moment";
import { useAppSelector } from "../../../stores/hooks";
import { PARTNER_ROLE } from "../../../constant";

interface ComparisonGraph {
  prev_month: number;
  current_month: number;
  comparison_percentage: number;
}

const AppDashboard: React.FC<any> = () => {
  const breadcrumbs = [
    {
      label: "Dashboard",
      link: "/dashboard",
    },
  ];

  const [salesLoading, setSalesLoading] = useState<boolean>(true);
  const [salesAccumulation, setSalesAccumulation] = useState<ComparisonGraph>();

  const [bidLoading, setBidLoading] = useState<boolean>(true);
  const [totalBid, setTotalBid] = useState<ComparisonGraph>();

  const [productLoading, setProductLoading] = useState<boolean>(true);
  const [productPosting, setProductPosting] = useState<ComparisonGraph>();

  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [userRegister, setUserRegister] = useState<ComparisonGraph>();

  const [orderLoading, setOrderLoading] = useState<boolean>(true);
  const [pendingOrder, setPendingOrder] = useState<any[]>();

  const system = useAppSelector((state) => state.system);

  const getPendingOrder = async () => {
    setOrderLoading(true);
    await DashboardRepository.pendingOrder()
      .then((res: AxiosResponse) => {
        if (res.data.data) {
          setPendingOrder(res.data.data);
        }

        setOrderLoading(false);
      })
      .catch((e: AxiosError) => {
        setOrderLoading(false);
      });
  };

  const getUserRegister = async () => {
    setUserLoading(true);
    await DashboardRepository.userRegister()
      .then((res: AxiosResponse) => {
        if (res.data.data) {
          setUserRegister(res.data.data);
        }

        setUserLoading(false);
      })
      .catch((e: AxiosError) => {
        setUserLoading(false);
      });
  };

  const getProductPosting = async () => {
    setProductLoading(true);
    await DashboardRepository.productPosting()
      .then((res: AxiosResponse) => {
        if (res.data.data) {
          setProductPosting(res.data.data);
        }

        setProductLoading(false);
      })
      .catch((e: AxiosError) => {
        setProductLoading(false);
      });
  };

  const getTotalBid = async () => {
    setBidLoading(true);
    await DashboardRepository.bidAccumulation()
      .then((res: AxiosResponse) => {
        if (res.data.data) {
          setTotalBid(res.data.data);
        }

        setBidLoading(false);
      })
      .catch((e: AxiosError) => {
        setBidLoading(false);
      });
  };

  const getSalesAccumulation = async () => {
    setSalesLoading(true);
    await DashboardRepository.salesAccumulation()
      .then((res: AxiosResponse) => {
        if (res.data.data) {
          setSalesAccumulation(res.data.data);
        }

        setSalesLoading(false);
      })
      .catch((e: AxiosError) => {
        setSalesLoading(false);
      });
  };

  useEffect(() => {
    getPendingOrder().catch();
    getProductPosting().catch();
    getSalesAccumulation().catch();
    getTotalBid().catch();

    if (!system.account.role.includes(PARTNER_ROLE)) {
      getUserRegister().catch();
    }
  }, [system.account.role]);

  const currentMonth = useMemo(() => {
    return moment().format("MMMM YYYY");
  }, []);

  const prevMonth = useMemo(() => {
    return moment().subtract(1, "month").format("MMMM YYYY");
  }, []);

  return (
    <>
      <WuiContainer>
        <WuiSectionTitle
          breadcrumbs={breadcrumbs}
          title={"Welcome To Dashboard"}
        />

        <Row gutter={[10, 10]}>
          <Col className="gutter-row" span={6} xs={24} md={12} lg={6}>
            <WuiCardSummary
              loading={salesLoading}
              title={"SALES"}
              value={`Rp.${NumberFormatter(salesAccumulation?.current_month)}`}
              percentage={`${salesAccumulation?.comparison_percentage}%`}
              type={
                (salesAccumulation?.comparison_percentage ?? 0) < 0
                  ? "down"
                  : "up"
              }
              comparison={"than last month"}
              data={{
                label: "Conversions",
                labels: [prevMonth, currentMonth],
                data: [
                  salesAccumulation?.prev_month,
                  salesAccumulation?.current_month,
                ],
              }}
            />
          </Col>
          <Col className="gutter-row" span={6} xs={24} md={12} lg={6}>
            <WuiCardSummary
              loading={bidLoading}
              title={"TOTAL BID"}
              value={`Rp.${NumberFormatter(totalBid?.current_month)}`}
              percentage={`${totalBid?.comparison_percentage}%`}
              type={(totalBid?.comparison_percentage ?? 0) < 0 ? "down" : "up"}
              comparison={"than last month"}
              data={{
                label: "Conversions",
                labels: [prevMonth, currentMonth],
                data: [totalBid?.prev_month, totalBid?.current_month],
              }}
            />
          </Col>
          <Col className="gutter-row" span={6} xs={24} md={12} lg={6}>
            <WuiCardSummary
              loading={productLoading}
              title={"PRODUCT POSTING"}
              value={productPosting?.current_month ?? 0}
              percentage={`${productPosting?.comparison_percentage}%`}
              type={
                (productPosting?.comparison_percentage ?? 0) < 0 ? "down" : "up"
              }
              comparison={"than last month"}
              data={{
                label: "Conversions",
                labels: [prevMonth, currentMonth],
                data: [
                  productPosting?.prev_month,
                  productPosting?.current_month,
                ],
              }}
            />
          </Col>

          {!system.account.role.includes(PARTNER_ROLE) && (
            <Col className="gutter-row" span={6} xs={24} md={12} lg={6}>
              <WuiCardSummary
                loading={userLoading}
                title={"USER REGISTER"}
                value={userRegister?.current_month ?? 0}
                percentage={`${userRegister?.comparison_percentage}%`}
                type={
                  (userRegister?.comparison_percentage ?? 0) < 0 ? "down" : "up"
                }
                comparison={"than last month"}
                data={{
                  label: "Conversions",
                  labels: [prevMonth, currentMonth],
                  data: [userRegister?.prev_month, userRegister?.current_month],
                }}
              />
            </Col>
          )}

          <Col className="gutter-row" span={6} xs={24} md={12} lg={6}>
            <WuiCardMore
              loading={orderLoading}
              title={"Pending Order"}
              viewText={"View All Order"}
              viewLink={"/order"}
            >
              <WuiListTransaction
                list={
                  pendingOrder?.map((order) => {
                    return {
                      icon: <SwapOutlined className="icon" />,
                      type:
                        order.status === "Process"
                          ? "warning"
                          : order.status === "Paid"
                          ? "success"
                          : "danger",
                      link: "/order/" + order.id,
                      title: order.number,
                      datetime: moment(order.created_at).format("MMM Do YY"),
                      value: order.product.type,
                      status: order.status,
                    };
                  }) ?? []
                }
              />
            </WuiCardMore>
          </Col>
          {/*<Col className="gutter-row" span={8} xs={24} md={12} lg={8}>*/}
          {/*  <WuiCardMore*/}
          {/*    title={"Questions"}*/}
          {/*    viewText={"View More Questions"}*/}
          {/*    viewLink={"/"}*/}
          {/*    action={*/}
          {/*      <Dropdown*/}
          {/*        overlay={*/}
          {/*          <Menu>*/}
          {/*            <Menu.Item key="0">Action One</Menu.Item>*/}
          {/*            <Menu.Item key="1">Action Two</Menu.Item>*/}
          {/*            <Menu.Divider />*/}
          {/*            <Menu.Item key="3">Action Three</Menu.Item>*/}
          {/*          </Menu>*/}
          {/*        }*/}
          {/*        trigger={["click"]}*/}
          {/*        placement="bottomRight"*/}
          {/*      >*/}
          {/*        <MoreOutlined*/}
          {/*          style={{*/}
          {/*            fontSize: 20,*/}
          {/*          }}*/}
          {/*          onClick={(e) => e.preventDefault()}*/}
          {/*        />*/}
          {/*      </Dropdown>*/}
          {/*    }*/}
          {/*  >*/}
          {/*    <WuiListCustomer*/}
          {/*      list={[*/}
          {/*        {*/}
          {/*          title: "Socrates Itumay",*/}
          {/*          subtitle: "Customer ID#00222",*/}
          {/*          aliases: "SI",*/}
          {/*        },*/}
          {/*        {*/}
          {/*          title: "Reynante Labares",*/}
          {/*          subtitle: "Customer ID#00221",*/}
          {/*          aliases: "RL",*/}
          {/*          src: "/images/profile-user-1.jpg",*/}
          {/*        },*/}
          {/*        {*/}
          {/*          title: "Marianne Audrey",*/}
          {/*          subtitle: "Customer ID#00220",*/}
          {/*          aliases: "MA",*/}
          {/*          src: "/images/profile-user-2.jpg",*/}
          {/*        },*/}
          {/*        {*/}
          {/*          title: "Owen Bongcaras",*/}
          {/*          subtitle: "Customer ID#00219",*/}
          {/*          aliases: "OB",*/}
          {/*        },*/}
          {/*        {*/}
          {/*          title: "Kirby Avendula",*/}
          {/*          subtitle: "Customer ID#00218",*/}
          {/*          aliases: "KA",*/}
          {/*        },*/}
          {/*      ]}*/}
          {/*    />*/}
          {/*  </WuiCardMore>*/}
          {/*</Col>*/}
          <Col className="gutter-row" span={8} xs={24} md={12} lg={8}></Col>
        </Row>
      </WuiContainer>
    </>
  );
};

export default AppDashboard;
