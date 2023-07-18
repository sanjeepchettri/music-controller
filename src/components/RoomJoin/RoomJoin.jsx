import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Room from "../Room/Room";

const RoomJoin = () => {
  const [roomCode, setRoomCode] = useState("");
  const [err, setErr] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setRoomCode(e.target.value);
  };
  const payload = {
    code: roomCode,
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/join-room", payload);
      if (res.status === 200) {
        console.log(res.data)
        navigate(`/room/${roomCode}`)
      }
      else if (res.status === 404) {
       setErr("Room not found")
      }

    } catch(error){
      if(error.status === 404){
        setErr("Room not found")

      }

    }
  };

  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Enter Room ID
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <TextField
            placeholder="Room ID"
            onChange={handleInputChange}
            error={err}
            label="Code"
            variant="outlined"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <Button variant="outlined" onClick={handleSubmit}>
            Enter Room
          </Button>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Back
          </Button>
        </FormControl>
      </Grid>
    </Grid>

{err && (
  <p>{err}</p>
)}
</>  );
};

export default RoomJoin;
