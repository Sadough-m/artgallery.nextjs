import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/artworkflow.module.css";

// gm : files ↓
import ImgPng from "../../../../public/images/dg img.png";
import mediaPicUploading from "../../../../public/images/icons/blurimageuploading.png";
import UploadingPng from "../../../../public/images/Uploading.png";
import FailedPng from "../../../../public/images/FailedUpload.png";
import Trash from "../../../../public/images/icons/Trash white.svg";
import Zoom from "../../../../public/images/icons/Zoom white.svg";
import CloseSvg from "../../../../public/images/icons/Close dark.svg";
import CircleSvg from "../../../../public/images/icons/CircleWhite.svg";
import ZoomFile from "../../../Modals/ArtWork/singleZoomFile";
import notSupPicMobilePng from "../../../../public/images/notSupMobile.png";
import ImgMobileTest from "../../../../public/images/test4.png";
import UploadingPngMobile from "../../../../public/images/test5.png";
import CloseSvg_Mobile from "../../../../public/images/icons/Close12.svg";

import AudioIcon from "../../../../public/images/icons/media/audioBottomIcon.svg";
import ImageIcon from "../../../../public/images/icons/media/imageBottomType.svg";
import VedioIcon from "../../../../public/images/icons/media/vedioBottomIcon.svg";

import { BASE_Image_Url } from "../../../../pages/api";

// gm : components ↓
import OptionsMobile from "./OptionsMobile";

