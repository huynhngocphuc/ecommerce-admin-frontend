import { createSlice } from "@reduxjs/toolkit";
type Alert = {
    message: string;
    severity: 'error' | 'warning' | 'info' | 'success';
    id: string;
}
const initialState = {
    listAlert: [
        { message: "This is an", severity: "error", id: "1" },
        { message: "This is a ", severity: "warning", id: "2" },
        { message: "This is an ", severity: "info", id: "3" },
        { message: "This is a ", severity: "success", id: "4" },
    ] as Alert[]
};

const stackAlertSlice = createSlice({
    name: 'stackAlert',
    initialState,
    reducers:{
        addAlert: (state, action) => {
            state.listAlert.push(action.payload);
        },
        removeAlert: (state, action) => {
            state.listAlert = state.listAlert.filter(alert => alert.id !== action.payload);
        },
        clearAlerts: (state) => {
            state.listAlert = [];
        }
    }
});

export const { addAlert, removeAlert, clearAlerts } = stackAlertSlice.actions;
export default stackAlertSlice.reducer;
