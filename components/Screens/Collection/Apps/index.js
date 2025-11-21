import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import ColStyle from "../../../../styles/Collection.module.css";

// gm : files ↓
import importIcon from "../../../../public/images/icons/Plus - Circle.svg";
import addIconGray from "../../../../public/images/icons/Plus - Circle disbled.svg";
import appLogo1 from "../../../../public/images/app name logo1.png";
import appLogo2 from "../../../../public/images/app item1.png";
import appLogo3 from "../../../../public/images/app item 2.png";

// gm : components ↓
import AppItem from "./AppItem";

export default function Apps({isEmpty=true}) {
  // gm : states ↓

  return (
    <Grid item>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item className="fs14fw500">
          Apps{" "}
        </Grid>
        <Grid item>
          <Button
            variant="text"
            color="primary"
            startIcon={<Image src={false?importIcon:addIconGray} />}
            disabled={true}
          >
            Add App
          </Button>
        </Grid>
      </Grid>
      {isEmpty && (
        <Grid
          container
          alignItems="center"
          className={ColStyle.addApp}
          justifyContent="center"
        >
          <Grid item className={ColStyle.notApp}>
            No apps added yet
          </Grid>
        </Grid>
      )}
      {!isEmpty && (
        <Grid container justifyContent="space-between" style={{marginTop:'8px'}}>
          <AppItem title="Coin base" img={appLogo1}/>
          <AppItem title="NFT maker" img={appLogo2}/>
          <AppItem title="Market bot" img={appLogo3}/>
        </Grid>
      )}
    </Grid>
  );
}
