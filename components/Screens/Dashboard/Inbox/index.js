import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Box, Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Dashboard.module.css";
import Item from "./Item";

// gm : files ↓
import ArrowSvg from "../../../../public/images/icons/ArrowRightBright.svg";

// gm : components ↓

export default function Inbox() {
  // gm : states ↓

  return (
    <Grid item className={Style.Inbox}>
      <Grid item className={Style.inbox_text}>
        Inbox
      </Grid>
      {/* Items */}
      <Grid item className={Style.p_items}>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </Grid>
      <Box textAlign="center" className={Style.Box}>
        <Button endIcon={<Image src={ArrowSvg} />} className={Style.viewAll}>
          View All
        </Button>
      </Box>
    </Grid>
  );
}
