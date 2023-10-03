import React from "react";
import "./loading-back-drop.css";

import iconMachine from "../../assets/imgs/tatooMachine.svg";

export const BackdropLoading = ({ text }) => {
  return (
    <div className="loading-container">
      <img src={iconMachine} className="loading-logo" width={80} height={80} alt="Logo" />
      <p className="loading-text">Carregando...</p>
    </div>
  );
};
