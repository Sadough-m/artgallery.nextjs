import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid } from "@material-ui/core";

// good man : styles ↓
import ArtWorkStyle from "../../../styles/artworkflow.module.css";

// good man : files ↓
import plusCircle from "../../../public/images/icons/Plus - Circle white.svg";
import ImageArtistPage from "../../../public/images/Mask.png";

// good man : components ↓
import useWindowSize from "../../../Hooks/useWindowSize";
import AddArtWork from "../../Modals/ArtWork/AddArtWork";

export default function ButtonAddArt({ is_middle }) {
  // good man : states ↓
  const [artWorkModal, setArtWorkModal] = useState(false);

  // good man : recocnize the page size
  const [width, height] = useWindowSize();

  //open and close artwork modal
  const artWorkHandle = () => {
    setArtWorkModal(!artWorkModal);
  };

  return (
    <>
      {!is_middle && (
        <>
          <Grid item className={width < 960 ? ArtWorkStyle.Btn_add : ""}>
            <Button
              variant="contained"
              color="primary"
              startIcon={width > 960 ? <Image src={plusCircle} /> : ""}
              className={ArtWorkStyle.btnAdd}
              onClick={artWorkHandle}
            >
              Add Artwork
            </Button>
          </Grid>
        </>
      )}

      {is_middle && (
        <>
          <Grid item className={ArtWorkStyle.btn_addArt}>
            <Button
              variant="contained"
              color="primary"
              className={ArtWorkStyle.button_emptyList}
              onClick={artWorkHandle}
            >
              Create a New
            </Button>
          </Grid>
        </>
      )}
        <AddArtWork openModal={artWorkModal} handleModal={artWorkHandle} />
    </>
  );
}
