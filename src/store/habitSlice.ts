import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
}

const initialState: HabitState = {
  habits: [],
};

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (
      state,
      action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
    ) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };

      state.habits.push(newHabit);
    },
    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; data: string }>
    ) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);

      if (habit) {
        const index = habit.completedDates.indexOf(action.payload.data);
        if (index > -1) {
          habit.completedDates.splice(index, 1);
        } else {
          habit.completedDates.push(action.payload.data);
        }
      }
    },
    remove: (
      state, 
      action: PayloadAction<{ id: string }>
    ) => {
      const filtered = state.habits.filter((item) => item.id !== action.payload.id)
      //console.log("filtered" , filtered)
     state.habits = filtered
    },
  },
});

export const { addHabit, toggleHabit ,remove } = habitSlice.actions;

export default habitSlice.reducer;
