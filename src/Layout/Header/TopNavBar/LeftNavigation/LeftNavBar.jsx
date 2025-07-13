import { Box } from '@mui/material'
import React from 'react'
import Logo from '../TheLogo/Logo'
import NavItem from '../../../../Routes/Components/NavItem'
import ROUTES from '../../../../Routes/routesModel'
import { useTheme } from '../../../../Providers/CustomThemeProvider'

export default function LeftNavBar() {
    const {isDark} = useTheme();
    const generateSx = () => ({
        color: isDark ? "#F7F9F9" : "#080303",
    });
    return (
        <Box>
             <Logo to= {ROUTES.ROOT} label={"PIE"} />
             <NavItem to={ROUTES.SUMMARY_PAGE} label={"Summery Page"}sx={generateSx()}/>
        </Box>
    );
}
