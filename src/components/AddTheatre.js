import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
} from "@mui/material";

import axios from "axios";
const URL = "http://localhost:5000";

function AddTheatre() {
  
  const [responseMsg, setResponseMsg] = useState("");
  const [theatreName, setTheatreName] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch the list of cities

    axios
      .get(`${URL}/api/cities`)

      .then((res) => {
        setCities(res.data);
      })
      .catch((err) => console.error("Error getting cities:", err));
  }, []);
  const handleChange = (event) => {
    setCity(event.target.value);
  };
  function handleAddTheatre() {
    // Make API call to add the theatre to the selected city
    fetch(`${URL}/api/theaters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cityId: city,
        name: theatreName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTheatreName("");
        setCity('')
        setResponseMsg("successfully added theatre")
      })
      .catch((error) =>setResponseMsg(error));
  }

  return (
    <div>
      <h2>Add Theatre</h2>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city}
            label="City"
            onChange={handleChange}
          >
            {cities.map((item) => (
              <MenuItem name={item.name} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TextField
        id="outlined-basic"
        value={theatreName}
        label="Outlined"
        variant="outlined"
        onChange={(e) => setTheatreName(e.target.value)}
      />

      <Button variant="outlined" onClick={handleAddTheatre}>
        Add Theatre
      </Button>
      {responseMsg && <p>{responseMsg}</p>}
    </div>
  );
}

export default AddTheatre;
