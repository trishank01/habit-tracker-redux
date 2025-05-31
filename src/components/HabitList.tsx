import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { CheckCircle, Delete } from "@mui/icons-material";
import { remove, toggleHabit } from "../store/habitSlice";

const HabitList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch<AppDispatch>();
  const today = new Date().toISOString().split("T")[0];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {habits.map((habit) => {
        return (
          <Paper
            key={habit.id}
            elevation={2}
            sx={{
              p: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid container alignItems="center">
                <Typography variant="h6">{habit.name}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {habit.frequency}
                </Typography>
              </Grid>
            </Grid>
            <Grid>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button
                  variant="outlined"
                  color={
                    habit.completedDates.includes(today) ? "success" : "primary"
                  }
                  startIcon={<CheckCircle />}
                  onClick={() =>
                    dispatch(toggleHabit({ id: habit.id, data: today }))
                  }
                >
                  {habit.completedDates.includes(today)
                    ? "Completed"
                    : "Mark Complete"}
                </Button>

                <Button onClick={() => dispatch(remove({ id: habit.id,  }))} variant="outlined" color="error" startIcon={<Delete />}>
                  Remove
                </Button>
              </Box>
            </Grid>
          </Paper>
        );
      })}
    </Box>
  );
};

export default HabitList;
