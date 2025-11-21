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

export default function AudienceDocument() {
  // gm : states ↓

  const [width, height] = useWindowSize();

  return (
    <Grid item className={Style.MyMessage}>
      <Grid
        container
        direction={width > 960 ? "row" : "column"}
        alignItems={width > 960 ? "center" : "flex-start"}
      >
        <Grid
          item
          className={Style.TextAudience}
          style={{ padding: "9px 13px 9px 7px" }}
        >
          <IconButton size="small" style={{ marginRight: 9 }}>
            <img src={PdfSvg.src} />
          </IconButton>
          <span className={Style.PTextDoc}>Report.doc</span>

          <span className={Style.SizeDocAu}>43 MB</span>
          <IconButton size="small">
            <img src={DownSvg.src} />
          </IconButton>
        </Grid>
        <Grid item className={Style.TimeMyMessage}>
          10:20 PM
        </Grid>
      </Grid>
    </Grid>
  );
}
