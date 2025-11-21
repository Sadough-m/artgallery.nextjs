import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/router";

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
import ButtonEditArtwork from "../../../components/Screens/ArtWork/ButtonEditArtwork";
import PrimaryMenu from "../../../components/Screens/ArtWork/PrimaryMenu";
import Root from "../../../components/Screens/ArtWork/MainGET/Root";
import Media from "../../../components/Screens/ArtWork/MainGET/Media";
import Measurment from "../../../components/Screens/ArtWork/MainGET/Measurment";
import Proof from "../../../components/Screens/ArtWork/MainGET/Proof";
import Availibility from "../../../components/Screens/ArtWork/MainGET/Availibility";
import Reproduction from "../../../components/Screens/ArtWork/MainGET/Reproduction";
import Original from "../../../components/Screens/ArtWork/MainGET/Original";
import UserNavBar from "../../../components/Screens/ArtWork/UserNavBar";
import arrowLeft from "../../../public/images/icons/Arrow left -.svg";
import ClassificationSelect from "../../../components/Forms/ClassificationSelect";
import Minting from "../../../components/Screens/ArtWork/Mint/Minting";
import Authenticity from "../../../components/Screens/ArtWork/Authenticity";
import PrivacyContainer from "../../../components/Screens/ArtWork/PrivacyContainer";
import ArtiverseNetwrok from "../../../components/Screens/ArtWork/ArtiverseNetwrok";
import IconBar from "../../../components/Screens/ArtWork/IconBar";
import LoadingSpiner from "../../../components/common/loadingSpiner";
import ArtWorkV1 from "../../../components/Modals/ArtWork/ArtWorkV1";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import {
  GET_ADD_WORK_DATA,
  EDIT_UNIQUE_ARTWORK,
  CHECK_MINT_STATUS,
  GET_ALL_ARTWORK_UNIQUE_BY_ID,
  SUBMIT_MORE_INFO_UNIQUE_ARTWORK,
} from "../../api/index";

// mrx : api ↓
import { PostUrl, PostAuthUrl, GetUrl, GetAuthUrl } from "../../api/config";

// mrx : context ↓
import { Context } from "../../../context/index";
import useWindowSize from "../../../Hooks/useWindowSize";

