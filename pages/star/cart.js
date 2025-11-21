import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓
import Header from "../../components/Screens/Star/Artwork/Header";
import OrderCarts from "../../components/Screens/Star/Cart/OrderCarts";


export default function Artwork() {
  // gm : states ↓
  return (
    <Grid item className={Style.Artwork}>
      <Header HaveProcced={true}/>
      <Grid item className={Style.Body}>
        <OrderCarts/>
      </Grid>

    
    </Grid>
  );
}
