import React from "react";
import "./Dice.css";

const Dice = ({ value, isHeld, holdDice, id }) => {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "#fff",
  };
  return (
    <div onClick={holdDice} className="dice" style={styles}>
      {value}
    </div>
  );
};

export default Dice;