export default function CreatArtwork() {
  const router = useRouter();

  // genetal state Start -----------------------------------------------------------------------------------------------
  // mrx : context
  const {
    setGeneralTitle,
    setGeneralCreationyear,
    GeneralCreationyear,
    setGeneralDescription,
    setAddedArtistList,
    GeneralDescription,
    LoadingPage,
    setLoadingPage,
    ShowenReproduction,
    setProofSectionData,
    MintingStatus,
    setMintingStatus,
    ShowDisOrSaveLimited,
    setShowDisOrSaveLimited,
  } = useContext(Context);
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : Call the artwork info after get id from router Start -------------------------------------------------------
  useEffect(() => {
    const { ID } = router.query;
    GET_USER_ARTWORK_INFO(ID);
  }, [router]);
  //  End -------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    GetAllInputData();
  }, []);

  // mrx : States Start -----------------------------------------------------------------------------------------------
  const [ArtWorkv1Modal, setArtWorkv1Modal] = useState(false);
  const [UploadingFileMedia, setUploadingFileMedia] = useState([]);

  const [AllData, setAllData] = useState([]);
  const [ModalData, setModalData] = useState([]);
  const [GetModalData, setGetModalData] = useState([]);

  // ------------------ list of select input
  const [SelectInputData, setSelectInputData] = useState([]);
  const [classificationSelect, setClassificationSelect] =
    useState("Unique - Original");
  const [original, setOriginal] = useState(false);
  const [ArtWorkID, setArtWorkID] = useState("");

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

  // ----- Availibility Data ( States )
  const [StatuseID, setStatuseID] = useState(0);
  const [AvailibilityID, setAvailibilityID] = useState(0);
  // ----- Availibility Data ( End )

  // ---------------------------------- End
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : get collection id from localstorage ------------------------------------------------------------------------
  const LocalClassificationID = parseInt(Cookies.get("ClassificationID"));
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : get modal data when it was true ----------------------------------------------------------------------------
  const getModalData = (ArtWorkID) => {
    if (ArtWorkID !== undefined) {
      GetAuthUrl(
        CHECK_MINT_STATUS(ArtWorkID, localStorage.getItem("collectionId"))
      ).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setModalData(res.data.data);
          } else {
          }
        } else {
          toast.error("something went wrong !");
        }
      });
    }
  };
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
    getModalData(ID);
    setArtWorkID(ID);
    if (ID !== undefined) {
      GetAuthUrl(
        GET_ALL_ARTWORK_UNIQUE_BY_ID(ID, localStorage.getItem("collectionId"))
      ).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            handleSetData(res.data.data);
            setMintingStatus(res.data.data?.mintingStatus);

          } else {
          }
        } else {
          toast.error("something went wrong !");
        }
      });
    }
  };
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : setting forms values Start ---------------------------------------------------------------------------------
  const handleSetData = (Data) => {
    setAvailibilityID(parseInt(Data?.availabilityType));
    setStatuseID(parseInt(Data?.availabilityStatus));
    setAllData(Data);
    setGeneralTitle(Data?.title);
    setGeneralCreationyear(Data?.creationYear);
    setGeneralDescription(Data?.description);
    setAddedArtistList(
      Data?.artists?.map((item) => ({
        id: item?.id,
        name: item?.artistName,
        image: item?.displayImage,
      }))
    );
    localStorage.setItem(
      "Add-ArtWork-Measurment",
      JSON.stringify(Data?.artworkMesurment)
    );
    localStorage.setItem("ArtWork-Proof", JSON.stringify(Data?.artworkProofs));
    setProofSectionData(Data?.artworkProofs);
    setMesurmentData(Data?.artworkMesurment ? Data?.artworkMesurment : []);
    setGetModalData(
      Data?.mintingInfo?.title !== null ? Data?.mintingInfo : null
    );
    const medias = JSON.parse(Data?.mediaSort);
    setUploadingFileMedia(
      medias?.map((item) => ({
        fullPath: item?.FileUrl,
        fileSize: item?.ImageSize,
        caption: item?.Caption,
        type: item?.Type,
        id: item?.Id,
        classificationType: 0,
        fileExtention: item?.FileExtention,
      }))
    );
    setMintingStatus(Data?.mintingStatus);
  };

  //  End -------------------------------------------------------------------------------------------------------------

  // mrx :some data from local storage for adding artwork Start -------------------------------------------------------
  const MediaData = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("UploadingFileMedia") || "[]"
      : "[]"
  );
  const Artists = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Add-Artwork-ArtistList") || "[]"
      : "[]"
  );
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : Unique data collected for add Start ------------------------------------------------------------------------
  const UniqueData = {
    id: ArtWorkID,
    artists: ArtistListData?.map((item) => item?.id),
    title: GeneralData?.title,
    description: GeneralDescription,
    creationYear: GeneralCreationyear,
    mediumType: parseInt(RootData?.mediumType),
    styleId: RootData?.styleMedium,
    subMediumId: RootData?.subMedium,
    haveDigitalOrPhysicalVersion: RootData?.checkBoxValue
      ? RootData?.checkBoxValue
      : false,
    artworkMedias: AllMediaData?.filter(
      (item) => item?.classificationType === LocalClassificationID
    )?.map((item) => ({
      fileUrl: item?.fullPath,
      caption: item?.caption,
      type: item?.type,
      id: item?.id,
      imageSize: item?.fileSize,
      fileExtention: item?.fileExtention,
    })),
    mediaSort: JSON.stringify(
      AllMediaData?.filter(
        (item) => item?.classificationType === LocalClassificationID
      )?.map((item) => ({
        fileUrl: item?.fullPath,
        caption: item?.caption,
        type: item?.type,
        id: item?.id,
        imageSize: item?.fileSize,
        fileExtention: item?.fileExtention,
      }))
    ),
    artworkMesurments: MesurmentData ? MesurmentData : {},
    artworkProofs: ProofData,
    availabilityType: parseInt(
      typeof window !== "undefined"
        ? localStorage.getItem("Add-Artwork-AvailibilityID") || 0
        : 0
    ),
    availabilityStatus: parseInt(
      typeof window !== "undefined"
        ? localStorage.getItem("Add-Artwork-StatuseID") || 0
        : 0
    ),
    consignmentType: 0,
    purchaseOrConsignmentUnitId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    purchaseOrConsignmentPrice: 0,
    purchaseFromOrConsignmentTo: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  };
  //  End -------------------------------------------------------------------------------------------------------------

  // handle Edit artwork with multi type Start -----------------------------------------------------------------------
  const HanldeEditArtwork = () => {
    setLoadingPage(true);
    PostAuthUrl(
      EDIT_UNIQUE_ARTWORK(localStorage.getItem("collectionId")),
      handleGetDataByClassificationID()
    ).then(async (res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          try {
            await toast.success("Artwork updated successfully");
            setLoadingPage(false);
            setShowDisOrSaveLimited(false);
            handleSetData(res?.data?.data);
          } catch (error) {
            console.error(error);
            setLoadingPage(false);
          }
        } else {
          toast.error(res?.data?.message);
          setLoadingPage(false);
        }
      } else {
        toast.error("something went wrong !");
        setLoadingPage(false);
      }
    });
  };

  const HanldeSubmitArtwork = () => {
    PostAuthUrl(
      SUBMIT_MORE_INFO_UNIQUE_ARTWORK(localStorage.getItem("collectionId")),
      handleGetDataByClassificationID()
    ).then(async (res, err) => {
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
    });
  };
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : get ClassificationID from local storage Start --------------------------------------------------------------
  const handleGetDataByClassificationID = () => {
    if (LocalClassificationID === 0) {
      return UniqueData;
    } else if (LocalClassificationID === 1) {
      return UniqueData;
    } else if (LocalClassificationID === 2) {
      return UniqueData;
    } else {
      return null;
    }
  };
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : Common Start -----------------------------------------------------------------------------------------------
  const handleModal = () => {
    setArtWorkv1Modal(!ArtWorkv1Modal);
  };
  //  End -------------------------------------------------------------------------------------------------------------

  const [width, height] = useWindowSize()

  return (
    <>
      {/* <Hidden smDown>
        <HeaderLanding />
      </Hidden> */}

      <Grid
        container
        justifyContent="center"
        className={ArtWorkFlowStyle.WrapperPages}
      >
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
                      onClick={() => {
                        router.push("/artwork");
                        setShowDisOrSaveLimited(false);
                      }}
                      size="small"
                      style={{ marginRight: "10px" }}
                    >
                      <Image src={arrowLeft} />
                    </IconButton>
                    Artwork ‘{AllData?.title}’
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
                mintingStatus={MintingStatus}
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
                mintingStatus={MintingStatus}
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
                mintingStatus={MintingStatus}
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
                mintingStatus={MintingStatus}
                setAllMediaData={setAllMediaData}
                UploadingFileMedia={UploadingFileMedia}
                setUploadingFileMedia={setUploadingFileMedia}
              />
            ) : (
              <></>
            )}

            {LocalClassificationID === 0 ? (
              <Measurment
                mintingStatus={MintingStatus}
                setMesurmentData={setMesurmentData}
                MesurmentData={MesurmentData}
                SelectInputData={SelectInputData}
              />
            ) : (
              <></>
            )}

            {LocalClassificationID === 0 ? (
              <Proof
                mintingStatus={MintingStatus}
                setProofData={setProofData}
                SelectInputData={SelectInputData}
              />
            ) : (
              <></>
            )}

            {LocalClassificationID === 0 ? (
              <Availibility
                mintingStatus={MintingStatus}
                StatuseID={StatuseID}
                setStatuseID={setStatuseID}
                AvailibilityID={AvailibilityID}
                setAvailibilityID={setAvailibilityID}
                SelectInputData={SelectInputData}
                Data={AllData}
              />
            ) : (
              <></>
            )}

            {LocalClassificationID === 1 ? (
              <Edition
                SelectInputData={SelectInputData}
                mintingStatus={MintingStatus}
              />
            ) : (
              <></>
            )}

            {LocalClassificationID === 2 && !ShowenReproduction === true ? (
              <Original
                mintingStatus={MintingStatus}
                SelectInputData={SelectInputData}
              />
            ) : (
              <></>
            )}

            {LocalClassificationID === 2 ? (
              <Reproduction
                mintingStatus={MintingStatus}
                SelectInputData={SelectInputData}
              />
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
        {/* ------------------------------ mrx: Main Components End ---------------------------------*/}

        {/* ------------------------------ mrx: Right Section Start ---------------------------------*/}
        <Grid item className={ArtWorkFlowStyle.RightSide}>
          <Grid
            container
            direction="column"
            className={ArtWorkFlowStyle.C_RightSide}
          >
            {ShowDisOrSaveLimited ? (
              <Hidden smDown>
                <Grid item className={ArtWorkFlowStyle.StickSaveBtn}>
                  <ButtonEditArtwork
                    setShowDisOrSaveLimited={setShowDisOrSaveLimited}
                    handleModal={HanldeEditArtwork}
                    GET_USER_ARTWORK_INFO={() =>
                      GET_USER_ARTWORK_INFO(ArtWorkID)
                    }
                  />
                </Grid>
              </Hidden>
            ) : (
              <Grid item className={ArtWorkFlowStyle.Faseleh2}>
                <IconBar
                  ArtWorkID={ArtWorkID}
                  IsMain={true}
                  mintingStatus={MintingStatus}
                  Title={AllData?.title}
                />
              </Grid>
            )}

            {/* <Grid item className="w_100">
                <Button
                  onClick={() => HanldeEditArtwork()}
                  fullWidth
                  color="secondary"
                  variant="contained"
                  className={ArtWorkFlowStyle.transferBTN}
                >
                  Transfer
                </Button>
              </Grid> */}
            <Grid item className={ShowDisOrSaveLimited && width > 960 ? ArtWorkFlowStyle.Faseleh : ArtWorkFlowStyle.Faseleh_4}>
              <AboutWork SelectInputData={SelectInputData} />
            </Grid>

            {AllData?.canMint &&
              SelectInputData?.collectionStatus === "Online" && (
                <Grid item className="mt30">
                  <Minting
                    GetData={GetModalData}
                    AllData={AllData}
                    setAllData={setAllData}
                    moreInfos={AllData?.moreInfos}
                    setArtWorkv1Modal={setArtWorkv1Modal}
                    ArtWorkID={ArtWorkID}
                    mintingStatus={MintingStatus}
                    artLinkData={AllData?.artLink}
                    addDefaultArtist={SelectInputData?.addDefaultArtist}
                    proofData={ProofData}
                    isUserVerified={SelectInputData?.isUserVerified}
                    HanldeSubmitArtwork={HanldeSubmitArtwork}
                  />
                </Grid>
              )}

            {/* <Grid item>
                <Authenticity />
              </Grid> */}
            <Grid item className="mt30">
              <PrivacyContainer
                Data={AllData}
                SelectInputData={SelectInputData}
              />
            </Grid>
            {
              parseInt(AllData?.mintingStatus) === 4 ? (
                <ArtiverseNetwrok
                  ArtWorkID={ArtWorkID}
                  mintingStatus={MintingStatus}
                />
              ) : (
                <></>
              )
            }

            {/* <Grid item>
                <ArtiverseNetwrok />
              </Grid> */}
          </Grid>
        </Grid>
        {/* ------------------------------ mrx: Right Section End ---------------------------------*/}
      </Grid>
      <ArtWorkV1
        Data={ModalData}
        Minting={true}
        openModal={ArtWorkv1Modal}
        handleModal={handleModal}
      />
      <LoadingSpiner display={LoadingPage} />
      {/* <Minting  /> */}
    </>
  );
}
