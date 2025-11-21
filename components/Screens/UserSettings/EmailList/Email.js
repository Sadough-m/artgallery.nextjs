import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/UserSettings.module.css";

// gm : files ↓

// gm : components ↓
import EditDelete from "./EditDelete";

export default function Email({ ChangeSelect, placeHolder = "Email list title", Data,refreshEmailList }) {
  // gm : states ↓

  return (
    
    <>
      <Grid onClick={() => ChangeSelect(Data?.id)} item className={Style.dotsLocationDG}></Grid>
      <Grid
        item
        className={Style.Location}
      >
        <input
          type="text"
          value={Data?.title}
          className={Style.locationForm}
          disabled={true}
        />
        <Grid item className={Style.dotsLocation}>
          <EditDelete refreshEmailList={()=>refreshEmailList()} Data={Data}/>
        </Grid>
      </Grid>
    </>

  );
}
