import { RootState } from "../store";

const selectOffset = (state: RootState) =>
    state.productsReducer.offset;

const selectProducts = (state: RootState) =>
    state.productsReducer.products;

const selectGetProductsThunkStatus = (state: RootState) =>
    state.productsReducer.getProductsThunkStatus;

const productsSelectors = {
    selectOffset,
    selectProducts,
    selectGetProductsThunkStatus,
};

export default productsSelectors;