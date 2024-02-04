import {api, createCancelTokenHandler} from "../@framework/services";

const endPoint = () => process.env.REACT_APP_PASSPORT_END_POINT;

const Repository = {
    select: function (params: any = null) {
        return api.get(`${endPoint()}/api/admin/select/cities`, {
            params,
            cancelToken: cancelTokenHandlerObject[this.select.name].handleRequestCancellation().token
        });
    }
}

const cancelTokenHandlerObject = createCancelTokenHandler(Repository);

export default Repository;