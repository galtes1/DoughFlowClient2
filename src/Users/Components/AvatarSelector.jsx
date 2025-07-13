import React from "react";
import { Box, Avatar } from "@mui/material";

const AVATARS = ["Goku.png", "Money.jpg", "stitch.png"];

const AvatarSelector = ({ selectedAvatar, onSelect }) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "center" }}>
      {AVATARS.map((avatar) => (
        <Box
          key={avatar}
          sx={{
            border:
              selectedAvatar === avatar ? "2px solid #1976d2" : "2px solid transparent",
            borderRadius: "50%",
            padding: 0.5,
            cursor: "pointer",
          }}
          onClick={() => onSelect(avatar)}
        >
          <Avatar
            src={`/avatars/${avatar}`}
            alt={avatar}
            sx={{ width: 64, height: 64 }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default AvatarSelector;
