import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/UserSettings.module.css";

// mrx : api
import {
  BASE_Image_Url,
  DISCONNECT_USER_GOOGLE
} from "../../../pages/api";

import { GetUrl, GetAuthUrl, PutAuthUrl, PostAuthUrl } from "../../../pages/api/config";

// gm : files ↓
import signInPng from "../../../public/images/SignIn.png";
import disconnectSvg from "../../../public/images/icons/disconnect.svg";
import DisconnectGoogle from "../../Modals/UserSettings/DisconnectGoogle";

// gm : components ↓

export default function SignInGoogle({ setGoogleStatus }) {
  // gm : states ↓
  const [ModalDisconnect, setModalDisconnect] = useState(false);

  // open and close modal disconnect
  const handleModalDisconnect = () => {
    setModalDisconnect(!ModalDisconnect);
  };

  // when user connected
  const Connected = true;

  const handleDisconnect = () => {
    GetAuthUrl(DISCONNECT_USER_GOOGLE).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setGoogleStatus(res.data.data?.UserConnectedWith === 2 ? true : false);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  }

  return (
    <Grid item className={Style.wrapperGoogle}>
      <Grid container alignItems="center">
        {!Connected && (
          <Button className={Style.btn_signIn}>
            <Grid item className={Style.textSignIn}>
              Sign in with
            </Grid>
            <Grid item className={Style.imgGoogle}>
              <img src={signInPng.src} />
            </Grid>
          </Button>
        )}

        {Connected && (
          <>
            <Grid item className={Style.imgGoogle}>
              <img src={signInPng.src} />
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item className={Style.connect}>
                  Connected
                </Grid>
                <span className={Style.lineConnect}></span>
                <Grid item>
                  <Button
                    className={Style.disconnect}
                    startIcon={<Image src={disconnectSvg} />}
                    onClick={() => handleModalDisconnect()}
                  >
                    Disconnect
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
      <DisconnectGoogle handleDisconnect={handleDisconnect} open={ModalDisconnect} handleModal={() => handleModalDisconnect()} />
    </Grid>
  );
}
