// This file Add unique / limited and reproduction Items 
// -------------------------------------------
// -------------------------------------------
// -------------------------------------------
// -------------------------------------------

import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router';

// Matrial
import { Grid, Container, Hidden } from "@material-ui/core";

// Style
import ArtWorkFlowStyle from "../../styles/artworkflow.module.css";
import styles from "../../styles/Home.module.css";
import LoadingSpiner from "../../components/common/loadingSpiner"

// Image

// Component
import PrivacyForm from "../../components/Screens/ArtWork/PrivacyForm";
import ClassificationSelect from "../../components/Forms/ClassificationSelect";
import Edition from "../../components/Screens/ArtWork/Main/Edition";
import General from "../../components/Screens/ArtWork/Main/General";
import AboutWork from "../../components/Screens/ArtWork/AboutWork";
import HeaderLanding from "../../components/common/header";
import ButtonAddArtwork from "../../components/Screens/ArtWork/ButtonAddArtwork";
import PrimaryMenu from "../../components/Screens/ArtWork/PrimaryMenu";
import Root from "../../components/Screens/ArtWork/Main/Root";
import Media from "../../components/Screens/ArtWork/Main/Media";
import Measurment from "../../components/Screens/ArtWork/Main/Measurment";
import Proof from "../../components/Screens/ArtWork/Main/Proof";
import Availibility from "../../components/Screens/ArtWork/Main/Availibility";
import Reproduction from "../../components/Screens/ArtWork/Main/Reproduction";
import ArtWorkV1 from "../../components/Modals/ArtWork/ArtWorkV1";
import ArtWorkV2 from "../../components/Modals/ArtWork/ArtWorkV3";
import ArtWorkV3 from "../../components/Modals/ArtWork/ArtWorkV4";
import Original from "../../components/Screens/ArtWork/Main/Original";
import HeaderAddArtMobile from "../../components/Screens/ArtWork/HeaderAddArt_Mobile";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import {
  GET_ADD_WORK_DATA,
  CREATE_UNIQUE_ARTWORK,
  CREATE_LIMITED_ARTWORK,
  CREATE_REPRODUCTION_ARTWORK
} from "../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../pages/api/config";

// mrx : context ↓
import { Context } from "../../context/index";

