import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

interface SystemState {
    isLoggedIn: boolean,
    account: any
}

const initialState: SystemState = {
    isLoggedIn: false,
    account: {
        name: ''
    }
}

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<any>) => {
            Object.assign(state, action.payload);
        },
    },
});

export const { update } = systemSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSystem = (state: RootState) => state.system

export default systemSlice.reducer
