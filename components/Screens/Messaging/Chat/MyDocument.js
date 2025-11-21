import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Messaging.module.css";

// gm : files ↓
import DownSvg from "../../../../public/images/icons/DownloadBlue.svg";
import PdfSvg from "../../../../public/images/icons/BluePDF.svg";

// gm : components ↓
import useWindowSize from "../../../../Hooks/useWindowSize";

export default function MyDocument() {
  // gm : states ↓

  const [width, height] = useWindowSize();

  return (
    <Grid item className={Style.MyMessage}>
      <Grid
        container
        direction={width > 960 ? "row-reverse" : "column"}
        alignItems={width > 960 ? "center" : "flex-end"}
      >
        <Grid
          item
          className={Style.TextMyMessage}
          style={{ padding: "9px 7px 9px 13px" }}
        >
          <IconButton size="small">
            <img src={DownSvg.src} />
          </IconButton>
          <span className={Style.SizeDoc}>43 MB</span>
          <span className={Style.PTextDoc}>Report.doc</span>
          <IconButton size="small" style={{marginLeft:12}}>
            <img src={PdfSvg.src} />
          </IconButton>
        </Grid>
        <Grid item className={Style.TimeMyMessage}>
          10:20 PM
        </Grid>
      </Grid>
    </Grid>
  );
}
