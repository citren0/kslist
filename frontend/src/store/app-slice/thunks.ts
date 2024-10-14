import { setAllConfigs, } from "../config-slice/slice";
import { AppThunk, } from "../store";
import config from './../../../public/config.json';

const setUpApplication = (): AppThunk => async (dispatch, getState) =>
{
    dispatch(setAllConfigs(config.api_endpoints));

    document.title = "K's List";

    return true;
}

export { setUpApplication, }