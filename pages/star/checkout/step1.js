import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓
import Header from "../../../components/Screens/Star/Artwork/Header";
import CustomCheckBox from "../../../components/Forms/CustomCheckBox";
import RightSection from "../../../components/Screens/Star/CheckOut/RightSection";

export default function CheckOut() {
  // gm : states ↓
  const [KeepUpdate, setKeepUpdate] = useState(false);

  return (
    <Grid item>
      <Header />
      <Grid
        container
        justifyContent="space-between"
        className={Style.WrapperCheckOut}
      >
        <Grid item className={Style.LeftSec}>
          <Grid item className={Style.ContactInfo}>
            Contact Info
          </Grid>
          <Grid container  >
            <Grid item className={Style.P_InputEmail}>
              <input
                type="text"
                placeholder="Type your email address"
                className={Style.InputEmail}
              />
            </Grid>
            <Grid item className={Style.P_Continue}>
              <Button className={Style.Continue}>Continue</Button>
            </Grid>
          </Grid>
          <Grid item className={Style.TextAboutEmail}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et.
          </Grid>
          <Grid item className={Style.KeepUpdate}>
            <CustomCheckBox
              label="Keep me update with type of an email"
              checked={KeepUpdate}
              setChecked={setKeepUpdate}
              fontWeight="500"
            />
          </Grid>
          <Grid item className={Style.HaveAccount}>
            Already have an account? <span className="link">Sign in now</span>
          </Grid>
          <Grid item className={Style.P_Shipping}>
            <Grid item className={Style.Shipping}>
              Shipping Address
            </Grid>
            <Grid item className={Style.Shipping}>
              Payment Method
            </Grid>
            <Grid item className={Style.Shipping}>
              Review
            </Grid>
          </Grid>
        </Grid>
        <RightSection/>
      </Grid>
    </Grid>
  );
}
