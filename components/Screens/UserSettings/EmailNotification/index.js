import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/UserSettings.module.css";

// gm : files ↓
import plusCircleSvg from "../../../../public/images/icons/Plus - Circle white.svg";
import Notification from "./Notification";

// mrx : api
import {
  BASE_Image_Url,
  UPDATE_EMAIL_NOTIFICATION
} from "../../../../pages/api";

import { GetUrl, GetAuthUrl, PutAuthUrl, PostAuthUrl } from "../../../../pages/api/config";

// gm : components ↓

export default function EmailNotification({ UserInfo, setUserInfo }) {
  // gm : states 

  return (
    <Grid item>
      {/* title  */}
      <Grid item className={Style.EmailNotification}>
        Email notification
      </Grid>

      {/* Notification List  */}

      <Grid container alignItems="center" justifyContent="space-between">
        <Notification
          EmailNotification={UserInfo}
          setEmailNotification={setUserInfo}
        />
      </Grid>
    </Grid>
  );
}
