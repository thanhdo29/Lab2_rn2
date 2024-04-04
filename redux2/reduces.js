import { createReducer } from '@reduxjs/toolkit';
import { addSpending, updateSpending, deleteSpending, search, clearSpendings, deleteSpendingApi ,addSpendingApi, updateSpendingApi} from './actions';

const initialState = { items: [] };

const spendingReducer = createReducer(initialState, (builde) => {
    builde
        .addCase(addSpending, (state, action) => {
            state.items.push(action.payload);
        })
        .addCase(clearSpendings, (state, action) => {
            state.items = [];
        })
    builde
        .addCase(deleteSpendingApi.fulfilled, (state, action) => {
            state.items = state.items.filter(row => row.id !== action.payload);
        })
    builde
        .addCase(addSpendingApi.fulfilled,(state,action)=>{
            state.items.push(action.payload);
        })
    builde
        .addCase(updateSpendingApi.fulfilled,(state,action)=>{
            const {id, title, des, date, typeSpending, amount}=action.payload;
            const spending=state.items.find(row=>row.id===id);

            if (spending) {
                spending.title=title,
                spending.des=des,
                spending.date=date,
                spending.date=date,
                spending.typeSpending=typeSpending,
                spending.amount=amount
            }
        })
        
})

export default spendingReducer;