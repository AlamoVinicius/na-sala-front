import React from "react";
import notfound from "../../assets/imgs/Erro-404-1-1-1024x645-1.svg";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.not_found}>
      <div><img src={notfound} alt="404 not found" /></div>
    </div>
  );
};

export default NotFound;
