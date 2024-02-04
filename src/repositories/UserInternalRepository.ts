import {api, createCancelTokenHandler} from "../@framework/services";

const endPoint = () => process.env.REACT_APP_PASSPORT_END_POINT;

const Repository = {
    all: function (params: any = null) {
        return api.get(`${endPoint()}/api/admin/user-internal`, {
            params,
            cancelToken: cancelTokenHandlerObject[this.all.name].handleRequestCancellation().token
        });
    },
    show: function (id: number | string, params: any = null) {
        return api.get(`${endPoint()}/api/admin/user-internal/${id}`, {
            params,
            cancelToken: cancelTokenHandlerObject[this.show.name].handleRequestCancellation().token
        });
    },
    create: function (payload: any, params: any = null) {
        return api.post(`${endPoint()}/api/admin/user-internal`, payload, {
            params,
            cancelToken: cancelTokenHandlerObject[this.create.name].handleRequestCancellation().token
        });
    },
    update: function (id: number | string, payload: any, params: any = null) {
        return api.post(`${endPoint()}/api/admin/user-internal/${id}`, payload, {
            params,
            cancelToken: cancelTokenHandlerObject[this.update.name].handleRequestCancellation().token
        });
    },
    delete: function (id: number | string, params: any = null) {
        return api.delete(`${endPoint()}/api/admin/user-internal/${id}`, {
            params,
            cancelToken: cancelTokenHandlerObject[this.delete.name].handleRequestCancellation().token
        });
    },
}

const cancelTokenHandlerObject = createCancelTokenHandler(Repository);

export default Repository;