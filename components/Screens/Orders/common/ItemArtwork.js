import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from 'next/router';

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import PlsuBlueSvg from "../../../../public/images/icons/Plus - Circle.svg";
import PlsuGraySvg from "../../../../public/images/icons/Plus - Circle gray.svg";

// gm : components ↓

export default function ItemArtwork({
  title,
  disabled,
  TextBtn = "Add Discount",
  HandleModal,
  Total,
  setTotal
}) {
  const router = useRouter();
  // mrx : states ↓

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_ArtworkSec}
      >
        <Grid item className={Style.Discount}>
          {title}
        </Grid>
        <Grid item className={Style.percentDiscount}>
          {Total ? Total : ""}
          {!disabled ? (
            <Button
              color="primary"
              startIcon={!Total ? <img src={PlsuBlueSvg.src} /> : ""}
              className={Style.fitBtn_1}
              onClick={HandleModal}
            >
              {Total ? "(Edit)" : TextBtn}
            </Button>
          ) : (
            <Button
              startIcon={!Total ? <img src={PlsuGraySvg.src} /> : ""}
              className={Style.fitBtn_12}
              onClick={() => { toast.info("Please add item first"); router.push("/orders/add#AddItem") }}
            >
              {Total ? "(Edit)" : TextBtn}
            </Button>
          )
          }
        </Grid>
      </Grid>
    </>
  );
}
