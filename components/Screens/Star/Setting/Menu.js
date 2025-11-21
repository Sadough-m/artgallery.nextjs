import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓

export default function Menu() {
  // gm : states ↓

  const router = useRouter();

  return (
    <Grid item className={Style.Menu}>
      <Link href="/star/setting/community/verify">
        <Grid item className={Style.MenuItem}>
          <span className={Style.BadgeGreenNew}>1</span> Verify your identify
        </Grid>
      </Link>
      <Link href="/star/setting/community/statuse">
        <Grid item className={Style.MenuItem}>
          <span className={Style.BadgeOrange}>2</span> Statuse
        </Grid>
      </Link>
      <Link href="/star/setting/community/confirmcv">
        <Grid item className={Style.MenuItem_DeActive}>
          <span className={Style.BadgeGary}>3</span> Confirm your CV
        </Grid>
      </Link>
      <Link href="/star/setting/community/confirmwork">
        <Grid item className={Style.MenuItem_DeActive}>
          <span className={Style.BadgeGary}>4</span> Confirm your Work
        </Grid>
      </Link>
    </Grid>
  );
}
