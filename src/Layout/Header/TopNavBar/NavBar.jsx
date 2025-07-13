import React from 'react'
import LeftNavBar from './LeftNavigation/LeftNavBar'
import { AppBar, Toolbar } from '@mui/material'
import RightNavBar from './RightNavigation/RightNavBar';
import  {MenuProvider}  from './Menu/MenuProvider';




export default function NavBar() {
  return (
  <MenuProvider>
      <AppBar position="sticky" elevation={10}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
           <LeftNavBar /> 
          <RightNavBar />
        </Toolbar>
      </AppBar>
      </MenuProvider>  
  );
}