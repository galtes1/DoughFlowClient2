import React from 'react'
import { Box, Divider, Typography } from '@mui/material'
import { useTheme } from '../Providers/CustomThemeProvider';

export default function PageHeader({ subtitle, title }) {
  const {isDark} = useTheme();
  return (
    <>
    <Box sx={{ textAlign:"center"}}>     
      <Typography  variant="custom" >{title}</Typography>
      <Typography sx={{color: isDark? "#fcfffd" : "#3333333",}} variant="h5" component="h2">{subtitle}</Typography>
      <Divider sx={{ my: 2}} />
    </Box>
    </>
  ); 
}