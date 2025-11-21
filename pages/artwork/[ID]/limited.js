import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from 'next/router';

// Matrial
import { Grid, Button, IconButton, Container, Hidden } from "@material-ui/core";

// Style
import ArtWorkFlowStyle from "../../../styles/artworkflow.module.css";
import styles from "../../../styles/Home.module.css";
import LoadingSpiner from "../../../components/common/loadingSpiner";

// Component
import Edition from "../../../components/Screens/ArtWork/MainGET/EditionLimited";
import General from "../../../components/Screens/ArtWork/MainGET/General";
import AboutWork from "../../../components/Screens/ArtWork/AboutWork";
import HeaderLanding from "../../../components/common/header";
import PrimaryMenu from "../../../components/Screens/ArtWork/PrimaryMenu";
import Root from "../../../components/Screens/ArtWork/MainGET/Root";
import Media from "../../../components/Screens/ArtWork/MainGET/Media";
import ArtWorkV1 from "../../../components/Modals/ArtWork/ArtWorkV1";
import UserNavBar from "../../../components/Screens/ArtWork/UserNavBar";
import ButtonEditArtwork from "../../../components/Screens/ArtWork/ButtonEditArtwork";
import arrowLeft from "../../../public/images/icons/Arrow left -.svg";
import ClassificationSelect from "../../../components/Forms/ClassificationSelect";
import IconBar from "../../../components/Screens/ArtWork/IconBar";
import Minting from "../../../components/Screens/ArtWork/Mint/MintingRepo";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import {
  GET_ADD_WORK_DATA,
  CHECK_MINT_STATUS,
  GET_ALL_ARTWORK_LIMITED_BY_ID,
  EDIT_LIMITED_ARTWORK,
  DELETE_LOCAL_EDITIONS_LIMITED
} from "../../api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../api/config";

// mrx : context ↓
import { Context } from "../../../context/index";
import useWindowSize from "../../../Hooks/useWindowSize";

