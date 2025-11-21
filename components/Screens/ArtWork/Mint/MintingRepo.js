import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";


// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : material ui ↓
import { Button, Grid, IconButton } from "@material-ui/core";

// mrx : Styles ↓
import ArtWorkFlowStyle from "../../../../styles/artworkflow.module.css";

// mrx : context ↓
import { Context } from "../../../../context/index";

// mrx : api links ↓
import {
  PUBLISH_UNPUBLISH_MINTING,
} from "../../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../../pages/api/config";

// rmx : files  ↓

// mrx : components ↓
import MintingItem from "./MintingItem";
import MintingStatuss from "./MintingStatus";
import ArtLink from "./ArtLink";
import MintingModal from "../../../Modals/ArtWork/Minting";

export default function Minting({
  // Data from props Start --------------------------------------------------------------------------------------------
  mintingStatus,
  ArtWorkID,
  addDefaultArtist,
  artLinkData = "",
  imSingle = false,
  GetData,
  proofData,
  isUserVerified,
  setAllData,
  AllData,
  setArtWorkv1Modal,
  HanldeSubmitArtwork,
  moreInfos = []
  //  End -------------------------------------------------------------------------------------------------------------
}) {
  // genetal state Start -----------------------------------------------------------------------------------------------
  // mrx : context
  const {
    setProofSectionData,
    MintingStatus,
    setMintingStatus,
    setOpenMintingAfterModal,
    setLoadingPage,
    OpenMintingAfterModal,
  } = useContext(Context);
  //  End -------------------------------------------------------------------------------------------------------------

  // gd : states ↓
  const [modal, setModal] = useState(false);

  const modalData = typeof window !== "undefined" ? localStorage.getItem("OpenMintingAfterModal") || false : false;

  useEffect(() => {
    if (modalData === "true") {
      setModal(true);
      localStorage.setItem("OpenMintingAfterModal", false)
    }
  }, [MintingStatus])

  // gd : hanlde modal ↓
  const handleModal = () => {
    setModal(!modal);
    localStorage.setItem("OpenMintingAfterModal", false)
  }

  const [ArrayList, setArrayList] = useState([]);
  const [ButtoneType, setButtoneType] = useState(1);

  // useEffect(() => {
  //   setTitle(GetData?.title)
  // }, [])

  const HanldePublishtoDiscover = (PublishStMint) => {
    setLoadingPage(true);
    if (imSingle === true) {
      GetAuthUrl(PUBLISH_UNPUBLISH_MINTING_SINGLE(ArtWorkID, localStorage.getItem("collectionId"), PublishStMint)).then(
        (res, err) => {
          if (res && res.status === 200) {
            if (res?.data?.isSuccess) {
              toast.success(`Artwork ${PublishStMint ? "Published" : "Unpublished"} Successfully`);
              setAllData(res?.data?.data);
              setLoadingPage(false);
            } else {
              toast.error(res?.data?.message);
              setLoadingPage(false);
            }
          } else {
            toast.error("something went wrong !");
            setLoadingPage(false);
          }
        }
      );
    } else {
      GetAuthUrl(PUBLISH_UNPUBLISH_MINTING(ArtWorkID, localStorage.getItem("collectionId"), PublishStMint)).then(
        (res, err) => {
          if (res && res.status === 200) {
            if (res?.data?.isSuccess) {
              toast.success(`Artwork ${PublishStMint ? "Published" : "Unpublished"} Successfully`);
              setAllData(res?.data?.data);
              setLoadingPage(false);
            } else {
              toast.error(res?.data?.message);
              setLoadingPage(false);
            }
          } else {
            toast.error("something went wrong !");
            setLoadingPage(false);
          }
        }
      );
    }
  }

  useEffect(() => {
    setArrayList(moreInfos?.moreInfoNeed);
  }, [AllData])

  // return text of button (x is just for test) ↓
  const handleTextButton = (ButtoneType) => {
    if (ButtoneType === 2) {
      handleModal()
    } else if (ButtoneType === 3) {
      setArtWorkv1Modal(true)
    } else if (ButtoneType === 4) {
      HanldeSubmitArtwork()
    } else if (ButtoneType === 5) {
      HanldePublishtoDiscover(true)
    } else if (ButtoneType === 6) {
      // HanldeSubmitArtwork()
    } else {
      return "null"
    }
  };

  return (
    <Grid item className={ArtWorkFlowStyle.wrapper_au}>
      <Grid container justifyContent="space-between" alignItems="center" className={ArtWorkFlowStyle.title_2}>
        <Grid item >
          {AllData?.mintTitle}
        </Grid>
        <Grid item>
          {
            AllData?.mintingStatus === 4 && (
              <Button
                onClick={() => HanldePublishtoDiscover(false)}
                className={ArtWorkFlowStyle.Unpublish}
              >
                Unpublish
              </Button>
            )
          }
        </Grid>
      </Grid>

      <Grid item className={ArtWorkFlowStyle.P_All_Items}>
        <Grid container direction="column">

          {
            AllData?.list?.map((item) => (
              <MintingStatuss title={item?.title} badgeColor={item?.color} />
            ))
          }

          {
            parseInt(AllData?.mintingDescription) === 1 || AllData?.mintingDescription === 5 ? (
              <Grid item className={`${ArtWorkFlowStyle.textSections1}`}>
                To publish this work on Artiverse network & minting the information, Please verify your <span style={{ color: '#3772FF' }}>identity</span>  & add <span style={{ color: '#3772FF' }}>Proofs</span>  to your creation , to verify your work
              </Grid>
            ) : (
              <></>
            )
          }

          {
            AllData?.mintingDescription === 0 && (
              <Grid item className={`${ArtWorkFlowStyle.textSections1}`}>
                To publish this work on Artiverse network & minting the information,
                please verify your <span style={{ color: '#3772FF' }}>identity</span> & build your <span style={{ color: '#3772FF' }}>creator CV</span>, to verify your
                works.
              </Grid>
            )
          }

          {
            AllData?.mintingDescription === 2 && (
              <Grid item className={`${ArtWorkFlowStyle.textSections1}`}>
                Your artwork is Minting, please be patient.
              </Grid>
            )
          }

          {
            AllData?.mintingDescription === 3 && (
              <Grid item className={`${ArtWorkFlowStyle.textSections1}`}>
                Your artwork is Minting, please be patient.
              </Grid>
            )
          }

          {
            AllData?.mintingDescription === 4 && (
              <Grid item className={`${ArtWorkFlowStyle.textSections1}`}>
                Please provide more info to verify your artwork.
              </Grid>
            )
          }



          {
            AllData?.buttonOpration === 4 ? (
              ArrayList && ArrayList?.map((item) => (
                <Grid item className={ArtWorkFlowStyle.mb_10}>
                  <Grid container direction="column" spacing={1}>
                    <MintingItem text={item?.name} checked={!item?.isNeeded} />
                  </Grid>
                </Grid>
              ))
            ) : (
              <></>
            )
          }
          {
            AllData?.buttonOpration === 4 ? (
              moreInfos?.needProof === true && moreInfos?.needProof === true ? (
                <Grid item className={ArtWorkFlowStyle.mb_10}>
                  <Grid container direction="column" spacing={1}>
                    <MintingItem text="Proof" checked={false} />
                  </Grid>
                </Grid>
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          }

        </Grid>

        {/* {
          AllData?.artLink !== null && AllData?.artLink !== "" ? (
            <ArtLink value={ArtLinkT} label='ArtLink' />
          ) : (
            <></>
          )
        } */}

        <Grid item>
          {
            AllData?.showButton === true ?
              ButtoneType !== 6 && (
                <Button
                  style={{ marginTop: "20px" }}
                  fullWidth
                  disabled={!AllData?.enableButton}
                  className={
                    !AllData?.enableButton
                      ? ArtWorkFlowStyle.btnDisable
                      : ArtWorkFlowStyle.btnActive11
                  }
                  variant={AllData?.enableButton ? "contained" : "text"}
                  color={AllData?.enableButton ? "secondary" : "default"}
                  onClick={() => handleTextButton(AllData?.buttonOpration)}
                >
                  {AllData?.buttonText}
                </Button>
              )
              : (
                <></>
              )
          }
        </Grid>
      </Grid>
      <MintingModal
        imSingle={imSingle}
        ArtWorkID={ArtWorkID}
        AllData={AllData}
        setAllData={setAllData}
        openModal={modal}
        handleModal={handleModal}
        GetData={GetData}
      />
    </Grid >
  );
}
