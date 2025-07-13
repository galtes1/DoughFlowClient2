import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";

const ConfirmationDialog = ({
  open,
  type = "delete", 
  title,
  message,
  onClose,
  onConfirm,
  editValues,
  onEditChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {type === "delete" ? (
          <Typography>{message}</Typography>
        ) : (
          <>
            <TextField
              autoFocus
              margin="dense"
              label="Edit Amount"
              type="number"
              fullWidth
              value={editValues.amount}
              onChange={(e) => onEditChange("amount", e.target.value)}
            />
            <TextField
              margin="dense"
              label="Edit Note"
              type="text"
              fullWidth
              value={editValues.description}
              onChange={(e) => onEditChange("description", e.target.value)}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color={type === "delete" ? "error" : "primary"}>
          {type === "delete" ? "Delete" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
