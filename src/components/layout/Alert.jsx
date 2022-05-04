import React from "react"

import styles from "./Alert.module.css";

const Alert = ({ severity, msg }) => {
  return ( 
    <div className={styles[severity]}>{msg}</div>
  );
};
export default Alert;
