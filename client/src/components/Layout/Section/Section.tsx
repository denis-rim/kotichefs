import React, { ReactPropTypes } from "react";
import styles from "./Section.module.css";

function Section({
  children,
  style,
  props,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  props?: ReactPropTypes;
}) {
  return (
    <section className={styles.section} style={style} {...props}>
      {children}
    </section>
  );
}

export default Section;
