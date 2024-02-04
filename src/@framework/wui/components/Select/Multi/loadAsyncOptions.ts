import { AxiosError, AxiosResponse } from 'axios';
import _ from 'lodash';
import { SELECT_ALL_VALUE } from '../../../../../constant';

const loadAsyncOptions = async (search: string, prevOptions: any, page: number, selectRepository: any, selectParams: any = {}) => {
  let data: any = {};

  if (selectRepository !== null) {
    await selectRepository
      .select({
        ...selectParams,
        per_page: 99999,
        search: search !== '' ? search : null,
        page: page
      })
      .then((response: AxiosResponse) => {
        data = response.data;
        if(selectParams.selectAll){
          if(data.data){
            let isAllOptionExist = data.data.find((item: any) =>  item.id === SELECT_ALL_VALUE)
            if(!isAllOptionExist){
              data.data = [{id: SELECT_ALL_VALUE, name: selectParams.selectAllLabel}, ...data.data]
            }
          }
        }
      })
      .catch((e: AxiosError) => {});
  }

  return {
    options: _.get(data, 'data', []),
    hasMore: _.get(data, 'data', []).length > 0 && _.get(data, 'data', []).length === 10,
    additional: {
      page: page + 1
    }
  };
};

export default loadAsyncOptions;
