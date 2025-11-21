import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Orders.module.css";

// gm : files ↓
import PlsuSvg from "../../../../../public/images/icons/Plus Black.svg";

// gm : components ↓
import CustomizeArtwork from "./CustomizeArtwork";
import AddArtwork from '../../../../Modals/Orders/AddArtwork/AddArtwork'
import CustomItem from '../../../../Modals/Orders/CustomItem'

export default function Artworks() {
  // gm : states ↓
  const [ModalAddArtwork, setModalAddArtwork] = useState(false)
  const [ModalCustomItem, setModalCustomItem] = useState(false)

  return (
    <Grid item className={Style.Main_1}>
      <Grid item className={Style.TitleMain}>
        Artworks
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item className={Style.P_Btn}>
          <Button
            startIcon={<Image src={PlsuSvg} />}
            className={Style.BtnCustom}
            onClick={()=>setModalAddArtwork(true)}
          >
            Brows Item
          </Button>
        </Grid>
        <Grid item className={Style.P_Btn_1}>
          <Button
            startIcon={<Image src={PlsuSvg} />}
            className={Style.BtnCustom}
            onClick={()=>setModalCustomItem(true)}
          >
            Custom Item
          </Button>
        </Grid>
      </Grid>
      <CustomizeArtwork/>

      <AddArtwork open={ModalAddArtwork} handleModal={()=>setModalAddArtwork(false)}/>
      <CustomItem open={ModalCustomItem} handleModal={()=>setModalCustomItem(false)}/>
    </Grid>
  );
}
