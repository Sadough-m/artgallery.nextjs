import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../../styles/Star.module.css";

// gm : files ↓
import ArrowDownSvg from "../../../../../../public/images/icons/Arrow down.svg";
import ArrowUpSvg from "../../../../../../public/images/icons/Arrow Up.svg";
import EducationItem from "./EducationItem";

// gm : components ↓

export default function EducationSection() {
  // gm : states ↓
  const [OpenSec, setOpenSec] = useState(false);

  return (
    <Grid
      item
      className={Style.SectionMain}
      style={{ paddingBottom: OpenSec ? 12 : 7 }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.HeaderSection}
        onClick={() => setOpenSec(!OpenSec)}
      >
        <Grid item className={Style.SecTitle}>
          Previews info
        </Grid>
        <Grid item>
          <img
            src={OpenSec ? ArrowUpSvg.src : ArrowDownSvg.src}
            className={Style.ImgArrow}
          />
        </Grid>
      </Grid>
      {OpenSec && <span className={Style.LineSections}></span>}
      {OpenSec && (
        <>
          <EducationItem />
          <EducationItem Publish={true}/>
        </>
      )}
    </Grid>
  );
}
