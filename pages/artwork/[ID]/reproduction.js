import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from 'next/router';

// Matrial
import { Grid, Button, IconButton, Container, Hidden } from "@material-ui/core";

// Style
import ArtWorkFlowStyle from "../../../styles/artworkflow.module.css";
import styles from "../../../styles/Home.module.css";

// Component
import Edition from "../../../components/Screens/ArtWork/MainGET/Edition";
import General from "../../../components/Screens/ArtWork/MainGET/General";
import AboutWork from "../../../components/Screens/ArtWork/AboutWork";
import HeaderLanding from "../../../components/common/header";
import PrimaryMenu from "../../../components/Screens/ArtWork/PrimaryMenu";
import Root from "../../../components/Screens/ArtWork/MainGET/Root";
import Media from "../../../components/Screens/ArtWork/MainGET/Media";
import Measurment from "../../../components/Screens/ArtWork/MainGET/Measurment";
import ButtonEditArtwork from "../../../components/Screens/ArtWork/ButtonEditArtwork";
import Proof from "../../../components/Screens/ArtWork/MainGET/Proof";
import Availibility from "../../../components/Screens/ArtWork/MainGET/Availibility";
import Reproduction from "../../../components/Screens/ArtWork/MainGET/Reproduction";
import ArtWorkV1 from "../../../components/Modals/ArtWork/ArtWorkV1";
import Original from "../../../components/Screens/ArtWork/MainGET/Original";
import UserNavBar from "../../../components/Screens/ArtWork/UserNavBar";
import arrowLeft from "../../../public/images/icons/Arrow left -.svg";
import ClassificationSelect from "../../../components/Forms/ClassificationSelect";
import Minting from "../../../components/Screens/ArtWork/Mint/MintingRepo";
import Authenticity from "../../../components/Screens/ArtWork/Authenticity";
import ArtiverseNetwrok from "../../../components/Screens/ArtWork/ArtiverseNetwrok";
import IconBar from "../../../components/Screens/ArtWork/IconBar";

// mrx : setCookies with this
import Cookies from "js-cookie";
import LoadingSpiner from "../../../components/common/loadingSpiner"

