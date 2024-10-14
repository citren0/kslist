import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import ThunkStatusAndMessage from '../../interfaces/thunkStatusAndMessage';
import AsyncThunkStatus from '../../enums/AsyncThunkStatus';


export interface Product {
    name: string;
    okay: boolean;
    image: string;
    link: string;
};

export interface ProductsState {
    offset: number,
    products: Product[],
    getProductsThunkStatus: ThunkStatusAndMessage,
};

const initialState: ProductsState = {
    offset: 0,
    products: [],
    getProductsThunkStatus: {
        thunkStatus: AsyncThunkStatus.Idle,
    },
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers:
    {
        setOffset(state: ProductsState, action: PayloadAction<number>)
        {
            state.offset = action.payload;
        },
        setProducts(state: ProductsState, action: PayloadAction<Product[]>)
        {
            state.products = action.payload;
        },
        setGetProductsThunkStatus(state: ProductsState, action: PayloadAction<ThunkStatusAndMessage>)
        {
            state.getProductsThunkStatus = action.payload;
        },
    }
});

export const { setOffset, setProducts, setGetProductsThunkStatus, } = productsSlice.actions;

export default productsSlice;