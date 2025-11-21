import React, { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";

// Matrial
import { Grid, IconButton, Container, Hidden } from "@material-ui/core";

// Style
import ArtWorkFlowStyle from "../../../styles/artworkflow.module.css";
import styles from "../../../styles/Home.module.css";

// Image
import Image from "next/image";
import arrowLeft from "../../../public/images/icons/Arrow left -1.svg";

// Component
import HeaderLanding from "../../../components/common/header";
import Media from "../../../components/Screens/ArtWork/MainGET/MediaSignle/limited";
import Proof from "../../../components/Screens/ArtWork/MainGET/ProofLimited";
import Measurment from "../../../components/Screens/ArtWork/MainGET/Measurment";
import Availibility from "../../../components/Screens/ArtWork/MainGET/Availibility";
import ArtWorkV1 from "../../../components/Modals/ArtWork/ArtWorkV1";
import IconBar from "../../../components/Screens/ArtWork/IconBar";
import ButtonEditArtwork from "../../../components/Screens/ArtWork/ButtonEditArtwork";
import Minting from "../../../components/Screens/ArtWork/Mint/Minting";
import Authenticity from "../../../components/Screens/ArtWork/Authenticity";
import PrivacyContainer from "../../../components/Screens/ArtWork/PrivacyContainer";
import ArtiverseNetwrok from "../../../components/Screens/ArtWork/ArtiverseNetwrok";
import LimittedEditions from "../../../components/Screens/ArtWork/LimittedEdition";
import HeaderAddArtMobile from "../../../components/Screens/ArtWork/HeaderAddArt_Mobile";
import MobileEdition from "../../../components/Screens/ArtWork/LimittedEdition/MobileEdition";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import {
  GET_REPRODUCATION_WITH_EDITIONS,
  GET_ADD_WORK_DATA,
  EDIT_SINGLE_EDITION_OF_LIMITED,
  SUBMIT_MORE_INFO_SINGLE_ARTWORK
} from "../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../pages/api/config";

// mrx : context ↓
import { Context } from "../../../context/index";

export default function SaveLimitted() {
  const router = useRouter();

  // mrx : context Data Start ------------------------------------------------------------------------------------
  const {
    SignleItemId,
    MintingStatus,
    setMintingStatus,
    setLoadingPage,
    ShowDisOrSaveLimited,
    setShowDisOrSaveLimited
  } = useContext(Context);
  // mrx : End ----------------------------------------------------------------------------------------------------

  // mrx : States Start ------------------------------------------------------------------------------------
  const [modal, setModal] = useState(false);
  const [TypeIDForShowen, setTypeIDForShowen] = useState("");
  const [Editions, setEditions] = useState([]);
  const [SelectInputData, setSelectInputData] = useState([]);
  const [AllData, setAllData] = useState([]);
  const [PrivacyData, setPrivacyData] = useState([]);

  const [UploadingFileMedia, setUploadingFileMedia] = useState([]);
  const [AllMediaData, setAllMediaData] = useState([]);
  const [GetModalData, setGetModalData] = useState([]);

  const [StatuseID, setStatuseID] = useState("");
  const [AvailibilityID, setAvailibilityID] = useState("");
  const [CanMint, setCanMint] = useState(false);

  // ----- Measurment Data ( States )
  const [MesurmentData, setMesurmentData] = useState([]);
  // ----- Measurment Data ( End )

  const [AvalibilatyData, setAvalibilatyData] = useState([]);

  // ----- Proof Data ( States )
  const [ProofData, setProofData] = useState([]);
  // ----- Proof Data ( End )

  // mrx : End ----------------------------------------------------------------------------------------------------

  // mrx : GET Inputs value Start --------------------------------------------------------------------------------------------
  const GetAllInputData = () => {
    GetAuthUrl(GET_ADD_WORK_DATA(localStorage.getItem("collectionId"))).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setSelectInputData(res.data.data);
          } else {
          }
        } else {
          toast.error("something went wrong !");
        }
      }
    );
  };
  // End ---------------------------------------------------------------------------------------------------------------------

  // mrx : when Page loaded Start --------------------------------------------------------------------------------------------
  useEffect(() => {
    if (!SignleItemId) {
      router.back();
    } else {
      setTypeIDForShowen(Cookies.get("Selected-item-single"));
      GET_USER_ARTWORK_INFO()
      GetAllInputData()
      setPrivacyData(AllData?.editions?.filter((item) => item?.id === SignleItemId))
    }
  }, [])
  // End ---------------------------------------------------------------------------------------------------------------------

  // mrx : Set privacy Data Start --------------------------------------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("Add-ArtWork-OwnershipID", PrivacyData?.privacy?.ownerShip);
    localStorage.setItem("Add-ArtWork-PriceID", PrivacyData?.privacy?.privacyPrice);
    localStorage.setItem("Add-ArtWork-TrandferDateID", PrivacyData?.privacy?.transferDate);
    localStorage.setItem("Add-ArtWork-TransferTypeID", PrivacyData?.privacy?.transferType);
  }, [PrivacyData])
  // End ---------------------------------------------------------------------------------------------------------------------

  // mrx : GET artwork info Start --------------------------------------------------------------------------------------------
  const GET_USER_ARTWORK_INFO = () => {
    setLoadingPage(true);
    GetAuthUrl(GET_REPRODUCATION_WITH_EDITIONS(localStorage.getItem("collectionId"), SignleItemId)).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            handleSetData(res.data.data);
            setLoadingPage(false);
          } else {
          }
        } else {
          toast.error("something went wrong !");
        }
      }
    );
  };
  // End ---------------------------------------------------------------------------------------------------------------------

  // mrx : GET GET_USER_ARTWORK_INFO Start -----------------------------------------------------------------------------------
  useEffect(() => {
    if (SignleItemId) {
      setCanMint(AllData?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.canMint))
      setMesurmentData(AllData?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.artworkMesurment)[0]);
      localStorage.setItem("ArtWork-Proof",
        AllData?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.artworkProofs)[0] ?
          JSON.stringify(AllData?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.artworkProofs)[0]?.map((item) => ({
            "title": item?.title,
            "description": item?.description,
            "imageUrl": item?.imageUrl,
            "category": item?.category,
            "privacy": item?.privacy,
            "Editing": false,
            "Save": false,
            "LimitedID": SignleItemId,
            "id": item?.id
          })))
          :
          '[]'
      );
      setGetModalData(AllData?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.mintingInfo));
      setUploadingFileMedia(AllData?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => JSON.parse(item?.mediaSort))[0]?.map((item) => ({
        LimitedSt: item?.LimitedSt,
        caption: item?.Caption,
        classificationType: 0,
        fileExtention: item?.FileExtention,
        fileSize: item?.ImageSize,
        fullPath: item?.FileUrl,
        id: item?.Id,
        type: item?.Type
      })));

      localStorage.setItem("UploadingFileMedia",
        JSON.stringify(AllData?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => JSON.parse(item?.mediaSort))[0]?.map((item) => ({
          LimitedSt: item?.limitedSt,
          caption: item?.caption,
          classificationType: 0,
          fileExtention: item?.fileExtention,
          fileSize: item?.imageSize,
          fullPath: item?.fileUrl,
          id: item?.id,
          type: item?.type
        }))))
    }
  }, [SignleItemId])

  // End ---------------------------------------------------------------------------------------------------------------------

  // mrx : setting forms values Start ----------------------------------------------------------------------------------------
  const handleSetData = (Data) => {
    setCanMint(Data?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.canMint))
    setMintingStatus(Data?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.mintingStatus));
    setMesurmentData(Data?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.artworkMesurment)[0]);
    setAvalibilatyData(Data?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => ({ Status: item?.availabilityStatus, Type: item?.availabilityType })));
    setAllData(Data);
    setEditions(Data?.editions);
    setUploadingFileMedia(Data?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => JSON.parse(item?.mediaSort))[0]?.map((item) => ({
      LimitedSt: item?.LimitedSt,
      caption: item?.Caption,
      classificationType: 0,
      fileExtention: item?.FileExtention,
      fileSize: item?.ImageSize,
      fullPath: item?.FileUrl,
      id: item?.Id,
      type: item?.Type
    })));
    setGetModalData(Data?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.mintingInfo));


    localStorage.setItem("UploadingFileMedia",
      JSON.stringify(Data?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => JSON.parse(item?.mediaSort))[0]?.map((item) => ({
        LimitedSt: item?.limitedSt,
        caption: item?.caption,
        classificationType: 0,
        fileExtention: item?.fileExtention,
        fileSize: item?.imageSize,
        fullPath: item?.fileUrl,
        id: item?.id,
        type: item?.type
      }))))
  }

  // End ---------------------------------------------------------------------------------------------------------------------

  // mrx : Common Used ----------------------------------------------------------------------------------------------------------
  const handleModal = () => {
    setModal(!modal);
  };
  // End ---------------------------------------------------------------------------------------------------------------------

  // Start mint submit  ---------------------------------------------------------------------------------------------------------------------
  const HanldeSubmitSingleArtwork = () => {
    PostAuthUrl(SUBMIT_MORE_INFO_SINGLE_ARTWORK(localStorage.getItem("collectionId")),
      SingleData
    ).then(
      async (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            try {
              toast.success("Artwork updated successfully");
              setAllData(res?.data?.data);
              // location.reload();
            } catch (error) {
              console.error(error);
            }

          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error("something went wrong !");
        }
      }
    );
  }
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : Edit Single Edition Start -----------------------------------------------------------------------------------------
  const HanldeEditSingleEdition = () => {
    if (
      AvailibilityID === "" ||
      StatuseID === ""
    ) {
      setCheckRequired(true)
      toast.error("Please fill the availibility section ");
    } else {
      PostAuthUrl(EDIT_SINGLE_EDITION_OF_LIMITED(localStorage.getItem("collectionId")),
        SingleData
      ).then(
        (res, err) => {
          if (res && res.status === 200) {
            if (res?.data?.isSuccess) {
              toast.success("Edition updated successfully");
              setShowDisOrSaveLimited(false);
              GET_USER_ARTWORK_INFO()
            } else {
              toast.error(res?.data?.message);
            }
          } else {
            toast.error("something went wrong !");
          }
        }
      );
    }
  }
  // End ---------------------------------------------------------------------------------------------------------------------

  // mrx : Unique data collected for add Start ------------------------------------------------------------------------
  const SingleData = {
    "id": SignleItemId,
    "artworkMedias": AllMediaData?.map((item) => ({
      "fileUrl": item?.fullPath,
      "caption": item?.caption,
      "type": item?.type,
      "id": item?.id,
      "imageSize": item?.fileSize,
      "fileExtention": item?.fileExtention
    })),
    "mediaSort": JSON.stringify(AllMediaData?.map((item) => ({
      "fileUrl": item?.fullPath,
      "caption": item?.caption,
      "type": item?.type,
      "id": item?.id,
      "imageSize": item?.fileSize,
      "fileExtention": item?.fileExtention
    }))),
    "artworkProofs": ProofData?.filter((item) => item?.LimitedID === SignleItemId)?.map((item) => ({
      "id": item?.id,
      "title": item?.title,
      "description": item?.description,
      "imageUrl": item?.imageUrl,
      "category": item?.category,
      "privacy": item?.privacy
    })),
    "artworkMesurments": MesurmentData,
    "availabilityType": AvailibilityID,
    "availabilityStatus": StatuseID,
  }
  //  End -------------------------------------------------------------------------------------------------------------


  return (
    <>
      {/* <Hidden smDown>
        <HeaderLanding />
      </Hidden> */}
        <Grid container justifyContent="center" className={ArtWorkFlowStyle.WrapperPages}>
          <Grid item className={ArtWorkFlowStyle.MenuLeftSide}>
            <Grid
              container
              alignItems="flex-start"
              justifyContent="flex-start"
              className={ArtWorkFlowStyle.h100}
            >
              <HeaderAddArtMobile editing={true} handleModal={HanldeEditSingleEdition} />
              <MobileEdition
                SelectedID={SignleItemId}
                setTypeIDForShowen={setTypeIDForShowen}
                TypeIDForShowen={TypeIDForShowen}
                Data={Editions}
              />              <Hidden smDown>
                <Grid item className={ArtWorkFlowStyle.LeftSide}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    className={ArtWorkFlowStyle.h100}
                  >
                    <Grid item>
                      <Grid container align="center" spacing={1}>
                        <Grid item className={ArtWorkFlowStyle.iconBack}>
                          <IconButton onClick={() => router.back()} size="small">
                            <Image src={arrowLeft} />
                          </IconButton>
                        </Grid>
                        <Grid item className={ArtWorkFlowStyle.addArtworkText}>
                          {AllData?.title}
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* desktop */}
                    <LimittedEditions
                      SelectedID={SignleItemId}
                      setTypeIDForShowen={setTypeIDForShowen}
                      TypeIDForShowen={TypeIDForShowen}
                      Data={Editions}
                    />
                  </Grid>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item className={ArtWorkFlowStyle.MiddleBox}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
            ></Grid>

            {/* ------------------------------ Components ---------------------------------                */}
            <Grid
              container
              spacing={4}
              className={ArtWorkFlowStyle.components1}
              direction="column"
            >
              <Media
                SignleItemId={TypeIDForShowen}
                mintingStatus={parseInt(MintingStatus)}
                setAllMediaData={setAllMediaData}
                setUploadingFileMedia={setUploadingFileMedia}
                UploadingFileMedia={UploadingFileMedia}
              />

              <Measurment
                mintingStatus={parseInt(MintingStatus)}
                setMesurmentData={setMesurmentData}
                MesurmentData={MesurmentData}
                SelectInputData={SelectInputData}
              />

              <Proof
                mintingStatus={parseInt(MintingStatus)}
                setProofData={setProofData}
                ProofData={ProofData}
                AllData={AllData}
                SelectInputData={SelectInputData}
              />
              <Availibility
                mintingStatus={parseInt(MintingStatus)}
                SelectInputData={SelectInputData}
                StatuseID={StatuseID}
                setStatuseID={setStatuseID}
                AvailibilityID={AvailibilityID}
                setAvailibilityID={setAvailibilityID}
                AvalibilatyData={AvalibilatyData}
              />
            </Grid>
          </Grid>
          <Grid
            item
            className={ArtWorkFlowStyle.RightSide}
          >
            <Grid
              container
              direction="column"
              className={ArtWorkFlowStyle.C_RightSide}
            >

              {
                ShowDisOrSaveLimited ? (
                  <Hidden smDown>
                    <ButtonEditArtwork
                      setShowDisOrSaveLimited={setShowDisOrSaveLimited}
                      GET_USER_ARTWORK_INFO={() => GET_USER_ARTWORK_INFO()}
                      handleModal={HanldeEditSingleEdition}
                    />
                  </Hidden>
                ) : (
                  <>
                    <IconBar
                      IsMain={false}
                      ArtWorkID={SignleItemId}
                      mintingStatus={parseInt(MintingStatus)}
                      Title={AllData?.title}
                    />
                  </>
                )
              }

              {
                CanMint && SelectInputData?.collectionStatus === "Online" && (
                  <Grid item className="mt30">
                    <Minting
                      imSingle={true}
                      GetData={GetModalData}
                      AllData={AllData?.editions?.filter((item) => item?.id === SignleItemId)[0]}
                      moreInfos={AllData?.moreInfos}
                      setAllData={setAllData}
                      setArtWorkv1Modal={setModal}
                      ArtWorkID={SignleItemId}
                      artLinkData={AllData?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.artLink)}
                      mintingStatus={parseInt(MintingStatus)}
                      addDefaultArtist={SelectInputData?.addDefaultArtist}
                      proofData={ProofData}
                      isUserVerified={SelectInputData?.isUserVerified}
                      HanldeSubmitArtwork={HanldeSubmitSingleArtwork}
                    />
                  </Grid>
                )
              }
              {/* <Grid item>
                <Authenticity />
              </Grid> */}
              <Grid item className="mt30">
                <PrivacyContainer
                  Data={AllData?.editions?.filter((item) => item?.id === SignleItemId)[0]}
                  SelectInputData={SelectInputData}
                />
              </Grid>
              <Grid item className="mt30">
                <ArtiverseNetwrok
                  ArtWorkID={SignleItemId}
                  mintingStatus={MintingStatus}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      <ArtWorkV1 openModal={modal} handleModal={handleModal} />
    </>
  );
}
