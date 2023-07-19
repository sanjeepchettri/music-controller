import React, { useEffect, useState } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";

const CreateRoom = (prop) => {
  const [defaultVotes, setDefaultVotes] = useState(2);
  const update = prop.updateRoom;
  const code = prop.roomCode;

  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  };
  const [guestCanPause, setGuestcanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const navigate = useNavigate();

  const handleGuestAndPauseChange = (e) => {
    setGuestcanPause(e.target.value === "true" ? true : false);
  };

  const handleCreate = async () => {
    console.log(guestCanPause, votesToSkip);
    const payload = {
      guest_can_pause: guestCanPause,
      votes_to_skip: votesToSkip,
    };
    const res = await axios.post("/api/create-room", payload);
    console.log(res.data);
    if (res.status === 201 || res.status ===200) {
      console.log(res.data.code);
      navigate(`/room/${res.data.code}`);
    }
  };

  const handleUpdate = async () => {
    const payload = {
      guest_can_pause: guestCanPause,
      votes_to_skip: votesToSkip,
      code: code,
    };
    const res = await axios.patch("/api/update-room", payload);
    window.location.reload();
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          {update ? (
            <Typography component="h4" variant="h4">
              Update
            </Typography>
          ) : (
            <Typography component="h4" variant="h4">
              Create Room
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl
            component="fieldset"
            onChange={handleGuestAndPauseChange}
          >
            <FormHelperText>
              <FormHelperText>
                <div align="center">Guest Control of playback state</div>
              </FormHelperText>{" "}
            </FormHelperText>
            <RadioGroup row defaultValue={ update ?(prop.canPause):"true"}>
              <FormControlLabel
                value={true}
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value={false}
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            required={true}
            type="number"
            defaultValue={update ? prop.votes : defaultVotes}
            inputProps={{ min: 1 }}
            onChange={handleVotesChange}
          />
          <FormHelperText>
            <div align="center">Votes required to skip song</div>
          </FormHelperText>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="secondary"
            variant="contained"
            onClick={update ? handleUpdate : handleCreate}
          >
            {update ? "Update Room" : "Create Room"}
          </Button>
        </Grid>

        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" to="/" component={Link}>
            {" "}
            Back{" "}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateRoom;
