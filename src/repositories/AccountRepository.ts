import { api, createCancelTokenHandler } from "../@framework/services";

const endPoint = () => process.env.REACT_APP_PASSPORT_END_POINT;

const Repository = {
    update: function (payload: any, params: any = null) {
        return api.post(`${endPoint()}/api/account/update`, payload, {
            params,
            cancelToken: cancelTokenHandlerObject[this.update.name].handleRequestCancellation().token
        });
    },
    updatePassword: function (payload: any, params: any = null) {
        return api.post(`${endPoint()}/api/account/update-password`, payload, {
            params,
            cancelToken: cancelTokenHandlerObject[this.updatePassword.name].handleRequestCancellation().token
        });
    },
    allNotification: function (params: any = null) {
        return api.get(`${endPoint()}/api/account/notification`, {
            params,
            cancelToken: cancelTokenHandlerObject[this.allNotification.name].handleRequestCancellation().token
        });
    },
    showNotification: function (id: number | string, params: any = null) {
        return api.get(`${endPoint()}/api/account/notification/${id}`, {
            params,
            cancelToken: cancelTokenHandlerObject[this.showNotification.name].handleRequestCancellation().token
        });
    },
    readAllNotification: function (params: any = null) {
        return api.post(`${endPoint()}/api/account/notification/read-all`, {
            params,
            cancelToken: cancelTokenHandlerObject[this.allNotification.name].handleRequestCancellation().token
        });
    },
}

const cancelTokenHandlerObject = createCancelTokenHandler(Repository);

export default Repository;