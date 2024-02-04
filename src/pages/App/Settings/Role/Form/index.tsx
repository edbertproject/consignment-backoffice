import React, { useEffect } from "react";
import WuiContainer from "../../../../../@framework/wui/components/Container";
import PageHeader from "antd/es/page-header";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "antd/es/card";
import Space from "antd/es/space";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Form from "antd/lib/form";
import { Checkbox, Spin, Table } from "antd";
import { useState } from "@hookstate/core";
import {
  handleBackendError,
  haveAccess,
  openNotification,
} from "../../../../../functions/global";
import { AxiosError, AxiosResponse } from "axios";
import Accessible from "../../../../../@framework/wui/components/Accessible";
import useAccess from "../../../../../@framework/utilities/hooks/useAccess";
import RoleRepository from "../../../../../repositories/RoleRepository";

let title = "Role";

const AppSettingsRoleForm: React.FC<any> = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const pageTitle = id
    ? t("common.text.editItem", { item: title })
    : t("common.text.addNewItem", { item: title });

  // Form
  const [form] = Form.useForm();
  const disable = useState(false);
  const loading = useState(false);
  let permissionIds: any = {};
  const permissionIdValues = useState([]);
  const permissionRawDataObj: any = useState({});
  const permissionRawDataArr = useState([]);
  const acl = useAccess();

  const onFinish = async (data: any) => {
    loading.set(true);

    let payload = {
      code: data.code,
      name: data.name,
      permission_ids: permissionIdValues.get(),
    };

    await (!id
      ? RoleRepository.create(payload)
      : RoleRepository.update(id, payload)
    )
      .then((res: AxiosResponse) => {
        navigate(-1);

        if (!id) {
          openNotification(
            "success",
            t("notification.success.createItem", { item: title })
          );
        } else {
          openNotification(
            "success",
            t("notification.success.updateItem", { item: title })
          );
          loading.set(false);
        }
      })
      .catch((e: AxiosError) => {
        handleBackendError(e, t("notification.error.default"));
        loading.set(false);
      });
  };

  useEffect(() => {
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getData = async () => {
    disable.set(true);

    await RoleRepository.show(id, { with: "permissions" })
      .then((res: AxiosResponse) => {
        const data = res.data?.data || {};

        form.setFieldsValue({
          code: data.code,
          name: data.name,
        });
        permissionIdValues.set(data.permissions.map((item: any) => item.id));
        initCheckbox();

        if (haveAccess(acl, "write role")) {
          disable.set(false);
        }
      })
      .catch((e: AxiosError) => {});
  };

  const init = async () => {
    disable.set(true);
    await RoleRepository.permissionOptions({ page: 1, per_page: 9999 })
      .then((res: AxiosResponse) => {
        const data = res.data?.data || [];
        let dataObj: any = {};
        data.forEach((item: any) => {
          const name = (item.name || "").toLowerCase();
          let type = "";
          if (name.includes("write")) {
            type = "write";
          } else if (name.includes("read")) {
            type = "read";
          } else if (name.includes("delete")) {
            type = "delete";
          }
          let key = name.replace(`${type} `, "");
          if (!permissionIds[key]) {
            permissionIds[key] = {};
          }
          permissionIds[key][type] = item.id;
          dataObj[item.id] = item;
        });

        permissionRawDataObj.set(dataObj);
        permissionRawDataArr.set(data);

        if (haveAccess(acl, "write role")) {
          disable.set(false);
        }
      })
      .catch((e: AxiosError) => {});

    if (id) {
      await getData();
    } else {
      initCheckbox();
    }
  };

  const initCheckbox = async () => {
    let filteredIds = permissionRawDataArr.get().map((it: any) => it.id);
    let masterKey: string[] = Object.keys(permissionIds);
    const masterAccessType = ["read", "write", "delete"];

    const master: any = generateCheckboxId(
      masterKey,
      masterAccessType,
      filteredIds
    );
    masterAccess.set(master);
  };

  const generateCheckboxId = (
    keys: Array<string>,
    types: Array<string>,
    filteredIds: Array<number>
  ) => {
    let result: any = [];
    keys.forEach((item) => {
      const key = item.toLowerCase();
      let obj: any = {
        key: key,
        name: item,
      };
      types.forEach((type) => {
        let id: number = -1;

        try {
          id = permissionIds[key][type];
          if (filteredIds.includes(id)) {
            obj[`${type}Id`] = id;
            const objData = permissionRawDataObj.get()[id];
            obj.name = objData["label"];
          } else {
            obj.broken = true;
          }
        } catch (err) {}
        let arr: any = permissionIdValues.get() || [];
        obj[type] = arr.includes(id);
      });
      if (obj.broken) {
        if (obj.readId || obj.writeId || obj.deleteId) {
          obj.broken = false;
        }
      }

      if (!obj.broken) {
        result.push(obj);
      }
    });
    return result;
  };

  const handleChange = (id: number) => {
    let arr: any = permissionIdValues.get() || [];
    if (arr.includes(id)) {
      arr = arr.filter((item: any) => item !== id);
    } else {
      arr = [...arr, id];
    }

    permissionIdValues.set(arr);
  };

  const handleChecked = (id: number) => {
    let arr: any = permissionIdValues.get() || [];

    if (arr.includes(id)) {
      return true;
    } else {
      return false;
    }
  };

  const masterAccess = useState([]);
  const masterAccessColumns = [
    {
      title: "",
      dataIndex: "name",
      key: "name",
      width: "30%",
      render: (text: any, record: any) => (
        <span style={{ textTransform: "capitalize" }}>{text}</span>
      ),
    },
    {
      title: "Read",
      dataIndex: "read",
      key: "read",
      render: (text: any, record: any) =>
        record.readId ? (
          <Checkbox
            disabled={disable.get()}
            checked={handleChecked(record.readId)}
            onChange={() => handleChange(record.readId)}
          />
        ) : (
          <span />
        ),
    },
    {
      title: "Write",
      dataIndex: "write",
      key: "write",
      render: (text: any, record: any) =>
        record.writeId ? (
          <Checkbox
            disabled={disable.get()}
            checked={handleChecked(record.writeId)}
            onChange={() => handleChange(record.writeId)}
          />
        ) : (
          <span />
        ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (text: any, record: any) =>
        record.deleteId ? (
          <Checkbox
            disabled={disable.get()}
            checked={handleChecked(record.deleteId)}
            onChange={() => handleChange(record.deleteId)}
          />
        ) : (
          <span />
        ),
    },
  ];

  return (
    <>
      <WuiContainer>
        <PageHeader
          className="default-page-header"
          onBack={() => navigate(-1)}
          title={pageTitle}
        />

        <Form form={form} layout={"vertical"} onFinish={onFinish}>
          <Card>
            <Space
              style={{
                width: "100%",
              }}
              direction="vertical"
              size={25}
            >
              <div className="wui-form-group type-column">
                <div className="input-section">
                  <Form.Item
                    name="code"
                    label={"Code"}
                    rules={[
                      {
                        required: true,
                        message: t("validation.required", { item: "Code" }),
                      },
                    ]}
                  >
                    <Input
                      disabled={disable.get()}
                      size={"large"}
                      placeholder={t("common.text.input", { item: "Code" })}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="wui-form-group type-column">
                <div className="input-section">
                  <Form.Item
                    name="name"
                    label={"Name"}
                    rules={[
                      {
                        required: true,
                        message: t("validation.required", { item: "Name" }),
                      },
                    ]}
                  >
                    <Input
                      disabled={disable.get()}
                      size={"large"}
                      placeholder={t("common.text.input", { item: "Name" })}
                    />
                  </Form.Item>
                </div>
              </div>
            </Space>
          </Card>

          <br />

          <Card>
            <Space
              style={{
                width: "100%",
              }}
              direction="vertical"
              size={10}
            >
              <div>Izin Peran</div>
              <Table
                dataSource={masterAccess.get()}
                columns={masterAccessColumns}
                pagination={false}
              ></Table>
            </Space>
          </Card>

          <div className="wui-form-btn-group">
            <Button
              className="wui-btn"
              size={"large"}
              onClick={() => navigate(-1)}
            >
              {t("common.button.cancel")}
            </Button>
            <Accessible access="write role">
              <Spin spinning={loading.get()}>
                <Button
                  className="wui-btn"
                  htmlType="submit"
                  type="primary"
                  size={"large"}
                  disabled={disable.get()}
                >
                  {t("common.button.save")}
                </Button>
              </Spin>
            </Accessible>
          </div>
        </Form>
      </WuiContainer>
    </>
  );
};

export default AppSettingsRoleForm;