export default function CreatArtwork() {
  const router = useRouter();

  // genetal state Start ------------------------------
  // ---  mrx : context
  const {
    setGeneralTitle,
    setGeneralCreationyear,
    setGeneralDescription,
    setAddedArtistList,
    GeneralCreationyear,
    GeneralDescription,
    setSignleItemId,
    AllEditions,
    setAllEditions,
    LoadingPage,
    setLoadingPage,
    MintingStatus,
    setMintingStatus,
    AllMediaLimitedC,
    ShowDisOrSaveLimited,
    setShowDisOrSaveLimited
  } = useContext(Context);
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : Call the artwork info after get id from router Start -------------------------------------------------------
  useEffect(() => {
    const { ID } = router.query;
    GET_USER_ARTWORK_INFO(ID);
  }, [router]);
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : get input Data From Aoi Start ------------------------------------------------------------------------------
  useEffect(() => {
    GetAllInputData();
  }, [])
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : States Start ----------------------------------------------------------------
  const [ArtWorkv1Modal, setArtWorkv1Modal] = useState(false);
  const [ModalData, setModalData] = useState([]);
  const [UploadingFileMedia, setUploadingFileMedia] = useState([]);

  const [AllData, setAllData] = useState([]);

  // mrx : list of select input ---------------------------------------------------------------------------------------
  const [SelectInputData, setSelectInputData] = useState([]);
  const [classificationSelect, setClassificationSelect] = useState("Unique - Original");
  const [original, setOriginal] = useState(false);
  const [EditionsMain, setEditionsMain] = useState([]);
  const [ArtWorkID, setArtWorkID] = useState("");
  const [EditAll, setEditAll] = useState(true);
  const [GetModalData, setGetModalData] = useState([]);
  const [Editions, setEditions] = useState([]);
  const [AllMediaLimited, setAllMediaLimited] = useState([]);
  const [AllSamePrise, setAllSamePrise] = useState(false);

  // ----- General Data ( States )
  const [ArtistListData, setArtistListData] = useState([]);
  const [GeneralData, setGeneralData] = useState([]);
  // ----- General Data ( End )

  // ----- Root Data ( States )
  const [RootData, setRootData] = useState([]);
  // ----- Root Data ( End )

  // ----- Media Data ( States )
  const [AllMediaData, setAllMediaData] = useState([]);
  // ----- Media Data ( End )

  // ----- Editions Data ( States )
  const [EditionSizeData, setEditionSizeData] = useState(0);
  const [EditionList, setEditionList] = useState([]);
  // ----- Editions Data ( End )


  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : get collection id from localstorage ------------------------------------------------------------------------
  const LocalClassificationID = parseInt(Cookies.get("ClassificationID"));
  //  End -------------------------------------------------------------------------------------------------------------

  //  mrx : common Start ----------------------------------------------------------------------------------------------
  const handleModal = () => {
    setModal(!modal);
  };
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : get modal data when it was true ----------------------------------------------------------------------------
  const getModalData2 = (ArtWorkID) => {
    if (ArtWorkID !== undefined) {
      GetAuthUrl(CHECK_MINT_STATUS(ArtWorkID, localStorage.getItem("collectionId"))).then(
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

  // mrx : GET Inputs value Start -------------------------------------------------------------------------------------
  const GetAllInputData = () => {
    setLoadingPage(true);
    GetAuthUrl(GET_ADD_WORK_DATA(localStorage.getItem("collectionId"))).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setSelectInputData(res.data.data);
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
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : GET artwork info Start ----------------------------------------------------------------
  const GET_USER_ARTWORK_INFO = (ID) => {
    getModalData2(ID)
    setArtWorkID(ID);
    if (ID !== undefined) {
      GetAuthUrl(GET_ALL_ARTWORK_LIMITED_BY_ID(ID, localStorage.getItem("collectionId"))).then(
        (res, err) => {
          if (res && res.status === 200) {
            if (res?.data?.isSuccess) {
              handleSetData(res.data.data);
              window.onload()
            } else {
            }
          } else {
            toast.error("something went wrong !");
          }
        }
      );
    }
  };
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : setting forms values Start ---------------------------------------------------------------------------------
  const handleSetData = (Data) => {
    setAllSamePrise(Data?.allEditionSameSizePricing);
    window.onload = function () {
      if (!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
      }
    }
    setAllMediaLimited(Data?.allMedias)
    setEditions(Data?.editions)
    setGetModalData(Data?.mintingInfos[0]?.title !== null ? Data?.mintingInfos : null);
    setAllEditions(false);
    // setAllEditions(Data?.allEditionSameMedia);
    setAllData(Data);
    setGeneralTitle(Data?.title)
    setGeneralCreationyear(Data?.creationYear);
    setGeneralDescription(Data?.description);
    setAddedArtistList(
      Data?.artists?.map((item) => ({
        "id": item?.id,
        "name": item?.artistName,
        "image": item?.displayImage,
      }))
    );


    setEditionsMain({ "editionSize": Data?.editionSize, "editionWorks": Data?.availableEditions?.map((item) => item) })
    localStorage.setItem("ArtWork-Editions", JSON.stringify(Data?.editions));
    localStorage.setItem("ArtWork-Editions-Media-GET", JSON.stringify(Data?.medias));
    localStorage.setItem("ArtWork-Editions-Values", JSON.stringify(Data?.availableEditions?.map((item) => item)))
  }
  //  End -------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    // setAllMediaLimited(AllData?.medias);
  }, [AllData])

  // mrx :some data from local storage for adding artwork Start -------------------------------------------------------
  const MediaData = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("UploadingFileMedia") || "[]" : "[]");
  const Artists = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-ArtistList") || "[]" : "[]");
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : Limited data collected for add Start ------------------------------------------------------------------------
  const EditionValues = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Editions-Values") || '[]' : '[]');
  const ArtWorkLimitedEditions = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Editions") || '[]' : '[]');
  const GET_ALL_MEDIA_FOR_EDIT = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Editions-Media") || '[]' : '[]');

  const LimitedData = {
    "id": ArtWorkID,
    "artists": ArtistListData?.map((item) => item?.id),
    "title": GeneralData?.title,
    "description": GeneralDescription,
    "creationYear": GeneralCreationyear,
    "mediumType": parseInt(RootData?.mediumType),
    "styleId": RootData?.styleMedium,
    "subMediumId": RootData?.subMedium,
    "haveDigitalOrPhysicalVersion": RootData?.checkBoxValue ? RootData?.checkBoxValue : false,
    "artworkMedias": AllEditions == true ? AllMediaLimitedC?.map((item) => ({
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
    })) : GET_ALL_MEDIA_FOR_EDIT?.filter((item) => parseInt(item?.editionNumber) !== 0)?.map((item) => ({
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
    "artworkMesurments": JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Editions") || "[]" : "[]"),
    "privacy": {
      "ownerShip": parseInt(typeof window !== "undefined" ? localStorage.getItem("Add-ArtWork-OwnershipID") || 0 : 0),
      "privacyPrice": parseInt(typeof window !== "undefined" ? localStorage.getItem("Add-ArtWork-PriceID") || 0 : 0),
      "transferDate": parseInt(typeof window !== "undefined" ? localStorage.getItem("Add-ArtWork-TrandferDateID") || 0 : 0),
      "transferType": parseInt(typeof window !== "undefined" ? localStorage.getItem("Add-ArtWork-TransferTypeID") || 0 : 0),
    },
    "allEditionSameSizePricing": AllSamePrise,
    "allEditionSameMedia": parseInt(Cookies.get("Limited-ID")) === 0 ? true : false,
    "editionSize": EditionSizeData,
    "availableEditions": ArtWorkLimitedEditions?.map((item) => item?.editionNumber),
    "selectedEditions": EditionList
  }
  //  End -------------------------------------------------------------------------------------------------------------

  // handle Edit artwork with multi type Start ------------------------------------------------------------------------
  const HanldeShowEditions = () => {
    setSignleItemId(AllData?.editions?.map((item) => item?.editionId)[0]);
    Cookies.set("Selected-item-single", Editions?.map((item) => item?.type)[0]);
    router.push(`/artwork/single`)
  }
  //  End -------------------------------------------------------------------------------------------------------------

  // handle Edit artwork with multi type Start ------------------------------------------------------------------------
  const HanldeEditArtwork = () => {
    setLoadingPage(true);
    PostAuthUrl(EDIT_LIMITED_ARTWORK(localStorage.getItem("collectionId")),
      LimitedData
    ).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            toast.success("Artwork updated successfully");
            setShowDisOrSaveLimited(false);
            GET_USER_ARTWORK_INFO(ArtWorkID);
            setLoadingPage(false);
          } else {
            toast.error(res?.data?.message);
            setLoadingPage(false);
          }
        } else {
          setLoadingPage(false);
          toast.error("something went wrong !");
        }
      }
    );
  }
  //  End -------------------------------------------------------------------------------------------------------------

  // handle Delete Editions with multi type Start ------------------------------------------------------------------------
  const HanldeEDeleteLocalEditions = () => {
    setLoadingPage(true);
    PostAuthUrl(DELETE_LOCAL_EDITIONS_LIMITED(localStorage.getItem("collectionId"), 1),
      LimitedData
    ).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            toast.success("Edition Deleted successfully");
            handleSetData(res.data.data);
            localStorage.setItem("ArtWork-Editions-Media", JSON.stringify(
              res?.data?.data?.medias?.map((Item, index) => ({
                "editionNumber": parseInt(Item?.editionNumber),
                "mediaSort": JSON.stringify(Item?.medias?.map((item, index) => ({
                  "fileExtention": item?.fileExtention,
                  "fileName": item?.fileName,
                  "fileSize": item?.imageSize,
                  "fullPath": item?.fileUrl,
                  "type": item?.type,
                  "caption": item?.caption,
                  "id": item?.id,
                  "classificationType": 1,
                  "LimitedSt": parseInt(Item?.editionNumber),
                }))),
                "medias": Item?.medias?.map((item, index) => ({
                  "fileExtention": item?.fileExtention,
                  "fileName": item?.fileName,
                  "fileSize": item?.imageSize,
                  "fullPath": item?.fileUrl,
                  "type": item?.type,
                  "caption": item?.caption,
                  "id": item?.id,
                  "classificationType": 1,
                  "LimitedSt": parseInt(Item?.editionNumber),
                }))
              }))
            ));
            setLoadingPage(false);
            setShowDisOrSaveLimited(true);
          } else {
            toast.error(res?.data?.message);
            setShowDisOrSaveLimited(true);
            setLoadingPage(false);
          }
        } else {
          setLoadingPage(false);
          setShowDisOrSaveLimited(true);
          toast.error("something went wrong !");
        }
      }
    );
  }
  
  const [width, height] = useWindowSize()

  //  End -------------------------------------------------------------------------------------------------------------
  return (
    <>
      {/* <Hidden smDown>
        <HeaderLanding />
      </Hidden> */}

      <Grid container justifyContent="center" className={ArtWorkFlowStyle.WrapperPages}>
        {/* ------------------------------ mrx: Left Section Start ---------------------------------*/}
        <UserNavBar
          handleModal={HanldeEditArtwork}
          Title={AllData?.title}
          GET_USER_ARTWORK_INFO={() => GET_USER_ARTWORK_INFO(ArtWorkID)}
        />

        <Hidden smDown>
          <Grid item className={ArtWorkFlowStyle.MenuLeftSide}>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              className={ArtWorkFlowStyle.h100}
            >
              <Grid item>
                <Grid container>
                  <Grid item className={ArtWorkFlowStyle.addArtworkText}>
                    <IconButton
                      onClick={() => { router.push("/artwork"); setShowDisOrSaveLimited(false) }}
                      size="small"
                      style={{ marginRight: "10px" }}
                    >
                      <Image src={arrowLeft} />
                    </IconButton>
                    {
                      AllData?.title ? (
                        <>
                          Artwork ‘{AllData?.title}’
                        </>
                      ) : (
                        <>
                          Loading ...
                        </>
                      )
                    }
                  </Grid>
                </Grid>
              </Grid>

              <PrimaryMenu
                classification={classificationSelect}
                original={original}
              />
            </Grid>
          </Grid>
        </Hidden>
        {/* ------------------------------ mrx: Left Section End ---------------------------------*/}

        {/* ------------------------------ mrx: Main Components Start ---------------------------------*/}
        <Grid item className={ArtWorkFlowStyle.MiddleBox}>
          <Grid
            container
            spacing={4}
            className={ArtWorkFlowStyle.components}
            direction="column"
          >
            {/* <SingleFile/> */}
            {LocalClassificationID === 0 ||
              LocalClassificationID === 1 ||
              LocalClassificationID === 2 ? (
              <General
                mintingStatus={AllData?.verifiedCount > 0 || AllData?.publishedCount > 0 ? 4 : 0}
                SelectInputData={SelectInputData}
                setArtistListData={setArtistListData}
                setGeneralData={setGeneralData}
              />
            ) : (
              <></>
            )}

            {LocalClassificationID === 0 ||
              LocalClassificationID === 1 ||
              LocalClassificationID === 2 ? (
              <Root
                mintingStatus={AllData?.verifiedCount > 0 || AllData?.publishedCount > 0 ? 4 : 0}
                setRootData={setRootData}
                Data={AllData}
                SelectInputData={SelectInputData}
              />
            ) : (
              <></>
            )}

            {LocalClassificationID === 0 ||
              LocalClassificationID === 1 ||
              LocalClassificationID === 2 ? (
              <ClassificationSelect
                mintingStatus={AllData?.verifiedCount > 0 || AllData?.publishedCount > 0 ? 4 : 0}
                disabled={true}
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
                onChange={() => setShowDisOrSaveLimited(true)}
                AllData={AllData}
                ISAllSame={AllData?.allEditionSameMedia ? AllData?.allEditionSameMedia : false}
                AllMediaLimited={AllMediaLimited}
                setAllMediaLimited={setAllMediaLimited}
                mintingStatus={AllData?.verifiedCount > 0 || AllData?.publishedCount > 0 ? 4 : 0}
                setAllMediaData={setAllMediaData}
                UploadingFileMedia={UploadingFileMedia}
                setUploadingFileMedia={setUploadingFileMedia}
              />
            ) : (
              <></>
            )}
            {LocalClassificationID === 1 ? (
              <Edition
                AllSamePrise={AllSamePrise}
                setAllSamePrise={setAllSamePrise}
                mintingStatus={AllData?.verifiedCount > 0 || AllData?.publishedCount > 0 ? 4 : 0}
                Editions={EditionsMain}
                AllData={AllData}
                GetData={Editions}
                SelectInputData={SelectInputData}
                EditAll={EditAll}
                setEditionSizeData={setEditionSizeData}
                setEditAll={setEditAll}
                setEditionList={setEditionList}
                EditionList={EditionList}
                HanldeEDeleteLocalEditions={HanldeEDeleteLocalEditions}
              />
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


            {
              ShowDisOrSaveLimited ? (
                <Hidden
                  smDown>
                  <ButtonEditArtwork
                    setShowDisOrSaveLimited={setShowDisOrSaveLimited}
                    GET_USER_ARTWORK_INFO={() => GET_USER_ARTWORK_INFO(ArtWorkID)}
                    handleModal={HanldeEditArtwork}
                  />
                </Hidden>
              ) : (
                <Grid item className={ArtWorkFlowStyle.Faseleh2}>
                  <IconBar
                    ArtWorkID={ArtWorkID}
                    IsMain={true}
                    mintingStatus={AllData?.verifiedCount > 0 || AllData?.publishedCount > 0 ? 4 : 0}
                    Title={AllData?.title}
                  />
                </Grid>
              )
            }

            <Grid item className="w_100  mb25_m" style={{marginTop: width>960?14:0}}>
              <Grid item className={ArtWorkFlowStyle.Faseleh}>
                <Button
                  onClick={() => HanldeShowEditions()}
                  fullWidth
                  color="secondary"
                  variant="contained"
                  className={ArtWorkFlowStyle.transferBTN}
                >
                  Editions
                </Button>
              </Grid>
            </Grid>
            <Grid item className={ArtWorkFlowStyle.Faseleh}>

              <AboutWork SelectInputData={SelectInputData} />

            </Grid>

            {
              AllData?.canMint && SelectInputData?.collectionStatus === "Online" && (
                <Grid item className="mt30">
                  <Minting
                    setAllData={setAllData}
                    Editions={Editions}
                    notMintedCount={AllData?.notMintedCount}
                    editionSize={AllData?.editionSize}
                    isUserVerified={SelectInputData?.isUserVerified}
                    availableEditions={AllData?.availableEditions}
                    pedndingCount={AllData?.pedndingCount}
                    verifiedCount={AllData?.verifiedCount}
                    publishedCount={AllData?.publishedCount}
                    GetData={AllData?.mintingInfos}
                    AllData={AllData}
                    moreInfos={AllData?.moreInfos}
                    setArtWorkv1Modal={setArtWorkv1Modal}
                    ArtWorkID={ArtWorkID}
                    mintingStatus={MintingStatus}
                    addDefaultArtist={SelectInputData?.addDefaultArtist}
                  // HanldeSubmitArtwork={HanldeSubmitArtwork}
                  />
                </Grid>
              )
            }

          </Grid>
        </Grid>
        {/* ------------------------------ mrx: Right Section End ---------------------------------*/}
      </Grid>
      <ArtWorkV1 Data={ModalData} Minting={true} openModal={ArtWorkv1Modal} handleModal={handleModal} />
      {/* <Minting  /> */}
      <LoadingSpiner display={LoadingPage} />
    </>
  );
}
