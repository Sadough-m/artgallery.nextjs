import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Contacts.module.css";

// gm : files ↓
import testPng from "../.../../../../../public/images/list art.png";
import pdfSvg from "../.../../../../../public/images/icons/PDF.svg";
import LoadingSpinerSvg from "../../../../public/loading.svg";

// gm : components ↓
import CustomFilter from "../../Artist/CustomFilter";
import OrdersItem from "./OrdersItem";

export default function Orders({
  isEmpty = true,
  AllLoading
}) {
  // gm : states ↓

  return (
    <Grid item className={Style.Orders}>
      <Grid item className={Style.ordersText}>
        Orders
      </Grid>
      {/* empty order list*/}
      {isEmpty && (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          className={Style.p_orders}
        >
          <Grid item className={Style.noOrderText}>
            No orders added yet
          </Grid>
        </Grid>
      )}

      {/* Not empty order list*/}
      {!isEmpty && <Grid item className={Style.p_orders_list}>
        <Grid container justifyContent="center" className={Style.p_filter}>
          <CustomFilter label="Sort by" />
        </Grid>
        <Hidden mdUp>
          <Grid item className={Style.textArtwork}>Artwork</Grid>
        </Hidden>

        {/* items */}
        <Grid item className={Style.p_orders_items} >
          <OrdersItem />
          <OrdersItem />
          <OrdersItem />
        </Grid>
      </Grid>}


    </Grid>
  );
}
