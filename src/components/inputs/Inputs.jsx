import React from "react";

import styles from "./Input.module.css";

export const InputEffect = ({
  type,
  textLabel,
  name,
  handleOnChange,
  value
}) => {
  return (
    <div className={styles.group}>
      <input
        type={type}
        className={styles.input_effect}
        name={name}
        onChange={handleOnChange}
        value={value}
      />
      <span className={styles.highlight}></span>
      <span className={styles.bar}></span>
      <label htmlFor={name}>{textLabel}</label>
    </div>
  );
};
