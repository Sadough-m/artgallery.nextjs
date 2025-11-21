import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Exhibition.module.css";

// gm : files ↓
import BookMarkSvg from "../../../public/images/icons/book mark gray.svg";
import trashPic from "../../../public/images/icons/Trash.svg";
import NotificationSvg from "../../../public/images/icons/Notification 2.svg";
import InqueriesSvg from "../../../public/images/icons/Inquries.svg";

// gm : components ↓

export default function Icons() {
  // gm : states ↓

  return (
    <Grid item className={Style.Icons_1}>
      <IconButton>
        <img src={BookMarkSvg.src} style={{width:'21px'}}/>
      </IconButton>

      <IconButton>
        <img src={InqueriesSvg.src} />
      </IconButton>

      <IconButton>
        <img src={NotificationSvg.src} />
      </IconButton>

      <IconButton>
        <img src={trashPic.src} />
      </IconButton>
    </Grid>
  );
}
