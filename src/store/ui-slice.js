import { createSlice } from "@reduxjs/toolkit";

const uiSLice = createSlice({
    name: 'ui',
    initialState: {isCartVisible: false},
    reducers: {
        toggle(state) {
            state.isCartVisible = !state.isCartVisible;
        }
    }
});

export const uiActions = uiSLice.actions;
export default uiSLice;
