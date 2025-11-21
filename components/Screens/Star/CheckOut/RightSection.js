import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import ManPng from "../../../../public/images/man.jpg";
import Item from "./Item";
import TextArea from "../../../Forms/TextArea";

// gm : components ↓

export default function RightSection() {
  // gm : states ↓
  const [AddNote, setAddNote] = useState(false);

  return (
    <Grid item className={Style.Check_RightSide}>
      <Grid item className={Style.WarpperSellerItem}>
        <Grid item className={Style.SellerTxt}>
          Seller
        </Grid>
        <Grid container alignItems="center">
          <Grid item>
            <img src={ManPng.src} className={Style.SellerImg} />
          </Grid>
          <Grid item className={Style.GalleryName}>
            <Grid item>Name, Gallery name</Grid>
            <Grid item>Location</Grid>
          </Grid>
        </Grid>
        <Grid item className={Style.ItemTxt}>
          Items
        </Grid>
        {/* Items */}
        <Item />
        <Item />
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        className={Style.P_Sections}
      >
        <Grid item className={Style.SubTotal}>
          Sub Total
        </Grid>
        <Grid item className={Style.PriceSec}>
          <span className={Style.Doller}>$</span>500.00
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          justifyContent="space-between"
          className={Style.P_Sections2}
        >
          <Grid item className={Style.SubTotal}>
            Shipping
          </Grid>
          <Grid item className={Style.PriceSec2}>
            <span className={Style.Doller}>$</span>------
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          className={Style.P_Sections3}
        >
          <Grid item className={Style.SubTotal}>
            Tax
          </Grid>
          <Grid item className={Style.PriceSec2}>
            <span className={Style.Doller}>$</span> -------
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        className={Style.P_Sections}
      >
        <Grid item className={Style.SubTotal}>
          Total
        </Grid>
        <Grid item className={Style.PriceSec2}>
          <span className={Style.Doller}>$</span> -------
        </Grid>
      </Grid>
      {/* Icon Is Just For test, I cant get Export from figma! */}
      <Grid item className={Style.AddNote}>
        <Grid item onClick={() => setAddNote(!AddNote)} className={Style.AddBtn}>
          <span className={Style.Plus}> {!AddNote ? "+":"x"} </span>{!AddNote ? "Add note":"Clear note"} 
        </Grid>
        {AddNote && (
          <Grid item style={{ marginTop: -13 }}>
            <TextArea Radius={2} MarginBot={0} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
