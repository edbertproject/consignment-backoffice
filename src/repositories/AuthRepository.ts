import { api, createCancelTokenHandler } from "../@framework/services";

const endPoint = () => process.env.REACT_APP_PASSPORT_END_POINT;

const Repository = {
    forgotPassword: function (payload: any, params: any = null) {
        return api.post(`${endPoint()}/api/auth/forgot-password`, payload, {
            params,
            cancelToken: cancelTokenHandlerObject[this.forgotPassword.name].handleRequestCancellation().token
        });
    },
    resetPassword: function (payload: any, params: any = null) {
        return api.post(`${endPoint()}/api/auth/reset-password`, payload, {
            params,
            cancelToken: cancelTokenHandlerObject[this.resetPassword.name].handleRequestCancellation().token
        });
    },
    checkToken: function (payload: any, params: any = null) {
        return api.post(`${endPoint()}/api/auth/check-forgot-token`, payload, {
            params,
            cancelToken: cancelTokenHandlerObject[this.checkToken.name].handleRequestCancellation().token
        });
    }
}

const cancelTokenHandlerObject = createCancelTokenHandler(Repository);

export default Repository;