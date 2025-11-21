import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';

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
import Media from "../../../components/Screens/ArtWork/MainGET/MediaSignle/reproducation";
import Original from "../../../components/Screens/ArtWork/MainGET/SingleOriginal";
import Reproduction from "../../../components/Screens/ArtWork/MainGET/SingleRepo";
import Proof from "../../../components/Screens/ArtWork/MainGET/ProofLimited";
import Availibility from "../../../components/Screens/ArtWork/MainGET/Availibility";
import ArtWorkV1 from "../../../components/Modals/ArtWork/ArtWorkV1";
import IconBar from "../../../components/Screens/ArtWork/IconBar";
import Minting from "../../../components/Screens/ArtWork/Mint/Minting";
import ButtonEditArtwork from "../../../components/Screens/ArtWork/ButtonEditArtwork";
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
  CHECK_MINT_STATUS,
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
    OriginalSectionData,
    setOriginalSectionData,
    ReproductionSectionData,
    setReproductionSectionData,
    MintingStatus,
    setMintingStatus,
    setShowDisOrSaveLimited,
    ShowDisOrSaveLimited
  } = useContext(Context);
  // mrx : End ----------------------------------------------------------------------------------------------------

  // mrx : States Start ------------------------------------------------------------------------------------
  const [modal, setModal] = useState(false);
  const [TypeIDForShowen, setTypeIDForShowen] = useState("");
  const [Editions, setEditions] = useState([]);
  const [SelectInputData, setSelectInputData] = useState([]);
  const [AllData, setAllData] = useState([]);
  const [PrivacyData, setPrivacyData] = useState([]);
  const [ModalData, setModalData] = useState([]);
  const [AllMediaData, setAllMediaData] = useState([]);
  const [StatuseID, setStatuseID] = useState("");
  const [AvailibilityID, setAvailibilityID] = useState("");
  const [CanMint, setCanMint] = useState(false);

  const [GetModalData, setGetModalData] = useState([]);
  const [AvalibilatyData, setAvalibilatyData] = useState([]);

  const [UploadingFileMedia, setUploadingFileMedia] = useState([]);

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

  // mrx :a function for use Type ( only reproduction ) Start ----------------------------------------------------------------
  // useEffect(() => {
  //   if (TypeIDForShowen === "Orginal") {
  //     handleGetOriginal()
  //   } else {
  //     handleGetReproduction()
  //   }
  // }, [TypeIDForShowen])
  // End ---------------------------------------------------------------------------------------------------------------------

  // mrx : when Page loaded Start --------------------------------------------------------------------------------------------
  useEffect(() => {
    if (!SignleItemId) {
      router.back();
    } else {
      setTypeIDForShowen(Cookies.get("Selected-item-single"));
      GetAllInputData()
    }
  }, [])
  // End ---------------------------------------------------------------------------------------------------------------------

  // mrx : GET artwork info Start --------------------------------------------------------------------------------------------
  const GET_USER_ARTWORK_INFO = () => {
    GetAuthUrl(GET_REPRODUCATION_WITH_EDITIONS(localStorage.getItem("collectionId"), SignleItemId)).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            handleSetData(res.data.data);
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
      GET_USER_ARTWORK_INFO()
      getModalData()
    }
  }, [SignleItemId])
  // End ---------------------------------------------------------------------------------------------------------------------

  // mrx : setting forms values Start ----------------------------------------------------------------------------------------
  const handleSetData = (Data) => {
    setCanMint(Data?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.canMint))
    setProofData(Data?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.artworkProofs)[0]);
    localStorage.setItem("ArtWork-Proof", JSON.stringify(Data?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.artworkProofs)[0]));
    setAvalibilatyData(Data?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => ({ Status: item?.availabilityStatus, Type: item?.availabilityType })));
    setAllData(Data);

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

    setEditions(Data?.editions);
    setMintingStatus(Data?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.mintingStatus));

    setPrivacyData(Data?.editions?.filter((item) => item?.id === SignleItemId))
    setGetModalData(Data?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.mintingInfo));
  }
  // End ---------------------------------------------------------------------------------------------------------------------


  // mrx : get modal data when it was true ----------------------------------------------------------------------------
  const getModalData = () => {
    if (SignleItemId) {
      GetAuthUrl(CHECK_MINT_STATUS(SignleItemId, localStorage.getItem("collectionId"))).then(
        (res, err) => {
          if (res && res.status === 200) {
            if (res?.data?.isSuccess) {
              setModalData(res.data.data);
            } else {
            }
          } else {
            toast.error("something went wrong !");
          }
        }
      );
    }
  }
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : GET GET_USER_ARTWORK_INFO Start -----------------------------------------------------------------------------------
  useEffect(() => {
    if (SignleItemId) {
      setReproductionSectionData(AllData?.editions?.filter((item) => item?.subType === "Reproduction")?.map((item) => item?.artworkMesurment));
      setOriginalSectionData(AllData?.editions?.filter((item) => item?.subType === "Orginal")?.map((item) => item?.artworkMesurment));
      setGetModalData(AllData?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.mintingInfo));
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
    }
  }, [SignleItemId])

  // End ---------------------------------------------------------------------------------------------------------------------

  // mrx : Not Used ----------------------------------------------------------------------------------------------------------
  // const handleGetOriginal = () => { }
  // const handleGetReproduction = () => { }
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
    PostAuthUrl(EDIT_SINGLE_EDITION_OF_LIMITED(localStorage.getItem("collectionId")),
      SingleData
    ).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            toast.success("Edition updated successfully");
            setShowDisOrSaveLimited(false);
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error("something went wrong !");
        }
      }
    );
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
    "artworkProofs": ProofData?.map((item) => ({
      "id": item?.id,
      "title": item?.title,
      "description": item?.description,
      "imageUrl": item?.imageUrl,
      "category": item?.category,
      "privacy": item?.privacy
    })),
    "artworkMesurments": TypeIDForShowen === "Orginal" ?
      JSON.stringify(OriginalSectionData) === "[null]" ? {} : OriginalSectionData ? OriginalSectionData : OriginalSectionData
      :
      JSON.stringify(ReproductionSectionData) === "[null]" ? {} : ReproductionSectionData ? ReproductionSectionData : ReproductionSectionData,
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
              />
              <Hidden smDown>
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
                mintingStatus={parseInt(MintingStatus)}
                SignleItemId={TypeIDForShowen}
                setAllMediaData={setAllMediaData}
                setUploadingFileMedia={setUploadingFileMedia}
                UploadingFileMedia={UploadingFileMedia}
              />
              {TypeIDForShowen === "Orginal" ? (
                <Original
                  mintingStatus={parseInt(MintingStatus)}
                  isSingle={true}
                  GetData={AllData?.editions?.filter((item) => item?.subType === "Orginal")?.map((item) => item?.artworkMesurment)[0]}
                  SelectInputData={SelectInputData} />
              ) : (
                <></>
              )}

              {TypeIDForShowen === "Reproduction" ? (
                <Reproduction
                  mintingStatus={parseInt(MintingStatus)}
                  isSingle={true}
                  GetData={AllData?.editions?.filter((item) => item?.subType === "Reproduction")?.map((item) => item?.artworkMesurment)[0]}
                  SelectInputData={SelectInputData} />
              ) : (
                <></>
              )}
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

              {/* <Grid item>
                <MoreEdition />
              </Grid> */}
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
                  <>
                    <Grid item className="w_100 mt30">
                      <Minting
                        imSingle={true}
                        GetData={GetModalData}
                        moreInfos={AllData?.moreInfos}
                        setArtWorkv1Modal={setModal}
                        ArtWorkID={SignleItemId}
                        mintingStatus={parseInt(MintingStatus)}
                        addDefaultArtist={SelectInputData?.addDefaultArtist}
                        artLinkData={AllData?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.artLink)}
                        setAllData={setAllData}
                        AllData={AllData?.editions?.filter((item) => item?.id === SignleItemId)[0]}
                        proofData={ProofData}
                        isUserVerified={SelectInputData?.isUserVerified}
                        HanldeSubmitArtwork={HanldeSubmitSingleArtwork}
                      />
                    </Grid>
                  </>
                )
              }

              {/* <Grid item>
                <Authenticity />
              </Grid> */}
              <Grid item className="mt30">
                <PrivacyContainer
                  Data={PrivacyData}
                  GetSingle={true}
                  SelectInputData={SelectInputData}
                />
              </Grid>
              <Grid item className="w_100 mt30">
                <ArtiverseNetwrok
                  mintingStatus={MintingStatus}
                  ArtWorkID={SignleItemId}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      <ArtWorkV1 Data={ModalData} Minting={true} openModal={modal} handleModal={handleModal} />
    </>
  );
}
