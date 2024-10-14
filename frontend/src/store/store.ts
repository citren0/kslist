import { configureStore, combineReducers, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import appSlice from './app-slice/slice';
import configSlice from './config-slice/slice';
import productsSlice from './products-slice/slice';

const rootReducer = combineReducers({
    appReducer: appSlice.reducer || {},
    configReducer: configSlice.reducer || {},
    productsReducer: productsSlice.reducer || {},
})

export const createStore = (rootReducer: RootReducer, preloadedState?: Partial<RootState>) =>
{
    return configureStore({
        reducer: rootReducer,
        devTools: true,
        preloadedState: preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            })
    });
    
}

const store = createStore(rootReducer);

export type RootReducer = typeof rootReducer;
export type RootState = ReturnType<RootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
export type GetState = () => RootState;

export default store;