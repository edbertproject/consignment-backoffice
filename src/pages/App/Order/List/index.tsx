import { useTranslation } from "react-i18next";
import { useIsMounted } from "../../../../@framework/utilities/hooks";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import WuiContainer from "../../../../@framework/wui/components/Container";
import Button from "antd/es/button";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import WuiSectionTitle from "../../../../@framework/wui/components/Sections/Title";
import React, { useEffect, useMemo } from "react";
import useDebounce from "../../../../@framework/utilities/hooks/useDebounce";
import { useState } from "@hookstate/core";
import Table from "antd/es/table";
import Space from "antd/es/space";
import { AxiosError, AxiosResponse } from "axios";
import Col from "antd/es/grid/col";
import Input from "antd/es/input";
import Row from "antd/es/grid/row";
import Tag from "antd/es/tag";
import moment from "moment";
import OrderRepository from "../../../../repositories/OrderRepository";
import { ORDER_TAG_COLOR } from "../../../../constant";

var qs = require("qs");

const breadcrumbs = [
  {
    label: "Order",
  },
];

const AppOrderList: React.FC<any> = () => {
  const { t } = useTranslation();
  const isMounted = useIsMounted();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  let fullPath = window.location.pathname;

  const tablePage = useState<number>(parseInt(searchParams.get("page") || "1"));
  const tablePerPage = useState<number>(
    parseInt(searchParams.get("perPage") || "10")
  );
  const [tableLoading, setTableLoading] = React.useState<boolean>(false);
  const tableSort = useState<{
    sortField: any;
    sortOrder: any;
  }>({
    sortField: searchParams.get("sortField"),
    sortOrder: searchParams.get("sortOrder"),
  });
  const tableData = useState([]);
  const totalData = useState<number>(0);

  const getTableData = async (reset: boolean = false) => {
    setTableLoading(true);

    if (reset) tablePage.set(1);

    let params = {
      page: tablePage.get(),
      search: debouncedSearch,
      order_by: tableSort.sortField.get() || "created_at",
      sorted_by: tableSort.sortOrder.get() || "desc",
      per_page: tablePerPage.get(),
      with: "product;partner.user;user",
    };

    await OrderRepository.all(params)
      .then((res: AxiosResponse) => {
        if (res.data.data) {
          tableData.set(res.data.data);
        }

        totalData.set(res.data?.meta?.total || 0);

        setTableLoading(false);
      })
      .catch((e: AxiosError) => {
        setTableLoading(false);
      });
  };

  const handleTableChange = (
    pagination: any,
    filters: any,
    sorter: any,
    extra: any
  ) => {
    tablePage.set(pagination.current);
    tablePerPage.set(pagination.pageSize);

    if (sorter.order) {
      tableSort.sortField.set(sorter.field);
      tableSort.sortOrder.set(sorter.order);
    } else {
      tableSort.sortField.set(null);
      tableSort.sortOrder.set(null);
    }

    setFilterDataToQuery();
  };

  // For Search Input
  const [search, setSearch] = React.useState<string>("");
  const debouncedSearch = useDebounce<string>(search, 1000);

  useEffect(() => {
    if (!isMounted) {
      setFilterDataToQuery();
    }
    // eslint-disable-next-line
  }, [debouncedSearch]);

  const getFilterDataFromQuery = () => {
    const keyword = searchParams.get("keyword");

    if (keyword) {
      setSearch(keyword);
    }

    getTableData();
  };

  useMemo(() => {
    getFilterDataFromQuery();
    // eslint-disable-next-line
  }, []);

  const setFilterDataToQuery = () => {
    let params = {};
    let reset = false;

    if (debouncedSearch) {
      Object.assign(params, {
        keyword: debouncedSearch,
      });

      if (debouncedSearch !== searchParams.get("keyword")) {
        reset = true;
      }
    }

    if (tablePage.get() !== 1) {
      if (reset) {
        Object.assign(params, {
          page: 1,
        });
      } else {
        Object.assign(params, {
          page: tablePage.get(),
        });
      }
    }

    if (tablePerPage.get() !== 10) {
      Object.assign(params, {
        perPage: tablePerPage.get(),
      });
    }

    if (tableSort.sortField.get()) {
      Object.assign(params, {
        sortField: tableSort.sortField.get(),
      });
    }

    if (tableSort.sortOrder.get()) {
      Object.assign(params, {
        sortOrder: tableSort.sortOrder.get(),
      });
    }

    const queryParams = qs.stringify(params, { indices: false });

    if (queryParams) {
      setSearchParams(`?${queryParams}`);
    } else {
      navigate("");
    }

    getTableData(reset);
  };

  const columns: any = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      sorter: true,
      defaultSortOrder:
        tableSort.sortField.get() === "number" && tableSort.sortOrder.get(),
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      sorter: true,
      defaultSortOrder:
        tableSort.sortField.get() === "user" && tableSort.sortOrder.get(),
      render: (data: any) => {
        return data?.name ?? "";
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: true,
      defaultSortOrder:
        tableSort.sortField.get() === "date" && tableSort.sortOrder.get(),
      render: (date: any) => {
        return moment(date).format("DD MMM YYYY");
      },
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      sorter: true,
      defaultSortOrder:
        tableSort.sortField.get() === "product" && tableSort.sortOrder.get(),
      render: (data: any) => {
        return data?.name ?? "";
      },
    },
    {
      title: "Partner",
      dataIndex: "partner",
      key: "partner",
      sorter: true,
      defaultSortOrder:
        tableSort.sortField.get() === "partner" && tableSort.sortOrder.get(),
      render: (data: any, row: any) => {
        return row?.partner?.user?.name ?? "-";
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
      defaultSortOrder:
        tableSort.sortField.get() === "status" && tableSort.sortOrder.get(),
      render: (status: any) => {
        return (
          <Tag color={ORDER_TAG_COLOR[status]} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Link to={fullPath + "/" + record.id}>Lihat Detail</Link>
        </Space>
      ),
    },
  ];

  // Modal

  return (
    <>
      <WuiContainer>
        <WuiSectionTitle
          title={"Order"}
          breadcrumbs={breadcrumbs}
        ></WuiSectionTitle>

        <Row gutter={[10, 10]} className="mb16">
          <Col className="gutter-row" span={6} xs={24} md={12} lg={10}>
            <Input
              allowClear
              placeholder={t("common.filter.search.placeholder")}
              prefix={<SearchOutlined />}
              value={search}
              onChange={(value) => {
                setSearch(value.target.value);
              }}
            />
          </Col>
        </Row>

        <Table
          rowKey={"id"}
          bordered
          columns={columns}
          dataSource={tableData.get()}
          loading={tableLoading}
          onChange={handleTableChange}
          pagination={{
            current: tablePage.get(),
            simple: true,
            pageSize: tablePerPage.get(),
            total: totalData.get(),
          }}
        />
      </WuiContainer>
    </>
  );
};

export default AppOrderList;
