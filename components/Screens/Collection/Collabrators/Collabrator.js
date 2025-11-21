import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import ColStyle from "../../../../styles/Collection.module.css";

// mrx : api
import {
  BASE_Image_Url,
} from "../../../../pages/api";

// gm : files ↓
import MenuSR from "./MenuSR";
import loadingSvg from "../../../../public/images/icons/Loading.svg";

// gm : components ↓

export default function Collabrator({ loading, getCreateCollectionData, Data }) {
  // gm : states ↓

  const getAccessType = () => {
    if (Data.roleAccessType === 3) {
      return "Owner"
    } else if (Data.roleAccessType === 1) {
      return "Can view"
    } else if (Data.roleAccessType === 2) {
      return "Can edit"
    }
  }

  return (
    <Grid item className={ColStyle.p_col}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Grid container className={ColStyle.nameCol} alignItems="center">
            {!loading && (
              <Grid item>
                <img
                  src={Data?.image !== null ? BASE_Image_Url + Data?.image : "/UCstrAFCaLVt8g6JxqTSUzVH.svg"}
                  className={ColStyle.profileCol}
                  style={{ borderRadius: 50 }}
                />
              </Grid>
            )}
            {loading && (
              <Grid item className={ColStyle.p_loadingUser}>
                <img src={loadingSvg.src} className={ColStyle.loadingUser} />
              </Grid>
            )}

            <Grid item style={{ fonrSize: "14px" }}>
              {Data.fullName === null ? "Elon Musk" : Data.fullName}
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="fs12">
          {getAccessType()}
          <MenuSR getCreateCollectionData={getCreateCollectionData} Data={Data} />
        </Grid>
      </Grid>
    </Grid>
  );
}
