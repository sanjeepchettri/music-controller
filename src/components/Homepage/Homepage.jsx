import React, { useEffect, useState } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Homepage = () => {
  const [code, setCode] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getSessionDetails = async () => {
      try {
        const res = await axios.get("/api/user-in-room");
          console.log(res.data)
          setCode(res.data.code)
      } catch (error) {}
    };
    getSessionDetails();
  }, []);
  return (
    (code?(
       navigate (`/room/${code}`) 
    ):(
      <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h3" compact="h3">
          Music Player
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" to="/join" component={Link}>
            Join A Room
          </Button>
          <Button color="secondary" to="/create" component={Link}>
            Create Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
    ))

   
  );
};

export default Homepage;
