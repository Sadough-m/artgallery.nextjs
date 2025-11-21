import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Messaging.module.css";

// gm : files ↓
import ArrowDownSvg from "../../../../public/images/icons/Arrow down black.svg";
import ArrowUpSvg from "../../../../public/images/icons/Arrow Up.svg";
import PlusSvg from "../../../../public/images/icons/Plus - Circle.svg";

// gm : components ↓

export default function QuickMessage() {
  // gm : states ↓
  const [Open, setOpen] = useState(false);

  return (
    <Grid item className={Style.P_QuickMessage}>
      <Grid item className={Open ? Style.QuickMessageOpen  : Style.QuickMessage} >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={Style.C_QuickMessage}
          onClick={()=>setOpen(!Open)}
        >
          <Grid item>Quick Message</Grid>
          <Grid item>
            <IconButton size="small" className={Style.PlusCircle}>
              <img src={PlusSvg.src} width="16px"/>
            </IconButton>
            <img src={Open ? ArrowDownSvg.src : ArrowUpSvg.src} className={Style.SvgQuickMessage} />
          </Grid>
        </Grid>
        {/* Quick Message Items */}
        {Open && (
          <Grid container className={Style.P_QuickItem}>
            <Grid item className={Style.QuickMessageItem}>
              Sample quick message here
            </Grid>
            <Grid item className={Style.QuickMessageItem}>
              Sample quick message here
            </Grid>
            <Grid item className={Style.QuickMessageItem}>
              Sample quick message here
            </Grid>
            <Grid item className={Style.QuickMessageItem}>
              Sample quick message here
            </Grid>
            <Grid item className={Style.QuickMessageItem}>
              Sample quick message here
            </Grid>
            <Grid item className={Style.QuickMessageItem}>
              Sample quick message here
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
