import React, { useState } from "react";
import axios from "axios";

import MissionForm from "./components/MissionForm";
import MissionsList from "./components/MissionsList";

export default function App() {
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [error, setError] = useState("");
  const [missions, setMissions] = useState([]);

  const getData = () => {
    setIsFetchingData(true);
    axios
      .get("https://api.spacexdata.com/v3/missions")
      .then(res => {
        console.log(res);
        setIsFetchingData(false);
        setMissions(res.data);
      })
      .catch(err => {
        console.error("error fetching data from api, err: ", err.message);
        setIsFetchingData(false);
        setError(err.message);
      });
  };
  return (
    <div className="App">
      <h1>Space Missions</h1>
      <MissionForm getData={getData} isFetchingData={isFetchingData} />
      <MissionsList error={error} missions={missions} />
    </div>
  );
}
