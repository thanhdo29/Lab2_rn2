import { createAction } from "@reduxjs/toolkit"
import { createAsyncThunk } from '@reduxjs/toolkit';
const api_url = 'http://10.24.49.62:3000/spendings';

export const addSpending = createAction('spending/addSpending');
export const updateSpending = createAction('spending/updateSpending');
export const deleteSpending = createAction('spending/deleteSpending');
export const clearSpendings = createAction('spending/cleanSpendings');
export const search = createAction('/spending/search');

export const fetchSpendings = () => {
    return async dispatch => {
        try {
            const response = await fetch(api_url);
            const data = await response.json();

            dispatch(clearSpendings());

            data.forEach(row => {
                dispatch(addSpending(row));
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteSpendingApi = createAsyncThunk(
    'spending/deleteSpending',
    async (id, thunkApi) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                return id;
            } else {
                const errorDate = await response.json();
                return thunkApi.rejectWithValue(errorDate);
            }

        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const addSpendingApi = createAsyncThunk(
    'spending/addSpending',
    async (objSpending, thunkApi) => {
        try {
            const response = await fetch(`${api_url}`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    objSpending
                )
            });
            const data=response.json();
            if (response.ok) {
                return data;
            }else{
                const errorData=response.json();
                return thunkApi.rejectWithValue(errorData);
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }

)

export const updateSpendingApi=createAsyncThunk(
    'spending/updateSpending',
    async(objUpdate, thunkApi)=>{
        try {
            const response=fetch(`${api_url}/${objUpdate.id}`,{
                method:"PUT",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(objUpdate)
            });
            const data=(await response).json();
            if ((await response).ok) {
                return data;
            }else{
                const errorData=(await response).json();
                return thunkApi.rejectWithValue(errorData);
            }

        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

