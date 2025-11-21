import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Link } from "react-scroll";
import { ToastContainer, toast } from 'react-toastify';

// mrx : material ui ↓
import { Button, Grid, IconButton, Hidden, Modal } from "@material-ui/core";

// mrx : Styles ↓
import styles from "../../../styles/Home.module.css";
import artWorkStyle from "../../../styles/artworkflow.module.css";

// rmx : files  ↓
import Image from "next/image";
import arrowDown from "../../../public/images/icons/Arrow down black.svg";
import arrowUp from "../../../public/images/icons/Arrow Up.svg";
import checkCircle from "../../../public/images/icons/Check - Circle.svg";
import useWindowSize from "../../../Hooks/useWindowSize";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : context ↓
import { Context } from "../../../context/index";

// mrx : components ↓
import CommunitySetting from "../../../pages/user/community";

// mrx : api links ↓
import {
  TOGGLE_VERIFY_ACOUNT
} from "../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../pages/api/config";


export default function AboutWork({
  id_DoesntExist = 0,
  AddProfs = false,
  text = "Please add more info about your creation.  ",
  children,
  SelectInputData
}) {
  // mrx : context
  const {
    GeneralFiilled,
    // --- input states Start ----
    AddedArtistList,
    GeneralTitle,
    ProofSectionData,
    GeneralCreationyear,
    // verify Acount states
    ShowSettingUser,
    setShowSettingUser,
    HaveMedia,
    // --- input states End ----
  } = useContext(Context);
  const router = useRouter();

  // this is all about customize text and styles
  const colorBadge = false;
  const [PhysicalCertificate, setPhysicalCertificate] = useState(false);
  const [ArtiversePrivacy, setArtiversePrivacy] = useState(false);
  const [NFC, setNFC] = useState(false);
  const [Mint, setMint] = useState(false);
  const [ArrowDown, setArrowDown] = useState(false);
  const [ShowVerifyBtn, setShowVerifyBtn] = useState(true);
  const [ArtiversePrivacyBadgeSecond, setArtiversePrivacyBadgeSecond] = useState(false);

  // badge colors states ( start )
  const [ArtiversePrivacyBadge, setArtiversePrivacyBadge] = useState(false);
  // badge colors states ( end )

  // get window size << not an state >>
  const [width, heigh] = useWindowSize();

  const GET_Local_DATA = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("Adding-Art-Work") || "[]" : "[]");

  // open and close titles
  const handleOpenState = (value) => {
    if (value === "ArtiversePrivacy") {
      setArtiversePrivacy(!ArtiversePrivacy);
    } else if (value === "PhysicalCertificate") {
      setPhysicalCertificate(!PhysicalCertificate);
    } else if (value === "NFC") {
      setNFC(!NFC);
    } else if (value === "Mint") {
      setMint(!Mint);
    }
  };

  // open and close texts
  const handleOpenText = (value) => {
    if (!value) {
      return artWorkStyle.textSections_close;
    } else return "";
  };

  // checking the inputs are filled for change badge color ... ( Start )
  useEffect(() => {
    if (
      AddedArtistList?.length >= 1 &&
      GeneralTitle !== "" &&
      GeneralCreationyear !== "" &&
      HaveMedia === true
    ) {
      setArtiversePrivacyBadge(true);
    } else {
      setArtiversePrivacyBadge(false);
    }
  }, [AddedArtistList, GeneralTitle, GeneralCreationyear, HaveMedia])

  useEffect(() => {
    if (
      SelectInputData?.isUserVerified === true
    ) {
      setArtiversePrivacyBadgeSecond(true);
    } else {
      setArtiversePrivacyBadgeSecond(false);
    }
  }, [AddedArtistList, GeneralTitle, GeneralCreationyear, HaveMedia])
  // checking the inputs are filled for change badge color ... ( End )

  // handle click on verify acount btn
  // const handleVerifyAcount = () => {
  // setShowSettingUser(true);
  // Cookies.set("where-are-u-coming", "AddingArtWork");
  // router.push("/user/community");
  // }

  // mrx : change verify st ----------------------------------------------------------------------------------------------------
  const handleVerifyAcount = () => {
    if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      GetAuthUrl(TOGGLE_VERIFY_ACOUNT).then(
        (res, err) => {
          if (res && res.status === 200) {
            if (res?.data?.isSuccess) {
              toast.success("Your verified successfully");
              setShowVerifyBtn(false);
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
  // End -----------------------------------------------------------------------------------------------------------------------

  const LocalClassificationID = parseInt(Cookies.get("ClassificationID"));

  return (
    <Grid item className={artWorkStyle.wrapper_au} style={{ paddingBottom:  0 }}>
      <Grid
        item
        className={artWorkStyle.title1}
        onClick={() => width < 960 && setArrowDown(!ArrowDown)}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>About your creation</Grid>
          <Hidden mdUp >
            <Grid item className={artWorkStyle.arrowWork}>
              <Image src={ArrowDown ? arrowDown : arrowUp} />
            </Grid>
          </Hidden>
        </Grid>
      </Grid>

      {!ArrowDown && (
        <Grid item className={artWorkStyle.P_All_Items}>
          <Grid item className={artWorkStyle.info_creation}>
            {
              text
            }
            {/* {
              !ArtiversePrivacyBadge || SelectInputData?.isProofNedded !== true && text
            } */}
          </Grid>
          {id_DoesntExist !== 1 && (
            <Grid container direction="column">
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  className={artWorkStyle.P_items1}
                  onClick={() => handleOpenState("ArtiversePrivacy")}
                >
                  <Grid item className={artWorkStyle.titleItems1}>
                    <span
                      className={
                        ArtiversePrivacyBadge
                          ? artWorkStyle.badgeGreen
                          : artWorkStyle.badgeOrange
                      }
                    ></span>
                    Artiverse privacy
                  </Grid>
                  <Grid item className={artWorkStyle.Arrow}>
                    <IconButton size="small">
                      <img src={ArtiversePrivacy ? arrowUp.src : arrowDown.src} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                className={`${artWorkStyle.textSections} ${handleOpenText(
                  ArtiversePrivacy
                )}`}
              >
                {
                  LocalClassificationID === 1 || LocalClassificationID === 2 ? (
                    <>
                      The setting will be saved for all editon, you can change them
                      individually.
                    </>
                  ) : (
                    <>
                      Each artwork will have encrypted privacy options.
                    </>
                  )
                }
              </Grid>
            </Grid>
          )}
          {id_DoesntExist !== 2 && (
            <Grid container direction="column">
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  className={artWorkStyle.P_items1}
                  onClick={() => handleOpenState("PhysicalCertificate")}
                >
                  <Grid item className={artWorkStyle.titleItems1}>
                    <span
                      className={
                        ArtiversePrivacyBadge
                          ? artWorkStyle.badgeGreen
                          : artWorkStyle.badgeOrange
                      }
                    ></span>
                    Physical Certificate
                  </Grid>
                  <Grid item className={artWorkStyle.Arrow}>
                    <IconButton size="small">
                      <img src={PhysicalCertificate ? arrowUp.src : arrowDown.src} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                className={`${artWorkStyle.textSections} ${handleOpenText(
                  PhysicalCertificate
                )}`}
              >
                {
                  LocalClassificationID === 1 || LocalClassificationID === 2 ? (
                    <>
                      For each edition a physical certificate of creation & owenrship could be requested.
                    </>
                  ) : (
                    <>
                      Physical certificate of creation & owenrship could be requested.
                    </>
                  )
                }
              </Grid>
            </Grid>
          )}
          {
            id_DoesntExist !== 3 &&
            GET_Local_DATA?.SelectedTypeID === 1 &&
            SelectInputData?.collectionStatus === "Online" &&
            SelectInputData?.addDefaultArtist === true && (
              <Grid container direction="column">
                <Grid item>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    className={artWorkStyle.P_items1}
                    onClick={() => handleOpenState("NFC")}
                  >
                    <Grid item className={artWorkStyle.titleItems1}>
                      <span
                        className={
                          SelectInputData?.isUserVerified === true
                            ? artWorkStyle.badgeGreen
                            : artWorkStyle.badgeOrange
                        }
                      ></span>
                      NFC certificate
                    </Grid>
                    <Grid item className={artWorkStyle.Arrow}>
                      <IconButton size="small">
                        <Image src={NFC ? arrowUp : arrowDown} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  className={`${artWorkStyle.textSections} ${handleOpenText(
                    NFC
                  )}`}
                >
                  {
                    LocalClassificationID === 1 || LocalClassificationID === 2 ? (
                      <>
                        For each edition a genetic nfc tag could be requested.
                      </>
                    ) : (
                      <>
                        A genetic nfc tag could be requested to be embeded in the creation.
                      </>
                    )
                  }
                </Grid>
              </Grid>
            )}
          {id_DoesntExist !== 4 && SelectInputData?.collectionStatus === "Online" && (
            <Grid container direction="column">
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  className={artWorkStyle.P_items1}
                  onClick={() => handleOpenState("Mint")}
                >
                  <Grid item className={artWorkStyle.titleItems1}>
                    <span
                      className={
                        SelectInputData?.isUserVerified === true
                          ? artWorkStyle.badgeGreen
                          : artWorkStyle.badgeOrange
                      }
                    ></span>
                    Mint Info
                  </Grid>
                  <Grid item className={artWorkStyle.Arrow}>
                    <IconButton size="small">
                      <Image src={Mint ? arrowUp : arrowDown} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                className={`${artWorkStyle.textSections} ${handleOpenText(
                  Mint
                )}`}
              >
                {
                  LocalClassificationID === 1 || LocalClassificationID === 2 ? (
                    <>
                      For each peice a unique identification code will be available soon after minting.
                    </>
                  ) : (
                    <>
                      A unique identification code will be available soon after minting.
                    </>
                  )
                }
              </Grid>
            </Grid>
          )}
          {SelectInputData?.isUserVerified === false && SelectInputData?.collectionStatus !== "Offline" && ArtiversePrivacyBadge && (
            <>
              {
                ShowVerifyBtn === true ? (
                  <Grid item style={{ marginTop: "15px" }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleVerifyAcount()}
                      startIcon={<Image src={checkCircle} />}
                      className={artWorkStyle.btn_Verify}
                    >
                      <span className={styles.text__trs__none}>Verify Account</span>
                    </Button>
                  </Grid>
                ) : (
                  <></>
                )
              }
            </>
          )}
          {SelectInputData?.isUserVerified === false && SelectInputData?.collectionStatus !== "Offline" && (
            <>
              {
                ShowVerifyBtn === true ? (
                  <Grid item className={artWorkStyle.info_creation_5}>
                    Please verify your account to get &nbsp;{" "}
                    <a onClick={() => handleVerifyAcount()} className={artWorkStyle.link_a}>
                      NFC

                    </a>{" "}
                    &{" "}
                    <a onClick={() => handleVerifyAcount()} className={artWorkStyle.link_a}>
                      Tokenize info
                    </a>
                    .{" "}
                  </Grid>
                ) : (
                  <></>
                )
              }
            </>

          )}
          {/* {children && children} */}
          {ProofSectionData?.length < 1 && SelectInputData?.addDefaultArtist === false && SelectInputData?.collectionStatus !== "Offline" && (
            <Grid
              style={{ marginTop: "0px" }}
              item
              className={artWorkStyle.info_creation_4}
            >
              Also ,since you are the secondry owner, our advisor have to verify
              your artwrok.&nbsp;
              <Link to="Proof" smooth={true} spy={true} duration={1000} className={artWorkStyle.link_a}>
                Add proofs
              </Link>
            </Grid>
          )}
        </Grid>
      )}
      <Modal
        open={ShowSettingUser}
        onClose={() => setShowSettingUser(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Grid item style={{ height: "100vh", backgroundColor: "white" }}>
          <CommunitySetting whereFrom="AddArtWork" />
        </Grid>
      </Modal>
    </Grid>
  );
}
