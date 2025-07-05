import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface UserType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

interface StateType {
    selectedUsers: UserType[];
}

const initialState: StateType = {
    selectedUsers: [],
};

const selectedUsersSlice = createSlice({
    name: 'selectedUsers',
    initialState,
    reducers: {
        setSelectedUsers: (state, action: PayloadAction<UserType[]>) => {
            state.selectedUsers = action.payload;
        },
        clearSelectedUsers: (state) => {
            state.selectedUsers = [];
        },
    },
});

export const { setSelectedUsers, clearSelectedUsers } = selectedUsersSlice.actions;
export default selectedUsersSlice.reducer;
