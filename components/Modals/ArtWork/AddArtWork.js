import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Joi from "joi";
import { useRouter } from "next/router";

// good man : material ui ↓
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import {
  IconButton,
  Button,
  Grid,
  Fade,
  Hidden,
  Modal,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CustomSelect from "../../Forms/CustomSelect";

// good man : styles ↓
import ArtWorkStyle from "../../../styles/artworkflow.module.css";

// good man : files ↓
import arrowLeft from "../../../public/images/icons/Arrow left -.svg";
import LoadingSpinerSvg from "../../../public/loading.svg";

// good man : components ↓
import AppContainer from "../../Screens/ArtWork/AppContainer";
import useWindowSize from "../../../Hooks/useWindowSize";

// mrx : context ↓
import { Context } from "../../../context/index";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import { GET_ADD_WORK_MODAL_DATA } from "../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../pages/api/config";
import { toast } from "react-toastify";


// End -------------------------------------------------------------------------------------------------------------------------

export default function AddArtWork({ openModal, handleModal }) {
  const router = useRouter();
  // mrx : context -------------------------------------------------------------------------------------------------------------
  const { setClassificationID, collectionItem, RootMedumeType, setRootMedumeType, ClassificationID } = useContext(Context);
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : Detect Page Size ----------------------------------------------------------------------------------------------------
  const [width, height] = useWindowSize();
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : get Collection id from localStorage ↓ -------------------------------------------------------------------------------
  const collectionID =
    typeof window !== "undefined"
      ? localStorage.getItem("collectionId") || 0
      : 0;
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : states ↓ ------------------------------------------------------------------------------------------------------------
  const [InputData, setInputData] = useState([]);
  const [CheckRequired, setCheckRequired] = useState(false);

  const [SelectedType, setSelectedType] = useState(0);
  const [SelectedClassification, setSelectedClassification] = useState(0);
  const [SelectedStatuse, setSelectedStatuse] = useState(0);
  // End -----------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    setSelectedClassification(0);
    setSelectedStatuse(0);
  }, [])

  // mrx : get select inputs data ----------------------------------------------------------------------------------------------
  const handleGetInputData = () => {
    GetAuthUrl(GET_ADD_WORK_MODAL_DATA(collectionID)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setInputData(res?.data?.data);
        } else {
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : update classification ID Start --------------------------------------------------------------------------------------
  useEffect(() => {
    Cookies.set(
      "ClassificationID",
      SelectedClassification ? SelectedClassification : 0
    );
    setClassificationID(SelectedClassification ? SelectedClassification : 0);
  }, [SelectedClassification]);
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : Get form select inputs data Start -----------------------------------------------------------------------------------
  useEffect(() => {
    handleGetInputData();
  }, [collectionItem]);
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : Show Currect Items Start --------------------------------------------------------------------------------------------
  const handleShowMedium = (Item) => {
    if (Item?.id === 1) {
      return (
        <Grid item>
          <AppContainer
            onClick={() => setSelectedType(1)}
            SelectedID={SelectedType}
            title="Physical"
            Item={Item}
            description="Practical for physically held creations."
          />
        </Grid>
      );
    } else if (Item?.id === 0) {
      return (
        <Grid item>
          <AppContainer
            onClick={() => setSelectedType(0)}
            SelectedID={SelectedType}
            title="Digital"
            Item={Item}
            description="Practical for digitally reserved creations."
          />
        </Grid>
      );
    } else if (Item?.id === 2) {
      return (
        <Grid item>
          <AppContainer
            onClick={() => setSelectedType(2)}
            SelectedID={SelectedType}
            title="Digital + Physical"
            Item={Item}
            description="Best for bi-medium creation."
          />
        </Grid>
      );
    }
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : create art Work Start -----------------------------------------------------------------------------------------------
  // ---- setting values that /add route needed --------------------------------------------------------------------------------
  const handleCreateArtWork = () => {
    if (SelectedClassification === "" || SelectedStatuse === "") {
      setCheckRequired(true);
      toast.warning("please select required values");
    } else {
      localStorage.setItem(
        "Add-Artwork-MediumType", SelectedType
      );
      setRootMedumeType(SelectedType);
      localStorage.setItem(
        "Adding-Art-Work",
        JSON.stringify({
          SelectedTypeID: SelectedType,
          SelectedClassificationID: SelectedClassification,
          SelectedStatuseID: SelectedStatuse,
        })
      );
      router.push("/artwork/add");
      handleRemoveLocalData();
    }
  };
  // End -----------------------------------------------------------------------------------------------------------------------

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
  };
  //  End -------------------------------------------------------------------------------------------------------------

  return (
      <Modal
        className={width > 960 ? ArtWorkStyle.Modal_add : ""}
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
                ? ArtWorkStyle.P_Bg_ModalMedia_add
                : ArtWorkStyle.BoxMenu
            }
          >
            <Grid item className={ArtWorkStyle.Bg_ModalWhite_add}>
              <Grid item className={ArtWorkStyle.wrapperModal}>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Grid item>
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid
                            item
                            className={ArtWorkStyle.Text_AddArtist_add}
                          >
                            <Hidden mdUp>
                              <IconButton onClick={() => handleModal()}>
                                <Image src={arrowLeft} />
                              </IconButton>
                            </Hidden>
                            Add a new work
                          </Grid>

                          <span className={ArtWorkStyle.lineArt}>
                            <span className={ArtWorkStyle.lineArtLeft}></span>
                            <span className={ArtWorkStyle.lineArtRight}></span>
                          </span>

                          <Hidden smDown>
                            <Grid item>
                              <IconButton
                                className={ArtWorkStyle.IconClose}
                                onClick={() => handleModal()}
                              >
                                <CloseIcon color="secondary" fontSize="small" />
                              </IconButton>
                            </Grid>
                          </Hidden>
                        </Grid>
                      </Grid>
                    </Grid>

                    {InputData?.length < 1 ? (
                      <Image height="100" src={LoadingSpinerSvg} />
                    ) : (
                      InputData?.medium?.map((Item) => handleShowMedium(Item))
                    )}

                    <Grid item className={ArtWorkStyle.botSpace}>
                      <Grid item xs={12}>
                        <CustomSelect
                          Data={InputData?.classification}
                          label="Classification"
                          placeHolder="Choose One"
                          value={SelectedClassification}
                          bgColor="#F7F8FA"
                          setValue={setSelectedClassification}
                          schema={Joi.optional()}
                          validateFlag={CheckRequired}
                          SelectName={InputData?.classification?.filter((item) => item?.id === SelectedClassification)?.map((item) => item?.name)}
                          setSelectName={setSelectedClassification}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomSelect
                          Data={InputData?.statuse}
                          label="Statuse"
                          placeHolder="Choose One"
                          bgColor="#F7F8FA"
                          value={SelectedStatuse}
                          setValue={setSelectedStatuse}
                          schema={Joi.optional()}
                          SelectName={InputData?.statuse?.filter((item) => item?.id === SelectedStatuse)?.map((item) => item?.name)}
                          setSelectName={setSelectedStatuse}
                          validateFlag={CheckRequired}
                        />
                      </Grid>
                    </Grid>

                    <Grid item className={ArtWorkStyle.P_Button_Create}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handleCreateArtWork()}
                        className={`${ArtWorkStyle.Button_Add_Artist1}`}
                      >
                        Create
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      </Modal>

  );
}
