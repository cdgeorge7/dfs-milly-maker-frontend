import React, { useState, useEffect } from "react";

export default function PlayerAllocation(props) {
  console.log(props.playerAllocation);
  const [activeTabData, setActiveTabData] = useState([]);
  const [activeTab, setActiveTab] = useState("QB");

  let dataToProcess =
    typeof props.playerAllocation.QB === "undefined" ? false : true;

  const ACTIVE_COLOR = "#b3aead";

  const clickedPosTab = position => {
    console.log(`Clicked ${position}`);
    let playerRows = [];
    if (dataToProcess) {
      Object.keys(props.playerAllocation[position]).forEach(playerKey => {
        let player = props.playerAllocation[position][playerKey];
        playerRows.push(
          <tr key={playerKey}>
            <td>{position}</td>
            <td>{playerKey}</td>
            <td>{player.team}</td>
            <td>{player.dk_salary}</td>
            <td>{player.dk_points}</td>
            <td>{((player.count / player.user_entries) * 100).toFixed(2)}</td>
            <td>{player.ownership_pct}</td>
          </tr>
        );
      });
    }
    setActiveTabData(playerRows);
    setActiveTab(position);
  };

  useEffect(() => clickedPosTab("QB"), [props.playerAllocation]);

  return (
    <div className="pt-2">
      {dataToProcess ? (
        <div>
          <ul className="nav nav-tabs">
            <li role="presentation" className="nav-item pr-1">
              <button
                className="nav-link"
                style={{
                  backgroundColor: activeTab === "QB" ? ACTIVE_COLOR : null,
                  outline: "none"
                }}
                onClick={e => clickedPosTab("QB")}
              >
                QB
              </button>
            </li>
            <li role="presentation" className="nav-item pr-1">
              <button
                className="nav-link"
                style={{
                  backgroundColor: activeTab === "RB" ? ACTIVE_COLOR : null,
                  outline: "none"
                }}
                onClick={e => clickedPosTab("RB")}
              >
                RB
              </button>
            </li>
            <li role="presentation" className="nav-item pr-1">
              <button
                className="nav-link"
                style={{
                  backgroundColor: activeTab === "WR" ? ACTIVE_COLOR : null,
                  outline: "none"
                }}
                onClick={e => clickedPosTab("WR")}
              >
                WR
              </button>
            </li>
            <li role="presentation" className="nav-item pr-1">
              <button
                className="nav-link"
                style={{
                  backgroundColor: activeTab === "TE" ? ACTIVE_COLOR : null,
                  outline: "none"
                }}
                onClick={e => clickedPosTab("TE")}
              >
                TE
              </button>
            </li>
            <li role="presentation" className="nav-item pr-1">
              <button
                className="nav-link"
                style={{
                  backgroundColor: activeTab === "DST" ? ACTIVE_COLOR : null,
                  outline: "none"
                }}
                onClick={e => clickedPosTab("DST")}
              >
                DST
              </button>
            </li>
          </ul>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Position</th>
                <th>Player</th>
                <th>Team</th>
                <th>Salary</th>
                <th>Points</th>
                <th>User Ownership</th>
                <th>League Ownership</th>
              </tr>
            </thead>
            <tbody>{activeTabData}</tbody>
          </table>
        </div>
      ) : (
        <div> Nothing to do</div>
      )}
    </div>
  );
}
