import { api, createCancelTokenHandler } from "../@framework/services";

const endPoint = () => process.env.REACT_APP_PASSPORT_END_POINT;

const Repository = {
  all: function (params: any = null) {
    return api.get(`${endPoint()}/api/admin/products`, {
      params,
      cancelToken:
        cancelTokenHandlerObject[this.all.name].handleRequestCancellation()
          .token,
    });
  },
  show: function (id: number | string, params: any = null) {
    return api.get(`${endPoint()}/api/admin/product/${id}`, {
      params,
      cancelToken:
        cancelTokenHandlerObject[this.show.name].handleRequestCancellation()
          .token,
    });
  },
  getParticipant: function (params: any = null) {
    return api.get(`${endPoint()}/api/admin/product/eligible-participant`, {
      params,
      cancelToken:
        cancelTokenHandlerObject[
          this.getParticipant.name
        ].handleRequestCancellation().token,
    });
  },
  create: function (payload: any, params: any = null) {
    return api.post(`${endPoint()}/api/admin/product`, payload, {
      params,
      cancelToken:
        cancelTokenHandlerObject[this.create.name].handleRequestCancellation()
          .token,
    });
  },
  update: function (id: number | string, payload: any, params: any = null) {
    return api.post(`${endPoint()}/api/admin/product/${id}`, payload, {
      params,
      cancelToken:
        cancelTokenHandlerObject[this.update.name].handleRequestCancellation()
          .token,
    });
  },
  delete: function (id: number | string, params: any = null) {
    return api.delete(`${endPoint()}/api/admin/product/${id}`, {
      params,
      cancelToken:
        cancelTokenHandlerObject[this.delete.name].handleRequestCancellation()
          .token,
    });
  },
  updateStatus: function (
    id: number | string,
    payload: any,
    params: any = null
  ) {
    return api.put(`${endPoint()}/api/admin/product/status/${id}`, payload, {
      params,
      cancelToken:
        cancelTokenHandlerObject[
          this.updateStatus.name
        ].handleRequestCancellation().token,
    });
  },
  cancel: function (id: number | string, payload: any, params: any = null) {
    return api.put(`${endPoint()}/api/admin/product/cancel/${id}`, payload, {
      params,
      cancelToken:
        cancelTokenHandlerObject[this.cancel.name].handleRequestCancellation()
          .token,
    });
  },
};

const cancelTokenHandlerObject = createCancelTokenHandler(Repository);

export default Repository;
