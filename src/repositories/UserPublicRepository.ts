import {api, createCancelTokenHandler} from "../@framework/services";

const endPoint = () => process.env.REACT_APP_PASSPORT_END_POINT;

const Repository = {
    all: function (params: any = null) {
        return api.get(`${endPoint()}/api/admin/user-public`, {
            params,
            cancelToken: cancelTokenHandlerObject[this.all.name].handleRequestCancellation().token
        });
    },
    show: function (id: number | string, params: any = null) {
        return api.get(`${endPoint()}/api/admin/user-public/${id}`, {
            params,
            cancelToken: cancelTokenHandlerObject[this.show.name].handleRequestCancellation().token
        });
    },
}

const cancelTokenHandlerObject = createCancelTokenHandler(Repository);

export default Repository;