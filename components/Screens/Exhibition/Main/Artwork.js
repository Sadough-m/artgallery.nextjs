import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Exhibition.module.css";

// gm : files ↓
import PlusCircleSvg from "../../../../public/images/icons/Plus - Circle.svg";
import ImportSvg from "../../../../public/images/icons/importFile.svg";
import AddArtwork from "../../../Modals/Exhibition/AddArtwork";

// gm : components ↓

export default function Artwork() {
  // gm : states ↓
  const [SelectedNote, setSelectedNote] = useState("Team");
  const [ModalArtwork, setModalArtwork] = useState(false);

  const HandleSelectedNote = (value) => {
    if (SelectedNote === value) {
      return true;
    } else return false;
  };

  return (
    <Grid item className={Style.Main_1}>
      <Grid item className={Style.TitleMain}>
        Artworks
      </Grid>

      {/* Design Number 1 ↓ */}

      {/* <Grid item className={Style.ArtworkText}>
        Artwork
      </Grid>
      <Grid item className={Style.WrapperArtworks}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item className={Style.ChooseText}>Choose from existing artworks</Grid>
          <Grid item>
            <Button color="primary" startIcon={<img src={PlusCircleSvg.src} />}>
              Choose
            </Button>
          </Grid>
        </Grid>
      </Grid> */}

      {/* Design Number 2 ↓ */}
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className={Style.Media}
        direction="column"
        onClick={() => setModalArtwork(true)}
      >
        <Grid item>
          <img src={ImportSvg.src} />
        </Grid>
        <Grid item className={Style.AddText}>
          Add artwork
        </Grid>
        <Grid item className={Style.DropDownText}>
          Choose from existing artworks
        </Grid>
      </Grid>

      <AddArtwork
        open={ModalArtwork}
        handleModal={() => setModalArtwork(false)}
      />
    </Grid>
  );
}
