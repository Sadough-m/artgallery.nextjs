import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";

// gm : files ↓
import Guy from "../../../../../public/images/guy.png";
import ContactCreated from "./ContactCreated";
import Emoji from "./Emoji";

// gm : components ↓

export default function TimeLine() {
  // gm : states ↓

  
  return (
    <Grid item className={Style.Main_TimeLine} style={{paddingBottom:8}}>
      {/* title */}
      <Grid item className={Style.TimeLineText}>
        Timeline
      </Grid>

      <Grid container alignItems="center" className={Style.P_ImageInput}>
        <Grid item>
          <img src={Guy.src} className={Style.ImgTimeLine} />
        </Grid>
        <Grid item className={Style.P_InputTimeLine}>
          <input
            type="text"
            placeHolder="Leave a comment"
            className={Style.InputTimeLine}
          />
         
          <Emoji/>
        </Grid>
        <Grid item className={Style.P_SendBtn}>
          <Button variant="contained" color="primary" className={Style.ButtonSend}>
            Send
          </Button>
        </Grid>
      </Grid>
      <Grid item className={Style.P_ContactCreated}>
        <ContactCreated/>
        <ContactCreated/>
        <ContactCreated/>
      </Grid>

    </Grid>
  );
}
