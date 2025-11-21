import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/UserSettings.module.css";

// gm : files ↓

// gm : components ↓
import EditDelete from "./EditDelete";

export default function Email({ emailListData, emailListItem, allEmailListData, refreshEmit }) {
  // gm : states ↓

  return (
    <Grid item className={Style.Email}>
      <Grid item className={Style.EmailTitle}>{emailListItem?.title} </Grid>
      <Grid item className={Style.EmailAllList}>{emailListData?.title} </Grid>
      <Grid item className={Style.dotsLocation_email}>
        <EditDelete emailListData={emailListData} emailListItem={emailListItem} allEmailListData={allEmailListData} refreshEmit={refreshEmit} />
      </Grid>
    </Grid>
  );
}
