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
import Text from "antd/es/typography/Text";
import WuiModalConfirmation from "../../../../@framework/wui/components/Modal/Confirmation";
import {
  handleBackendError,
  openNotification,
} from "../../../../functions/global";
import Accessible from "../../../../@framework/wui/components/Accessible";
import ProductCategoryRepository from "../../../../repositories/ProductCategoryRepository";
import Col from "antd/es/grid/col";
import Input from "antd/es/input";
import Row from "antd/es/grid/row";

var qs = require("qs");

const breadcrumbs = [
  {
    label: "Product Category",
  },
];

const AppProductCategoryList: React.FC<any> = () => {
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
      order_by: tableSort.sortField.get() || "id",
      sorted_by: tableSort.sortOrder.get() || "desc",
      per_page: tablePerPage.get(),
    };

    await ProductCategoryRepository.all(params)
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
      title: "Code",
      dataIndex: "code",
      key: "code",
      sorter: true,
      defaultSortOrder:
        tableSort.sortField.get() === "code" && tableSort.sortOrder.get(),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      defaultSortOrder:
        tableSort.sortField.get() === "name" && tableSort.sortOrder.get(),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Link to={fullPath + "/" + record.id}>Lihat Detail</Link>
          <Accessible access="delete product category">
            <Text
              className="cursor-pointer"
              type={"danger"}
              onClick={() => setDeleteModal(record.id)}
            >
              Hapus
            </Text>
          </Accessible>
        </Space>
      ),
    },
  ];

  // Modal
  const showDeleteModal = useState(false);
  const selectedDeleteId = useState(0);

  const setDeleteModal = (id: any) => {
    selectedDeleteId.set(id);
    showDeleteModal.set(true);
  };

  const deleteModalCallback = async () => {
    if (selectedDeleteId.get()) {
      await ProductCategoryRepository.delete(selectedDeleteId.get())
        .then((res: AxiosResponse) => {
          showDeleteModal.set(false);
          selectedDeleteId.set(0);
          openNotification(
            "success",
            t("notification.success.deleteItem", { item: "User" })
          );
          getTableData(true);
        })
        .catch((e: AxiosError) => {
          showDeleteModal.set(false);
          selectedDeleteId.set(0);
          handleBackendError(e, t("notification.error.default"));
        });
    }
  };

  return (
    <>
      <WuiContainer>
        <WuiSectionTitle title={"Product Category"} breadcrumbs={breadcrumbs}>
          <Accessible access="write product category">
            <Button
              onClick={() => navigate(fullPath + "/form")}
              type="primary"
              icon={<PlusOutlined />}
            >
              {t("common.button.addNew")}
            </Button>
          </Accessible>
        </WuiSectionTitle>

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

      <WuiModalConfirmation
        show={showDeleteModal.get()}
        onOk={deleteModalCallback}
        onCancel={() => showDeleteModal.set(false)}
      />
    </>
  );
};

export default AppProductCategoryList;
