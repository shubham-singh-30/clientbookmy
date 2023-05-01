import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
  Typography,
} from "@mui/material";

import axios from "axios";
const URL = "http://localhost:5000";
export const User = () => {
  const [responseMsg, setResponseMsg] = useState("");
  const [theatreName, setTheatreName] = useState("");
  const [city, setCity] = useState("");
  const [movie, setMovie] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [theaterList, setTheaterList] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [available, setAvailable] = useState(0);

  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch the list of cities

    axios
      .get(`${URL}/api/cities`)

      .then((res) => {
        setCities(res.data);
      })
      .catch((err) => setResponseMsg(err));
  }, []);
  const handleChange = (event) => {
    setCity(event.target.value);
    axios
      .get(`${URL}/api/theaters/${event.target.value}`)

      .then((res) => {
        setTheaterList(res.data);
      })
      .catch((err) => setResponseMsg(err));
  };
  const handleTheaterChange = (e) => {
    setTheatreName(e.target.value);
    axios
      .get(`${URL}/api/ticket-quantities/${e.target.value}`)

      .then((res) => {
        if(res.data.length===0){
            setResponseMsg('no movie found')
        }
        setMovieList(res?.data);
      })
      .catch((err) => setResponseMsg(err));
  };
  const handleMovieChange=(e)=>{

    let a=movieList?.find(x=>x.movie ===e.target.value)
    a && setAvailable(a.quantity); setMovie(a.movie)
  }
  const handleBuy = () => {
    axios
      .post(`${URL}/api/bookings`, {
        theaterId: theatreName,
        movie: movie,
        quantity: parseInt(quantity),
      })
      .then((res) => {
        setResponseMsg("booking successfull");
        setMovie("");
        setTheatreName("");
        setQuantity(0);
      })
      .catch((err) => {
        console.log(err);
        setResponseMsg("Error Buying ticket");
      });
  };
  return (
    <div>
      <h1>User</h1>
      <>
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Theater</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={theatreName}
              label="Theater"
              onChange={handleTheaterChange}
            >
              {theaterList.map((item) => (
                <MenuItem name={item.name} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Movie</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={movie}
              label="Theater"
              onChange={handleMovieChange}
            >
              {movieList?.map((item) => (
                <MenuItem name={item.movie} value={item.movie}>
                  {item.movie}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography>Tickets available - {available}</Typography>
          <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
          <TextField
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => {
              if (available >= e.target.value) setQuantity(e.target.value);
            }}
            required
          />
        </Box>
        <Button variant="outlined" onClick={handleBuy}>
          Buy
        </Button>
        {responseMsg && <p>{responseMsg}</p>}
      </>
    </div>
  );
};
