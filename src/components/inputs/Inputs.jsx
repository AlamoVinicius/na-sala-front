import React from "react";

import styles from "./Inputs.module.css";

export const InputEffect = ({ type, textLabel, name, handleOnChange, value }) => {
  return (
    <div className={styles.group}>
      <input required className={styles.input_effect} type={type} name={name} onChange={handleOnChange} value={value} />
      <span className={styles.highlight}></span>
      <span className={styles.bar}></span>
      <label htmlFor={name}>{textLabel}</label>
    </div>
  );
};
