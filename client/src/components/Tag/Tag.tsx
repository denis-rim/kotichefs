import React from "react";

import styles from "./Tag.module.css";

function Tag({
  tags,
  onClick,
}: {
  tags: string[];
  onClick: (item: string) => void;
}) {
  return (
    <div className={styles.tagsContainer}>
      <div className={styles.tag}>
        <span>All</span>
      </div>
      {tags.map((item) => (
        <div key={item} className={styles.tag} onClick={() => onClick(item)}>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export default Tag;
