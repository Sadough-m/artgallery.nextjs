import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Joi from "joi";
import { uuid } from "uuidv4";
import { toast } from "react-toastify";

// Matrial
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import {
  IconButton,
  Button,
  Container,
  Grid,
  Fade,
  Modal,
  Hidden,
} from "@material-ui/core";

// mrx : Styles ↓
import ArtWorkStyle from "../../../styles/artworkflow.module.css";

// rmx : files  ↓
import closeIcon from "../../../public/images/icons/Close artwork.svg";
import starBlue from "../../../public/images/icons/start blue.svg";
import arrowLeft from "../../../public/images/icons/Arrow left -.svg";

// Component
import SingleFile from "../../Screens/ArtWork/AddFile/SingleFile";
import InputForm from "../../Forms/InputForm";
import TextArea from "../../Forms/TextArea";
import useWindowSize from "../../../Hooks/useWindowSize";
import MetaMask from "../../../components/Screens/UserSettings/Connect/MetaMask";

// mrx : api links ↓
import {
  SUBMIT_UNIQUE_MINTING,
  DRAFT_UNIQUE_MINTING,
  SUBMIT_LIM_REPO_DRAFT,
  SUBMIT_LIM_REPO_MINTING,
  SUBMIT_LIM_REPO_MINTING_SINGLE
} from "../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../pages/api/config";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : context ↓
import { Context } from "../../../context/index";

//style of material
const theme = createTheme({
  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
  palette: {
    primary: {
      main: "#3772FF",
    },
    secondary: {
      main: "#242328",
    },
    tertiary: {
      main: "#F7F8FA",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
      },
    },
  },
  typography: {
    fontFamily: "Poppins",
    color: "#242328",
  },
  shape: {
    borderRadius: 8,
  },
});

