import React, { useState ,useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
  Input
} from "@mui/material";
const URL= "http://localhost:5000"

function AddTicketQuantity() {
  const [formData, setFormData] = useState({
    theater_id: "",
    movie_id: "",
    quantity: "",
  });
  const [theater,setTheater] = useState('')
  const [theaterList,setTheaterList] = useState([]);
  const [movieList,setMovieList] = useState([]);
  const [movie,setMovie] = useState('');
  const [quantity,setQuantity] = useState(0);

  const [responseMsg, setResponseMsg] = useState("");
  useEffect(() => {
    // Fetch the list of cities

    axios
      .get(`${URL}/api/theaters`)

      .then((res) => {
        setTheaterList(res.data);
      })
      .catch((err) => console.error("Error getting cities:", err));
  }, []);

  const handleTheaterChange = (e) => {
    setTheater(e.target.value);
    axios
    .get(`${URL}/api/theaters/${e.target.value}/movies`)

    .then((res) => {
      setMovieList(res.data);
    })
    .catch((err) => console.error("Error getting cities:", err));
  };
  const handleMovieChange = (e) => {
    setMovie(e.target.value)
}
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${URL}/ticket_quantity`, {
        theater_id:theater,
        movie:movie,
        quantity:parseInt(quantity)
      })
      .then((res) => {
        setResponseMsg(res.data);
        setMovie('')
        setTheater('')
        setQuantity(0)
      })
      .catch((err) => {
        console.log(err);
        setResponseMsg("Error adding ticket quantity");
      });
  };

  return (
    <div>
      <h2>Add Ticket Quantity</h2>
    
      <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Theater</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={theater}
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
            label="Movie"
            onChange={handleMovieChange}
          >
            {movieList.map((item) => (
              <MenuItem name={item.movie} value={item.movie}>
                {item.movie}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <div>
        <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
          <TextField
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e)=>setQuantity(e.target.value)}
            required
          />
        </div>
        <Button variant="outlined" onClick={handleSubmit}>Add Quantity</Button>
     
      {responseMsg && <p>{responseMsg}</p>}
    </div>
  );
}

export default AddTicketQuantity;