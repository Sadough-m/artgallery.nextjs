import React, { useState, useContext } from "react";
import Image from "next/image";

// mrx : material ui ↓
import { Grid, IconButton, Hidden } from "@material-ui/core";

// mrx : Styles ↓
import ArtWorkFlowStyle from "../../../../styles/artworkflow.module.css";

// rmx : files  ↓
import { Context } from "../../../../context/index";
import mediaPic from "../../../../public/images/icons/mediaPic.png";
import mediaPicUploading from "../../../../public/images/icons/blurimageuploading.png";
import OpenWithIcon from '@material-ui/icons/OpenWith';
import Trash from "../../../../public/images/icons/Trash white.svg";
import Zoom from "../../../../public/images/icons/Zoom white.svg";
import Close from "../../../../public/images/icons/Close.svg";
import lock from "../../../../public/images/icons/lock with bg.png";
import MoveMobile from "../../../../public/images/icons/Move mobile.svg";

import AudioIcon from "../../../../public/images/icons/media/audioBottomIcon.svg";
import ImageIcon from "../../../../public/images/icons/media/imageBottomType.svg";
import VedioIcon from "../../../../public/images/icons/media/vedioBottomIcon.svg";

// mrx : components ↓
import useWindowSize from "../../../../Hooks/useWindowSize";
import OptionsMobile from "./OptionsMobile";

// mrx : api links ↓
import { BASE_Image_Url } from "../../../../pages/api/index";
import ZoomFile from "../../../Modals/ArtWork/ZoomFile";

