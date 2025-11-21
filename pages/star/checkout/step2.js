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
import InputForm from "../../../components/Forms/InputForm";
import Location from "../../../components/Forms/Location";
import CustomSelect from "../../../components/Forms/CustomSelect";
import PhoneNumber from "../../../components/Forms/PhoneNumber";
import ChooseShipping from "../../../components/Screens/Star/CheckOut/ChooseShipping";

export default function CheckOut() {
  // gm : states ↓

  return (
    <Grid item>
      <Header HaveProcced={true}/>
      <Grid
        container
        justifyContent="space-between"
        className={Style.WrapperCheckOut}
      >
        <Grid item className={Style.LeftSec}>
          {/* Note : I Wasnt able to export icons from figma, so now u most do that ur self (a message from sepehr)*/}
          <Grid item className={Style.ContactInfo1}>
            Contact Info <span className={Style.EditText}>Edit</span>
          </Grid>
          <Grid item className={Style.AddShipping}>
            <Grid item className={Style.AddText}>
              Add a shipping address
            </Grid>
            <Grid container>
              <Grid item className={Style.TwoInput}>
                <InputForm label="First name" placeHolder="Enter first name" />
              </Grid>
              <Grid item className={Style.TwoInput1}>
                <InputForm label="Last name" placeHolder="Enter last name" />
              </Grid>
            </Grid>
            <Grid item style={{ marginTop: -12 }}>
              <InputForm label="Address" placeHolder="Enter address" />
            </Grid>
            <Grid item style={{ marginTop: -12 }}>
              <InputForm label="Galery, Studio, Appartment, etc." placeHolder="Enter Galery, Studio, Appartment, etc." />
            </Grid>
            <Grid container style={{ marginTop: -12 }}>
              <Grid item className={Style.TwoInput}>
                <Location label="Country / Region" placeHolder="Enter Location" />
              </Grid>
              <Grid item className={Style.TwoInput1}>
                <InputForm type="number" label="Postal code" placeHolder="Enter postal code" />
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: -12 }}>
              <Grid item className={Style.TwoInput}>
                <CustomSelect label="State" placeHolder="Choose one" />
              </Grid>
              <Grid item className={Style.TwoInput1}>
                <InputForm  label="City" placeHolder="Enter a city name" />
              </Grid>
            </Grid>
            <PhoneNumber Label="Phone number" PlaceHolder="Enter your number"/>
          </Grid>
          <ChooseShipping/>
          <Button color="secondary" className={Style.ContinueP}>Continue to payment</Button>
          <Grid item className={Style.P_Shipping}>
            <Grid item className={Style.Shipping}>
              Payment Method
            </Grid>
            <Grid item className={Style.Shipping}>
              Review
            </Grid>
          </Grid>
        </Grid>
        <RightSection />
      </Grid>
    </Grid>
  );
}
