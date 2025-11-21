import { Grid } from "@material-ui/core";
import React from "react";

// good man : styles ↓
import savedArtistStyle from "../../../styles/savedArtist.module.css";

export default function SectionInfo({ title, ActiveBadge }) {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="flex-start"
      className={savedArtistStyle.P_items}
      spacing={1}
    >
      <Grid item className={savedArtistStyle.badge_width}>
        <span className={
            ActiveBadge
              ? savedArtistStyle.badgeActive
              : savedArtistStyle.badgeDeactive
          }></span>{" "}
      </Grid>
      <Grid item className={savedArtistStyle.itemsCv}>
        {title}
      </Grid>

    </Grid>
  );
}
