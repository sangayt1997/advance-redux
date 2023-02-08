import { configureStore } from "@reduxjs/toolkit";
import uiSLice from "./ui-slice";

const store = configureStore({
    reducer: { ui: uiSLice.reducer }
});

export default store;
