import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';

export const Home=()=> {
  const [value, setValue] = React.useState(0);
    const navigate= useNavigate()
  const handleChange = (event, newValue) => {
    navigate(newValue)
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab value="/add-theatre" label="Add Theatre" />
        <Tab value="/add-movie" label="Add Movie" />
        <Tab value="/add-ticket-quantity" label="Add quantity" />
      </Tabs>
    </Box>
  );
}