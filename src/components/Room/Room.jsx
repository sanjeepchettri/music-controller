import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  Dialog,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import CreateRoom from "../CreateRoom/CreateRoom";

const Room = () => {
  const param = useParams();
  const [err, setErr] = useState("");
  const [room, setRoom] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const roomCode = param.pk;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false)

  const getRoom = async () => {
    try {
      const res = await axios.get(`/api/get-room?code=${roomCode}`);
      setRoom(res.data);
      if (room.is_host && !authenticated) { // Add a condition to check if not already authenticated
        authenticateSpotify();
      }
    } catch (error) {
      setErr(error);
    }
  };
  const handleLeave = async () => {
    try {
      const res = await axios.patch("/api/leave-room", roomCode);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {}
  };

  const handleClose = () => {
    setOpen(false);
  };

  const authenticateSpotify = async () => {
    try {
      const res = await axios.get("/spotify/is-authenticated");
      const data = res.data
      console.log(res.data)
      setAuthenticated(data.status);
      console.log(authenticated);
      if (!authenticated) {
        const response = await axios.get("/spotify/get-auth-url");
        console.log(response.data.url)
        window.location.replace(response.data.url);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    getRoom();
  }, [room.guest_can_pause, room.votes_to_skip]);


  return err ? (
    <p> Error</p>
  ) : (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code : {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Votes To Skip : {room.votes_to_skip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Guest Can Pause : {JSON.stringify(room.guest_can_pause)}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Is Host? : {JSON.stringify(room.is_host)}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="outlined" onClick={handleLeave} color="secondary">
          Leave Room
        </Button>
      </Grid>

      {room.is_host && (
        <Grid item xs={12} align="center">
          <Button
            variant="outlined"
            onClick={() => setOpen(true)}
            color="secondary"
          >
            Settings
          </Button>
          {open && (
            <Dialog open={open} onClose={handleClose} height={4}>
              <CreateRoom
                updateRoom={true}
                roomCode={roomCode}
                votes={room.votes_to_skip}
                canPause={room.guest_can_pause}
              />
            </Dialog>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default Room;
