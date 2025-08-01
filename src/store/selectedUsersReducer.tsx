import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
        removeUser: (state, action: PayloadAction<React.Key>) => {
            state.selectedUsers = state.selectedUsers.filter(user => user.key !== action.payload);
        }
    },
});

export const { setSelectedUsers, clearSelectedUsers, removeUser } = selectedUsersSlice.actions;
export default selectedUsersSlice.reducer;
