import React from "react";

export default function PlayerAllocation(props) {
  console.log(props.playerCount);
  let dataToProcess =
    typeof props.playerCount.QB === "undefined" ? false : true;
  let player_rows = [];
  if (dataToProcess) {
    Object.keys(props.playerCount).forEach(posKey => {
      Object.keys(props.playerCount[posKey]).forEach(playerKey => {
        let player = props.playerCount[posKey][playerKey];
        player_rows.push(
          <tr>
            <td>{posKey}</td>
            <td>{playerKey}</td>
            <td>{player.team}</td>
            <td>{player.dk_salary}</td>
            <td>{player.dk_points}</td>
            <td>{((player.count / player.user_entries) * 100).toFixed(2)}</td>
            <td>{player.ownership_pct}</td>
          </tr>
        );
      });
    });
  }
  return (
    <div className="pt-2">
      {dataToProcess ? (
        <div>
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
            <tbody>{player_rows}</tbody>
          </table>
        </div>
      ) : (
        <div> Nothing to do</div>
      )}
    </div>
  );
}
