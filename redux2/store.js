import {configureStore} from '@reduxjs/toolkit'
import spendingReducer from './reduces';

const store=configureStore({
    reducer:{
        spending:spendingReducer
    }
})

export default store;