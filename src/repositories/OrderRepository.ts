import { api, createCancelTokenHandler } from "../@framework/services";

const endPoint = () => process.env.REACT_APP_PASSPORT_END_POINT;

const Repository = {
  all: function (params: any = null) {
    return api.get(`${endPoint()}/api/admin/orders`, {
      params,
      cancelToken:
        cancelTokenHandlerObject[this.all.name].handleRequestCancellation()
          .token,
    });
  },
  show: function (id: number | string, params: any = null) {
    return api.get(`${endPoint()}/api/admin/order/${id}`, {
      params,
      cancelToken:
        cancelTokenHandlerObject[this.show.name].handleRequestCancellation()
          .token,
    });
  },
  updateStatusComplete: function (
    id: number | string,
    payload: any,
    params: any = null
  ) {
    return api.put(
      `${endPoint()}/api/admin/order/status-complete/${id}`,
      payload,
      {
        params,
        cancelToken:
          cancelTokenHandlerObject[
            this.updateStatusComplete.name
          ].handleRequestCancellation().token,
      }
    );
  },
  updateStatusSeller: function (
    id: number | string,
    payload: any,
    params: any = null
  ) {
    return api.put(
      `${endPoint()}/api/admin/order/status-seller/${id}`,
      payload,
      {
        params,
        cancelToken:
          cancelTokenHandlerObject[
            this.updateStatusSeller.name
          ].handleRequestCancellation().token,
      }
    );
  },
};

const cancelTokenHandlerObject = createCancelTokenHandler(Repository);

export default Repository;
