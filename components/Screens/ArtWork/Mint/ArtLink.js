import React, { useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";

// good man : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// good man : styles ↓
import style from "../../../../styles/Home.module.css";

// good man : files ↓
import copy from "../../../../public/images/icons/Copy.svg";

// good man : components ↓

export default function ArtLink({ label, value }) {
  // good man : states ↓

  function copyIt() {
    // find the element we will select
    let copyInput = document.querySelector('#copy-input')
    // select that input
    copyInput.select()
    // copy it!
    document.execCommand("copy")
  }

  return (
    <Grid item>
      <Grid container direction="column">
        <Grid item className={style.labelArtlink}>
          {label}
        </Grid>
        <Grid item className={style.posRel}>
          <input id='copy-input' value={value} className={style.formInput_Art} />
          <Grid item className={style.copyPic}>
            <IconButton onClick={() => { toast.info("ArtLink copied"); copyIt() }} size='small'>
              <Image src={copy} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
