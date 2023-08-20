import React from "react";
import "./loading-back-drop.css";

import logo from "../../assets/imgs/icone-naSala.png";

export const BackdropLoading = ({ text }) => {
  return (
    <div className="loading-container">
      <img src={logo} className="loading-logo" width={80} height={80} alt="Logo" />
      <p className="loading-text">Carregando...</p>
    </div>
  );
};