export default function ImgSingle({
  Item,
  Uploaded,
  Uploading = false,
  Failed = false,
  handleDeleteItem,
  handleChangeItemCaption,
}) {
  // gm : states ↓
  const [ShowFullScreen, setShowFullScreen] = useState(false);
  const [Selecteditem, setSelecteditem] = useState("");

  const getSupported = () => {
    if (
      Item?.fileExtention === "jpg" ||
      Item?.fileExtention === "JPG" ||
      Item?.fileExtention === "png" ||
      Item?.fileExtention === "PNG" ||
      Item?.fileExtention === "jpeg" ||
      Item?.fileExtention === "JPEG" ||
      Item?.fileExtention === "mp4" ||
      Item?.fileExtention === "MP4" ||
      // Item?.fileExtention === "TIFF" ||
      // Item?.fileExtention === "tiff" ||
      Item?.fileExtention === "MP3" ||
      Item?.fileExtention === "mp3"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const GetFileIconType = () => {
    if (Item?.type === 0) {
      if (getSupported() === true) {
        return (
          <Grid
            item
            className={
              center ? Style.imgInsideImgModal : Style.imgleftInsideModal
            }
          >
            {/* <Image src={ImageIcon} /> */}
          </Grid>
        );
      } else {
        return (
          <Grid
            item
            className={
              center ? Style.imgInsideImgModal : Style.imgleftInsideModal
            }
          >
            <Image src={ImageIcon} />
          </Grid>
        );
      }
    } else if (Item?.type === 2) {
      return (
        <Grid
          item
          className={
            center ? Style.imgInsideImgModal : Style.imgleftInsideModalAudio
          }
        >
          <Image src={VedioIcon} />
        </Grid>
      );
    } else if (Item?.type === 1) {
      return (
        <Grid
          item
          className={
            center ? Style.imgInsideImgModal : Style.imgleftInsideModalAudio
          }
        >
          <Image src={AudioIcon} />
        </Grid>
      );
    }
  };

  const GetFileImageType = () => {
    if (Item?.type === 0) {
      if (getSupported() === true) {
        return (
          <img
            src={BASE_Image_Url + Item?.fullPath}
            width="100%"
            height="107px"
            className={Style.imgUp}
          />
        );
      } else {
        return (
          <>
            <img
              src="/images/notSuportedImage.png"
              width="100%"
              height="107px"
              className={Style.imgUp}
            />
            <Grid
              item
              className={` ${Style.p_typeImg} ${Style.imgInsideIconmodal}`}
            >
              {Item?.fileExtention}
            </Grid>
          </>
        );
      }
    } else if (Item?.type === 1) {
      if (getSupported() === true) {
        return (
          <img
            src="/images/Default.png"
            width="100%"
            height="107px"
            className={Style.imgUp}
          />
        );
      } else {
        return (
          <>
            <img
              src="/images/notSuportedImage.png"
              width="100%"
              height="107px"
              className={Style.imgUp}
            />
            <Grid item className={` ${Style.p_typeImg}`}>
              {Item?.fileExtention}
            </Grid>
          </>
        );
      }
    } else if (Item?.type === 2) {
      if (getSupported() === true) {
        return (
          <img
            src="/images/Default.png"
            width="100%"
            height="107px"
            className={Style.imgUp}
          />
        );
      } else {
        return (
          <>
            <img
              src="/images/notSuportedImage.png"
              width="107px"
              height="107px"
              className={Style.imgUp}
            />
            <Grid item className={` ${Style.p_typeImg}`}>
              {Item?.fileExtention}
            </Grid>
          </>
        );
      }
    }
  };

  const GetFileTopIconType = () => {
    if (Item?.type === 0) {
      return (
        <IconButton
          className={Style.ImgZoom_Single}
          onClick={() => {
            handleShowFullScreen();
            setSelecteditem(Item?.fileName),
              localStorage.setItem("SelctedMediaID", Item?.fileName);
          }}
        >
          <Image src={Zoom} />
        </IconButton>
      );
    } else if (Item?.type === 1) {
      return (
        <IconButton
          className={Style.ImgZoom_Single}
          onClick={() => {
            handleShowFullScreen();
            setSelecteditem(Item?.fileName),
              localStorage.setItem("SelctedMediaID", Item?.fileName);
          }}
        >
          <Image src={VedioIcon} />
        </IconButton>
      );
    } else if (Item?.type === 2) {
      return (
        <IconButton
          className={Style.ImgZoom_Single}
          onClick={() => {
            handleShowFullScreen();
            setSelecteditem(Item?.fileName),
              localStorage.setItem("SelctedMediaID", Item?.fileName);
          }}
        >
          <Image src={VedioIcon} />
        </IconButton>
      );
    }
  };

  // open and close modal
  const handleShowFullScreen = () => {
    setShowFullScreen(true);
  };

  // open and close modal
  const handleShowoffFullScreen = () => {
    setShowFullScreen(false);
  };

  return (
    <Grid item className={Style.P_ImgSingle}>
      {/* for Pc */}
      <Hidden smDown>
        {
          !Uploading && (
            <>
              {/* Image */}
              {
                GetFileImageType()
              }

              {/* Others */}
              <span className={Style.MintText}>Mint file</span>
              <span className={Style.BgOverly}></span>
              {
                Item?.fileSize !== "0" &&
                <span className={Style.SizeImg_Single}>{Item?.fileSize}</span>
              }

              <span className={Style.TypeImg_Single}>{Item?.fileExtention}</span>

              <IconButton
                onClick={() => handleDeleteItem()}
                className={Style.ImgTrash_Single}
              >
                <Image src={Trash} />
              </IconButton>

              {GetFileTopIconType()}
            </>
          )
        }

        {Uploading && (
          <>
            {/* Image */}
            <img src={UploadingPng.src} className={Style.imgSingle} />

            {/* Others */}
            <span className={Style.TypeImg_Single_uploading}>
              <img
                style={{ width: "27px", height: "10px" }}
                src="/loadingUploading.svg"
              />
            </span>
            <IconButton className={Style.ImgTrash_Single_Uploading}>
              <Image src={CloseSvg} />
            </IconButton>
          </>
        )}
        {Failed && (
          <>
            {/* Image */}
            <img src={FailedPng.src} className={Style.imgSingle} />

            {/* Others */}
            <span className={Style.PercentFailed}>Mint file</span>
            <span className={Style.TypeImg_Single}>TIFF</span>

            <IconButton className={Style.ImgTrash_Single}>
              <Image src={Trash} />
            </IconButton>

            <IconButton className={Style.Mid_Single_Failed}>
              <Image src={CircleSvg} />
            </IconButton>

            <IconButton className={Style.ImgZoom_Single}>
              <Image src={Zoom} />
            </IconButton>
          </>
        )}
      </Hidden>

      {/* for mobile */}
      <Hidden mdUp>
        <span>
          {!Uploading && (
            <Grid container direction="column">
              <Grid item>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item className={Style.P_ImgMobile_single}>
                        <img
                          src={BASE_Image_Url + Item?.fullPath}
                          className={Style.ImgMobile_single}
                        />
                      </Grid>
                      <Grid item>
                        <Grid item className={Style.info_img1}>
                          Mint File
                        </Grid>

                        {
                          Item?.fileSize !== "0" &&
                          <Grid item className={Style.info_img1}>
                            {Item?.fileSize}
                          </Grid>
                        }


                        <Grid item className={Style.info_img1}>
                          {Item?.fileExtention}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <OptionsMobile
                    setSelecteditem={setSelecteditem}
                    handleDeleteItem={() => handleDeleteItem()}
                    handleShowFullScreen={() => handleShowFullScreen()}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}

          {Uploading && (
            <Grid container direction="column">
              <Grid item>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item className={Style.P_ImgMobile_single}>
                        <img
                          src={UploadingPngMobile.src}
                          className={Style.ImgMobile_single}
                        />
                        <span className={Style.percentCompleted}>
                          <img
                            style={{ width: "27px", height: "10px" }}
                            src="/loadingUploading.svg"
                          />
                        </span>
                      </Grid>
                      {/* <Grid item>
                        <Grid item className={Style.info_img2}>
                          Type
                        </Grid>

                        <Grid item className={Style.info_img3}>
                          Jpeg
                        </Grid>
                      </Grid> */}
                    </Grid>
                  </Grid>
                  <Grid item>
                    <IconButton>
                      <Image src={CloseSvg_Mobile} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
          {Failed && (
            <Grid container direction="column">
              <Grid item>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item className={Style.P_ImgMobile_single}>
                        <img
                          src={notSupPicMobilePng.src}
                          className={Style.ImgMobile_single}
                        />
                        <IconButton className={Style.MiddleIcon}>
                          <Image src={CircleSvg} />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <Grid item className={Style.info_img2}>
                          Mint File
                        </Grid>

                        <Grid item className={Style.info_img3}>
                          TIFF
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <OptionsMobile />
                </Grid>
              </Grid>
            </Grid>
          )}
        </span>
      </Hidden>
      <ZoomFile
        handleClose={handleShowoffFullScreen}
        openModal={ShowFullScreen}
        handleDeleteItem={handleDeleteItem}
        Data={{
          fileSize: Item?.fileSize,
          imageUrl: Item?.fullPath,
          type: Item?.fileExtention,
        }}
      />
    </Grid>
  );
}
