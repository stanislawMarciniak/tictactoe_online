import React from "react";
import "./Box.css";

const Box = ({ value, onClick, id }) => {
  const style = value === "X" ? "box x" : "box o";

  return (
    <button className={style} onClick={!value ? () => onClick(id) : null}>
      {value}
    </button>
  );
};

export default Box;