// mrx : api links ↓
import {
  GET_ADD_WORK_DATA,
  EDIT_REPRODUCATION_ARTWORK,
  CHECK_MINT_STATUS,
  GET_ALL_ARTWORK_REPRODUCTION_BY_ID
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
    GeneralDescription,
    ShowenReproduction,
    GeneralCreationyear,
    ReproductionSectionData,
    setReproductionSectionData,
    setSameMedia,
    LoadingPage,
    setLoadingPage,
    MintingStatus,
    setMintingStatus,
    setSignleItemId,
    sameMedia,
    setShowenReproduction,
    OriginalSectionData,
    setOriginalSectionData,
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

  // mrx : States Start -----------------------------------------------------------------------------------------------
  const [ArtWorkv1Modal, setArtWorkv1Modal] = useState(false);
  const [ModalData, setModalData] = useState([]);
  const [UploadingFileMedia, setUploadingFileMedia] = useState([]);

  const [AllData, setAllData] = useState([]);
  const [Editions, setEditions] = useState([]);

  // mrx : list of select input ---------------------------------------------------------------------------------------
  const [SelectInputData, setSelectInputData] = useState([]);
  const [classificationSelect, setClassificationSelect] = useState("Unique - Original");
  const [original, setOriginal] = useState(false);
  const [ArtWorkID, setArtWorkID] = useState("");
  const [ShowOriginalAndReproduction, setShowOriginalAndReproduction] = useState(false);
  const [GetModalData, setGetModalData] = useState([]);

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

  // ----- Measurment Data ( States )
  const [MesurmentData, setMesurmentData] = useState([]);
  // ----- Measurment Data ( End )

  // ----- Proof Data ( States )
  const [ProofData, setProofData] = useState([]);
  // ----- Proof Data ( End )

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
  const getModalData = (ArtWorkID) => {
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

  // mrx : GET artwork info Start -------------------------------------------------------------------------------------
  const GET_USER_ARTWORK_INFO = (ID) => {
    setArtWorkID(ID);
    if (ID !== undefined) {
      GetAuthUrl(GET_ALL_ARTWORK_REPRODUCTION_BY_ID(ID, localStorage.getItem("collectionId"))).then(
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
    }
  };
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : setting forms values Start ---------------------------------------------------------------------------------
  const handleSetData = (Data) => {

    setGetModalData(Data?.mintingInfos[0]?.title !== null ? Data?.mintingInfos : null);
    setEditions(Data?.editions)
    setSameMedia(Data?.allEditionSameMedia)
    localStorage.setItem("Adding-Art-Work", JSON.stringify({ "SelectedClassificationID": 2, "SelectedTypeID": Data?.medium }));
    setReproductionSectionData(Data?.editions?.filter((item) => item?.type === "Reproduction")[0]);
    setOriginalSectionData(Data?.editions?.filter((item) => item?.type === "Orginal")[0]);
    setAllData(Data);
    setGeneralTitle(Data?.title);
    setGeneralCreationyear(Data?.creationYear);
    setGeneralDescription(Data?.description);
    setAddedArtistList(
      Data?.artists?.map((item) => ({
        "id": item?.id,
        "name": item?.artistName,
        "image": item?.displayImage,
      }))
    );

    setMesurmentData(Data?.artworkMesurment ? Data?.artworkMesurment : [])

    const reproductionData = Data?.medias?.filter((item) => item?.editionNumber === 1)?.map((item) => item?.medias?.map((item) => ({
      "fullPath": item?.fileUrl,
      "fileSize": item?.imageSize,
      "caption": item?.caption,
      "type": item?.type,
      "id": item?.id,
      "LimitedSt": item?.limitedSt,
      "classificationType": 0,
      "fileExtention": item?.fileExtention
    })))

    const originalData = Data?.medias?.filter((item) => item?.editionNumber === 0)?.map((item) => item?.medias?.map((item) => ({
      "fullPath": item?.fileUrl,
      "fileSize": item?.imageSize,
      "caption": item?.caption,
      "type": item?.type,
      "id": item?.id,
      "LimitedSt": item?.limitedSt,
      "classificationType": 1,
      "fileExtention": item?.fileExtention
    })))

    const reproductionData2 = reproductionData[0]?.map((item) => ({
      "fullPath": item?.fullPath,
      "fileSize": item?.fileSize,
      "caption": item?.caption,
      "type": item?.type,
      "id": item?.id,
      "LimitedSt": item?.LimitedSt,
      "classificationType": 2,
      "fileExtention": item?.fileExtention
    }));

    const originalData2 = originalData[0]?.map((item) => ({
      "fullPath": item?.fullPath,
      "fileSize": item?.fileSize,
      "caption": item?.caption,
      "type": item?.type,
      "id": item?.id,
      "LimitedSt": item?.LimitedSt,
      "classificationType": 2,
      "fileExtention": item?.fileExtention
    }));

    if (!reproductionData2) {

    }

    setUploadingFileMedia(reproductionData2 ? reproductionData2.concat(originalData2) : [].concat(originalData2));

  }
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx :some data from local storage for adding artwork Start -------------------------------------------------------
  const MediaData = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Reproduction-Media-Meraged") || "[]" : "[]");
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : Unique data collected for add Start ------------------------------------------------------------------------
  const ReproducationData = {
    "id": ArtWorkID,
    "artists": ArtistListData?.map((item) => item?.id),
    "title": GeneralData?.title,
    "description": GeneralDescription,
    allEditionSameMedia: sameMedia,
    "creationYear": GeneralCreationyear,
    "mediumType": parseInt(RootData?.mediumType),
    "styleId": RootData?.styleMedium,
    "subMediumId": RootData?.subMedium,
    "haveDigitalOrPhysicalVersion": RootData?.checkBoxValue ? RootData?.checkBoxValue : false,
    "artworkMedias": MediaData,
    "mediaSort": JSON.stringify(MediaData),
    "artworkMesurments": [ReproductionSectionData, OriginalSectionData],
    "availabilityType": 0,
    "availabilityStatus": 0,
    "consignmentType": 0,
    "purchaseOrConsignmentUnitId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "purchaseOrConsignmentPrice": 0,
    "purchaseFromOrConsignmentTo": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  }
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : get ClassificationID from local storage Start --------------------------------------------------------------
  const handleGetDataByClassificationID = () => {
    return ReproducationData
  }
  //  End -------------------------------------------------------------------------------------------------------------

  // handle Edit artwork with multi type Start ------------------------------------------------------------------------
  const HanldeEditArtwork = () => {
    setLoadingPage(true);
    PostAuthUrl(EDIT_REPRODUCATION_ARTWORK(localStorage.getItem("collectionId")),
      handleGetDataByClassificationID()
    ).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            toast.success("Artwork updated successfully");
            setShowDisOrSaveLimited(false);
            handleSetData(res?.data?.data);
            setLoadingPage(false);
          } else {
            setLoadingPage(false);
            toast.error(res?.data?.message);
          }
        } else {
          setLoadingPage(false);
          toast.error("something went wrong !");
        }
      }
    );
  }
  //  End -------------------------------------------------------------------------------------------------------------

  const HanldeShowEditions = () => {
    setSignleItemId(AllData?.editions?.map((item) => item?.editionId)[0]);
    Cookies.set("Selected-item-single", Editions?.map((item) => item?.type)[0]);
    router.push(`/artwork/single`);
  }

  const [width, height] = useWindowSize()

  return (
    <>
      {/* <Hidden smDown>
        <HeaderLanding />
      </Hidden> */}

        <Grid container justifyContent="center" className={ArtWorkFlowStyle.WrapperPages}>
          {/* ------------------------------ mrx: Left Section Start ---------------------------------*/}
          <UserNavBar
            Title={AllData?.title}
            handleModal={HanldeEditArtwork}
          GET_USER_ARTWORK_INFO={() => GET_USER_ARTWORK_INFO(ArtWorkID)}
          />

          <Hidden smDown>
            <Grid item className={ArtWorkFlowStyle.MenuLeftSide} >
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
                  mintingStatus={AllData?.verifiedCount > 0 || AllData?.publishedCount > 0 ? 4 : 0}
                  setAllMediaData={setAllMediaData}
                  UploadingFileMedia={UploadingFileMedia}
                  setUploadingFileMedia={setUploadingFileMedia}
                />
              ) : (
                <></>
              )}

              {LocalClassificationID === 0 ? (
                <Measurment
                  mintingStatus={AllData?.verifiedCount > 0 || AllData?.publishedCount > 0 ? 4 : 0}
                  setMesurmentData={setMesurmentData}
                  MesurmentData={MesurmentData}
                  SelectInputData={SelectInputData}
                />
              ) : (
                <></>
              )}

              {LocalClassificationID === 0 ? (
                <Proof
                  mintingStatus={AllData?.verifiedCount > 0 || AllData?.publishedCount > 0 ? 4 : 0}
                  setProofData={setProofData}
                  SelectInputData={SelectInputData}
                />
              ) : (
                <></>
              )}

              {LocalClassificationID === 0 ? (
                <Availibility SelectInputData={SelectInputData} />
              ) : (
                <></>
              )}


              {LocalClassificationID === 2 && !ShowenReproduction === true && ShowOriginalAndReproduction === false ? (
                <Edition
                  GetData={AllData}
                  setShowOriginalAndReproduction={setShowOriginalAndReproduction}
                  ShowOriginalAndReproduction={ShowOriginalAndReproduction}
                />
              ) : (
                <></>
              )}

              {LocalClassificationID === 2 && !ShowenReproduction === true && ShowOriginalAndReproduction === true ? (
                <Original
                  GetData={OriginalSectionData}
                  SelectInputData={SelectInputData}
                />
              ) : (
                <></>
              )}

              {LocalClassificationID === 2 && ShowOriginalAndReproduction === true ? (
                <Reproduction
                  GetData={ReproductionSectionData}
                  SelectInputData={SelectInputData}
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
                      <Grid item className={ArtWorkFlowStyle.StickSaveBtn}>
                        <ButtonEditArtwork
                          setShowDisOrSaveLimited={setShowDisOrSaveLimited}
                          handleModal={HanldeEditArtwork}
                          GET_USER_ARTWORK_INFO={() => GET_USER_ARTWORK_INFO(ArtWorkID)}
                        />
                    </Grid>
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

              <Grid item className="w_100 mb25_m" style={{marginTop:ShowDisOrSaveLimited && width>960 ?14:0}}>
                <Grid item className={ArtWorkFlowStyle.Faseleh}>
                  <Button
                    fullWidth
                    color="secondary"
                    onClick={() => HanldeShowEditions()}
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
                      pedndingCount={AllData?.pedndingCount}
                      verifiedCount={AllData?.verifiedCount}
                      availableEditions={AllData?.availableEditions}
                      publishedCount={AllData?.publishedCount}
                      GetData={GetModalData}
                      AllData={AllData}
                      moreInfos={AllData?.moreInfos}
                      setArtWorkv1Modal={setArtWorkv1Modal}
                      ArtWorkID={ArtWorkID}
                      mintingStatus={MintingStatus}
                      addDefaultArtist={SelectInputData?.addDefaultArtist}
                      proofData={ProofData}
                    // HanldeSubmitArtwork={HanldeSubmitArtwork}
                    />
                  </Grid>
                )
              }
              {/* <Grid item>
                <Authenticity />
              </Grid> */}
              <Grid item>
                {/* <PrivacyContainer
                  Data={AllData}
                  SelectInputData={SelectInputData}
                /> */}
              </Grid>
              {/* <Grid item>
                <ArtiverseNetwrok />
              </Grid> */}
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
