import React, { useEffect, useRef } from "react";
import WuiContainer from "../../../../@framework/wui/components/Container";
import PageHeader from "antd/es/page-header";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "antd/es/card";
import Space from "antd/es/space";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Form from "antd/lib/form";
import { Col, InputNumber, Row, Spin, Table } from "antd";
import { useState } from "@hookstate/core";
import {
  handleBackendError,
  haveAccess,
  openNotification,
  toFileList,
} from "../../../../functions/global";
import { AxiosError, AxiosResponse } from "axios";
import ProductRepository from "../../../../repositories/ProductRepository";

import Accessible from "../../../../@framework/wui/components/Accessible";
import useAccess from "../../../../@framework/utilities/hooks/useAccess";
import WuiUploadImages from "../../../../@framework/wui/components/UploadImages";
import WuiSelectSingle from "../../../../@framework/wui/components/Select/Single";
import ProductCategoryRepository from "../../../../repositories/ProductCategoryRepository";
import Select from "antd/es/select";
import {
  PARTNER_ROLE,
  PRODUCT_CONDITION_OPTIONS,
  PRODUCT_TYPE_AUCTION,
  PRODUCT_TYPE_CONSIGN,
  PRODUCT_TYPE_OPTIONS,
  PRODUCT_TYPE_SPECIAL_AUCTION,
  PRODUCT_WARRANTY_OPTIONS,
} from "../../../../constant";
import { Option } from "antd/lib/mentions";
import DatePicker from "antd/es/date-picker";
import moment from "moment/moment";
import NumberFormatter from "../../../../@framework/wui/formatters/number";
import WuiFormTitle from "../../../../@framework/wui/components/Form/Title";
import { Editor } from "@tinymce/tinymce-react";
import { useAppSelector } from "../../../../stores/hooks";
import OrderRepository from "../../../../repositories/OrderRepository";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import Modal from "antd/lib/modal";

const tinyApiKey = () => process.env.REACT_APP_TINY_API_KEY;

let title = "Product";

