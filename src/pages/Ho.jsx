import React, { useState, useEffect } from "react";
import "../css/game.css";

function Ho() {
  const [gift, setGift] = useState();

  const gifts = [
    "Van A",
    "Van L",
    "Van KA",
    "Van Y",
    "Van AJ",
    "Van AH",
    "Van B",
  ];

  const handleClick = () => {
    const index = Math.floor(Math.random() * gifts.length);
    setGift(gifts[index]);
  };
  return (
    <div className="game">
      <div className="game-hello">
        <h1>{gift || "Chưa có lựa chọn nào hết! Hãy 'Click' vào Lựa chọn"}</h1>
      </div>
      <button onClick={handleClick} className="btn">
        Lựa chọn
      </button>
    </div>
  );
}
export default Ho;
