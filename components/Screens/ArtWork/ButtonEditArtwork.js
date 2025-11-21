import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from 'next/router';
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid } from "@material-ui/core";
import { GridCloseIcon } from "@material-ui/data-grid";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

// good man : styles ↓
import styles from "../../../styles/Home.module.css";
import ArtWorkFlowStyle from "../../../styles/artworkflow.module.css";

// good man : files ↓

// good man : components ↓

export default function ButtonAddArtwork({ setShowDisOrSaveLimited, GET_USER_ARTWORK_INFO, handleModal }) {
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
    localStorage.removeItem("ArtWork-Editions-Media-GET");
    localStorage.removeItem("Add-Artwork-StyleMedium");
    localStorage.removeItem("ArtWork-Reproduction-Media-Meraged");
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
  }
  //  End -------------------------------------------------------------------------------------------------------------

  // handle discard adding artwork Start ------------------------------------------------------------------------------
  const handleDiscardArtwork = () => {
    handleRemoveLocalData()
    GET_USER_ARTWORK_INFO()
    toast.success("Discarded successfully");
    setShowDisOrSaveLimited(false);
  }
  // End ---------------------------------------------------------------------------------------------------------------

  return (
    <Grid
      style={{ marginTop: "2px !important" }}
      item className={ArtWorkFlowStyle.stickyPos_1}>
      <Grid item className={ArtWorkFlowStyle.bgButton_addArtwork}>
        <Grid container justifyContent="flex-start">
          <Grid item className={styles.P_BTNS_2}>
            <Button
              onClick={() => handleDiscardArtwork()}
              variant="contained"
              startIcon={<CloseIcon />}
              className={`${styles.w_100_xs} ${ArtWorkFlowStyle.buttonNext} ${styles.mR_15} ${ArtWorkFlowStyle.Discard_Btn}`}
            >
              <span
                className={`${styles.text__trs__none} ${ArtWorkFlowStyle.px__btn} `}
              >
              </span>
              Discard
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckIcon />}
              onClick={handleModal}
              className={`${styles.w_100_xs} ${ArtWorkFlowStyle.buttonNext}`}
            >
              <span className={ArtWorkFlowStyle.px__btn}>Save Changes</span>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
