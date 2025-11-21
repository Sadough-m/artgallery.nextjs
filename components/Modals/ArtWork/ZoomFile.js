import React, { useState, useEffect } from "react";
import { uuid } from "uuidv4";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import fileDownload from 'js-file-download'
import "react-h5-audio-player/lib/styles.css";
// Matrial
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import {
  IconButton,
  Grid,
  Fade,
  Modal,
} from "@material-ui/core";

// mrx : Styles ↓
import ArtWorkStyle from "../../../styles/artworkflow.module.css";
import { BASE_Image_Url } from "../../../pages/api/index";

// rmx : files  ↓
import arrowLeft from "../../../public/images/icons/Arrow left -.svg";
import arrowLeftTiny from "../../../public/images/icons/Tiny Arrow left.svg";
import arrowRightTiny from "../../../public/images/icons/Tiny Arrow right.svg";
import trashIcon from "../../../public/images/icons/Trash black.svg";
import downloadIcon from "../../../public/images/icons/Download.svg";
import vector from "../../../public/images/icons/Vector.svg";

// Component
import useWindowSize from "../../../Hooks/useWindowSize";

// mrx : setCookies with this
import Cookies from "js-cookie";

export default function ZoomFile({
  // mrx : props Start -----------------------------------------------------------------------------------------------------------
  openModal,
  handleClose,
  Data,
  setSelecteditem,
  Selecteditem,
  handleDeleteItem
  // End -----------------------------------------------------------------------------------------------------------------------
}) {
  // recognize size of page ----------------------------------------------------------------------------------------------------
  const [width, height] = useWindowSize();
  // End -----------------------------------------------------------------------------------------------------------------------

  // States Start --------------------------------------------------------------------------------------------------------------
  const [Images, setImages] = useState([]);
  const [BeforID, setBeforID] = useState("");
  const [AfterID, setAfterID] = useState("");
  const [ImageID, setImageID] = useState("");
  const [Type, setType] = useState("");
  const [FileSize, setFileSize] = useState(0);
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : get Classification id from localStorage ↓ ---------------------------------------------------------------------------
  const LocalClassificationID = parseInt(Cookies.get("ClassificationID"));
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : set images after data came ↓ ----------------------------------------------------------------------------------------
  useEffect(() => {
    if (LocalClassificationID === 1 || LocalClassificationID === 2) {
      setImages(Data?.filter(item => item?.LimitedSt === parseInt(Cookies.get("Limited-ID")))?.map((item) => item?.id))
    } else {
      setImages(Data?.filter(item => item?.classificationType === LocalClassificationID)?.map((item) => item?.id))
    }
  }, [Data]);
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : get befor and after data for changing ↓ -----------------------------------------------------------------------------
  useEffect(() => {
    let arr = Images;
    let test = localStorage.getItem("SelctedMediaID");
    let i = arr.indexOf(`${test}`);
    let val1 = arr[i - 1];
    let val2 = arr[i + 1];
    setBeforID(val1);
    setAfterID(val2);
    setType(Data?.filter(item => item?.id === Selecteditem).map(item => (item?.fileExtention)))
    setFileSize(Data?.filter(item => item?.id === Selecteditem).map(item => (item?.fileSize)))
  }, [Selecteditem]);
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : Show befor Item From local ↓ ----------------------------------------------------------------------------------------
  const handleShowBeforItem = () => {
    if (BeforID === undefined) {
      setSelecteditem(Selecteditem);
      localStorage.setItem("SelctedMediaID", Selecteditem);
    } else {
      setSelecteditem(BeforID);
      localStorage.setItem("SelctedMediaID", BeforID);
    }
  }
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : Show After Item From local ↓ ----------------------------------------------------------------------------------------
  const handleShowAfterItem = () => {
    if (AfterID === undefined) {
      setSelecteditem(Selecteditem);
      localStorage.setItem("SelctedMediaID", Selecteditem);
    } else {
      setSelecteditem(AfterID);
      localStorage.setItem("SelctedMediaID", AfterID);
    }
  }
  // End -----------------------------------------------------------------------------------------------------------------------

  const handleShowItems = () => {
    if (
      Type == "jpg" ||
      // Type == "TIFF" ||
      // Type == "tiff" ||
      Type == "png" ||
      Type == "jpeg"
    ) {
      return (
        <Grid item className={ArtWorkStyle.p_img_zoom}>
          <img
            src={BASE_Image_Url + Data?.filter(item => item?.id === Selecteditem).map(item => (item?.fullPath))}
            className={ArtWorkStyle.zoomImg}
          />
        </Grid>
      )
    } else if (Type == "mp4") {
      return (
        <video
          width="100%"
          style={{
            marginTop: -50,
            height: '93vh',
          }}
          controls
          src={BASE_Image_Url + Data?.filter(item => item?.id === Selecteditem).map(item => (item?.fullPath))}
        />
      )
    } else if (
      Type == "mp3"
    ) {
      return (
        <AudioPlayer
          showJumpControls={false}
          autoPlay={false}
          src={BASE_Image_Url + Data?.filter(item => item?.id === Selecteditem).map(item => (item?.fullPath))}
          autoPlayAfterSrcChange={false}
          controls
        />
      )
    } else {
      return (
        <Grid
          item
          style={{
            height: "100%",
            width: "100%",
            backgroundRepeat: "no-repeat",
            backgroundImage: 'url("/images/zoomImgNotAv.png")',
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <img
            src={vector.src}
            style={{
              height: "200px",
            }}
            className={ArtWorkStyle.vector_center}
          />
          <span className={ArtWorkStyle.prev_notAv}>
            Preview <br /> not available{" "}
          </span>
        </Grid>
      )
    }
  }

  const removeItem = () => {
    setImageID(Data?.filter(item => item?.id === Selecteditem).map(item => (item?.id)));
  }

  useEffect(() => {
    setImages(Images.filter(Item => Item !== `${ImageID}`));
    handleDeleteItem(`${ImageID}`);
    if (Images?.length === 1) {
      handleClose()
    } else {
      setSelecteditem(AfterID === undefined ? BeforID === undefined ? AfterID : BeforID : AfterID);
      handleClose()
    }
  }, [ImageID])

  const handleDownLoad = (url) => {
    toast.info("Download started ...");
    axios.get(url, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, `${uuid()}.${Type}`)
      })
  }

  return (
      <Modal
        className={width > 960 ? ArtWorkStyle.Modal : ""}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <>
            <Grid
              item className={ArtWorkStyle.WrapperZoom_img}>
              <Grid
                item className={ArtWorkStyle.navBarTop}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item className={ArtWorkStyle.fs14fw500}>
                    <IconButton onClick={handleClose}>
                      <img src={arrowLeft.src} />
                    </IconButton>
                    Media
                  </Grid>

                  <Grid item>
                    <img
                      onClick={() => handleDownLoad(
                        BASE_Image_Url + Data?.filter(item => item?.id === Selecteditem).map(item => (item?.fullPath))
                      )}
                      src={downloadIcon.src}
                      className={ArtWorkStyle.p_icons}
                    />

                    <img
                      src={trashIcon.src}
                      className={ArtWorkStyle.p_icons}
                      onClick={() => removeItem()}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                className={ArtWorkStyle.P_imgZoom}
                item
                align="center"
                justifyContent="center"
              >

                {
                  handleShowItems()
                }
                <div className={ArtWorkStyle.P_SizeType}>
                  {
                    parseInt(FileSize) !== 0 && (
                      <span className={ArtWorkStyle.sizeImg}>
                        {Data?.filter(item => item?.id === Selecteditem).map(item => (item?.fileSize))}
                      </span>
                    )
                  }

                  <span className={ArtWorkStyle.typeImg}>
                    {Data?.filter(item => item?.id === Selecteditem).map(item => (item?.fileExtention))}
                  </span>
                </div>
                {
                  BeforID !== undefined && (
                    <img
                      onClick={() => handleShowBeforItem()}
                      src={arrowLeftTiny.src}
                      className={ArtWorkStyle.arrowImgLeft}
                    />
                  )
                }

                {
                  AfterID !== undefined && (
                    <img
                      onClick={() => handleShowAfterItem()}
                      src={arrowRightTiny.src}
                      className={ArtWorkStyle.arrowImgRight}
                    />
                  )
                }

              </Grid>
            </Grid>
          </>
        </Fade>
      </Modal>
  );
}