const AppProductForm: React.FC<any> = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const pageTitle = id
    ? t("common.text.editItem", { item: title })
    : t("common.text.addNewItem", { item: title });

  // Form
  const [form] = Form.useForm();
  const watchType = Form.useWatch("type", form);
  const watchParticipant = Form.useWatch("participant", form);
  const participants = useState<any[]>([]);
  const disable = useState(false);
  const loading = useState(false);
  const termEditorRef = useRef<any>(null);
  const showModalCancel = useState<boolean>(false);
  const cancelReason = useState<string>("");

  const system = useAppSelector((state) => state.system);

  const acl = useAccess();

  const onFinish = async (data: any) => {
    disable.set(true);

    const formData = new FormData();

    let payload: any = {
      product_category_id: data.product_category.value,
      name: data?.name,
      type: data?.type,
      start_date: moment(data?.start_date).format("YYYY-MM-DD HH:mm"),
      end_date: data?.end_date
        ? moment(data?.end_date).format("YYYY-MM-DD HH:mm")
        : null,
      weight: data?.weight,
      quantity: data?.quantity,
      long_dimension: data?.long_dimension,
      wide_dimension: data?.wide_dimension,
      high_dimension: data?.high_dimension,
      condition: data?.condition,
      warranty: data?.warranty,
      description: data?.description,
    };

    if (payload.type === PRODUCT_TYPE_CONSIGN) {
      payload = {
        ...payload,
        price: data?.price,
      };
    }

    if (payload.type === PRODUCT_TYPE_SPECIAL_AUCTION) {
      payload = {
        ...payload,
        participant: data?.participant,
        eligible_participants: participants.get(),
      };
    }

    if (
      [PRODUCT_TYPE_AUCTION, PRODUCT_TYPE_SPECIAL_AUCTION].includes(
        payload.type
      )
    ) {
      payload = {
        ...payload,
        start_price: data?.start_price,
        multiplied_price: data?.multiplied_price,
        // desired_price: data?.desired_price,
      };
    }

    for (let prop in payload) {
      if (prop === "eligible_participants") {
        payload[prop].forEach((item: any) => {
          formData.append(prop + "[]", item.id ?? null);
        });
      } else {
        formData.append(prop, payload[prop] ?? null);
      }
    }

    if (data.photos) {
      data.photos.forEach((file: any) => {
        if (file?.status === "done") {
          if (file.id) {
            formData.append("photos_keep", file.id);
          } else {
            formData.append("photos[]", file);
          }
        } else {
          formData.append("photos[]", file);
        }
      });
    }

    if (id) {
      formData.append("_method", "PUT");
    }

    await (!id
      ? ProductRepository.create(formData)
      : ProductRepository.update(id, formData)
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

  const getParticipants = async () => {
    loading.set(true);
    await ProductRepository.getParticipant({
      participant: form.getFieldValue("participant"),
    })
      .then((res: AxiosResponse) => {
        const { data } = res.data;

        participants.set(data);
        loading.set(false);
      })
      .catch((e: AxiosError) => {
        handleBackendError(e, t("notification.error.default"));
        loading.set(false);
      });
  };

  useEffect(() => {
    if (id) {
      getData();
    } else {
      form.setFieldValue("can_update", true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getData = async () => {
    disable.set(true);

    await ProductRepository.show(id, {
      with: "photos;productCategory;participants",
    })
      .then((res: AxiosResponse) => {
        const data = res.data?.data || {};

        form.setFieldsValue({
          ...data,
          start_date: moment(data.start_date),
          end_date: data.end_date ? moment(data.end_date) : null,
          product_category: {
            value: data.product_category?.id,
            label: data.product_category?.name,
          },
          photos: toFileList(data?.photos),
        });

        participants.set(data.participants);

        if (haveAccess(acl, "write product")) {
          disable.set(false);
        }
      })
      .catch((e: AxiosError) => {});
  };

  const updateStatus = async (
    status: "Approved" | "Cancel Approved" | "Rejected"
  ) => {
    loading.set(true);

    let payload = {
      status: status,
    };

    await ProductRepository.updateStatus(id, payload)
      .then((res: AxiosResponse) => {
        openNotification(
          "success",
          t("notification.success.updateItem", { item: title })
        );
        loading.set(false);
        getData();
      })
      .catch((e: AxiosError) => {
        handleBackendError(e, t("notification.error.default"));
        loading.set(false);
      });
  };

  const updateCancel = async () => {
    loading.set(true);
    let payload = {
      cancel_reason: "Lorem",
    };

    await ProductRepository.cancel(id, payload)
      .then((res: AxiosResponse) => {
        openNotification(
          "success",
          t("notification.success.updateItem", { item: title })
        );
        loading.set(false);
        showModalCancel.set(false);
        getData();
      })
      .catch((e: AxiosError) => {
        handleBackendError(e, t("notification.error.default"));
        loading.set(false);
      });
  };

  const participantColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
          <Row gutter={[16, 16]}>
            <Col
              className="gutter-row"
              md={{
                span: 14,
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
                    <div className="input-section">
                      <Form.Item
                        name="product_category"
                        label={"Product Category"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Product Category",
                            }),
                          },
                        ]}
                      >
                        <WuiSelectSingle
                          disabled={disable.get()}
                          repository={ProductCategoryRepository}
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
                        name="type"
                        label={"Type"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", { item: "Type" }),
                          },
                        ]}
                      >
                        <Select
                          disabled={disable.get()}
                          size={"large"}
                          style={{
                            width: "100%",
                          }}
                          placeholder="Pilih Type"
                        >
                          {PRODUCT_TYPE_OPTIONS.filter((e) => {
                            if (system.account.role.includes(PARTNER_ROLE))
                              return e !== PRODUCT_TYPE_SPECIAL_AUCTION;
                            return true;
                          }).map((item: any) => (
                            <Option key={item} value={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>

                  {watchType === PRODUCT_TYPE_CONSIGN && (
                    <div className="wui-form-group type-column">
                      <div className="input-section">
                        <Form.Item
                          name="price"
                          label={"Price"}
                          rules={[
                            {
                              required: true,
                              message: t("validation.required", {
                                item: "Price",
                              }),
                            },
                          ]}
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            disabled={disable.get()}
                            min={0}
                            size={"large"}
                            formatter={(value) => NumberFormatter(value)}
                            placeholder={t("common.text.input", {
                              item: "Price",
                            })}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  )}

                  {watchType === PRODUCT_TYPE_SPECIAL_AUCTION && (
                    <div className="input-section">
                      <Form.Item
                        name="participant"
                        label={"Participant"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Participant",
                            }),
                          },
                        ]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          disabled={disable.get()}
                          min={0}
                          size={"large"}
                          formatter={(value) => NumberFormatter(value)}
                          placeholder={t("common.text.input", {
                            item: "Participant",
                          })}
                        />
                      </Form.Item>
                    </div>
                  )}

                  {[
                    PRODUCT_TYPE_AUCTION,
                    PRODUCT_TYPE_SPECIAL_AUCTION,
                  ].includes(watchType) && (
                    <>
                      <div className="wui-form-group type-column">
                        <div className="input-section">
                          <Form.Item
                            name="start_price"
                            label={"Start Price"}
                            rules={[
                              {
                                required: true,
                                message: t("validation.required", {
                                  item: "Start Price",
                                }),
                              },
                            ]}
                          >
                            <InputNumber
                              style={{ width: "100%" }}
                              disabled={disable.get()}
                              min={0}
                              size={"large"}
                              formatter={(value) => NumberFormatter(value)}
                              placeholder={t("common.text.input", {
                                item: "Start Price",
                              })}
                            />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="wui-form-group type-column">
                        <div className="input-section">
                          <Form.Item
                            name="multiplied_price"
                            label={"Multiplied Price"}
                            rules={[
                              {
                                required: true,
                                message: t("validation.required", {
                                  item: "Multiplied Price",
                                }),
                              },
                            ]}
                          >
                            <InputNumber
                              style={{ width: "100%" }}
                              disabled={disable.get()}
                              min={0}
                              size={"large"}
                              formatter={(value) => NumberFormatter(value)}
                              placeholder={t("common.text.input", {
                                item: "Multiplied Price",
                              })}
                            />
                          </Form.Item>
                        </div>
                      </div>

                      {/*<div className="wui-form-group type-column">*/}
                      {/*  <div className="input-section">*/}
                      {/*    <Form.Item*/}
                      {/*      name="desired_price"*/}
                      {/*      label={"Desired Price"}*/}
                      {/*      rules={[*/}
                      {/*        {*/}
                      {/*          required: true,*/}
                      {/*          message: t("validation.required", {*/}
                      {/*            item: "Desired Price",*/}
                      {/*          }),*/}
                      {/*        },*/}
                      {/*      ]}*/}
                      {/*    >*/}
                      {/*      <InputNumber*/}
                      {/*        style={{ width: "100%" }}*/}
                      {/*        disabled={disable.get()}*/}
                      {/*        min={0}*/}
                      {/*        size={"large"}*/}
                      {/*        formatter={(value) => NumberFormatter(value)}*/}
                      {/*        placeholder={t("common.text.input", {*/}
                      {/*          item: "Desired Price",*/}
                      {/*        })}*/}
                      {/*      />*/}
                      {/*    </Form.Item>*/}
                      {/*  </div>*/}
                      {/*</div>*/}
                    </>
                  )}

                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="start_date"
                        label={"Start Date"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Start Date",
                            }),
                          },
                        ]}
                      >
                        <DatePicker
                          disabled={disable.get()}
                          disabledDate={(current) => {
                            let customDate =
                              moment().format("YYYY-MM-DD HH:mm");
                            return (
                              current &&
                              current < moment(customDate, "YYYY-MM-DD HH:mm")
                            );
                          }}
                          showTime
                          format="DD-MM-YYYY HH:mm"
                          style={{ width: 400, maxWidth: "100%" }}
                          size={"large"}
                          onChange={() => {}}
                          placeholder={t("common.text.input", {
                            item: "Tanggal Mulai",
                          })}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="end_date"
                        label={"End Date"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "End Date",
                            }),
                          },
                        ]}
                      >
                        <DatePicker
                          disabled={disable.get()}
                          disabledDate={(current) => {
                            let customDate =
                              moment().format("YYYY-MM-DD HH:mm");
                            return (
                              current &&
                              current < moment(customDate, "YYYY-MM-DD HH:mm")
                            );
                          }}
                          showTime
                          format="DD-MM-YYYY HH:mm"
                          style={{ width: 400, maxWidth: "100%" }}
                          size={"large"}
                          onChange={() => {}}
                          placeholder={t("common.text.input", {
                            item: "Tanggal Berakhir",
                          })}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="weight"
                        label={"Weight (kg)"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Weight",
                            }),
                          },
                        ]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          disabled={disable.get()}
                          min={0}
                          size={"large"}
                          placeholder={t("common.text.input", {
                            item: "Weight",
                          })}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="quantity"
                        label={"Quantity"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Quantity",
                            }),
                          },
                        ]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          disabled={disable.get()}
                          min={0}
                          size={"large"}
                          placeholder={t("common.text.input", {
                            item: "Quantity",
                          })}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="long_dimension"
                        label={"Long Dimension (cm)"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Long Dimension",
                            }),
                          },
                        ]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          disabled={disable.get()}
                          min={0}
                          size={"large"}
                          placeholder={t("common.text.input", {
                            item: "Long Dimension",
                          })}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="wide_dimension"
                        label={"Wide Dimension (cm)"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Wide Dimension",
                            }),
                          },
                        ]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          disabled={disable.get()}
                          min={0}
                          size={"large"}
                          placeholder={t("common.text.input", {
                            item: "Wide Dimension",
                          })}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="high_dimension"
                        label={"High Dimension (cm)"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "High Dimension",
                            }),
                          },
                        ]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          disabled={disable.get()}
                          min={0}
                          size={"large"}
                          placeholder={t("common.text.input", {
                            item: "High Dimension",
                          })}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="condition"
                        label={"Condition"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Condition",
                            }),
                          },
                        ]}
                      >
                        <Select
                          disabled={disable.get()}
                          size={"large"}
                          style={{
                            width: "100%",
                          }}
                          placeholder="Pilih Condition"
                        >
                          {PRODUCT_CONDITION_OPTIONS.map((item: any) => (
                            <Option key={item} value={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>

                  <div className="wui-form-group type-column">
                    <div className="input-section">
                      <Form.Item
                        name="warranty"
                        label={"Warranty"}
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Warranty",
                            }),
                          },
                        ]}
                      >
                        <Select
                          disabled={disable.get()}
                          size={"large"}
                          style={{
                            width: "100%",
                          }}
                          placeholder="Pilih Warranty"
                        >
                          {PRODUCT_WARRANTY_OPTIONS.map((item: any) => (
                            <Option key={item} value={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>

                  <div className="wui-form-group type-column">
                    <WuiFormTitle title={"Description"} required />
                    <div className="input-section">
                      <Editor
                        disabled={disable.get()}
                        apiKey={tinyApiKey()}
                        initialValue={form.getFieldValue("description")}
                        onBlur={(e) => {
                          if (!e.target) return;
                          form.setFieldsValue({
                            ...form.getFieldsValue(true),
                            description: e.target.getContent(),
                          });
                        }}
                        cloudChannel="5-stable"
                        onInit={(evt, editor) =>
                          (termEditorRef.current = editor)
                        }
                        init={{
                          branding: false,
                          height: 300,
                          placeholder: "Input Description",
                          menubar: false,
                        }}
                      />
                      <Form.Item
                        name="description"
                        className="editor-form-item"
                        rules={[
                          {
                            required: true,
                            message: t("validation.required", {
                              item: "Description",
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

            <Col
              className="gutter-row"
              md={{
                span: 10,
                order: 2,
              }}
              xs={{
                span: 24,
                order: 1,
              }}
            >
              <Card title={t("common.text.image")}>
                <Form.Item name="photos">
                  {!disable.get() && <WuiUploadImages max={5} />}
                </Form.Item>
              </Card>

              {watchType === PRODUCT_TYPE_SPECIAL_AUCTION && (
                <Card
                  className="mt16"
                  title="Eligible User"
                  extra={
                    <Spin spinning={loading.get()}>
                      <Button
                        className="wui-btn"
                        type="primary"
                        size={"small"}
                        disabled={disable.get() || !watchParticipant}
                        onClick={getParticipants}
                      >
                        {t("common.button.generate")}
                      </Button>
                    </Spin>
                  }
                >
                  {participants.get() && (
                    <Table
                      dataSource={participants.get()}
                      columns={participantColumns}
                    />
                  )}
                </Card>
              )}
            </Col>
          </Row>

          <div className="wui-form-btn-group">
            {form.getFieldValue("can_cancel") && (
              <Accessible access="write product">
                <Spin spinning={loading.get()}>
                  <Button
                    className="wui-btn"
                    danger
                    size={"large"}
                    disabled={disable.get()}
                    onClick={() => showModalCancel.set(true)}
                  >
                    {t("common.button.canceled")}
                  </Button>
                </Spin>
              </Accessible>
            )}
            {form.getFieldValue("can_reject") && (
              <Accessible access="write product">
                <Spin spinning={loading.get()}>
                  <Button
                    className="wui-btn"
                    danger
                    size={"large"}
                    disabled={disable.get()}
                    onClick={() => updateStatus("Rejected")}
                  >
                    {t("common.button.reject")}
                  </Button>
                </Spin>
              </Accessible>
            )}
            {form.getFieldValue("can_approve_cancel") && (
              <Accessible access="write product">
                <Spin spinning={loading.get()}>
                  <Button
                    className="wui-btn"
                    type="primary"
                    size={"large"}
                    disabled={disable.get()}
                    onClick={() => updateStatus("Cancel Approved")}
                  >
                    {t("common.button.acceptCancel")}
                  </Button>
                </Spin>
              </Accessible>
            )}
            {form.getFieldValue("can_approve") && (
              <Accessible access="write product">
                <Spin spinning={loading.get()}>
                  <Button
                    className="wui-btn"
                    type="primary"
                    size={"large"}
                    disabled={disable.get()}
                    onClick={() => updateStatus("Approved")}
                  >
                    {t("common.button.approve")}
                  </Button>
                </Spin>
              </Accessible>
            )}
            {form.getFieldValue("can_update") && (
              <Accessible access="write product">
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
            )}
          </div>
        </Form>

        <Modal
          title={t("modal.confirmation.headerTitle")}
          centered
          open={showModalCancel.get()}
          onCancel={() => showModalCancel.set(false)}
          footer={[
            <Button key="back" onClick={() => showModalCancel.set(false)}>
              {t("common.button.cancel")}
            </Button>,
            <Button
              key="submit"
              type="primary"
              danger
              loading={loading.get()}
              onClick={updateCancel}
            >
              {t("common.button.confirm")}
            </Button>,
          ]}
        >
          <div className="content">
            <Input
              placeholder="Alasan cancel"
              value={cancelReason.get()}
              onChange={(e) => cancelReason.set(e.target.value)}
            />
          </div>
        </Modal>
      </WuiContainer>
    </>
  );
};

export default AppProductForm;
