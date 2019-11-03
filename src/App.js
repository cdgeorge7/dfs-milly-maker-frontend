import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import PlayerAllocation from "./components/PlayerAllocation";

function App() {
  const [playerData, setPlayerData] = useState({});
  const [player, setPlayer] = useState("");
  const [year, setYear] = useState("");
  const [week, setWeek] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false);

  const handleSearchClick = () => {
    if (player !== "" && year !== "" && week !== "") {
      setSearchQuery(`${player}?week=${week}&year=${year}`);
      setSearch(true);
    }
  };

  const getNFLPlayerCount = data => {
    let playerCount = {};
    if (typeof data.lineups !== "undefined") {
      data.lineups.forEach(lineup => {
        if (typeof lineup.players !== "undefined") {
          lineup.players.forEach(player => {
            if (player.position in playerCount) {
              if (player.name in playerCount[player.position]) {
                playerCount[player.position][player.name] += 1;
              } else {
                playerCount[player.position][player.name] = 1;
              }
            } else {
              let positionObject = {};
              positionObject[player.name] = 1;
              playerCount[player.position] = positionObject;
            }
          });
        }
      });
      return playerCount;
    } else {
      return {};
    }
  };

  const fetchData = async () => {
    await axios(`http://localhost:5000/username/${searchQuery}`)
      .then(responseData => {
        setPlayerData(responseData.data);
        console.log(responseData.data);
        setSearch(false);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (search) {
      //console.log(`http://localhost:5000/username/${searchQuery}`);
      fetchData();
    }
  }, [search]);

  return (
    <div className="container-fluid">
      <div className="row mt-5 justify-content-md-center">
        <div className="col"></div>
        <div className="col-8-md-auto bg-dar">
          <input
            type="text"
            placeholder="Player"
            className="mr-2 mb-2"
            onChange={e => setPlayer(e.target.value)}
          />
          <input
            type="text"
            placeholder="Year"
            className="mr-2 mb-2 w-25"
            onChange={e => setYear(e.target.value)}
          />
          <input
            type="text"
            placeholder="Week"
            className="mr-2 mb-2 w-25"
            onChange={e => setWeek(e.target.value)}
          />
          <br />
          <button className="btn btn-secondary" onClick={handleSearchClick}>
            Search
          </button>
        </div>
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="col"></div>
        <PlayerAllocation playerCount={getNFLPlayerCount(playerData)} />
        <div className="col"></div>
      </div>
    </div>
  );
}

export default App;
