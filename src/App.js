import "./App.css";
import { useEffect, useState } from "react";
import CreateRoom from "./components/CreateRoom/CreateRoom";
import Homepage from "./components/Homepage/Homepage";
import Room from "./components/Room/Room";
import RoomJoin from "./components/RoomJoin/RoomJoin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

function App() {
  return (
    <main>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/join" element={<RoomJoin />} />
            <Route path="/create" element={<CreateRoom />} />
            <Route path="/Room/:pk" element={<Room />} />
          </Routes>
        </Router>
      </div>
    </main>
  );
}

export default App;
