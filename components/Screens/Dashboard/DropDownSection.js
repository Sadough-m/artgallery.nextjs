import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Dashboard.module.css";

// gm : files ↓
import arrowDown from "../../../public/images/icons/Arrow down.svg";
import arrowUp from "../../../public/images/icons/Arrow Up.svg";
import checkLight from "../../../public/images/icons/Check - Circle light.svg";
import questionIcon from "../../../public/images/icons/question-circle.svg";
import { FlashOnRounded } from "@material-ui/icons";
import closeIcon from "../../../public/images/icons/Close12.svg";
import arrowRight from "../../../public/images/icons/Arrow right black.svg";
import PostItem from "./PostItem";

// gm : components ↓

// !!! note !!! : default open is just for test, u can delete it
export default function DropDownSection({ defaultOpen = false }) {
  // gm : states ↓
  const [Section, setSection] = useState(defaultOpen);

  // handle open and close section
  const handleSection = () => {
    setSection(!Section);
  };

  return (
    <Grid
      item
      className={Style.whiteSection}
      style={{ paddingBottom: Section ? "17px" : "0" }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.titleSec}
        onClick={() => handleSection()}
        style={{ borderBottom: Section ? "1px solid #EEF0F3" : "none" }}
      >
        {/* title */}
        <Grid item>Let’s start</Grid>
        <Grid item className={Style.drp}>
          <img src={!Section ? arrowDown.src : arrowUp.src} />
        </Grid>
      </Grid>

      {/* items */}
      {Section && (
        <>
          <Grid container direction="column" justifyContent="center">
            <PostItem />
          </Grid>
        </>
      )}
    </Grid>
  );
}
