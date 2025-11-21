import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Orders.module.css";

// gm : files ↓
import editSvg from "../../../../../public/images/icons/Edit.svg";
import MashangPng from "../../../../../public/images/Mashang.png";
import Info from "./Info";
import EditEmail from "../../../../Modals/Orders/EditEmail";

// gm : components ↓

export default function Profile() {
  // gm : states ↓
  const [ModalEditEmail, setModalEditEmail] = useState(false)

  return (
    <Grid item className={Style.Profile}>
      <Grid item className="posRel">
        {/* Title */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={Style.TitleProfile}
        >
          <Grid item className={Style.overView}>
            Artist
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="text"
              startIcon={<Image src={editSvg} />}
              onClick={()=>setModalEditEmail(true)}
            >
              Chamge Invoice Email
            </Button>
          </Grid>
        </Grid>

        {/* Profile Image */}
        <Grid item className={Style.ContainerProfile}>
          <Grid container alignItems="center" direction="column">
            <Grid item>
              <img src={MashangPng.src} className={Style.ProfileImg} />
            </Grid>
            <Grid item className={Style.ProfileName}>
              Esther Howard
            </Grid>
          </Grid>

          {/* Info */}
          <Grid item className={Style.P_Info}>
            <Info title="Orders" value="10" />
            <Info title="Email" value="felicia.reid@example.com" />
            <Info title="Phone number" value="+1 (629) 555-0129" />
            <Info
              title="Shipping address"
              value="734 Diomond rA Los Angeles, CA, USA 92660"
            />
            <span className={Style.RemoveLine}></span>
          </Grid>
        </Grid>
      </Grid>
      <EditEmail open={ModalEditEmail} handleModal={()=>setModalEditEmail(false)}/>
    </Grid>
  );
}
