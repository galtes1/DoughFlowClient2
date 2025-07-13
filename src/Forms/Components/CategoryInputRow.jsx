import React from "react";
import { Grid, TextField, FormControlLabel, Checkbox } from "@mui/material";

const CategoryInputRow = ({
  category,
  isDark,
  isSelected,
  amount,
  description,
  onCheckboxChange,
  onAmountChange,
  onDescriptionChange,
}) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid
        item
        xs={6}
        sx={{ textAlign: "left", color: isDark ? "#F7F9F9" : "#080303" }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={isSelected}
              onChange={() => onCheckboxChange(category)}
              color="primary"
            />
          }
          label={category}
          sx={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="Amount"
          variant="outlined"
          size="small"
          fullWidth
          value={amount || ""}
          onChange={(e) => onAmountChange(category, e.target.value)}
          disabled={!isSelected}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Note"
          variant="outlined"
          size="small"
          fullWidth
          value={description || ""}
          onChange={(e) => onDescriptionChange(category, e.target.value)}
          disabled={!isSelected}
        />
      </Grid>
    </Grid>
  );
};

export default CategoryInputRow;
