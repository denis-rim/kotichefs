import React, { ReactPropTypes } from "react";

import styles from "./BoxInner.module.css";

function BoxInner({
  children,
  style,
  props,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  props?: ReactPropTypes;
}) {
  return (
    <div className={styles.container} style={style} {...props}>
      {children}
    </div>
  );
}

export default BoxInner;