export default function MintingModal({
  ArtWorkID,
  openModal = true,
  Editions,
  setAllData,
  handleModal,
  AllData,
  GetData,
  imSingle = false,
}) {
  // mrx : context
  const { setUserAddress, userAddress, MintingStatus, setLoadingPage, setMintingStatus } =
    useContext(Context);
  //  End -------------------------------------------------------------------------------------------------------------

  // recognize size of page ----------------------------------------------------------------------------------------------
  const [width, height] = useWindowSize();
  // End -----------------------------------------------------------------------------------------------------------------

  // get editions from localStorage --------------------------------------------------------------------------------------
  const GET_ADDED_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("ArtWork-Editions") || "[]"
      : "[]"
  );
  // End -----------------------------------------------------------------------------------------------------------------

  // mrx : get collection id from localstorage ---------------------------------------------------------------------------
  const LocalClassificationID = parseInt(Cookies.get("ClassificationID"));
  // End -----------------------------------------------------------------------------------------------------------------

  // States Start --------------------------------------------------------------------------------------------------------
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Medias, setMedias] = useState([]);
  const [CheckRequired, setCheckRequired] = useState(false);
  const [selectButton, setSelectButton] = useState(0);
  const [SameMedia, setSameMedia] = useState(false);
  const [uploadingInputs, setuploadingInputs] = useState(false);
  // End -----------------------------------------------------------------------------------------------------------------

  // useEffect(() => {
  //   // setting values
  //   if (LocalClassificationID === 1 || LocalClassificationID === 1) {
  //     setTitle(GET_MINTE_DATA?.filter((item) => item?.editionNumber === selectButton)?.map((item) => item?.title)[0]);
  //     setDescription(GET_MINTE_DATA?.filter((item) => item?.editionNumber === selectButton)?.map((item) => item?.description)[0]);
  //   }
  // }, [selectButton])

  // get data and set theme from props -----------------------------------------------------------------------------------
  useEffect(() => {
    if (imSingle === true) {
      if (GetData && GetData[0]?.title !== null) {
        setTitle(GetData[0]?.title);
        setDescription(GetData[0]?.description);
        if (LocalClassificationID === 1) {
          setMedias([
            {
              ClassificationID: 0,
              editionNumber: GetData[0]?.editionNumber,
              title: GetData[0]?.title,
              description: GetData[0]?.description,
              medias: {
                fileExtention: GetData[0]?.fileExtention,
                fileSize: GetData[0]?.imageSize,
                fullPath: GetData[0]?.fileUrl,
                mintUrl: GetData[0]?.mitUrl,
                type: GetData[0]?.type,
              },
            },
          ]);
        } else {
          setMedias([
            {
              ClassificationID: 0,
              editionNumber: 0,
              title: GetData[0]?.title,
              description: GetData[0]?.description,
              medias: {
                fileExtention: GetData[0]?.fileExtention,
                fileSize: GetData[0]?.imageSize,
                fullPath: GetData[0]?.fileUrl,
                mintUrl: GetData[0]?.mitUrl,
                type: GetData[0]?.type,
              },
            },
          ]);
        }
        setSelectButton(0);
      }
    } else {
      if (LocalClassificationID === 0) {
        // unique -----------------------------------------------------------------------------------
        if (GetData !== null) {
          setTitle(GetData?.title);
          setDescription(GetData?.description && GetData?.description[0]);
          setMedias([
            {
              ClassificationID: 0,
              editionNumber: 0,
              title: GetData?.title,
              description: GetData?.description,
              medias: {
                fileExtention: GetData?.fileExtention,
                fileSize: GetData?.imageSize,
                fullPath: GetData?.fileUrl,
                mintUrl: GetData?.mitUrl,
                type: GetData?.type,
              },
            },
          ]);
          setSelectButton(0);
        }
        // End -----------------------------------------------------------------------------------
      } else if (LocalClassificationID === 2) {
        // Reproducation -------------------------------------------------------------------------------
        if (GetData !== null) {
          setSelectButton(1);
          setMedias(
            GetData?.map((item) => ({
              ClassificationID: 2,
              description: item?.description,
              editionID: item?.editionId,
              editionNumber: item?.editionNumber,
              sameMedia: false,
              title: item?.title,
              medias: {
                fileExtention: item?.fileExtention,
                fileSize: item?.imageSize,
                fullPath: item?.fileUrl,
                mintUrl: item?.mitUrl,
                type: item?.type,
              },
            }))
          );
        }
        // End -----------------------------------------------------------------------------------
      } else if (LocalClassificationID === 1) {
        // Limited -------------------------------------------------------------------------
        if (GetData !== null) {
          setSelectButton(GetData && GetData[0]?.editionNumber);
          setMedias(
            GetData?.map((item) => ({
              ClassificationID: 1,
              description: item?.description,
              editionID: item?.editionId,
              editionNumber: item?.editionNumber,
              sameMedia: false,
              title: item?.title,
              medias: {
                fileExtention: item.fileExtention,
                fileSize: item?.imageSize,
                fullPath: item?.fileUrl,
                mintUrl: item?.mitUrl,
                type: item?.type,
              },
            }))
          );
        }
      }
      // End -----------------------------------------------------------------------------------
    }
  }, [GetData]);
  // End -----------------------------------------------------------------------------------------------------------------

  // mrx : set media to localstorage when media state updated ------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem(
      "Minting-Data",
      Medias ? JSON.stringify(Medias) : "[]"
    );
  }, [Medias]);
  // End -----------------------------------------------------------------------------------------------------------------

  // mrx : set data value or fields if there was no get data ( Start ) ---------------------------------------------------
  useEffect(() => {
    if (imSingle === true) {
      if (GetData && GetData[0]?.title === null) {
        setSelectButton(0);
        setMedias([
          {
            ClassificationID: 0,
            sameMedia: false,
            editionNumber: GetData[0]?.editionNumber,
            id: uuid(),
            title: "",
            description: "",
            medias: [],
          },
        ]);
      }
    } else {
      if (LocalClassificationID === 0) {
        // Reproducation -------------------------------------------------------------------------
        if (GetData === null) {
          setSelectButton(0);
          setMedias([
            {
              ClassificationID: 0,
              sameMedia: false,
              editionNumber: 0,
              id: uuid(),
              title: "",
              description: "",
              medias: [],
            },
          ]);
        }
        // End -----------------------------------------------------------------------------------
      } else if (LocalClassificationID === 1) {
        // Limited -------------------------------------------------------------------------------
        if (GetData === null) {
          setMedias(
            GET_ADDED_DATA?.map((item, index) => ({
              ClassificationID: 1,
              sameMedia: false,
              editionNumber: item?.editionNumber,
              editionID: item?.editionId,
              id: uuid(),
              title: "",
              description: "",
              medias: [],
            }))
          );
        }
        // End -----------------------------------------------------------------------------------
      } else if (LocalClassificationID === 2) {
        // Reproducation -------------------------------------------------------------------------
        if (GetData === null) {
          setSelectButton(1);
          setMedias(
            AllData?.editions?.map((item, index) => ({
              ClassificationID: 2,
              sameMedia: false,
              editionNumber: item?.editionNumber,
              editionID: item?.editionId,
              id: uuid(),
              title: "",
              description: "",
              medias: [],
            }))
          );
        }
        // End -----------------------------------------------------------------------------------
      }
    }
  }, [GetData]);
  // End -----------------------------------------------------------------------------------------------------------------

  // mrx : set title and description when select button updated ----------------------------------------------------------------
  useEffect(() => {
    setTitle(
      Medias?.filter(
        (item) => item?.editionNumber === parseInt(selectButton)
      )?.map((item) => item?.title)[0]
    );
    setDescription(
      Medias?.filter(
        (item) => item?.editionNumber === parseInt(selectButton)
      )?.map((item) => item?.description)[0]
    );
  }, [selectButton]);

  // mrx : chaneg title when state update --------------------------------------------------------------------------------------
  useEffect(() => {
    if (Title !== "") {
      changeTitle();
    }
  }, [Title]);
  // mrx : change title when state update ---------------------------------
  const changeTitle = () => {
    setMedias(
      Medias &&
      Medias?.map((Item) => {
        if (Item?.editionNumber === parseInt(selectButton)) {
          return { ...Item, title: Title };
        }
        return Item;
      })
    );
  };
  // End ------------------------------------------------------------------
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : chaneg description when state update --------------------------------------------------------------------------------
  useEffect(() => {
    if (Description !== "") {
      changeDescription();
    }
  }, [Description]);

  // mrx : change title when state update ---------------------------------
  const changeDescription = () => {
    if (parseInt(Cookies.get("Limited-ID")) === 0) {
      setMedias(
        Medias &&
        Medias?.map((Item) => {
          return { ...Item, description: Description };
        })
      );
    } else {
      setMedias(
        Medias &&
        Medias?.map((Item) => {
          if (Item?.editionNumber === parseInt(selectButton)) {
            return { ...Item, description: Description };
          }
          return Item;
        })
      );
    }
  };
  // End ------------------------------------------------------------------
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : chaneg checkbox when state update -----------------------------------------------------------------------------------
  const handleSetMain = () => {
    setSameMedia(SameMedia);
    if (SameMedia === true) {
      if (LocalClassificationID === 1) {
        setTitle(GetData[0]?.title);
        setDescription(GetData[0]?.description);
        // mrx : if the classification ID was === to limited set as dynamic edition number ---------------------------------------
        setMedias(
          Medias &&
          Medias?.map((Item) => {
            return {
              ...Item,
              medias: [],
              sameMedia: true,
              title: "",
              description: "",
            };
          })
        );
        setTitle("");
        setDescription("");
        // End -----------------------------------------------------------------------------------------------------------------------
      } else {
        setTitle("");
        setDescription("");
        // mrx : if the classification ID was not === to limited set as stactic zero ( original ) ---------------------------------------
        setMedias(
          Medias &&
          Medias?.map((Item) => {
            return {
              ...Item,
              medias: [],
              sameMedia: true,
              title: "",
              description: "",
            };
          })
        );
        // End -----------------------------------------------------------------------------------------------------------------------
      }
    } else {
      if (LocalClassificationID === 1) {
        // mrx : if the classification ID was === to limited set as dynamic edition number ---------------------------------------
        setMedias(
          Medias &&
          Medias?.map((Item) => {
            return {
              ...Item,
              sameMedia: false,
            };
          })
        );
        // End -----------------------------------------------------------------------------------------------------------------------
      } else {
        // mrx : if the classification ID was not === to limited set as stactic zero ( original ) ---------------------------------------
        setMedias(
          Medias &&
          Medias?.map((Item) => {
            return {
              ...Item,
              sameMedia: false,
            };
          })
        );
        // End -----------------------------------------------------------------------------------------------------------------------
      }
    }

  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : submit the minting foem  --------------------------------------------------------------------------------------------
  const handleSubmit = () => {
    if (Medias?.[0]?.title === "" || Medias?.[0]?.description === "") {
      toast.error("Please fill the required values");
    } else {
      if (imSingle === true) {
        handleSubmitUniqueMint();
      } else {
        if (LocalClassificationID === 0) {
          handleSubmitUniqueMint();
        } else if (LocalClassificationID === 1 || LocalClassificationID === 2) {
          handleSubmitRepoLimMint();
        }
      }
    }
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : Draf the minting foem  ----------------------------------------------------------------------------------------------
  const handleDraft = () => {
    if (Medias?.[0]?.title === "" || Medias?.[0]?.description === "") {
      toast.error("Please fill the required values");
    } else {
      if (imSingle === true) {
        handleDraftUniqueMint();
      } else {
        if (LocalClassificationID === 0) {
          handleDraftUniqueMint();
        } else if (LocalClassificationID === 1 || LocalClassificationID === 2) {
          handleDraftRepoLimMint();
        }
      }
    }
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : submit unique mint --------------------------------------------------------------------------------------------------
  const handleSubmitUniqueMint = () => {
    setLoadingPage(true);
    if (userAddress?.length < 1) {
      toast.info("MetaMask is not connected");
      setLoadingPage(false);
    } else {
      if (imSingle === true) {
        PostAuthUrl(SUBMIT_LIM_REPO_MINTING_SINGLE(localStorage.getItem("collectionId")), {
          title: Medias?.[0]?.title,
          description: Medias?.[0]?.description,
          type: Medias?.[0]?.medias?.type,
          fileUrl: Medias?.[0]?.medias?.fullPath,
          mitUrl: Medias?.[0]?.medias?.mintUrl,
          imageSize: Medias?.[0]?.medias?.fileSize,
          fileExtention: Medias?.[0]?.medias?.fileExtention,
          editionId: ArtWorkID,
          isMetaConnected: true,
          metaAddress: userAddress,
        }).then((res, err) => {
          if (res && res.status === 200) {
            if (res?.data?.isSuccess) {
              toast.success(res?.data?.message);
              setLoadingPage(false);
              handleModal();
              setAllData(res?.data?.data)
              setMintingStatus(parseInt(res?.data?.data?.mintingStatus));
            } else {
              toast.error(res?.data?.message);
              setLoadingPage(false);
            }
          } else {
            toast.error("something went wrong !");
            setLoadingPage(false);
          }
        });
      } else {
        PostAuthUrl(SUBMIT_UNIQUE_MINTING(localStorage.getItem("collectionId")), {
          title: Medias?.[0]?.title,
          description: Medias?.[0]?.description,
          type: Medias?.[0]?.medias?.type,
          fileUrl: Medias?.[0]?.medias?.fullPath,
          mitUrl: Medias?.[0]?.medias?.mintUrl,
          imageSize: Medias?.[0]?.medias?.fileSize,
          fileExtention: Medias?.[0]?.medias?.fileExtention,
          editionId: ArtWorkID,
          isMetaConnected: true,
          metaAddress: userAddress,
        }).then((res, err) => {
          if (res && res.status === 200) {
            if (res?.data?.isSuccess) {
              toast.success(res?.data?.message);
              handleModal();
              setAllData(res?.data?.data)
              setMintingStatus(parseInt(res?.data?.data?.mintingStatus));
              setLoadingPage(false);
            } else {
              toast.error(res?.data?.message);
              setLoadingPage(false);
            }
          } else {
            toast.error("something went wrong !");
            setLoadingPage(false);
          }
        });
      }
    }
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : submit unique mint --------------------------------------------------------------------------------------------------
  const handleDraftUniqueMint = () => {
    setLoadingPage(true);
    PostAuthUrl(DRAFT_UNIQUE_MINTING(localStorage.getItem("collectionId")), {
      title: Medias?.[0]?.title,
      description: Medias?.[0]?.description,
      type: Medias?.[0]?.medias?.type,
      fileUrl: Medias?.[0]?.medias?.fullPath,
      mitUrl: Medias?.[0]?.medias?.mintUrl,
      imageSize: Medias?.[0]?.medias?.fileSize,
      fileExtention: Medias?.[0]?.medias?.fileExtention,
      editionId: ArtWorkID,
      isMetaConnected: true,
      metaAddress: userAddress,
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          toast.success(res?.data?.message);
          handleModal();
          setMintingStatus(parseInt(res?.data?.data?.mintingStatus));
          setLoadingPage(false);
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
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : submit unique mint --------------------------------------------------------------------------------------------------
  const handleSubmitRepoLimMint = () => {
    setLoadingPage(true);
    if (userAddress?.length < 1) {
      toast.info("MetaMask is not connected");
      setLoadingPage(false);
    } else {
      PostAuthUrl(
        SUBMIT_LIM_REPO_MINTING(localStorage.getItem("collectionId")),
        {
          isMetaConnected: true,
          metaAddress: userAddress,
          isSameAll: Medias[0]?.sameMedia,
          artworkId: ArtWorkID,
          editions: Medias?.map((item) => ({
            title: item?.title,
            description: item?.description,
            type: item?.medias?.type,
            fileUrl: item?.medias?.fullPath,
            mitUrl: item?.medias?.mintUrl,
            imageSize: item?.medias?.fileSize,
            fileExtention: item?.medias?.fileExtention,
            editionId: item?.editionID,
          })),
        }
      ).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            toast.success(res?.data?.message);
            handleModal();
            setMintingStatus(parseInt(res?.data?.data?.mintingStatus));
            location.reload();
            setLoadingPage(false);
          } else {
            toast.error(res?.data?.message);
            setLoadingPage(false);
          }
        } else {
          toast.error("something went wrong !");
          setLoadingPage(false);
        }
      });
    }
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : submit unique mint --------------------------------------------------------------------------------------------------
  const handleDraftRepoLimMint = () => {
    setLoadingPage(true);
    PostAuthUrl(SUBMIT_LIM_REPO_DRAFT(localStorage.getItem("collectionId")), {
      isMetaConnected: true,
      metaAddress: userAddress,
      isSameAll: Medias[0]?.sameMedia,
      artworkId: ArtWorkID,
      editions: Medias?.map((item) => ({
        title: item?.title,
        description: item?.description,
        type: item?.medias?.type,
        fileUrl: item?.medias?.fullPath,
        mitUrl: item?.medias?.mintUrl,
        imageSize: item?.medias?.fileSize,
        fileExtention: item?.medias?.fileExtention,
        editionId: item?.editionID,
      })),
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          toast.success(res?.data?.message);
          // location.reload();
          handleModal();
          setMintingStatus(parseInt(res?.data?.data?.mintingStatus));
          setLoadingPage(false);
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
  // End -----------------------------------------------------------------------------------------------------------------------

  return (
    <ThemeProvider theme={theme}>
      <Grid style={{ display: "none" }}>
        {
          openModal && (<MetaMask />)
        }

      </Grid>
      <Container>
        <Grid item>
          <Modal
            className={width > 960 ? ArtWorkStyle.Modal : ""}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            onClose={handleModal}
            closeAfterTransition
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openModal}>
              <Grid
                item
                className={
                  width > 960
                    ? ArtWorkStyle.P_Bg_ModalMedia
                    : ArtWorkStyle.BoxMenu
                }
              >
                <Grid item className={ArtWorkStyle.Bg_ModalWhite}>
                  <Grid item className={ArtWorkStyle.wrapperModal}>
                    <Grid item className={ArtWorkStyle.SpaceButton}>
                      <Grid container direction="column" spacing={3}>
                        <Grid item>
                          <Hidden mdUp>
                            <Grid
                              container
                              justifyContent="space-between"
                              alignItems="center"
                              style={{ position: "relative" }}
                            >
                              <Grid
                                item
                                className={ArtWorkStyle.Text_AddArtist}
                              >
                                <IconButton
                                  size="small"
                                  style={{ marginRight: "10px" }}
                                  onClick={handleModal}
                                >
                                  <Image src={arrowLeft} />
                                </IconButton>
                                Minting Creation
                              </Grid>
                              {/* <Grid item>
                                <Button
                                  onClick={() => handleDraft()}
                                  className={ArtWorkStyle.drf_btn}
                                >
                                  Draft
                                </Button>
                              </Grid> */}
                              <span className={ArtWorkStyle.line100_3}></span>
                            </Grid>
                          </Hidden>
                          <Hidden smDown>
                            <Grid item>
                              <Grid
                                container
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Grid
                                  item
                                  className={ArtWorkStyle.Text_AddArtist}
                                >
                                  Minting
                                  <span className={ArtWorkStyle.creationText}>
                                    Creation
                                  </span>
                                </Grid>
                                <Grid item>
                                  <IconButton
                                    className={ArtWorkStyle.IconClose}
                                    onClick={() => handleModal()}
                                  >
                                    <Image src={closeIcon} />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Hidden>

                          <Grid item xs={12} className={ArtWorkStyle.P_mint}>
                            {/* uploading media Start */}
                            <SingleFile
                              SameMedia={SameMedia}
                              setSameMedia={setSameMedia}
                              selectButton={selectButton}
                              setSelectButton={setSelectButton}
                              imSingle={imSingle}
                              handleSetMain={() => handleSetMain()}
                              Medias={Medias}
                              GetData={GetData}
                              setMedias={setMedias}
                              setuploadingInputs={setuploadingInputs}
                              ClassificationID={LocalClassificationID}
                            />
                            {/* uploading media End */}

                            {/* Forms Start */}
                            <InputForm
                              disabled={uploadingInputs}
                              label="Title"
                              placeHolder="Enter your Title"
                              setCheckRequired={setCheckRequired}
                              validateFlag={CheckRequired}
                              schema={Joi.string()
                                .empty({ tlds: { allow: false } })
                                .messages({
                                  "string.empty": `Title is required`,
                                })}
                              setValue={setTitle}
                              value={Title !== null ? Title : ""}
                            />

                            <TextArea
                              disabled={uploadingInputs}
                              label="Description"
                              placeHolder="Enter your Description"
                              setCheckRequired={setCheckRequired}
                              validateFlag={CheckRequired}
                              schema={Joi.string()
                                .empty({ tlds: { allow: false } })
                                .messages({
                                  "string.empty": `Description is required`,
                                })}
                              setValue={setDescription}
                              value={Description !== null ? Description : ""}
                            />

                            {/* Forms End */}

                            {/* Some Hint Start */}
                            <Grid style={{ marginTop: "10px" }} container>
                              <Grid container alignItems="center">
                                <Grid item xs={1}>
                                  <Image src={starBlue} />
                                </Grid>

                                <Grid
                                  item
                                  xs={11}
                                  className={ArtWorkStyle.text12}
                                >
                                  Please be careful about your entries,
                                  information can not be changed after minting.
                                  Read more about{" "}
                                  <span className="link">Minting.</span>
                                </Grid>
                              </Grid>
                            </Grid>
                            {/* Some Hint End */}
                          </Grid>
                        </Grid>

                        {/* two button inside each other ↓↓↓ */}

                        <Grid item>
                          <Grid container justifyContent="space-between">
                            {/* <Hidden smDown>
                              <Grid item className={ArtWorkStyle.draft_btn_1}>
                                <Button
                                  onClick={() => handleDraft()}
                                  fullWidth
                                  className={`${ArtWorkStyle.Button_Add_Artist_Draft}`}
                                >
                                  Draft
                                </Button>
                              </Grid>
                            </Hidden> */}
                            <Grid item className={ArtWorkStyle.confirmBtn}>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleSubmit()}
                                fullWidth
                                className={`${ArtWorkStyle.Button_Add_Artist1}`}
                              >
                                Confirm and submit
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>

                        {/*----------- Single Button ↓↓↓ Start -----------*
                        


                        <Grid item style={{ position: "relative" }}>
                          <Hidden mdUp>
                            <span className={ArtWorkStyle.line100_4}></span>
                          </Hidden>
                          <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            className={`${ArtWorkStyle.Button_Add_Artist1}`}
                          >
                            Confirm and submit
                          </Button>
                        </Grid>



                        ----------- Single Button ------ End -----------*/}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Fade>
          </Modal>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
