import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'


export interface Configs
{
    get_products: string;
};

export interface ConfigState
{
    config: Configs;
};

const initialState: ConfigState = {
    config:
    {
        get_products: "",
    },
};

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers:
    {
        setAllConfigs(state: ConfigState, action: PayloadAction<Configs>)
        {
            state.config = action.payload;
        },
    }
});

export const { setAllConfigs, } = configSlice.actions;

export default configSlice;