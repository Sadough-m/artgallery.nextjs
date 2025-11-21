import React, { useState, useEffect, useContext } from "react";
import { useDropzone } from 'react-dropzone';
import { toast } from "react-toastify";
import { uuid } from 'uuidv4';

// mrx : material ui ↓
import { Grid, Button, IconButton, Hidden } from "@material-ui/core";

// mrx : Styles ↓
import styles from "../../../../../styles/Home.module.css";
import ArtWorkFlowStyle from "../../../../../styles/artworkflow.module.css";

// rmx : files  ↓
import Image from "next/image";
import importImg from "../../../../../public/images/icons/Import icon.svg";
import addFile from "../../../../../public/images/icons/importFile.svg";
import errorIcon from "../../../../../public/images/icons/error import.svg";

// mrx : components ↓
import Img from "../Img";
import useWindowSize from "../../../../../Hooks/useWindowSize";
import DragAndDropCo from "./DragAndDropGET";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import { POST_UPLOAD_FILE } from "../../../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../../../pages/api/config";

// mrx : context ↓
import { Context } from "../../../../../context/index";

export default function AddFile({
  allUniqueImg = false,
  UploadingFileMedia,
  setUploadingFileMedia,
  setAllMediaData,
  Arrengement = true,
}) {
  const LocalClassificationID = parseInt(Cookies.get("ClassificationID"));
  // mrx : context
  const {
    setHaveMedia,
  } = useContext(Context);
  // states
  const [sameMedia, setSameMedia] = useState(false);
  const [error, setError] = useState(false);
  // const [UploadingFileMedia, setUploadingFileMedia] = useState([]);
  const [Uploading, setUploading] = useState(false);
  const [NumberLenght, setNumberLenght] = useState(100);
  const [HveData, setHveData] = useState(0);
  const [selectButton, setSelectButton] = useState(Cookies.get("Limited-ID"));

  // dropzone drag and drop uploader
  const { fileRejections, acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg,image/png,image/tiff,image/eps,audio/mp3,audio/mpeg3,audio/mpeg,audio/flac,audio/alac,video/mp4',
    multiple: false
  });

  // mrx: get seted media from local
  const GET_Media_DATA = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("UploadingFileMedia") || '[]' : '[]');

  // mrx: set seted media from local after get it
  useEffect(() => {
    setUploadingFileMedia(GET_Media_DATA);
    setHveData(GET_Media_DATA?.filter(item => item?.classificationType === LocalClassificationID)?.length)
    Cookies.set("Limited-ID", 0);
  }, [])

  //selecting buttons
  const handleSelectItem = (value) => {
    if (sameMedia) {
      setSelectButton(0);
    } else setSelectButton(value);
  };

  // good man : recocnize the page size
  const [width, height] = useWindowSize();

  useEffect(() => {
    handleSelectItem();
  }, [sameMedia]);

  useEffect(() => {
    handleSelectItem(parseInt(Cookies.get("Limited-ID")));
  }, [UploadingFileMedia])

  // mrx : handle upload file api call
  const handleUploadFile = () => {
    setError(false);
    handleUploadFileApi();
  };

  const handleUploadFileApi = () => {
    setUploading(true);
    let File = new FormData();
    File.append("file", acceptedFiles[0]);

    PostAuthUrl(POST_UPLOAD_FILE(localStorage.getItem("collectionId"), 1),
      File
    ).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setError(false);
          setUploading(false);

          setUploadingFileMedia(prev => [...prev, {
            "fileExtention": res?.data?.data?.fileExtention,
            "fileName": res?.data?.data?.fileName,
            "fileSize": res?.data?.data?.fileSize,
            "fullPath": res?.data?.data?.fullPath,
            "type": res?.data?.data?.type,
            "caption": "",
            "id": uuid(),
            "classificationType": LocalClassificationID,
            "LimitedSt": parseInt(Cookies.get("Limited-ID")),
          }]);

        } else {
          handleErrorUploadFile();
          toast.error(res?.data?.message);
          setUploading(false);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  }

  const handleErrorUploadFile = (e) => {
    setError(true)
  };

  useEffect(() => {
    if (acceptedFiles?.length >= 1) {
      handleUploadFile()
    }
  }, [acceptedFiles])

  useEffect(() => {
    if (fileRejections?.length >= 1) {
      handleErrorUploadFile();
    }
  }, [fileRejections])

  useEffect(() => {
    if (UploadingFileMedia?.filter(item => parseInt(item?.LimitedSt) === parseInt(selectButton))?.length >= 1) {
      setHaveMedia(true);
    } else {
      setHaveMedia(false);
    }
    // localStorage.setItem("UploadingFileMedia", JSON.stringify(UploadingFileMedia));
    setHveData(UploadingFileMedia?.filter(item => parseInt(item?.LimitedSt) === parseInt(selectButton))?.length)
  }, [UploadingFileMedia])

  useEffect(() => {
    setUploadingFileMedia(GET_Media_DATA);
  }, [])

  // set page height
  const handleGetHeightDesktop = () => {
    if (HveData >= 1 && HveData <= 4) {
      return "100px"
    } else if (HveData > 4 && HveData <= 8) {
      return "215px"
    } else if (HveData > 8 && HveData <= 12) {
      return "325px"
    } else if (HveData > 12 && HveData <= 16) {
      return "440px"
    } else if (HveData > 16 && HveData <= 20) {
      return "555px"
    } else if (HveData > 20 && HveData <= 24) {
      return "665px"
    }
  }

  // set page height
  const handleGetHeightDesktopLimited = () => {
    if (HveData >= 1 && HveData <= 4) {
      return "195px"
    } else if (HveData > 4 && HveData <= 8) {
      return "310px"
    } else if (HveData > 8 && HveData <= 12) {
      return "425px"
    } else if (HveData > 12 && HveData <= 16) {
      return "540px"
    } else if (HveData > 16 && HveData <= 20) {
      return "650px"
    } else if (HveData > 20 && HveData <= 24) {
      return "760px"
    }
  }

  // set page height
  const handleGetHeightDesktopReproduction = () => {
    if (HveData >= 1 && HveData <= 4) {
      return "155px"
    } else if (HveData > 4 && HveData <= 8) {
      return "270px"
    } else if (HveData > 8 && HveData <= 12) {
      return "380px"
    } else if (HveData > 12 && HveData <= 16) {
      return "495px"
    } else if (HveData > 16 && HveData <= 20) {
      return "610px"
    } else if (HveData > 20 && HveData <= 24) {
      return "720px"
    }
  }

  useEffect(() => {
    setNumberLenght(105 * parseInt(UploadingFileMedia?.filter((Item) => Item?.LimitedSt == parseInt(Cookies.get("Limited-ID")))?.length));
  }, [UploadingFileMedia]);

  useEffect(() => {
    setNumberLenght(105 * parseInt(UploadingFileMedia?.filter((Item) => Item?.LimitedSt == parseInt(Cookies.get("Limited-ID")))?.length));
  }, [Uploading, selectButton])

  const handleDeleteItem = (id) => {
    setUploadingFileMedia(UploadingFileMedia.filter(Item => Item?.id !== id));
  }

  const handleChangeItemCaption = (event, id) => {
    setUploadingFileMedia(
      UploadingFileMedia &&
      UploadingFileMedia?.map((Item) => {
        if (Item?.id === id) {
          return { ...Item, caption: event.target.value };
        }
        return Item;
      })
    );
  }

  // create media modal Start ------------------------------
  // useEffect(() => {

  // }, [])
  // End media modal Start ------------------------------

  return (
    <>
      <section className="container">
        {
          UploadingFileMedia?.length !== 0 || Uploading === true ? (
            <Grid item className={ArtWorkFlowStyle.boxDotted}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                className={ArtWorkFlowStyle.P_top4}
              >
                <Grid container direction="column" spacing={3}>
                  <Grid style={{ marginBottom: "-25px" }} item>
                    <Grid style={{ position: "absolute" }} {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Button
                            startIcon={<Image src={importImg} />}
                            variant="contained"
                            color="primary"
                            className={ArtWorkFlowStyle.btn_upload}
                          >
                            <span
                              className={`${styles.text__trs__none} ${styles.fs_12} ${styles.fw_14}`}
                            >
                              Upload File
                            </span>
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>

                  </Grid>

                  <Grid item>
                    <Grid
                      direction={width > 960 ? "row" : "column"}
                      justifyContent="flex-start"
                      spacing={1}
                      style={{
                        position: "relative",
                        height: width > 960 ? Uploading && UploadingFileMedia?.filter((Item) => Item?.LimitedSt == parseInt(Cookies.get("Limited-ID")))?.length === 0 ? "100px" : handleGetHeightDesktopLimited() :
                          NumberLenght === 0 ? "200px" :
                            NumberLenght == 105 ? "160px" : NumberLenght == 210 ? "240px" : NumberLenght

                      }}
                    >
                      {
                        Uploading === true ?
                          <div
                            style={{
                              marginTop: width > 960 ? UploadingFileMedia?.filter((Item) => Item?.LimitedSt == parseInt(Cookies.get("Limited-ID")))?.length === 0 ? "45px" : "0px" : "50px",
                              marginBottom: width > 960 ? "" : "-30px"
                            }}
                          >
                            <Img uploading={true} />
                          </div>
                          : <></>
                      }
                      {
                        UploadingFileMedia?.length >= 1 ? (
                          <DragAndDropCo
                            setAllMediaData={setAllMediaData}
                            Error={error}
                            Uploading={Uploading}
                            Data={UploadingFileMedia}
                            handleDeleteItem={handleDeleteItem}
                            handleChangeItemCaption={handleChangeItemCaption}
                            setUploadingFileMedia={setUploadingFileMedia}
                            selectButton={selectButton}
                            setSelectButton={setSelectButton}
                          />
                        ) : (
                          <></>
                        )
                      }

                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <></>
          )
        }
        {
          Uploading === false && UploadingFileMedia?.length === 0
            ? (
              <Grid item style={{ marginBottom: "-10px", height: width > 960 ? "" : "100px" }}
                {...getRootProps({
                  className: Uploading === false &&
                    UploadingFileMedia < 1 ||
                    UploadingFileMedia?.filter(item => item?.classificationType === LocalClassificationID)?.length === 0 ? "dropzoneWithNoImg" : "dropzone"
                })}
              >
                <input {...getInputProps()} />
                <Grid item className={ArtWorkFlowStyle.boxDotted}>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    className={ArtWorkFlowStyle.P_top15}
                  >
                    <Grid item>
                      <Grid container direction={width > 960 ? "column" : 'row'} alignItems='center' spacing={1}>
                        <Grid item>
                          <Image src={error ? errorIcon : addFile} />
                        </Grid>
                        <Grid item className={ArtWorkFlowStyle.addFile}>
                          Add file
                        </Grid>
                        <Hidden smDown>
                          <Grid item className={ArtWorkFlowStyle.Desc_addFile}>
                            Or drop files to upload
                          </Grid>
                        </Hidden>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <></>
            )
        }

        {/* error Text */}
      </section>
      {
        error && (
          <Grid item className={ArtWorkFlowStyle.errorText}>
            File format not supported,{" "}
            <span style={{ color: "#FF4026" }}>
              please upload from supported formats .{" "}
            </span>{" "}
          </Grid>
        )
      }
    </>
  );
}
