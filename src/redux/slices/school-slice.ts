// import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { SchoolYearsData } from '../../types/response';

// export interface SchoolState {
//     currentSchoolYear: SchoolYearsData | null;
// }

// const initialState: SchoolState = {
//     currentSchoolYear: null 
// };

// export const schoolSlice = createSlice({
//     name: 'school', // Changed the slice name
//     initialState,
//     reducers: {
//         setCurrentSchoolYear: (state: SchoolState, action: PayloadAction<SchoolYearsData>) => {
//             state.currentSchoolYear = action.payload;
//         },
//     },
// });

// export const { setCurrentSchoolYear } = schoolSlice.actions;

// export default schoolSlice.reducer;
