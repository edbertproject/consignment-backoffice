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
import { Col, Row, Spin } from "antd";
import { useState } from "@hookstate/core";
import {
  handleBackendError,
  haveAccess,
  openNotification,
  toFileList,
} from "../../../../../functions/global";
import { AxiosError, AxiosResponse } from "axios";
import UserInternalRepository from "../../../../../repositories/UserInternalRepository";
import WuiSelectSingle from "../../../../../@framework/wui/components/Select/Single";
import Accessible from "../../../../../@framework/wui/components/Accessible";
import useAccess from "../../../../../@framework/utilities/hooks/useAccess";
import RoleRepository from "../../../../../repositories/RoleRepository";
import WuiUploadImages from "../../../../../@framework/wui/components/UploadImages";

let title = "Internal";

const AppSettingsUserInternalForm: React.FC<any> = () => {
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

  const acl = useAccess();

  const onFinish = async (data: any) => {
    disable.set(true);

    const formData = new FormData();

    let payload: any = {
      username: data.username,
      name: data.name,
      password: data?.password,
      email: data.email,
      phone_number: data.phone_number,
      role_id: data.role.value,
    };

    for (let prop in payload) {
      formData.append(prop, payload[prop] ?? null);
    }

    if (data.photo) {
      data.photo.forEach((file: any) => {
        if (file?.status === "done") {
          formData.append("photo_keep", file.id);
          formData.append("photo", file);
        } else {
          formData.append("photo", file);
        }
      });
    }

    if (id) {
      formData.append("_method", "PUT");
    }

    await (!id
      ? UserInternalRepository.create(formData)
      : UserInternalRepository.update(id, formData)
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
        }
      })
      .catch((e: AxiosError) => {
        handleBackendError(e, t("notification.error.default"));
        disable.set(false);
      });
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getData = async () => {
    disable.set(true);

    await UserInternalRepository.show(id, { with: "photo" })
      .then((res: AxiosResponse) => {
        const data = res.data?.data || {};

        form.setFieldsValue({
          username: data.username,
          name: data.name,
          email: data.email,
          phone_number: data.phone_number,
          role: {
            value: data.role?.id,
            label: data.role?.name,
          },
          photo: toFileList(data?.photo),
        });

        if (haveAccess(acl, "write user internal")) {
          disable.set(false);
        }
      })
      .catch((e: AxiosError) => {});
  };

  return (
    <>
      <WuiContainer>
        <PageHeader
          className="default-page-header"
          onBack={() => navigate(-1)}
          title={pageTitle}
        />

        <Form form={form} layout={"vertical"} onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col
              className="gutter-row"
              md={{
                span: 16,
                order: 1,
              }}
              xs={{
                span: 24,
                order: 2,
              }}
            >
              <Card>
                <Space
                  style={{
                    width: "100%",
                  }}
                  direction="vertical"
                  size={5}
                >
                  <div className="wui-form-group type-column">
                    {id && (
                      <div className="wui-form-group type-column">
                        <div className="input-section">
                          <Form.Item name="id" label={"ID"}>
                            <Input
                              defaultValue={id}
                              disabled
                              size={"large"}
                              placeholder={t("common.text.input", {
                                item: "ID",
                              })}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    )}
                    <div className="input-section">
                      <Form.Item
                        name="username"
                        label={"Username"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Username",
                            }),
                          },
                        ]}
                      >
                        <Input
                          disabled={disable.get()}
                          size={"large"}
                          placeholder={t("common.text.input", {
                            item: "Username",
                          })}
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
                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="email"
                        label={"Email"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Email",
                            }),
                          },
                          {
                            type: "email",
                            message: t("validation.type.email", {
                              item: "Email",
                            }),
                          },
                        ]}
                      >
                        <Input
                          disabled={disable.get()}
                          size={"large"}
                          placeholder={t("common.text.input", {
                            item: "Email",
                          })}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="password"
                        label={"Password"}
                        rules={[
                          !id
                            ? {
                                required: true,
                                message: t("validation.required", {
                                  item: "Password",
                                }),
                              }
                            : {},
                          {
                            min: 8,
                            message: t("validation.type.min", {
                              item: "Password",
                              min: 8,
                            }),
                          },
                        ]}
                      >
                        <Input
                          disabled={disable.get()}
                          size={"large"}
                          placeholder={t("common.text.input", {
                            item: "Password",
                          })}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="phone_number"
                        label={"Phone Number"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Phone Number",
                            }),
                          },
                          {
                            pattern: new RegExp("^[0-9]*$"),
                            message:
                              "Nomor handphone tidak valid. Contoh: 08131234567",
                          },
                          {
                            min: 11,
                            message: t("validation.type.min", {
                              item: "Phone Number",
                              min: 11,
                            }),
                          },
                          {
                            max: 14,
                            message: t("validation.type.max", {
                              item: "Phone Number",
                              max: 14,
                            }),
                          },
                        ]}
                      >
                        <Input
                          disabled={disable.get()}
                          size={"large"}
                          placeholder={t("common.text.input", {
                            item: "Phone Number",
                          })}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="role"
                        label={"Role"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", { item: "Role" }),
                          },
                        ]}
                      >
                        <WuiSelectSingle
                          disabled={disable.get()}
                          repository={RoleRepository}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>

            <Col
              className="gutter-row"
              md={{
                span: 8,
                order: 2,
              }}
              xs={{
                span: 24,
                order: 1,
              }}
            >
              <Card title={t("common.text.image")}>
                <Form.Item name="photo">
                  {!disable.get() && <WuiUploadImages />}
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <div className="wui-form-btn-group">
            <Button
              className="wui-btn"
              size={"large"}
              onClick={() => navigate(-1)}
            >
              {t("common.button.cancel")}
            </Button>
            <Accessible access="write user internal">
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

export default AppSettingsUserInternalForm;
