import React from "react";

// mrx : material ui ↓
import { Grid, Button } from "@material-ui/core";

// mrx : styles ↓
import artsitStyle from "../../styles/artist.module.css";
import styles from "../../styles/Home.module.css";

export default function Items({ TitleListIsOpen, educationItems }) {
  return (
    <Grid
      item
      className={`${styles.w_100} ${
        TitleListIsOpen ? artsitStyle.Elements_Active : artsitStyle.Elements
      }`}
    >
      <Grid
        container
        justifyContent="space-between"
        className={`${artsitStyle.P_El}`}
      >
        <Grid item className={`${artsitStyle.Elements_name}`}>
          Completion year
        </Grid>
        <Grid item className={`${artsitStyle.valueEl}`}>
          {educationItems.completionYear}
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        className={`${artsitStyle.P_El}`}
      >
        <Grid item className={`${artsitStyle.Elements_name}`}>
          Degree type
        </Grid>
        <Grid item className={`${artsitStyle.valueEl}`}>
          {educationItems.degreeType}
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        className={`${artsitStyle.P_El}`}
      >
        <Grid item className={`${artsitStyle.Elements_name}`}>
          Major
        </Grid>
        <Grid item className={`${artsitStyle.valueEl}`}>
          {educationItems.major}
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        className={`${artsitStyle.P_El}`}
      >
        <Grid item className={`${artsitStyle.Elements_name}`}>
          Institution
        </Grid>
        <Grid item className={`${artsitStyle.valueEl}`}>
          {educationItems.institution}
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        className={`${artsitStyle.P_El}`}
      >
        <Grid item className={`${artsitStyle.Elements_name}`}>
          Department
        </Grid>
        <Grid item className={`${artsitStyle.valueEl}`}>
          {educationItems.department}
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        className={`${artsitStyle.P_El}`}
      >
        <Grid item className={`${artsitStyle.Elements_name}`}>
          Cum laude and other honors
        </Grid>
        <Grid item className={`${artsitStyle.valueEl}`}>
          {educationItems.honors}
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item className={`${artsitStyle.Elements_name}`}>
          Dissertation/Thesis title and advisor
        </Grid>
        <Grid item className={`${artsitStyle.valueEl}`}>
          {educationItems.dissertations}
        </Grid>
      </Grid>
    </Grid>
  );
}
