import React from "react";
import styles from "./Portal.module.css";
import RoomChoice from "../../components/RoomChoice/RoomChoice";
import hall from "../../assets/images/hall-bg.jpeg";

function PortalPage() {
  return (
    <section
      className={styles.heroSection}
      style={{ backgroundImage: `url(${hall})` }}
    >
      <div className={styles.fullWidthFix}>
       <RoomChoice />
      </div>
    </section>
  );
}

export default PortalPage;
