import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Exhibition.module.css";

// gm : files ↓
import ArrangeMentSvg from "../../../../public/images/icons/Arrangement.svg";
import ArrowRightSvg from "../../../../public/images/icons/Arrow right blue.svg";
import EditMedia from "../../../Modals/Exhibition/EditMedia";

// gm : components ↓

export default function Arrangement() {
  // gm : states ↓
  const [ModalMedia, setModalMedia] = useState(false)

  return (
    <Grid item className={Style.ArrangeMent}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item className="flex1">
          <Grid container alignItems="center">
            <Grid item>
              <img src={ArrangeMentSvg.src} className={Style.ImgArrange} />
            </Grid>
            <Grid item className={Style.P_Arrange}>
              <Grid item className={Style.ArrangementText}>
                Arrangement
              </Grid>
              <Grid item className={Style.ArrangementDesk}>
                Arrangement of your media in desired POS.
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton size="small" onClick={()=>setModalMedia(true)}>
            <img src={ArrowRightSvg.src} />
          </IconButton>
        </Grid>
      </Grid>

      <EditMedia open={ModalMedia} handleModal={()=>setModalMedia(false)}/>
    </Grid>
  );
}
