import { Box, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import { useGetUserQuery } from 'state/api'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const isMobile = !useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state)=> state.global.userId);
  const {data} = useGetUserQuery(userId);

  return (
    <Box display={!isMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data||{}}
        isMobile={isMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data||{}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet/>
      </Box>
    </Box>
  );
};

export default Layout