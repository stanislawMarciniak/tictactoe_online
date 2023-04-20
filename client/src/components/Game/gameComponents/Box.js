import React from "react";
import "./Box.css";

const Box = ({ value, onClick, clicked }) => {
  const style = value === "X" ? "box x" : "box o";

  return (
    <button className={style} onClick={!value ? () => onClick(clicked) : null}>
      {value}
    </button>
  );
};

export default Box;