export default function CreatArtwork() {
  const router = useRouter();

  // mrx : context Data Start ------------------------------------------------------------------------------------
  const {
    ShowenReproduction,
    UploadingFileMedia,
    AddedArtistList,
    LoadingPage,
    setLoadingPage,
    AllEditions,
    GeneralTitle,
    GeneralCreationyear,
    sameMedia,
    OwnershipID,
    PriceID,
    TrandferDateID,
    TransferTypeID,
    AllMesurmentsData,
    StatuseID,
    AvailibilityID,
    ProofSectionData
  } = useContext(Context);
  // mrx : End ---------------------------------------------------------------------------------------------------

  // mrx : states Start ------------------------------------------------------------------------------------------
  const [modal, setModal] = useState(false);
  const [ShowError, setShowError] = useState(false);

  // modal data after added artwork
  const [AddedData, setAddedData] = useState([]);

  // mrx : list of select input
  const [SelectInputData, setSelectInputData] = useState([]);
  // End -----------------------------------------------------------------------------------------------------------------

  // mrx : Reproduction States Start -------------------------------------------------------------------------------------
  const [OriginalMediaData, setOriginalMediaData] = useState([]);
  const [ReproductionMediaData, setReproductionMediaData] = useState([]);
  const [ReproductionAllMediaData, setReproductionAllMediaData] = useState([]);
  const [AllSamePrise, setAllSamePrise] = useState(false);
  const [MeasurmentData, setMeasurmentData] = useState([]);

  // ----- Proof Data ( States )
  const [ProofData, setProofData] = useState([]);
  const [ProofFromSave, setProofFromSave] = useState(false);
  const [ProofDataFromSave, setProofDataFromSave] = useState([]);
  // ----- Proof Data ( End )

  // ----- Proof Data ( States )
  const [AllMediaUnique, setAllMediaUnique] = useState([]);
  const [AllMediaLimited, setAllMediaLimited] = useState([]);
  // ----- Proof Data ( End )

  // End -----------------------------------------------------------------------------------------------------------------

  // mrx : get collection id from localstorage
  const LocalClassificationID = parseInt(Cookies.get("ClassificationID"));

  // showing the added artwrok modal Start -------------------------------------------------------------------------------
  const handleModal = () => {
    setModal(!modal);
  };
  //  End ----------------------------------------------------------------------------------------------------------------

  // get selecte inputs called from useEffcect Start ---------------------------------------------------------------------
  const GetAllInputData = () => {
    setLoadingPage(true);
    GetAuthUrl(GET_ADD_WORK_DATA(localStorage.getItem("collectionId"))).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setSelectInputData(res.data.data);
            Cookies.remove("add-artist-from-artwork");
            setLoadingPage(false);
          } else {
          }
        } else {
          toast.error("something went wrong !");
          setLoadingPage(false);
        }
      }
    );
  };
  //  End --------------------------------------------------------------------------------------------------------------

  // get inputs and remove the local storage Start ---------------------------------------------------------------------
  useEffect(() => {
    GetAllInputData();
    handleRemoveLocalData()
  }, []);
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx :some data from local storage for adding artwork Start -------------------------------------------------------
  const MediaData = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("UploadingFileMedia") || "[]" : "[]");
  const MediaLimitedData = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Editions-Media") || "[]" : "[]");
  const Artists = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-ArtistList") || "[]" : "[]");
  // End --------------------------------------------------------------------------------------------------------------

  // mrx : Unique data collected for add Start ------------------------------------------------------------------------
  const UniqueData = {
    "artists": Artists?.map((item) => item?.id),
    "title": typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-GeneralTitle") || "" : "",
    "description": typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-GeneralDescription") || null : null,
    "creationYear": GeneralCreationyear,
    "mediumType": parseInt(typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-MediumType") || 0 : 0),
    "styleId": typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-StyleMedium") || null : null,
    "subMediumId": typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-subMedium") || null : null,
    "haveDigitalOrPhysicalVersion": JSON.parse(typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-CheckBoxValue") || false : false),
    "artworkMedias": AllMediaUnique?.map((item) => ({
      "fileUrl": item?.fullPath,
      "caption": item?.caption,
      "type": item?.type,
      "id": item?.id,
      "imageSize": item?.fileSize,
      "fileExtention": item?.fileExtention
    })),
    "mediaSort": JSON.stringify(AllMediaUnique?.map((item) => ({
      "fileUrl": item?.fullPath,
      "caption": item?.caption,
      "type": item?.type,
      "imageSize": item?.fileSize,
      "id": item?.id,
      "fileExtention": item?.fileExtention
    }))),
    "artworkMesurments": JSON.parse(typeof window !== "undefined" ? localStorage.getItem("Add-ArtWork-Measurment") || "[]" : "[]"),
    "artworkProofs": ProofSectionData,
    "availabilityType": AvailibilityID,
    "availabilityStatus": StatuseID,
    "consignmentType": 0,
    "purchaseOrConsignmentUnitId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "purchaseOrConsignmentPrice": 0,
    "purchaseFromOrConsignmentTo": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "privacy": {
      "ownerShip": parseInt(OwnershipID),
      "privacyPrice": parseInt(PriceID),
      "transferDate": parseInt(TrandferDateID),
      "transferType": parseInt(TransferTypeID),
    }
  }
  // End ---------------------------------------------------------------------------------------------------------------

  // mrx : Reproduction data collected for add Start -------------------------------------------------------------------------
  const reproductionData = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("Add-ArtWork-Reproduction") || "[]" : "[]");
  const OriginalData = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("Add-ArtWork-Original") || "[]" : "[]");

  const ReproductionData = {
    "artists": Artists?.map((item) => item?.id),
    "title": typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-GeneralTitle") || "" : "",
    "description": typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-GeneralDescription") || "" : "",
    "creationYear": GeneralCreationyear,
    "mediumType": parseInt(typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-MediumType") || 0 : 0),
    "styleId": typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-StyleMedium") || "" : "",
    "subMediumId": typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-subMedium") || "" : "",
    "haveDigitalOrPhysicalVersion": JSON.parse(typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-CheckBoxValue") || false : false),
    "artworkMedias": JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Reproduction-Media-Meraged") || '[]' : '[]'),
    "artworkMesurments": ShowenReproduction === true ? [reproductionData] : [reproductionData, OriginalData],
    "privacy": {
      "ownerShip": parseInt(OwnershipID),
      "privacyPrice": parseInt(PriceID),
      "transferDate": parseInt(TrandferDateID),
      "transferType": parseInt(TransferTypeID),
    },
    "allEditionSameMedia": sameMedia,
    "originalNotAvailable": ShowenReproduction,
    "availabilityStatus": 0
  }
  // End ----------------------------------------------------------------------------------------------------------------

  // mrx : Limited data collected for add Start -------------------------------------------------------------------------
  const EditionValues = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Editions-Values") || '[]' : '[]');
  const ArtWorkLimitedEditions = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Editions") || '[]' : '[]');

  const LimitedData = {
    "artists": AddedArtistList?.map((item) => item?.id),
    "title": typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-GeneralTitle") || "" : "",
    "description": typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-GeneralDescription") || "" : "",
    "creationYear": GeneralCreationyear,
    "mediumType": parseInt(typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-MediumType") || 0 : 0),
    "styleId": typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-StyleMedium") || "" : "",
    "subMediumId": typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-subMedium") || "" : "",
    "haveDigitalOrPhysicalVersion": JSON.parse(typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-CheckBoxValue") || false : false),
    "artworkMedias": AllMediaLimited?.filter((item) => item?.editionNumber !== 0)?.map((item) => ({
      "editionNumber": item?.editionNumber,
      "mediaSort": JSON.stringify(item?.medias?.map((item) => ({
        LimitedSt: item?.LimitedSt,
        caption: item?.caption,
        classificationType: 1,
        fileExtention: item?.fileExtention,
        fileName: item?.fileName,
        imageSize: item?.fileSize,
        fileUrl: item?.fullPath,
        id: item?.id,
        type: item?.type
      }))),
      "medias": item?.medias?.map((item) => ({
        LimitedSt: item?.LimitedSt,
        caption: item?.caption,
        classificationType: 1,
        fileExtention: item?.fileExtention,
        fileName: item?.fileName,
        imageSize: item?.fileSize,
        fileUrl: item?.fullPath,
        id: item?.id,
        type: item?.type
      }))
    })),
    "artworkMesurments": AllMesurmentsData,
    "privacy": {
      "ownerShip": parseInt(OwnershipID),
      "privacyPrice": parseInt(PriceID),
      "transferDate": parseInt(TrandferDateID),
      "transferType": parseInt(TransferTypeID),
    },
    "allEditionSameSizePricing": AllSamePrise,
    "allEditionSameMedia": parseInt(Cookies.get("Limited-ID")) === 0 ? true : false,
    "editionSize": parseInt(EditionValues?.Editionsize),
    "availableEditions": ArtWorkLimitedEditions?.map((item) => item?.editionNumber)
  }
  // End ----------------------------------------------------------------------------------------------------------------

  // mrx : get ClassificationID from local storage Start ----------------------------------------------------------------
  const handleGetDataByClassificationID = () => {
    if (LocalClassificationID === 0) {
      return UniqueData
    } else if (LocalClassificationID === 1) {
      return LimitedData
    } else if (LocalClassificationID === 2) {
      return ReproductionData
    } else {
      return null
    }
  }
  //  End --------------------------------------------------------------------------------------------------------------

  // mrx : MERGE Media Start -----------------------------------------------------------------------------------------------------
  const handleMergeMedia = () => {
    setOriginalMediaData({
      "editionNumber": 0,
      "mediaSort": JSON.stringify(UploadingFileMedia?.filter((item) => item?.LimitedSt === 0)?.map((item) => ({
        "fileUrl": item?.fullPath,
        "caption": item?.caption,
        "type": item?.type,
        "limitedSt": item?.limitedSt,
        "id": item?.id,
        "imageSize": item?.fileSize,
        "fileExtention": item?.fileExtention
      }))),
      "medias": UploadingFileMedia?.filter((item) => item?.LimitedSt === 0)?.map((item) => ({
        "fileUrl": item?.fullPath,
        "caption": item?.caption,
        "limitedSt": item?.limitedSt,
        "type": item?.type,
        "imageSize": item?.fileSize,
        "id": item?.id,
        "fileExtention": item?.fileExtention
      }))
    })

    setReproductionMediaData({
      "editionNumber": 1,
      "mediaSort": JSON.stringify(UploadingFileMedia?.filter((item) => item?.LimitedSt === 1)?.map((item) => ({
        "fileUrl": item?.fullPath,
        "caption": item?.caption,
        "type": item?.type,
        "limitedSt": item?.limitedSt,
        "id": item?.id,
        "imageSize": item?.fileSize,
        "fileExtention": item?.fileExtention
      }))),
      "medias": UploadingFileMedia?.filter((item) => item?.LimitedSt === 1)?.map((item) => ({
        "fileUrl": item?.fullPath,
        "caption": item?.caption,
        "type": item?.type,
        "limitedSt": item?.limitedSt,
        "id": item?.id,
        "imageSize": item?.fileSize,
        "fileExtention": item?.fileExtention
      }))
    })
  }
  // End -------------------------------------------------------------------------------------------------------------------------

  // mrx : MERGE Media List Start ------------------------------------------------------------------------------------------------
  const handleMergeLastMediaForReproduction = () => {
    if (ShowenReproduction === true) {
      setReproductionAllMediaData([ReproductionMediaData]);
    } else {
      setReproductionAllMediaData([ReproductionMediaData, OriginalMediaData]);
    }
    localStorage.setItem("ArtWork-Reproduction-Media-Meraged", JSON.stringify(ReproductionAllMediaData))
  }
  // End ------------------------------------------------------------------------------------------------------------------------

  // mrx : MERGE Media List When this values update Start -----------------------------------------------------------------------
  useEffect(() => {
    handleMergeMedia()
  }, [UploadingFileMedia])

  useEffect(() => {
    handleMergeLastMediaForReproduction()
  }, [OriginalMediaData])

  useEffect(() => {
    handleMergeLastMediaForReproduction()
  }, [ReproductionMediaData])
  // End -----------------------------------------------------------------------------------------------------------------------

  // handle discard adding artwork Start ---------------------------------------------------------------------------------------
  const handleDiscardArtwork = () => {
    handleRemoveLocalData()
    router.push("/artwork");
  }
  // End -----------------------------------------------------------------------------------------------------------------------

  // handle reditect user to get adter adding artwork Start --------------------------------------------------------------------
  const handleGoToGet = () => {
    handleRemoveLocalData()
    router.push(`/artwork/${AddedData?.id}`);
  }
  // End -----------------------------------------------------------------------------------------------------------------------

  // handle showing added modal Start ------------------------------------------------------------------------------------------
  const handleGetModalByClassificationID = () => {
    if (LocalClassificationID === 0) {
      return (
        <ArtWorkV1 Data={AddedData} openModal={modal} handleModal={() => handleGoToGet()} />
      )
    } else if (LocalClassificationID === 1) {
      return (
        <ArtWorkV2 Data={AddedData} openModal={modal} handleModal={() => handleGoToGet()} />
      )
    } else if (LocalClassificationID === 2) {
      return (
        <ArtWorkV3 Data={AddedData} openModal={modal} handleModal={() => handleGoToGet()} />
      )
    } else { }
  }
  // End -----------------------------------------------------------------------------------------------------------------------

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
    localStorage.removeItem("ArtWork-Editions-Media-GET");
    localStorage.removeItem("ArtWork-Editions-Media");
    localStorage.removeItem("Add-Artwork-ArtistList");
  }
  //  End -------------------------------------------------------------------------------------------------------------

  // handle add artwork with multi type Start --------------------------------------------------------------------------
  const HanldeAddArtwork = () => {
    if (LocalClassificationID === 0) {
      if (AddedArtistList?.length < 1 && SelectInputData?.addDefaultArtist === false) {
        toast.warning("You need at least one Artist");
      } else if (
        !GeneralTitle ||
        !GeneralCreationyear
      ) {
        toast.warning("Please fill the required values");
        setShowError(true)
      } else if (
        ProofFromSave === false &&
        ProofDataFromSave?.ProofTitle !== "" ||
        ProofFromSave === false && ProofDataFromSave?.ProofDescription !== "" ||
        ProofFromSave === false && ProofDataFromSave?.UploadingFileUrl !== ""
      ) {
        setProofFromSave(true);
        router.push("/artwork/add#Proof");
      } else if (AllMediaUnique?.length < 1) {
        toast.warning("You need at least one media");
      } else if (ProofFromSave === false && ProofDataFromSave?.ProofDescription !== "") {
        toast.warning("Description is required from proof section");
      } else {
        setLoadingPage(true);
        // -------------- Adding Unique API Start ------------------------------------------------------------------------
        PostAuthUrl(CREATE_UNIQUE_ARTWORK(localStorage.getItem("collectionId")),
          handleGetDataByClassificationID()
        ).then(
          (res, err) => {
            if (res && res.status === 200) {
              if (res?.data?.isSuccess) {
                setAddedData(res?.data?.data);
                if (res?.data?.data?.showMint !== true) {
                  router.push(`/artwork/${res?.data?.data?.id}`);
                } else {
                  setModal(true);
                }
                setLoadingPage(false);
                Cookies.remove("add-artist-from-artwork");
                Cookies.set("Selected-item-artwork-type", 0)
              } else {
                toast.error(res?.data?.message)
                setLoadingPage(false);
              }
            } else {
              toast.error("something went wrong !");
              setLoadingPage(false);
            }
          }
        );
        // -------------- End --------------------------------------------------------------------------------------------
      }

    } else if (LocalClassificationID === 1) {
      const MEdiaSData = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Reproduction-Media-Meraged") || '[]' : '[]');
      if (
        !GeneralTitle ||
        !GeneralCreationyear
      ) {
        toast.warning("Please fill the required values");
        setShowError(true)
      } else if (AddedArtistList?.length < 1 && SelectInputData?.addDefaultArtist === false) {
        toast.warning("You need at least one Artist");
      } else {
        // -------------- Adding Limited API Start -----------------------------------------------------------------------
        setLoadingPage(true);
        PostAuthUrl(CREATE_LIMITED_ARTWORK(localStorage.getItem("collectionId")),
          handleGetDataByClassificationID()
        ).then(
          (res, err) => {
            if (res && res.status === 200) {
              if (res?.data?.isSuccess) {
                setAddedData(res.data.data);
                if (res?.data?.data?.showMint !== true) {
                  router.push(`/artwork/${res?.data?.data?.id}`);
                } else {
                  setModal(true);
                }
                setLoadingPage(false);
                Cookies.set("Selected-item-artwork-type", 1)
              } else {
                toast.error(res?.data?.message)
                setLoadingPage(false);
              }
            } else {
              toast.error("something went wrong !");
              setLoadingPage(false);
            }
          }
        );
        // -------------- End --------------------------------------------------------------------------------------------
      }
    } else if (LocalClassificationID === 2) {
      const MEdiaSData = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Reproduction-Media-Meraged") || '[]' : '[]');
      if (
        !GeneralTitle ||
        !GeneralCreationyear
      ) {
        toast.warning("Please fill the required values");
        setShowError(true)
      } else if (AddedArtistList?.length < 1 && SelectInputData?.addDefaultArtist === false) {
        toast.warning("You need at least one Artist");
      } else if (MEdiaSData[0]?.medias?.length < 1 && !sameMedia && MEdiaSData[1]?.medias?.length < 1) {
        toast.warning("You need at least one media");
      } else {
        // -------------- Adding Reproduction API Start ------------------------------------------------------------------
        setLoadingPage(true);
        PostAuthUrl(CREATE_REPRODUCTION_ARTWORK(localStorage.getItem("collectionId")),
          handleGetDataByClassificationID()
        ).then(
          (res, err) => {
            if (res && res.status === 200) {
              if (res?.data?.isSuccess) {
                setAddedData(res.data.data);
                setLoadingPage(false);
                if (res?.data?.data?.showMint !== true) {
                  router.push(`/artwork/${res?.data?.data?.id}`);
                } else {
                  setModal(true);
                }
                Cookies.set("Selected-item-artwork-type", 2)
              } else {
                toast.error(res?.data?.message)
                setLoadingPage(false);
              }
            } else {
              toast.error("something went wrong !");
              setLoadingPage(false);
            }
          }
        );
        // -------------- End --------------------------------------------------------------------------------------------
      }
    } else {
      return null
    }
  }
  // End -------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (ProofSectionData[0]?.from === true) {
      HanldeAddArtwork()
    }
  }, [ProofFromSave, ProofSectionData])

  return (
    <>
      {/* <Hidden smDown>
        <HeaderLanding />
      </Hidden> */}

      <Grid container justifyContent="center" className={ArtWorkFlowStyle.WrapperPages}>
        {/* ------------------------------ mrx: Left Section Start ---------------------------------*/}
        <Grid item className={ArtWorkFlowStyle.MenuLeftSide}>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="flex-start"
            className={ArtWorkFlowStyle.h100}
          >
            <HeaderAddArtMobile
              handleModal={HanldeAddArtwork}
            />
            <Hidden smDown>
              <Grid item className={ArtWorkFlowStyle.h100}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  className={ArtWorkFlowStyle.h100}
                >
                  <Grid item>
                    <Grid container>
                      <Grid item className={ArtWorkFlowStyle.addArtworkText}>
                        Add artwork
                      </Grid>
                    </Grid>
                  </Grid>

                  <PrimaryMenu />
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
        {/* ------------------------------ mrx: Left Section End ---------------------------------*/}

        {/* ------------------------------ mrx: Main Components Start ---------------------------------*/}
        <Grid item className={ArtWorkFlowStyle.MiddleBox}>
          <Grid
            container
            spacing={4}
            className={ArtWorkFlowStyle.components}
            direction="column"
          >
            {LocalClassificationID === 0 ||
              LocalClassificationID === 1 ||
              LocalClassificationID === 2 ? (
              <General
                SelectInputData={SelectInputData}
                setShowError={setShowError}
                ShowError={ShowError}
              />
            ) : (
              <></>
            )}

            {LocalClassificationID === 0 ||
              LocalClassificationID === 1 ||
              LocalClassificationID === 2 ? (
              <Root SelectInputData={SelectInputData} />
            ) : (
              <></>
            )}

            {LocalClassificationID === 0 ||
              LocalClassificationID === 1 ||
              LocalClassificationID === 2 ? (
              <ClassificationSelect
                label="Classification :"
                SelectInputData={SelectInputData}
              />
            ) : (
              <></>
            )}

            {LocalClassificationID === 0 ||
              LocalClassificationID === 1 ||
              LocalClassificationID === 2 ? (
              <Media
                setAllMediaUnique={setAllMediaUnique}
                setAllMediaLimited={setAllMediaLimited}
              />
            ) : (
              <></>
            )}

            {LocalClassificationID === 0 ? (
              <Measurment
                setMeasurmentData={setMeasurmentData}
                MeasurmentData={MeasurmentData}
                SelectInputData={SelectInputData} />
            ) : (
              <></>
            )}

            {LocalClassificationID === 0 ? (
              <Proof
                ProofFromSave={ProofFromSave}
                setProofFromSave={setProofFromSave}
                ProofDataFromSave={ProofDataFromSave}
                setProofDataFromSave={setProofDataFromSave}
                setProofData={setProofData}
                SelectInputData={SelectInputData}
              />
            ) : (
              <></>
            )}

            {LocalClassificationID === 0 ? (
              <Availibility
                SelectInputData={SelectInputData}
              />
            ) : (
              <></>
            )}

            {LocalClassificationID === 1 ? (
              <Edition
                AllSamePrise={AllSamePrise}
                setAllSamePrise={setAllSamePrise}
                SelectInputData={SelectInputData}
              />
            ) : (
              <></>
            )}

            {LocalClassificationID === 2 && !ShowenReproduction === true ? (
              <Original SelectInputData={SelectInputData} />
            ) : (
              <></>
            )}

            {LocalClassificationID === 2 ? (
              <Reproduction SelectInputData={SelectInputData} />
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
        {/* ------------------------------ mrx: Main Components End ---------------------------------*/}

        {/* ------------------------------ mrx: Right Section Start ---------------------------------*/}
        <Grid
          item
          className={ArtWorkFlowStyle.RightSide}
        >
          <Grid
            container
            direction="column"
            className={ArtWorkFlowStyle.C_RightSide}
          >
            <Hidden smDown>
              <ButtonAddArtwork
                handleModal={HanldeAddArtwork}
                handleDiscardArtwork={handleDiscardArtwork}
              />
            </Hidden>

            <Hidden smDown>
              <Grid item className="mt30_m">
                <Grid
                  container
                  direction="column"
                  className={ArtWorkFlowStyle.box_wrapper}
                >
                  <AboutWork SelectInputData={SelectInputData} />
                </Grid>
              </Grid>
            </Hidden>

            {/* Privacy section Start */}
            <Grid item className="mt30">
              <PrivacyForm SelectInputData={SelectInputData} />
            </Grid>
            {/* Privacy section End */}
          </Grid>
        </Grid>
        {/* ------------------------------ mrx: Right Section End ---------------------------------*/}
      </Grid>
      {
        handleGetModalByClassificationID()
      }
      {/* <Minting  /> */}
      <LoadingSpiner display={LoadingPage} />
    </>
  );
}
