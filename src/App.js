import './App.css';
import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import AddMovie from './components/AddMovie';
import AddTheatre from './components/AddTheatre';
import AddTicketQuantity from './components/AddTicketQuantity';
import { Home } from './components/Home';
import { User } from './user/User';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
function App() {
  const [value, setValue] = useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue)
};
  return (

    <>
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab value={0} label="Admin Panel" />
        <Tab value={1} label="UserPanel" />
      </Tabs>
    </Box>
   {value===0? <>
      <h1>Admin Panel</h1>
      <Home />
        <Routes>

        <Route path="/add-theatre" element={<AddTheatre />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/add-ticket-quantity" element={<AddTicketQuantity />} />
       
      </Routes>
      </>:<User/>}
    </>
  );
}

export default App;
