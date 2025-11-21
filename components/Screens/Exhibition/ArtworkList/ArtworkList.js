import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Exhibition.module.css";

// gm : files ↓
import PlusCircleSvg from "../../../../public/images/icons/Plus - Circle.svg";

// gm : components ↓
import AddArtwork from "../../../Modals/Exhibition/AddArtwork";
import TableArtwork from "./TableArtwork";

export default function ArtworkList({ IsEmpty  }) {
  // gm : states ↓
  const [AddArtworkModal, setAddArtworkModal] = useState(false)

  return (
    <Grid item className={Style.Artworks}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_TitleArtworks_2}
      >
        <Grid item className={Style.TitleArtworks_2}>
          Artworks
        </Grid>
        <Grid item>
          <Button
            startIcon={<img src={PlusCircleSvg.src} />}
            className={Style.CreateShipping}
            color="primary"
            onClick={()=>setAddArtworkModal(true)} 
          >
            Add Artwork
          </Button>
        </Grid>
      </Grid>

      <Grid item className={Style.ArtworksContainer_2}>
        {IsEmpty && <Grid container alignItems="center" justifyContent="center" className={Style.EmptyArtwork}>No artwork added yet</Grid>}
        {!IsEmpty && <TableArtwork />}
      </Grid>
      <AddArtwork open={AddArtworkModal} handleModal={()=>setAddArtworkModal(false)} />
    </Grid>
  );
}
