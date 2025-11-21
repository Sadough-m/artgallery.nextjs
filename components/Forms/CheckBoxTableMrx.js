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
  onClick,
  AddedArtworks,
  setAddedArtworks,
  Data,
  ID,
}) {
  // mrx : states ↓

  return (
    <Grid
      item
      className={Style.P_CkeckBoxTable}
      onClick={onClick}
    >
      {AddedArtworks?.filter((item) => item === ID)?.length || AddedArtworks?.length === Data?.length ? (
        <Image src={CheckedSvg} />
      ) : (
        <Image src={NotCheckedSvg} />
      )}
    </Grid>
  );
}