export default function Img({
  Item,
  uploading,
  handleDeleteItem,
  handleChangeItemCaption,
  center = false,
  setUploadingFileMedia,
  Data
}) {

  // mrx : context
  const {
    setShowDisOrSaveLimited
  } = useContext(Context);

  // gd : states ↓
  const [ShowFullScreen, setShowFullScreen] = useState(false);
  const [Selecteditem, setSelecteditem] = useState("");

  // عکس  = 0
  // •	PNG
  // •	JPEG
  // •	TIFF *
  // •	EPS * 

  // ویدیو = 1 
  // •	MP4

  // ایدیو = 2 
  // •	MP3
  // •	FLAC & ALAC *

  const getSupported = () => {
    if (Item?.fileExtention === "jpg" ||
      Item?.fileExtention === "png" ||
      Item?.fileExtention === "jpeg" ||
      Item?.fileExtention === "mp4" ||
      // Item?.fileExtention === "tiff" ||
      // Item?.fileExtention === "TIFF" ||
      Item?.fileExtention === "mp3"
    ) {
      return true
    } else {
      return false
    }
  }

  const GetFileIconType = () => {
    if (Item?.type === 0) {
      if (getSupported() === true) {
        return (
          <Grid
            item
            className={
              center
                ? ArtWorkFlowStyle.imgInsideImgModal
                : ArtWorkFlowStyle.imgleftInsideModal
            }
          >
            {/* <Image src={ImageIcon} /> */}
          </Grid>
        )
      } else {
        return (
          <Grid
            item
            className={
              center
                ? ArtWorkFlowStyle.imgInsideImgModal
                : ArtWorkFlowStyle.imgleftInsideModal
            }
          >
            <Image src={ImageIcon} />
          </Grid>
        )
      }
    } else if (Item?.type === 2) {
      return (
        <Grid
          item
          className={
            center
              ? ArtWorkFlowStyle.imgInsideImgModal
              : ArtWorkFlowStyle.imgleftInsideModalAudio
          }
        >
          <Image src={VedioIcon} />
        </Grid>
      )
    } else if (Item?.type === 1) {
      return (
        <Grid
          item
          className={
            center
              ? ArtWorkFlowStyle.imgInsideImgModal
              : ArtWorkFlowStyle.imgleftInsideModalAudio
          }
        >
          <Image src={AudioIcon} />
        </Grid>
      )
    }
  }

  const GetFileImageType = () => {
    if (Item?.type === 0) {
      if (getSupported() === true) {
        return (
          <img
            src={BASE_Image_Url + Item?.fullPath}
            width="107px"
            height="107px"
            className={ArtWorkFlowStyle.imgUp}
          />
        )
      } else {
        return (
          <>
            <img
              src="/images/notSuportedImage.png"
              width="107px"
              height="107px"
              className={ArtWorkFlowStyle.imgUp}
            />
            <Grid item className={` ${ArtWorkFlowStyle.p_typeImg} ${ArtWorkFlowStyle.imgInsideIconmodal}`}>
              {Item?.fileExtention}
            </Grid>
          </>
        )
      }
    } else if (Item?.type === 1) {
      if (getSupported() === true) {
        return (
          <img
            src="/images/Default.png"
            width="107px"
            height="107px"
            className={ArtWorkFlowStyle.imgUp}
          />
        )
      } else {
        return (
          <>
            <img
              src="/images/notSuportedImage.png"
              width="107px"
              height="107px"
              className={ArtWorkFlowStyle.imgUp}
            />
            <Grid item className={` ${ArtWorkFlowStyle.p_typeImg}`}>
              {Item?.fileExtention}
            </Grid>
          </>
        )
      }
    } else if (Item?.type === 2) {
      if (getSupported() === true) {
        return (
          <img
            src="/images/Default.png"
            width="107px"
            height="107px"
            className={ArtWorkFlowStyle.imgUp}
          />
        )
      } else {
        return (
          <>
            <img
              src="/images/notSuportedImage.png"
              width="107px"
              height="107px"
              className={ArtWorkFlowStyle.imgUp}
            />
            <Grid item className={` ${ArtWorkFlowStyle.p_typeImg}`}>
              {Item?.fileExtention}
            </Grid>
          </>
        )
      }
    }
  }

  const GetFileTopIconType = () => {
    if (Item?.type === 0) {
      return (
        <IconButton size="small"
          onClick={() => {
            handleShowFullScreen();
            setSelecteditem(Item?.id),
              localStorage.setItem("SelctedMediaID", Item?.id)
          }}
        >
          <Image src={Zoom} />
        </IconButton >
      )
    } else if (Item?.type === 1) {
      return (
        <IconButton size="small"
          onClick={() => {
            handleShowFullScreen();
            setSelecteditem(Item?.id),
              localStorage.setItem("SelctedMediaID", Item?.id)
          }}
        >
          <Image src={VedioIcon} />
        </IconButton>
      )
    } else if (Item?.type === 2) {
      return (
        <IconButton size="small"
          onClick={() => {
            handleShowFullScreen();
            setSelecteditem(Item?.id),
              localStorage.setItem("SelctedMediaID", Item?.id)
          }}
        >
          <Image src={VedioIcon} />
        </IconButton>
      )
    }
  }

  // open and close modal
  const handleShowFullScreen = () => {
    setShowFullScreen(true)
  }

  // open and close modal
  const handleShowoffFullScreen = () => {
    setShowFullScreen(false)
  }

  return (
    <>
      {
        !uploading ? (
          <>
            {/* for desktop (design in mobile and pc is too deffrent) */}
            <Hidden smDown>
              <Grid item className={ArtWorkFlowStyle.P_img}>
                <Grid container alignItems="center">
                  <Grid item>
                    {GetFileImageType()}
                  </Grid>

                  {/* on hover showen */}
                  <Grid
                    item
                    className={`${ArtWorkFlowStyle.p_img_all} ${ArtWorkFlowStyle.p_trashIcon}`}
                  >
                    <IconButton size="small" onClick={() => { handleDeleteItem(Item?.id); setShowDisOrSaveLimited(true); }}>
                      <Image src={Trash} />
                    </IconButton>
                  </Grid>

                  {/* audio or play ... */}
                  {GetFileIconType()}

                  {/* zoom (hover) */}
                  {<Grid
                    item
                    className={`${ArtWorkFlowStyle.p_img_all} ${ArtWorkFlowStyle.p_ZoomIcon}`}

                  >
                    {GetFileTopIconType()}
                  </Grid>}

                  {/* Move (hover) */}
                  <Grid
                    item
                    className={`${ArtWorkFlowStyle.p_img_all} ${ArtWorkFlowStyle.p_MoveIcon}`}
                  >
                    <OpenWithIcon style={{ color: 'transparent' }} />
                  </Grid>

                  {/* text input */}
                  <Grid
                    item
                    className={`${ArtWorkFlowStyle.p_img_all} ${ArtWorkFlowStyle.P_formImg}`}
                  >
                    <input
                      placeholder="Enter title..."
                      value={Item?.caption}
                      onChange={(e) => handleChangeItemCaption(e, Item?.id)}
                      className={ArtWorkFlowStyle.form_img}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>

            {/* for mobile */}
            <Hidden mdUp>
              <Grid container direction="column" className="XX">
                <Grid item>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                          <Image src={MoveMobile} />
                        </Grid>
                        <Grid item>
                          {GetFileImageType()}
                        </Grid>
                        <Grid item>
                          <input
                            placeholder="Enter title..."
                            value={Item?.caption}
                            onChange={(e) => handleChangeItemCaption(e, Item?.id)}
                            className={ArtWorkFlowStyle.input_no_border}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <OptionsMobile
                      setSelecteditem={setSelecteditem}
                      handleShowFullScreen={handleShowFullScreen}
                      handleDeleteItem={() => handleDeleteItem(Item?.id)}
                      ID={Item?.id}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>

            <ZoomFile
              handleClose={handleShowoffFullScreen}
              openModal={ShowFullScreen}
              handleDeleteItem={handleDeleteItem}
              handleModal={handleShowFullScreen}
              Data={Data}
              setSelecteditem={setSelecteditem}
              Selecteditem={Selecteditem}
            />
          </>
        ) : (
          <>
            {/* for pc */}
            <Hidden smDown>
              <Grid item className={ArtWorkFlowStyle.P_img_uploading}>
                <Image src={mediaPicUploading} className={ArtWorkFlowStyle.imgUploading} />

                <Grid item className={ArtWorkFlowStyle.Percent_uploaded}>
                  <img style={{ width: "27px", height: "10px" }} src="/loadingUploading.svg" />
                </Grid>
                <Grid item className={` ${ArtWorkFlowStyle.closeIcon}`}>
                  <IconButton size="small">
                    <Image src={Close} />
                  </IconButton>
                </Grid>
              </Grid>
            </Hidden>
            {/* for mobile */}
            <Hidden mdUp>
              <Grid container direction="column">
                <Grid item>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                          <Image src={MoveMobile} />
                        </Grid>
                        <Grid item className={ArtWorkFlowStyle.posRel}>
                          <Image
                            src={mediaPic}
                            width={"56px"}
                            height={"56px"}
                            className={ArtWorkFlowStyle.imgUploading}
                          />
                          <span
                            item
                            className={ArtWorkFlowStyle.percentUploadMobile}
                          >
                            <img style={{ width: "16px", height: "10px" }} src="/loadingUploading.svg" />
                          </span>
                        </Grid>
                        <Grid item>
                          <input
                            placeholder="type here..."
                            type="text"
                            className={ArtWorkFlowStyle.input_no_border}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <OptionsMobile
                      setSelecteditem={setSelecteditem}
                      handleShowFullScreen={handleShowFullScreen}
                      handleDeleteItem={handleDeleteItem}
                      ID={Item?.id}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
          </>
        )
      }
    </>
  );
}
