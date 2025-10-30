import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Alert = {
    id: string;
    message: string;
    severity: 'error' | 'warning' | 'info' | 'success';
}

type AddAlertPayload = {
    id?: string;
    message: string | string[];
    severity: 'error' | 'warning' | 'info' | 'success';
}
const initialState = {
    listAlert: [] as Alert[]
};

const stackAlertSlice = createSlice({
    name: 'stackAlert',
    initialState,
    reducers: {
        addAlert: (state, action: PayloadAction<AddAlertPayload>) => {
            const { message, severity } = action.payload;
            console.log("🚀 ~ message:", message)
        if (Array.isArray(message)) {
            const alerts = message.map(msg => ({
                id: action.payload.id || crypto.randomUUID(),
                message: msg,
                severity
            }));
            state.listAlert.push(...alerts);
        }
        else {
            state.listAlert.push({
                id: action.payload.id || crypto.randomUUID(),
                message,
                severity,
            });
        }
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
