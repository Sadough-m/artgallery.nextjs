import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Grid } from "@material-ui/core";

// good man : styles ↓
import Style from "../../styles/Home.module.css";

// good man : files ↓
import NotCheckedSvg from "../../public/images/icons/NotChecked.svg";
import CheckedSvg from "../../public/images/icons/CheckedBlue.svg";

// good man : components ↓

export default function CheckBoxTable({
  artistId,
  handleChange,
  artists,
  checked,
}) {
  // mrx : states ↓

  if (artistId === "allSelect") {
    return (
      <Grid
        item
        className={Style.P_CkeckBoxTable}
        onClick={() => handleChange("allSelect")}
      >
        {artists?.filter((artist) => artist?.isChecked !== true).length < 1 ? (
          <Image src={CheckedSvg} />
        ) : (
          <Image src={NotCheckedSvg} />
        )}
      </Grid>
    );
  } else
    return (
      <Grid item className="pointer" onClick={() => handleChange(artistId)}>
        {checked ? <Image src={CheckedSvg} /> : <Image src={NotCheckedSvg} />}
      </Grid>
    );
}
