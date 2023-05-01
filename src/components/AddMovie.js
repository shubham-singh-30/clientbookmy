import { useState ,useEffect} from 'react';
import axios from 'axios';
import { Button, Checkbox ,TextField } from '@mui/material';
const URL= "http://localhost:5000"
function AddMovie() {
  const [selectedTheatres, setSelectedTheatres] = useState([]);
  const [movieTitle, setMovieTitle] = useState('');
  const [theaterList,setTheaterList] = useState([]);
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
  function handleAddMovie() {
    // Make API call to add the movie to the selected theatres
    fetch(`${URL}/movies/add-to-theatres`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieTitle: movieTitle,
        theatreIds: selectedTheatres,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedTheatres([]);
        setMovieTitle('');
        setResponseMsg('succesfully added movie')
      })
      .catch((error) => setResponseMsg(error));
  }

  function handleTheatreSelection(theatreId) {
    if (selectedTheatres.includes(theatreId)) {
      setSelectedTheatres(selectedTheatres.filter((id) => id !== theatreId));
    } else {
      setSelectedTheatres([...selectedTheatres, theatreId]);
    }
  }

  return (
    <div>
      <h2>Add Movie</h2>
      <TextField
        id="outlined-basic"
        value={movieTitle}
        label="Outlined"
        variant="outlined"
        onChange={(e) => setMovieTitle(e.target.value)}
      />
     
      <h3>Select Theatres</h3>
      {theaterList.map((theatre) => (
        <div key={theatre.id}>
          <Checkbox checked={selectedTheatres.includes(theatre.id)} onChange={() => handleTheatreSelection(theatre.id)} />
          <label>{theatre.name}</label>
        </div>
      ))}
      <Button variant="outlined" onClick={handleAddMovie}>Add Movie</Button>
      {responseMsg && <p>{responseMsg}</p>}
    </div>
  );
}

export default AddMovie;
