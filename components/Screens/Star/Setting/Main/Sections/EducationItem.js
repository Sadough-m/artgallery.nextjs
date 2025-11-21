import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../../styles/Star.module.css";

// gm : files ↓
import EditSvg from "../../../../../../public/images/icons/Edit.svg";

// gm : components ↓

export default function EducationItem({ Publish }) {
  // gm : states ↓

  return (
    <Grid item className={Style.EducationItem}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item className={Style.PublishedText}>
          <span className={Style.Sharp}>#1</span>{" "}
          <span className={Style.BadgeBlue}></span> Published
        </Grid>
        <Grid item>
          <Button
            color="primary"
            startIcon={<img src={EditSvg.src} />}
            className={Style.EditBtn}
          >
            Edit
          </Button>
          <Button className={Publish ? Style.PublishBtn : Style.UnPublishBtn}>
            {Publish ? "Publish" : "UnPublish"}
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_ItemTitleValue}
      >
        <Grid item className={Style.ItemTitle}>
          Completion year
        </Grid>
        <Grid item className={Style.ItemValue}>
          2010
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_ItemTitleValue}
      >
        <Grid item className={Style.ItemTitle}>
          Degree type
        </Grid>
        <Grid item className={Style.ItemValue}>
          Value
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_ItemTitleValue}
      >
        <Grid item className={Style.ItemTitle}>
          Major
        </Grid>
        <Grid item className={Style.ItemValue}>
          Value
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_ItemTitleValue}
      >
        <Grid item className={Style.ItemTitle}>
          Institution
        </Grid>
        <Grid item className={Style.ItemValue}>
          Value
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_ItemTitleValue}
      >
        <Grid item className={Style.ItemTitle}>
          Department
        </Grid>
        <Grid item className={Style.ItemValue}>
          Value
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_ItemTitleValue}
      >
        <Grid item className={Style.ItemTitle}>
          Cum laude and other honors
        </Grid>
        <Grid item className={Style.ItemValue}>
          Value
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_ItemTitleValue}
      >
        <Grid item className={Style.ItemTitle}>
          Dissertation/Thesis title and advisor
        </Grid>
        <Grid item className={Style.ItemValue}>
          Value
        </Grid>
      </Grid>
    </Grid>
  );
}
