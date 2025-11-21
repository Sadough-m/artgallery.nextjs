import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { uuid } from "uuidv4";
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
  handleDeleteItem
  // End -----------------------------------------------------------------------------------------------------------------------
}) {
  // recognize size of page ----------------------------------------------------------------------------------------------------
  const [width, height] = useWindowSize();
  // End -----------------------------------------------------------------------------------------------------------------------

  // States Start --------------------------------------------------------------------------------------------------------------
  const [ImageID, setImageID] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [Type, setType] = useState("");
  const [FileSize, setFileSize] = useState(0);
  // End -----------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    setImageUrl(Data?.imageUrl);
    setType(Data?.type);
    setFileSize(Data?.fileSize);
    setImageID(Data?.id);
  }, [Data])

  // mrx : get Classification id from localStorage ↓ ---------------------------------------------------------------------------
  const LocalClassificationID = parseInt(Cookies.get("ClassificationID"));
  // End -----------------------------------------------------------------------------------------------------------------------

  const handleShowItems = () => {
    if (
      // Type == "TIFF" ||
      Type == "jpg" ||
      Type == "png" ||
      // Type == "tiff" ||
      Type == "jpeg"
    ) {
      return (
        <Grid item className={ArtWorkStyle.p_img_zoom}>
          <img
            src={BASE_Image_Url + ImageUrl}
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
          src={BASE_Image_Url + ImageUrl}
        />
      )
    } else if (
      Type == "mp3"
    ) {
      return (
        <AudioPlayer
          showJumpControls={false}
          autoPlay={false}
          src={BASE_Image_Url + ImageUrl}
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
            backgroundPosition: "center"
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
    handleDeleteItem(`${ImageID}`);
  }

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
                      onClick={() => handleDownLoad(BASE_Image_Url + ImageUrl)}
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
                <Grid
                  style={{
                    zIndex: "11",
                    position: "absolute",
                    top: "15px",
                    left: "10px",
                  }}
                >
                  {
                    parseInt(FileSize) !== 0 && (
                      <span className={ArtWorkStyle.sizeImg}>
                        {FileSize}
                      </span>
                    )
                  }

                  <span className={ArtWorkStyle.typeImg}>
                    {Type}
                  </span>
                </Grid>

                {
                  handleShowItems()
                }



              </Grid>
            </Grid>
          </>
        </Fade>
      </Modal>
  );
}
