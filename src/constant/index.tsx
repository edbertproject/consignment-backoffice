interface DefaultMap {
  [name: string]: string;
}

export const PARTNER_ROLE = "Partner";

export const ORDER_SELLER_STATUS_WAITING_CONFIRM = "Waiting Confirm";
export const ORDER_SELLER_STATUS_PROCESSING = "Processing";
export const ORDER_SELLER_STATUS_CANCELED = "Canceled";
export const ORDER_SELLER_STATUS_ON_DELIVERY = "On Delivery";
export const ORDER_SELLER_STATUS_ARRIVED = "Arrived";
export const ORDER_SELLER_STATUS_COMPLAIN = "On Complain";
export const ORDER_SELLER_STATUS_COMPLETE = "Complete";

export const ORDER_SELLER_MAIN_STATUSES = [
  ORDER_SELLER_STATUS_WAITING_CONFIRM,
  ORDER_SELLER_STATUS_PROCESSING,
  ORDER_SELLER_STATUS_ON_DELIVERY,
  ORDER_SELLER_STATUS_ARRIVED,
  ORDER_SELLER_STATUS_COMPLETE,
];

export const ORDER_STATUS_WAITING_PAYMENT = "Waiting Payment";
export const ORDER_STATUS_EXPIRED = "Expired";
export const ORDER_STATUS_PAID = "Paid";
export const ORDER_STATUS_PROCESS = "Process";
export const ORDER_STATUS_PROBLEM = "Problem";
export const ORDER_STATUS_FINISH = "Finish";
export const ORDER_STATUS_CANCELED = "Canceled";

export const ORDER_TAG_COLOR: DefaultMap = {
  [ORDER_STATUS_WAITING_PAYMENT]: "processing",
  [ORDER_STATUS_EXPIRED]: "red",
  [ORDER_STATUS_PAID]: "success",
  [ORDER_STATUS_PROCESS]: "warning",
  [ORDER_STATUS_PROBLEM]: "red",
  [ORDER_STATUS_FINISH]: "default",
  [ORDER_STATUS_CANCELED]: "red",
};

export const PARTNER_STATUS_WAITING = "Waiting Approval";
export const PARTNER_STATUS_APPROVED = "Approved";
export const PARTNER_STATUS_REJECTED = "Rejected";

export const PARTNER_TAG_COLOR: DefaultMap = {
  [PARTNER_STATUS_WAITING]: "warning",
  [PARTNER_STATUS_APPROVED]: "success",
  [PARTNER_STATUS_REJECTED]: "red",
};

export const PRODUCT_STATUS_WAITING_APPROVAL = "Waiting Approval";
export const PRODUCT_STATUS_WAITING_CANCEL_APPROVAL = "Waiting Cancel Approval";
export const PRODUCT_STATUS_APPROVED = "Approved";
export const PRODUCT_STATUS_REJECTED = "Rejected";
export const PRODUCT_STATUS_CANCELED = "Canceled";
export const PRODUCT_STATUS_ACTIVE = "Active";
export const PRODUCT_STATUS_SOLD = "Sold";
export const PRODUCT_STATUS_CLOSED = "Closed";

export const PRODUCT_STATUS_COLOR: DefaultMap = {
  [PRODUCT_STATUS_WAITING_APPROVAL]: "warning",
  [PRODUCT_STATUS_WAITING_CANCEL_APPROVAL]: "warning",
  [PRODUCT_STATUS_APPROVED]: "success",
  [PRODUCT_STATUS_REJECTED]: "red",
  [PRODUCT_STATUS_CANCELED]: "red",
  [PRODUCT_STATUS_ACTIVE]: "blue",
  [PRODUCT_STATUS_SOLD]: "grey",
  [PRODUCT_STATUS_CLOSED]: "red",
};

export const PRODUCT_CONDITION_BNIB = "Brand New In Box";
export const PRODUCT_CONDITION_BNOB = "Brand New Open Box";
export const PRODUCT_CONDITION_VGOOD = "Very Good Condition";
export const PRODUCT_CONDITION_GOOD = "Good Condition";
export const PRODUCT_CONDITION_JUDGE = "Judge By Picture";
export const PRODUCT_CONDITION_OPTIONS = [
  PRODUCT_CONDITION_BNIB,
  PRODUCT_CONDITION_BNOB,
  PRODUCT_CONDITION_VGOOD,
  PRODUCT_CONDITION_GOOD,
  PRODUCT_CONDITION_JUDGE,
];

export const PRODUCT_WARRANTY_ON = "On";
export const PRODUCT_WARRANTY_OFF = "Off";
export const PRODUCT_WARRANTY_OPTIONS = [
  PRODUCT_WARRANTY_ON,
  PRODUCT_WARRANTY_OFF,
];

export const PRODUCT_TYPE_CONSIGN = "Consign";
export const PRODUCT_TYPE_AUCTION = "Auction";
export const PRODUCT_TYPE_SPECIAL_AUCTION = "Special Auction";
export const PRODUCT_TYPE_OPTIONS = [
  PRODUCT_TYPE_CONSIGN,
  PRODUCT_TYPE_AUCTION,
  PRODUCT_TYPE_SPECIAL_AUCTION,
];

export const PROMOTION_TYPE_PROMOTIONAL = "Promotional";
export const PROMOTION_TYPE_PROGRAM = "Program";

export const SURVEY_TYPE_SHORT_ANSWER = "SHORT_ANSWER";
export const SURVEY_TYPE_MULTIPLE_CHOICE = "MULTIPLE_CHOICE";
export const SURVEY_TYPE_CHECK_BOX = "CHECK_BOX";
export const SURVEY_TYPE_DROPDOWN = "DROPDOWN";

export const SURVEY_TYPE_OPTION_LABELS: DefaultMap = {
  [SURVEY_TYPE_SHORT_ANSWER]: "Text",
  [SURVEY_TYPE_MULTIPLE_CHOICE]: "Multiple Choices",
  [SURVEY_TYPE_CHECK_BOX]: "Checkboxes",
  [SURVEY_TYPE_DROPDOWN]: "Dropdown",
};

export const SURVEY_TYPE_OPTIONS = [
  SURVEY_TYPE_SHORT_ANSWER,
  SURVEY_TYPE_MULTIPLE_CHOICE,
  SURVEY_TYPE_CHECK_BOX,
  SURVEY_TYPE_DROPDOWN,
];

export const SALES_PROMOTER = "Sales Promoter";
export const SALES_CONSULTANT = "Sales Consultant";
export const SALES_SUPERIOR = "Superior";
export const SALES_ADMIN = "Admin";

export const AREA_HIERARCHY_CLUSTER = "Cluster";
export const AREA_HIERARCHY_AREA = "Area";
export const AREA_HIERARCHY_SUBTERRITORY = "Subterritory";
export const AREA_HIERARCHY_TERRITORY = "Territory";
export const AREA_HIERARCHY_REGION = "Region";

export const AREA_HIERARCHY_OPTIONS = [
  AREA_HIERARCHY_CLUSTER,
  AREA_HIERARCHY_AREA,
  AREA_HIERARCHY_SUBTERRITORY,
  AREA_HIERARCHY_TERRITORY,
  AREA_HIERARCHY_REGION,
];

export const SALES_LEVEL_OPTIONS = [
  SALES_SUPERIOR,
  SALES_ADMIN,
  SALES_PROMOTER,
  SALES_CONSULTANT,
];

export const SELECT_ALL_VALUE = "ALL";
