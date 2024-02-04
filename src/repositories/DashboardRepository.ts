import { api, createCancelTokenHandler } from "../@framework/services";

const endPoint = () => process.env.REACT_APP_PASSPORT_END_POINT;

const Repository = {
  salesAccumulation: function (params: any = null) {
    return api.get(`${endPoint()}/api/admin/dashboard/sales-accumulation`, {
      params,
      cancelToken:
        cancelTokenHandlerObject[
          this.salesAccumulation.name
        ].handleRequestCancellation().token,
    });
  },
  bidAccumulation: function (params: any = null) {
    return api.get(`${endPoint()}/api/admin/dashboard/bid-accumulation`, {
      params,
      cancelToken:
        cancelTokenHandlerObject[
          this.bidAccumulation.name
        ].handleRequestCancellation().token,
    });
  },
  productPosting: function (params: any = null) {
    return api.get(`${endPoint()}/api/admin/dashboard/product-posting`, {
      params,
      cancelToken:
        cancelTokenHandlerObject[
          this.productPosting.name
        ].handleRequestCancellation().token,
    });
  },
  userRegister: function (params: any = null) {
    return api.get(`${endPoint()}/api/admin/dashboard/user-register`, {
      params,
      cancelToken:
        cancelTokenHandlerObject[
          this.userRegister.name
        ].handleRequestCancellation().token,
    });
  },
  pendingOrder: function (params: any = null) {
    return api.get(`${endPoint()}/api/admin/dashboard/pending-order`, {
      params,
      cancelToken:
        cancelTokenHandlerObject[
          this.pendingOrder.name
        ].handleRequestCancellation().token,
    });
  },
};

const cancelTokenHandlerObject = createCancelTokenHandler(Repository);

export default Repository;
