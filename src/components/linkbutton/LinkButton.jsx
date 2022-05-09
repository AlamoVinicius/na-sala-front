import React from "react";
import { Link } from "react-router-dom";

import styles from "./LinkButton.module.css";

const LinkButton = ({ to, text }) => {
  return (
    <Link className={styles.btn} to={to}>
      <span>{text}</span>
      <svg viewBox="0 0 13 10" height="10px" width="15px">
        <path d="M1,5 L11,5"></path>
        <polyline points="8 1 12 5 8 9"></polyline>
      </svg>
    </Link>
  );
};

export default LinkButton;
