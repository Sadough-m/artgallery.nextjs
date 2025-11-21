import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Star.module.css";

// gm : files ↓
import VisaPng from "../../../public/images/Visa.png";

// gm : components ↓
import Header from "../../../components/Screens/Star/Artwork/Header";
import RightSection from "../../../components/Screens/Star/CheckOut/RightSection";
import Item from "../../../components/Screens/Star/CheckOut/Item";

export default function CheckOut() {
  // gm : states ↓
  const [BillSameShipping, setBillSameShipping] = useState(false);

  return (
    <Grid item>
      <Header HaveProcced={true} />
      <Grid
        container
        justifyContent="space-between"
        className={Style.WrapperCheckOut}
      >
        <Grid item className={Style.LeftSec}>
          <Grid item className={Style.ContactInfo1}>
            Contact Info <span className={Style.EditText}>Edit</span>
          </Grid>
          <Grid item className={Style.ContactInfo1}>
            Shipping Address <span className={Style.EditText}>Edit</span>
          </Grid>
          <Grid item className={Style.ContactInfo1}>
            Payment Method <span className={Style.EditText}>Edit</span>
          </Grid>

          <Grid item className={Style.P_payMethod}>
            <Grid item className={Style.PayMethod}>
              Review
            </Grid>
            <Grid container alignItems="center" className={Style.P_SubmitText}>
              <Grid item>
                <img src={VisaPng.src} />
              </Grid>
              <Grid item className={Style.TextSubmit}>
                Lorem ipsum dolor sit <span className={Style.SubText}>Submit</span>, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={Style.ItemTxt}>Items</Grid>
          <Item/>
          <Item/>
          <Grid container justifyContent="space-between" className={Style.CartInfo}>
            <Grid item >
              <img src={VisaPng.src} className={Style.ImgForDel}/> schuduled for delivery
            </Grid>
            <Grid item >
              <img src={VisaPng.src} className={Style.ImgForDel}/> Visa Ending in **** 5542
            </Grid>
          </Grid>
          <Grid item className={Style.TotalText}>Total</Grid>
          <Grid container alignItems="center">
            <Grid item className={Style.PriceTxt}>$668</Grid>
            <Grid item className={Style.P_ButtonSubmit}>
              <Button color="secondary" variant="contained" className={Style.ButtonSubmit}>Submit</Button>
            </Grid>
          </Grid>
        </Grid>
        {/* Right Side */}
        <RightSection />
      </Grid>
    </Grid>
  );
}
