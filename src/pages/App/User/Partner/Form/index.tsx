import React, { useEffect, useRef } from "react";
import WuiContainer from "../../../../../@framework/wui/components/Container";
import PageHeader from "antd/es/page-header";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "antd/es/card";
import Space from "antd/es/space";
import Input from "antd/es/input";
import Form from "antd/lib/form";
import { Col, Row, Spin } from "antd";
import { useState } from "@hookstate/core";
import {
  handleBackendError,
  openNotification,
  toFileList,
} from "../../../../../functions/global";
import { AxiosError, AxiosResponse } from "axios";
import UserPartnerRepository from "../../../../../repositories/UserPartnerRepository";
import WuiSelectSingle from "../../../../../@framework/wui/components/Select/Single";
import WuiUploadImages from "../../../../../@framework/wui/components/UploadImages";
import WuiFormTitle from "../../../../../@framework/wui/components/Form/Title";
import { Editor } from "@tinymce/tinymce-react";
import ProvinceRepository from "../../../../../repositories/ProvinceRepository";
import CityRepository from "../../../../../repositories/CityRepository";
import DistrictRepository from "../../../../../repositories/DistrictRepository";
import Button from "antd/es/button";
import Accessible from "../../../../../@framework/wui/components/Accessible";
import Text from "antd/es/typography/Text";
import WuiModalConfirmation from "../../../../../@framework/wui/components/Modal/Confirmation";

const tinyApiKey = () => process.env.REACT_APP_TINY_API_KEY;

let title = "Partner";

const AppUserPartnerForm: React.FC<any> = () => {
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
  const canUpdateStatus = useState(false);
  const termEditorRef = useRef<any>(null);

  useEffect(() => {
    if (id) {
      getData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getData = async () => {
    disable.set(true);

    await UserPartnerRepository.show(id, { with: "photo" })
      .then((res: AxiosResponse) => {
        const data = res.data?.data || {};

        canUpdateStatus.set(data?.can_update_status);

        form.setFieldsValue({
          ...data,
          province: data.province
            ? {
                value: data.province?.id,
                label: data.province?.name,
              }
            : null,
          city: data.city
            ? {
                value: data.city?.id,
                label: data.city?.name,
              }
            : null,
          district: data.district
            ? {
                value: data.district?.id,
                label: data.district?.name,
              }
            : null,
          photo: toFileList(data?.photo),
        });
        disable.set(false);
      })
      .catch((e: AxiosError) => {});
  };

  // modal
  const showApproveModal = useState(false);
  const showRejectModal = useState(false);

  const setApproveModal = () => {
    showApproveModal.set(true);
  };

  const setRejectModal = () => {
    showRejectModal.set(true);
  };

  const approveModalCallback = async () => {
    await UserPartnerRepository.updateStatus(id, { status: "Approved" })
      .then((res: AxiosResponse) => {
        showApproveModal.set(false);
        openNotification(
          "success",
          t("notification.success.approveItem", { item: "Partner" })
        );
        navigate(-1);
      })
      .catch((e: AxiosError) => {
        showApproveModal.set(false);
        handleBackendError(e, t("notification.error.default"));
      });
  };

  const rejectModalCallback = async () => {
    await UserPartnerRepository.updateStatus(id, { status: "Rejected" })
      .then((res: AxiosResponse) => {
        showRejectModal.set(false);
        openNotification(
          "success",
          t("notification.success.rejectItem", { item: "Partner" })
        );
        navigate(-1);
      })
      .catch((e: AxiosError) => {
        showRejectModal.set(false);
        handleBackendError(e, t("notification.error.default"));
      });
  };

  return (
    <>
      <WuiContainer>
        <PageHeader
          className="default-page-header"
          onBack={() => navigate(-1)}
          title={pageTitle}
        />

        <Form form={form} layout={"vertical"}>
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
                        name="date_of_birth"
                        label={"Date Of Birth"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Date Of Birth",
                            }),
                          },
                        ]}
                      >
                        <Input
                          disabled={disable.get()}
                          size={"large"}
                          placeholder={t("common.text.input", {
                            item: "Date Of Birth",
                          })}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="gender"
                        label={"Gender"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Gender",
                            }),
                          },
                        ]}
                      >
                        <Input
                          disabled={disable.get()}
                          size={"large"}
                          placeholder={t("common.text.input", {
                            item: "Gender",
                          })}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="postal_code"
                        label={"Postal Code"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Postal Code",
                            }),
                          },
                        ]}
                      >
                        <Input
                          disabled={disable.get()}
                          size={"large"}
                          placeholder={t("common.text.input", {
                            item: "Postal Code",
                          })}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="province"
                        label={"Province"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Province",
                            }),
                          },
                        ]}
                      >
                        <WuiSelectSingle
                          disabled={disable.get()}
                          repository={ProvinceRepository}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="city"
                        label={"City"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", { item: "City" }),
                          },
                        ]}
                      >
                        <WuiSelectSingle
                          disabled={disable.get()}
                          repository={CityRepository}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="district"
                        label={"District"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "District",
                            }),
                          },
                        ]}
                      >
                        <WuiSelectSingle
                          disabled={disable.get()}
                          repository={DistrictRepository}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="wui-form-group type-column">
                    <WuiFormTitle title={"Full Address"} required />
                    <div className="input-section">
                      <Editor
                        disabled={disable.get()}
                        apiKey={tinyApiKey()}
                        initialValue={form.getFieldValue("full_address")}
                        onBlur={(e) => {
                          if (!e.target) return;
                          form.setFieldsValue({
                            ...form.getFieldsValue(true),
                            full_address: e.target.getContent(),
                          });
                        }}
                        cloudChannel="5-stable"
                        onInit={(evt, editor) =>
                          (termEditorRef.current = editor)
                        }
                        init={{
                          branding: false,
                          height: 300,
                          placeholder: "Input Full Address",
                          menubar: false,
                        }}
                      />
                      <Form.Item
                        name="full_address"
                        className="editor-form-item"
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Full Address",
                            }),
                          },
                        ]}
                      >
                        <Input hidden />
                      </Form.Item>
                    </div>
                  </div>
                </Space>
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
            {canUpdateStatus.get() && (
              <Accessible access="write user partner">
                <>
                  <Button
                    className="wui-btn"
                    type={"primary"}
                    danger
                    size={"large"}
                    onClick={() => setRejectModal()}
                  >
                    {t("common.button.reject")}
                  </Button>
                  <Button
                    className="wui-btn"
                    type={"primary"}
                    size={"large"}
                    onClick={() => setApproveModal()}
                  >
                    {t("common.button.accept")}
                  </Button>
                </>
              </Accessible>
            )}
          </div>

          <WuiModalConfirmation
            show={showApproveModal.get()}
            onOk={approveModalCallback}
            headerTitle={t("modal.confirmation.headerTitleText", {
              text: "Terima",
            })}
            subtitle={t("modal.confirmation.subtitleGeneral")}
            confirmLabel={"Konfirmasi"}
            onCancel={() => showApproveModal.set(false)}
          />
          <WuiModalConfirmation
            show={showRejectModal.get()}
            onOk={rejectModalCallback}
            headerTitle={t("modal.confirmation.headerTitleText", {
              text: "Tolak",
            })}
            subtitle={t("modal.confirmation.subtitleGeneral")}
            confirmLabel={"Konfirmasi"}
            onCancel={() => showRejectModal.set(false)}
          />
        </Form>
      </WuiContainer>
    </>
  );
};

export default AppUserPartnerForm;
