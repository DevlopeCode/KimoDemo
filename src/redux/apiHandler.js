import {fetchDataStart, fetchDataSuccess, fetchDataFailure} from './slice';
import {fetchData} from './thunk';

export const fetchDataHandler = async (dispatch, apiEndpoint) => {
  try {
    dispatch(fetchDataStart());
    const result = await dispatch(fetchData(apiEndpoint));
    dispatch(fetchDataSuccess(result.payload));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};
