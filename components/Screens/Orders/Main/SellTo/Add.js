import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// mrx : api links ↓
import { BASE_Image_Url } from "../../../../../pages/api/index";

// gm : styles ↓
import Style from "../../../../../styles/Orders.module.css";

// gm : files ↓
import TinyGuyPng from "../../../../../public/images/Tiny Guy.png";
import CloseSvg from "../../../../../public/images/icons/Close icon.svg";

// gm : components ↓

export default function Add({ handleRemove, Item }) {
  // gm : states ↓

  return (
    <Grid item className={Style.AddArtist}>
      <img
        style={{ width: '25px' }}
        src={BASE_Image_Url + Item?.image}
        width="22px"
        height="22px"
        className={Style.AddedImg}
      />
      <span style={{ position: 'relative', top: -2 }}>{Item?.name}</span>
      <IconButton onClick={() => handleRemove()} size='small' className={Style.CloseAdd}>
        <img src={CloseSvg.src} />
      </IconButton>
    </Grid>
  );
}
