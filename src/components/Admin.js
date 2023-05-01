import React, { useEffect, useState } from 'react'
import axios from "axios"
let URL="http://localhost:6000"
export const Admin = () => {
    const [cities,setCities]= useState([])
    
    useEffect(() => {
        // Fetch the list of cities
        axios.get('/api/cities')
          .then(res => {
            setCities(res.data);
          })
          .catch(err => console.error('Error getting cities:', err));
      }, []);
  return (
    <div>Admin</div>
  )
}
