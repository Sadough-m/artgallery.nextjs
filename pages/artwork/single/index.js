import React, { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router';

// mrx : GET FILES
import LimitedGet from './limited';
import ReproductionGet from './reproduction';

// mrx : setCookies with this
import Cookies from "js-cookie";

export default function CreatArtwork() {
  const router = useRouter();

  // States Start -----------------------------------------------------------------------------------------------------
  const [ClassificationID, setClassificationID] = useState(0);
  //  End -------------------------------------------------------------------------------------------------------------

  // removeing the data from local storage Start ----------------------------------------------------------------------
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
    localStorage.removeItem("Add-ArtWork-TrandferDateID");
    localStorage.removeItem("ArtWork-Editions-Media-GET");
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

  // Remove items action Start ----------------------------------------------------------------------------------------
  useEffect(() => {
    handleRemoveLocalData()
  }, [])
  //  End -------------------------------------------------------------------------------------------------------------

  //  mrx : setting the classification id Start ------------------------------------------------------------------------
  useEffect(() => {
    setClassificationID(parseInt(Cookies.get("Selected-item-artwork-type")))
    // localStorage.setItem("Adding-Art-Work", JSON.stringify({ SelectedClassificationID: parseInt(Cookies.get("Selected-item-artwork-type")) }))
  }, [router]);
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : return currect item we need Start  -------------------------------------------------------------------------
  if (ClassificationID === 1) {
    return (
      <LimitedGet />
    )
  } else if (ClassificationID === 2) {
    return (
      <ReproductionGet />
    )
  } else {
    return (
      <></>
    )
  }
  //  End -------------------------------------------------------------------------------------------------------------
}
