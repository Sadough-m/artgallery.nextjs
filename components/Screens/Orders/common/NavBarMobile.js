import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import arrowLeft from "../../../../public/images/icons/Arrow left -.svg";
import dotsSvg from "../../../../public/images/icons/MoreBlack.svg";
import PrinterSvg from "../../../../public/images/icons/Printer.svg";
import trashPic from "../../../../public/images/icons/Trash.svg";
import DuplicateSvg from "../../../../public/images/icons/Duplicate.svg";

// gm : components ↓

export default function NavBarMobile({ title, HaveButton }) {
  // gm : states ↓
  const [DeleteClicked, setDeleteClicked] = useState(false);

  return (
    <Grid item className={Style.nameContact}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <IconButton size="small" className={Style.arrowLeft}>
            <img src={arrowLeft.src} />
          </IconButton>
          {title}
        </Grid>
        <Hidden mdUp>
          {HaveButton && (
            <>
              {DeleteClicked && (
                <Grid item className={Style.TextIconBtn}>
                  Remove Draft
                </Grid>
              )}
              {!DeleteClicked && (
                <Grid item>
                  <IconButton onClick={() => setDeleteClicked(true)}>
                    <img src={trashPic.src} />
                  </IconButton>

                  <IconButton>
                    <img src={DuplicateSvg.src} />
                  </IconButton>

                  <IconButton>
                    <img src={PrinterSvg.src} />
                  </IconButton>
                </Grid>
              )}
            </>
          )}
          {!HaveButton && (
            <Grid item>
              <IconButton size="small">
                <img src={dotsSvg.src} />
              </IconButton>
            </Grid>
          )}
        </Hidden>
      </Grid>
    </Grid>
  );
}
