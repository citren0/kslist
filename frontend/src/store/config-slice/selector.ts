import { RootState } from '../store'

const selectGetProductsEndpoint = (state: RootState) =>
    state.configReducer.config.get_products;

const configSelectors =
{
    selectGetProductsEndpoint,
};

export default configSelectors;