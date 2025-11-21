import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import AddSvg from "../../../../public/images/icons/Plus - Circle.svg";
import CheckSvg from "../../../../public/images/icons/Check - Circle.svg";

// gm : components ↓
import CustomSelect from "../../../Forms/CustomSelect";
import InputForm from "../../../Forms/InputForm";

export default function ContactInfo() {
  // gm : states ↓

  return (
    <Grid item className={Style.ContactInfo}>
      <Grid item className="fw_500">
        Contact info
      </Grid>
      <Grid container>
        <Grid item className={Style.P_LeftInput}>
          <CustomSelect
            label="Please Choose"
            placeHolder="Select"
            bgColor="white"
          />
        </Grid>
        <Grid item className={Style.P_RightInput}>
          <InputForm label="Link" placeHolder="Type..." />
        </Grid>
      </Grid>
      <Button color="primary" startIcon={<img src={AddSvg.src} />}>
        More
      </Button>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_LogInIns}
      >
        <Grid item className={Style.TextProfile}>
          Before procced add more contact info, Your identity verification is
          handled by <a className="link">Echo</a>
        </Grid>
        <Grid item className={Style.P_VerifyAc}>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<img src={CheckSvg.src} />}
            className={Style.VerifyBtn}
          >
            Verify Account
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
