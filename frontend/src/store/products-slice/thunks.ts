import AsyncThunkStatus from "../../enums/AsyncThunkStatus";
import { checkStatusCode } from "../../services/helpers/statusCode";
import configSelectors from "../config-slice/selector";
import { AppThunk, } from "../store";
import productsSelectors from "./selectors";
import { setGetProductsThunkStatus, setOffset, setProducts } from "./slice";

const getProducts = (query: string, allergies: string[]): AppThunk => async (dispatch, getState) =>
{
    dispatch(setGetProductsThunkStatus({ thunkStatus: AsyncThunkStatus.Pending, }));

    dispatch(setProducts([]));

    const getProductsEndpoint = configSelectors.selectGetProductsEndpoint(getState());
    const offset = productsSelectors.selectOffset(getState());

    // Assemble URL. Vanilla JS query param builder doesnt accept duplicates.
    var getProductsEndpointWithQueryParams = getProductsEndpoint;
    getProductsEndpointWithQueryParams += "?query=" + query;
    getProductsEndpointWithQueryParams += "&offset=" + offset;
    allergies.forEach((allergy) =>
    {
        getProductsEndpointWithQueryParams += "&allergen=" + allergy;
    });

    try
    {
        const getProductsResponse = await fetch(getProductsEndpointWithQueryParams, {
            mode: "cors",
            method: "GET",
        });

        const getProductsResponseJson = await getProductsResponse.json();

        if (!checkStatusCode(getProductsResponse.status))
        {
            dispatch(setGetProductsThunkStatus({ thunkStatus: AsyncThunkStatus.Error, message: "Failed to get products. Try again later.", }));
        }
        else
        {
            dispatch(setGetProductsThunkStatus({ thunkStatus: AsyncThunkStatus.Success, message: "Products fetched from Whole Foods.", }));
            dispatch(setProducts(getProductsResponseJson.products));
        }

    }
    catch(e)
    {
        dispatch(setGetProductsThunkStatus({ thunkStatus: AsyncThunkStatus.Error, message: "Failed to get products. Try again later.", }));
    }
}

const incrementPage = (): AppThunk => async (dispatch, getState) =>
{
    const offset = productsSelectors.selectOffset(getState());
    dispatch(setOffset(offset + 60));
}

    
const decrementPage = (): AppThunk => async (dispatch, getState) =>
{
    const offset = productsSelectors.selectOffset(getState());
    dispatch(setOffset(((offset - 60) < 0) ? 0 : offset - 60));
}
        

export { incrementPage, decrementPage, getProducts, }