import React from "react";

export default function SearchDropdown(props) {
  console.log(props.typingInSearch);
  let display = !props.typingInSearch ? "none" : "inline";
  display = "none";
  console.log(display);
  return (
    <div style={{ display: `${display}`, position: "absolute" }}>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
  );
}
