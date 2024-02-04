import React, { useEffect, useRef } from "react";
import WuiContainer from "../../../../@framework/wui/components/Container";
import PageHeader from "antd/es/page-header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "antd/es/card";
import Space from "antd/es/space";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Form from "antd/lib/form";
import { Col, InputNumber, Modal, Row, Spin, Steps } from "antd";
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
  ORDER_SELLER_MAIN_STATUSES,
  ORDER_SELLER_STATUS_CANCELED,
  ORDER_SELLER_STATUS_COMPLAIN,
  ORDER_SELLER_STATUS_COMPLETE,
  ORDER_SELLER_STATUS_WAITING_CONFIRM,
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
import Text from "antd/lib/typography/Text";
import WuiSectionTitle from "../../../../@framework/wui/components/Sections/Title";
import WuiSideLayout from "../../../../@framework/wui/components/Form/SideLayout";
const { Step } = Steps;
const tinyApiKey = () => process.env.REACT_APP_TINY_API_KEY;

let title = "Order";

const AppOrderForm: React.FC<any> = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const pageTitle = id
    ? t("common.text.editItem", { item: title })
    : t("common.text.addNewItem", { item: title });

  // Form Modal
  const [formModal] = Form.useForm();

  const formData = useState<any>({
    date: "",
    number: "",
    invoice: "",
    user: "",
    user_address: "",
    product: "",
    partner: "",
    quantity: "",
    status: "",
    next_status: "",
    can_process_next_status: "",
    status_seller: "",
    next_status_seller: "",
    can_process_next_status_seller: "",
    status_buyer: "",
    next_status_buyer: "",
    can_process_next_status_buyer: "",
  });

  const disable = useState(false);
  const loading = useState(false);
  const steps = useState(ORDER_SELLER_MAIN_STATUSES);
  const currentStep = useState<number>(0);

  useEffect(() => {
    if (id) {
      getData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getData = async () => {
    disable.set(true);

    await OrderRepository.show(id, {
      with: "partner;sellerStatuses;user;userAddress;product;invoice.paymentMethod",
    })
      .then((res: AxiosResponse) => {
        let data = res.data?.data;
        formData.set(data);

        const statusSeller = data.seller_statuses
          .reverse()
          .map((e: any) => e.status);

        let newSteps: string[];
        if (data.status_seller === ORDER_SELLER_STATUS_CANCELED) {
          newSteps = [...statusSeller];
        } else if (data.status_seller === ORDER_SELLER_STATUS_COMPLAIN) {
          newSteps = [...statusSeller, ORDER_SELLER_STATUS_COMPLETE];
        } else {
          const lastStep = statusSeller.slice(-1).pop();

          if (lastStep) {
            const currentLastStep = ORDER_SELLER_MAIN_STATUSES.findIndex(
              (value) => value === lastStep
            );
            newSteps = [
              ...statusSeller,
              ...ORDER_SELLER_MAIN_STATUSES.slice(currentLastStep + 1),
            ];
          } else {
            newSteps = steps.get();
          }
        }

        steps.set(newSteps);
        currentStep.set(
          newSteps.findIndex((value) => data.status_seller === value)
        );

        disable.set(false);
      })
      .catch((e: AxiosError) => {});
  };

  // Modal

  const updateNextStatus = async () => {
    loading.set(true);

    let payload = {
      status: formData.get().next_status,
    };

    await OrderRepository.updateStatusComplete(id, payload)
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

  const updateNextStatusSeller = async (status: string) => {
    loading.set(true);

    let payload = {
      status: status,
    };

    await OrderRepository.updateStatusSeller(id, payload)
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

  return (
    <>
      <WuiContainer>
        <PageHeader
          className="default-page-header"
          onBack={() => navigate(-1)}
          title={pageTitle}
        />

        <Row gutter={[16, 16]}>
          <Col
            className="gutter-row"
            md={{
              span: 20,
              order: 1,
            }}
            xs={{
              span: 24,
              order: 2,
            }}
          >
            <Card
              title={t("common.text.itemInformation", { item: "Order" })}
              className="mb16"
            >
              <Space
                style={{
                  width: "100%",
                }}
                direction="vertical"
                size={25}
              >
                <Row justify="space-between">
                  <Col span={5}>
                    <Card>
                      <Text strong>Order Number</Text>
                      <div>{formData.get().number}</div>
                    </Card>
                  </Col>
                  <Col span={5}>
                    <Card>
                      <Text strong>Date</Text>
                      <div>{formData.get().date}</div>
                    </Card>
                  </Col>
                  <Col span={5}>
                    <Card>
                      <Text strong>Total</Text>
                      <div>
                        {NumberFormatter(formData.get().invoice?.grand_total)}
                      </div>
                    </Card>
                  </Col>
                  <Col span={5}>
                    <Card>
                      <Text strong>Payment Method</Text>
                      <div>{formData.get().invoice?.payment_method?.name}</div>
                    </Card>
                  </Col>
                </Row>

                <Steps current={currentStep.get()} labelPlacement="vertical">
                  {steps.get().map((e) => (
                    <Step title={e} />
                  ))}
                </Steps>

                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Space
                      style={{
                        width: "100%",
                      }}
                      direction="vertical"
                      size={15}
                    >
                      <h3 className="bold">Total Amount</h3>

                      <WuiSideLayout
                        title="Subtotal"
                        value={NumberFormatter(
                          formData.get().invoice?.subtotal
                        )}
                      />

                      <WuiSideLayout
                        title="Tax"
                        value={NumberFormatter(
                          formData.get().invoice?.tax_amount
                        )}
                      />

                      <WuiSideLayout
                        title="Admin Fee"
                        value={NumberFormatter(
                          formData.get().invoice?.admin_fee
                        )}
                      />

                      <WuiSideLayout
                        title="Platform Fee"
                        value={NumberFormatter(
                          formData.get().invoice?.platform_fee
                        )}
                      />

                      <WuiSideLayout
                        title="Shipping Fee"
                        value={NumberFormatter(
                          formData.get().invoice?.courier_cost
                        )}
                      />

                      <WuiSideLayout
                        title="Grand Total"
                        value={NumberFormatter(
                          formData.get().invoice?.grand_total
                        )}
                      />
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space
                      style={{
                        width: "100%",
                      }}
                      direction="vertical"
                      size={15}
                    >
                      <h3 className="bold">Order Details</h3>

                      <WuiSideLayout
                        title="Buyer"
                        value={formData.get().user?.name}
                      />

                      <WuiSideLayout
                        title="Address"
                        value={formData.get().user_address?.full_address}
                      />

                      <WuiSideLayout title="Total Item" value="1 Item" />
                    </Space>
                  </Col>
                </Row>
              </Space>
            </Card>
          </Col>
        </Row>

        <div className="wui-form-btn-group">
          {formData.get().can_process_next_status && (
            <Accessible access={["write order"]}>
              <Button
                className="wui-btn"
                size={"large"}
                onClick={updateNextStatus}
              >
                Update status to {formData.get().next_status}
              </Button>
            </Accessible>
          )}

          {formData.get().can_process_next_status_seller &&
            formData.get().next_status_seller?.map((status: string) => (
              <Accessible access={["write order"]}>
                <Spin spinning={loading.get()}>
                  <Button
                    className="wui-btn"
                    size={"large"}
                    type="primary"
                    onClick={() => updateNextStatusSeller(status)}
                    danger={status === ORDER_SELLER_STATUS_CANCELED}
                  >
                    Update status to {status}
                  </Button>
                </Spin>
              </Accessible>
            ))}
        </div>
      </WuiContainer>
    </>
  );
};

export default AppOrderForm;
