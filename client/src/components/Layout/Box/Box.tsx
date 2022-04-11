import React from "react";

import styles from "./Box.module.css";

function Box({
  children,
  style,
  ...props
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className={styles.container} style={style} {...props}>
      {children}
    </div>
  );
}

export default Box;
