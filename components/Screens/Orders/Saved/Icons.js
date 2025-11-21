import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import PrinterSvg from "../../../../public/images/icons/Printer.svg";
import trashPic from "../../../../public/images/icons/Trash.svg";
import DuplicateSvg from "../../../../public/images/icons/Duplicate.svg";
import CloseSvg from "../../../../public/images/icons/Close.svg";
import CheckSvg from "../../../../public/images/icons/Check White.svg";

// gm : components ↓

export default function Icons({ PageName = "", HaveButton = false }) {
  // gm : states ↓
  const [DeleteClicked, setDeleteClicked] = useState(false);

  return (
    <Grid
      item
      className={PageName === "DraftOrder" ? Style.Icons_1 : Style.Icons}
    >
      {HaveButton && (
        <Grid item className={Style.P_TwoBtn}>
          <Button
            className={Style.DiscardBtn2}
            startIcon={<img src={CloseSvg.src} />}
          >
            Discard
          </Button>
          <Button
            className={Style.SaveChangesBtn}
            variant="contained"
            color="primary"
            startIcon={<img src={CheckSvg.src} />}
          >
            Save Changes
          </Button>
        </Grid>
      )}
      {!HaveButton && (
        <>
          {DeleteClicked ? (
            <Grid item className={Style.TextIconBtn}>Remove Draft</Grid>
          ) : (
            <IconButton onClick={()=>setDeleteClicked(true)}>
              <img src={trashPic.src} />
            </IconButton>
          )}

          <IconButton>
            <img src={DuplicateSvg.src} />
          </IconButton>

          <IconButton>
            <img src={PrinterSvg.src} />
          </IconButton>
        </>
      )}
    </Grid>
  );
}
