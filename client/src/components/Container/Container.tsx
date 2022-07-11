import React from "react";

import styles from "./Container.module.css";

function Container({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}

export default Container;
