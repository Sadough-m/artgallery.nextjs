import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// good man : material ui ↓
import {
  Button,
  ClickAwayListener,
  Grid,
  Hidden,
  IconButton,
} from "@material-ui/core";

// good man : styles ↓
import ArtWorkFlowStyle from "../../../styles/artworkflow.module.css";

// good man : files ↓
import arrowLeft from "../../../public/images/icons/Arrow left -.svg";
import dotIcon from "../../../public/images/icons/dot black.svg";

// good man : components ↓

export default function UserNavBar({ Title, GET_USER_ARTWORK_INFO, handleModal }) {
  const router = useRouter();
  // mrx : states ↓

  // removeing the data from local storage Start -------------------------------------------------------------------------------
  const handleRemoveLocalData = () => {
    localStorage.removeItem("Add-ArtWork-Measurment");
    localStorage.removeItem("Add-Artwork-ArtistList");
    localStorage.removeItem("Minting-Data");
    localStorage.removeItem("ArtWork-Editions");
    localStorage.removeItem("ArtWork-Editions-Values");
    localStorage.removeItem("UploadingFileMedia-Limited");
    localStorage.removeItem("Add-Artwork-GeneralDescription");
    localStorage.removeItem("Add-Artwork-AvailibilityID");
    localStorage.removeItem("Add-Artwork-StyleMedium");
    localStorage.removeItem("ArtWork-Reproduction-Media-Meraged");
    localStorage.removeItem("ArtWork-Editions-Media-GET");
    localStorage.removeItem("Add-ArtWork-TrandferDateID");
    localStorage.removeItem("UploadingFileMedia");
    localStorage.removeItem("Add-ArtWork-Measurment");
    localStorage.removeItem("Add-Artwork-subMedium");
    localStorage.removeItem("Add-ArtWork-OwnershipID");
    localStorage.removeItem("Add-ArtWork-TransferTypeID");
    localStorage.removeItem("Add-Artwork-GeneralCreationyear");
    localStorage.removeItem("Add-Artwork-MediumType");
    localStorage.removeItem("Add-Artwork-GeneralTitle");
    localStorage.removeItem("Add-ArtWork-PriceID");
    localStorage.removeItem("Add-Artwork-CheckBoxValue");
    localStorage.removeItem("Add-Artwork-GeneralCreationyear");
    localStorage.removeItem("ArtWork-Proof");
    localStorage.removeItem("Add-ArtWork-Original");
    localStorage.removeItem("Add-Artwork-StatuseID");
    localStorage.removeItem("Reproduction-Media");
    localStorage.removeItem("Add-ArtWork-Reproduction");
    localStorage.removeItem("SelctedMediaID");
    localStorage.removeItem("ArtWork-SameMeida-CheckBox");
    localStorage.removeItem("Add-ArtWork-Limited-Media");
    localStorage.removeItem("ArtWork-Editions-Media");
    localStorage.removeItem("Original-Media");
    setOpenMenu(false);
  }
  //  End -------------------------------------------------------------------------------------------------------------

  // handle discard adding artwork Start ------------------------------------------------------------------------------
  const handleDiscardArtwork = () => {
    handleRemoveLocalData()
    setOpenMenu(false);
    GET_USER_ARTWORK_INFO()
  }
  // End ---------------------------------------------------------------------------------------------------------------

  // good man : states ↓
  const [OpenMenu, setOpenMenu] = useState(false);

  return (
    <Hidden mdUp>
      <Grid item className={ArtWorkFlowStyle.addArtwork_nav}>
        <span className={ArtWorkFlowStyle.line100_1}></span>
        <Grid container justifyContent="space-between">
          <Grid item className={ArtWorkFlowStyle.text_add_artwork}>
            <IconButton onClick={() => router.push("/artwork")}>
              <Image src={arrowLeft} />
            </IconButton>
            ‘{Title}’
          </Grid>
          <Grid item className="posRel">
            <IconButton onClick={() => setOpenMenu(true)}>
              <Image src={dotIcon} />
            </IconButton>
            {OpenMenu && (
              <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
                <Grid item className={ArtWorkFlowStyle.P_SaveMenu}>
                  <Grid item className={ArtWorkFlowStyle.Btn_SaveDiscard}>
                    <Button
                      onClick={() => handleModal()}
                      style={{ width: "100%", marginBottom: "-10px" }} variant="contained" color="primary" className={ArtWorkFlowStyle.SaveChangeBtn}>
                      Save Changes
                    </Button>
                  </Grid>
                  <Grid item className={ArtWorkFlowStyle.Btn_SaveDiscard}>
                    <Button
                      onClick={() => handleDiscardArtwork()}
                      style={{ width: "100%" }} variant="outlined" className={ArtWorkFlowStyle.SaveChangeBtn}>
                      Discard
                    </Button>
                  </Grid>
                </Grid>
              </ClickAwayListener>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Hidden>
  );
}
