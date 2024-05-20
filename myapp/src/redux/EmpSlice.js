import { createSlice } from "@reduxjs/toolkit";

console.log('empSlice');

const empSlice = createSlice({
    name: 'emp',
    initialState: {
        empObj: { firstName: 'Sonu', salary: 10.50 },
        empList: []
    },
    reducers: {
        setEmpObj: (state, action) => {
            console.log(action.payload);
            state.empObj = action.payload;
        },

        setEmpList: (state, action) => {
            state.empList = action.payload;
        }
    }
});

console.log(empSlice.reducer);
export default empSlice.reducer;

export const { setEmpObj, setEmpList } = empSlice.actions;