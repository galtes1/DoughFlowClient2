import React from "react";
import { ListItem, ListItemText, IconButton, Divider, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear() % 100}`;
};

const SingleRecord = ({
  id,
  amount,
  date,
  description,
  onEdit,
  onDelete,
  isDark,
  showDivider = true,
}) => (
  <>
    <ListItem
      secondaryAction={
        <Box>
          <IconButton edge="end" aria-label="edit" onClick={onEdit}>
            <EditIcon sx={{ color: "#266ed9" }} />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={onDelete}>
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </Box>
      }
    >
      <ListItemText
        primary={`₪${amount}`}
        secondary={
          <>
            <Typography variant="body2" sx={{ color: isDark ? "#080303" : "text.secondary" }}>
              Date: {formatDate(date)}
            </Typography>
            {description && (
              <Typography variant="body2" sx={{ color: isDark ? "#080303" : "text.secondary" }}>
                Note: {description}
              </Typography>
            )}
          </>
        }
        primaryTypographyProps={{
          color: isDark ? "#080303" : "text.primary",
          fontWeight: "bold",
        }}
      />
    </ListItem>
    {showDivider && <Divider />}
  </>
);

export default SingleRecord;
