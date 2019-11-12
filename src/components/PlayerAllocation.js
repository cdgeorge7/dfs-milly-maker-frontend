import React, { useState, useEffect } from "react";

export default function PlayerAllocation(props) {
  //console.log(props.playerAllocation);
  const [activeTabData, setActiveTabData] = useState([]);
  const [activeTab, setActiveTab] = useState("QB");
  const [initTab, setInitTab] = useState(true);
  const [sortDirection, setSortDirection] = useState({
    dk_salary: true,
    dk_points: true,
    usage: true,
    ownership_pct: true
  });

  let dataToProcess =
    typeof props.playerAllocation.QB === "undefined" ? false : true;

  const ACTIVE_COLOR = "#b3aead";

  const clickedPosTab = position => {
    //console.log(`Clicked ${position}`);
    let playerRows = [];
    if (dataToProcess) {
      Object.keys(props.playerAllocation[position]).forEach(playerKey => {
        let player = props.playerAllocation[position][playerKey];
        playerRows.push({
          key: playerKey,
          position: position,
          playerKey: playerKey,
          team: player.team,
          dk_salary: player.dk_salary,
          dk_points: player.dk_points,
          usage: ((player.count / player.user_entries) * 100).toFixed(2),
          ownership_pct: player.ownership_pct
        });
      });
    }
    setActiveTabData(playerRows);
    setActiveTab(position);
  };

  const sortColumn = colName => {
    let data = [...activeTabData];
    if (sortDirection[colName]) {
      console.log(sortDirection[colName]);
      data.sort((a, b) => {
        if (isNaN(parseFloat(a[colName]))) {
          return a[colName] < b[colName] ? 1 : -1;
        } else {
          return parseFloat(a[colName]) < parseFloat(b[colName]) ? 1 : -1;
        }
      });
      let newDirection = !sortDirection[colName];
      let newSortDirectionObj = { ...sortDirection };
      Object.keys(newSortDirectionObj).forEach(
        key => (newSortDirectionObj[key] = true)
      );
      newSortDirectionObj[colName] = newDirection;
      setSortDirection(newSortDirectionObj);
    } else {
      data.sort((a, b) => {
        if (isNaN(parseFloat(a[colName]))) {
          return a[colName] < b[colName] ? -1 : 1;
        } else {
          return parseFloat(a[colName]) < parseFloat(b[colName]) ? -1 : 1;
        }
      });
      let newDirection = !sortDirection[colName];
      let newSortDirectionObj = { ...sortDirection };
      Object.keys(newSortDirectionObj).forEach(
        key => (newSortDirectionObj[key] = true)
      );
      newSortDirectionObj[colName] = newDirection;
      setSortDirection(newSortDirectionObj);
    }
    console.log(data);
    setActiveTabData(data);
  };

  useEffect(() => {
    clickedPosTab("QB");
  }, [props.search]);

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
                <th
                  onClick={e => {
                    sortColumn("dk_salary");
                  }}
                >
                  Salary
                </th>
                <th
                  onClick={e => {
                    sortColumn("dk_points");
                  }}
                >
                  Points
                </th>
                <th
                  onClick={e => {
                    sortColumn("usage");
                  }}
                >
                  User Ownership
                </th>
                <th
                  onClick={e => {
                    sortColumn("ownership_pct");
                  }}
                >
                  League Ownership
                </th>
              </tr>
            </thead>
            <tbody>
              {activeTabData.map(row => {
                return (
                  <tr key={row.playerKey}>
                    <td>{row.position}</td>
                    <td>{row.playerKey}</td>
                    <td>{row.team}</td>
                    <td>{row.dk_salary}</td>
                    <td>{row.dk_points}</td>
                    <td>{row.usage}</td>
                    <td>{row.ownership_pct}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div> Nothing to do</div>
      )}
    </div>
  );
}
