import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        isLoading: false,
        isError: false,
        genders: '',
        roles: '',
        payments: '',
        status: '',
        listProvinces: [],
        orderList: [],
    },
    reducers: {
        loginStart: state => {
            state.isLoading = true;
        },
        loginSucceed: (state, action) => {
            state.token = action.payload.token;
            state.isLoading = false;
            state.isError = false;
        },
        loginFailed: state => {
            state.isError = true;
            state.isLoading = false;
            state.token = null;
        },
        saveUserToken: (state, action) => {
            state.token = action.payload.token;
        },
        deleteUserToken: (state) => {
            state.token = null;
        },
        logoutUser: state => {
            state.token = null;
            state.isError = false;
            state.isLoading = false;
        },
        fetchListGenderSucceed: (state, action) => {
            state.genders = action.payload.listGenders;
        },
        fetchListGenderFailed: (state) => {
            state.genders = '';
        },
        fetchListRoleSucceed: (state, action) => {
            state.roles = action.payload.roles;
        },
        fetchListRoleFailed: (state) => {
            state.roles = '';
        },
        fetchListPaymentSucceed: (state, action) => {
            state.payments = action.payload.payments;
        },
        fetchListPaymentFailed: (state) => {
            state.payments = '';
        },
        fetchListStatusSucceed: (state, action) => {
            state.status = action.payload.status;
        },
        fetchListStatusFailed: (state) => {
            state.status = '';
        },
        fetchListProvinceSucceed: (state, action) => {
            state.listProvinces = action.payload.provinces;
        },
        fetchListProvinceFailed: (state) => {
            state.listProvinces = [];
        },
        fetchOrderSucceed: (state, action) => {
            state.orderList = action.payload.orderList;
        },
        fetchOrderFailed: (state) => {
            state.orderList = [];
        },
    }
})

// Action creators are generated for each case reducer function
// export const { loginStart, loginSucceed, loginFailed } = userSlice.actions;
const userActions = userSlice.actions;
export { userActions }
export default userSlice.reducer;