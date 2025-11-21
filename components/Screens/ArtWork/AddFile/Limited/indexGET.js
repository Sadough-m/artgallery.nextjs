import React, { useState, useEffect, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { uuid } from "uuidv4";
import { useRouter } from 'next/router';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move,
} from "react-grid-dnd";

// mrx : material ui ↓
import { Grid, Button, IconButton, Hidden } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

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
import CustomCheckBox from "../../../../Forms/CustomCheckBox";
import ImgDG from "../ImgDG";
import useWindowSize from "../../../../../Hooks/useWindowSize";
import DragAndDropCo from "./DragAndDropGET";
import ButtonsList from "../ButtonsList";

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
import { map } from "lodash";

export default function AddFile({
  allUniqueImg = false,
  Arrengement = true,
  setAllMediaLimited,
  onChange,
  AllMediaLimited,
  AllData,
}) {
  const LocalClassificationID = parseInt(Cookies.get("ClassificationID"));
  // mrx : context
  const {
    ShowenReproduction,
    AllEditionsChanges,
    setShowenReproduction,
    HaveMedia,
    setHaveMedia,
    AllEditions,
    AllMediaLimitedC,
    setAllMediaLimitedC,
    setAllEditions,
    UpdateMediaLimited,
    setUpdateMediaLimited,
    NewEditions,
    setShowDisOrSaveLimited
  } = useContext(Context);

  const router = useRouter();

  // GET EDITIONS FROM LOCAL STORAGE -------------------------------------------------------------------------------------------
  const GET_EDITIONS = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Editions-Media") || '[]' : '[]');
  const GET_EDITIONS2 = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Editions-Media-GET") || '[]' : '[]');
  // End -----------------------------------------------------------------------------------------------------------------------

  // states
  const [error, setError] = useState(false);
  const [UploadingFileMedia, setUploadingFileMedia] = useState([]);
  const [Uploading, setUploading] = useState(false);
  const [NumberLenght, setNumberLenght] = useState(100);
  const [HveData, setHveData] = useState(0);
  const [Medias, setMedias] = useState([]);
  const [selectButton, setSelectButton] = useState(Cookies.get("Limited-ID"));
  const [NewUpload, seNewUpload] = useState(false);
  const [ISFirst, setISFirst] = useState(true);
  const [EachEditionLenght, setEachEditionLenght] = useState([]);

  useEffect(() => {
    changeHeight()
  }, [selectButton])

  useEffect(() => {
    if (UpdateMediaLimited === true) {
      setMedias(NewEditions?.map((Item, index) => ({
        "editionNumber": parseInt(Item?.editionNumber),
        "mediaSort": '[]',
        "medias": []
      })));
      setUploadingFileMedia([]);
      setUpdateMediaLimited(false)
    }
  }, [UpdateMediaLimited, NewEditions])

  // mrx : detect height size
  const changeHeight = () => {
    const SelectedData = UploadingFileMedia?.filter((Item) => Item?.LimitedSt == parseInt(Cookies.get("Limited-ID")));
    setHveData(SelectedData?.length);
  }

  // dropzone drag and drop uploader
  const { fileRejections, acceptedFiles, getRootProps, getInputProps } =
    useDropzone({
      accept:
        "image/jpeg,image/png,image/tiff,image/eps,audio/mp3,audio/mpeg3,audio/mpeg,audio/flac,audio/alac,video/mp4",
      multiple: false
    });

  // good man : recocnize the page size
  const [width, height] = useWindowSize();

  useEffect(() => {
    setUploadingFileMedia(AllMediaLimited?.map((item) => ({
      "fileExtention": item?.fileExtention,
      "fileSize": item?.imageSize,
      "fullPath": item?.fileUrl,
      "type": item?.type,
      "caption": item?.caption,
      "id": item?.id,
      "classificationType": item?.classificationType,
      "LimitedSt": item?.limitedSt,
    })))
    Cookies.set("Limited-ID", parseInt(GET_EDITIONS?.map((item) => item?.editionNumber)[0]))
  }, [AllMediaLimited])

  useEffect(() => {
    localStorage.setItem("ArtWork-Editions-Media", JSON.stringify(Medias));
    setAllMediaLimitedC(Medias);
  }, [Medias])


  useEffect(() => {
    setISFirst(true);
    if (GET_EDITIONS2 && JSON.stringify(GET_EDITIONS2[0]?.mediaSort) !== "[]") {
      setMedias(GET_EDITIONS2?.map((Item, index) => ({
        "editionNumber": parseInt(Item?.editionNumber),
        "mediaSort": JSON.stringify(Item?.medias?.map((item, index) => ({
          "fileExtention": item?.fileExtention,
          "fileName": item?.fileName,
          "fileSize": item?.imageSize,
          "fullPath": item?.fileUrl,
          "type": item?.type,
          "caption": item?.caption,
          "id": item?.id,
          "classificationType": 1,
          "LimitedSt": parseInt(Item?.editionNumber),
        }))),
        "medias": Item?.medias?.map((item, index) => ({
          "fileExtention": item?.fileExtention,
          "fileName": item?.fileName,
          "fileSize": item?.imageSize,
          "fullPath": item?.fileUrl,
          "type": item?.type,
          "caption": item?.caption,
          "id": item?.id,
          "classificationType": 1,
          "LimitedSt": parseInt(Item?.editionNumber),
        }))
      })));
    }
  }, [AllData])

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

          // mrx : chaneg title when state update --------------------------------------------------------------------------------
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

          // End -----------------------------------------------------------------------------------------------------------------------
          setUploading(false);
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

  // mrx : handle upload file api call
  const handleUploadFile = () => {
    if (ISFirst === false) {
      setError(false);
      if (parseInt(Cookies.get("Limited-ID")) === 0) {
        setMedias(
          GET_EDITIONS &&
          GET_EDITIONS?.map((Item) => {
            return {
              ...Item,
              mediaSort: JSON.stringify(UploadingFileMedia),
              medias: UploadingFileMedia
            };
          })
        );
        setISFirst(false)
      } else {
        setMedias(
          GET_EDITIONS &&
          GET_EDITIONS?.map((Item) => {
            if (Item?.editionNumber === parseInt(Cookies.get("Limited-ID"))) {
              return {
                ...Item,
                mediaSort: JSON.stringify(UploadingFileMedia?.filter((Item) => Item?.LimitedSt == parseInt(Cookies.get("Limited-ID")))),
                medias: UploadingFileMedia?.filter((Item) => Item?.LimitedSt == parseInt(Cookies.get("Limited-ID")))
              };
            }
            return Item;
          })
        );
        setISFirst(false)
      }
      seNewUpload(true);
    }
  };

  useEffect(() => {
    if (NewUpload === true) {
      seNewUpload(false)
    }
  }, [NewUpload])

  useEffect(() => {
    handleUploadFile();
    if (UploadingFileMedia?.length >= 1) {
      setHaveMedia(true);
    } else {
      setHaveMedia(false);
    }
    // changeHeight()
    // console.log("All Data " + UploadingFileMedia + UploadingFileMedia?.length);
  }, [UploadingFileMedia])

  const handleErrorUploadFile = (e) => {
    setError(true)
    setISFirst(false);
  };

  useEffect(() => {

    if (acceptedFiles?.length >= 1) {
      if (Medias?.filter((item) => item?.editionNumber !== 0)?.length < 1) {
        toast.warning("Please first add an edition");
        router.push("/artwork/add#Editions");
      } else {
        setShowDisOrSaveLimited(true)
        handleUploadFileApi()
        setISFirst(false);
      }
    }

  }, [acceptedFiles])

  useEffect(() => {
    if (fileRejections?.length >= 1) {
      handleErrorUploadFile();
      setShowDisOrSaveLimited(true);
    }
  }, [fileRejections])


  // useEffect(() => {
  //   setUploadingFileMedia(GET_Media_DATA);
  // }, []);

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

  useEffect(() => {
    setNumberLenght(105 * parseInt(UploadingFileMedia?.filter((Item) => Item?.LimitedSt == parseInt(Cookies.get("Limited-ID")))?.length));
  }, [UploadingFileMedia]);

  useEffect(() => {
    setNumberLenght(105 * parseInt(UploadingFileMedia?.filter((Item) => Item?.LimitedSt == parseInt(Cookies.get("Limited-ID")))?.length));
  }, [Uploading, selectButton])

  const handleDeleteItem = (id) => {
    setISFirst(false);
    changeHeight()
    setUploadingFileMedia(UploadingFileMedia.filter((Item) => Item?.id !== id));
  };

  const handleChangeItemCaption = (event, id) => {
    setShowDisOrSaveLimited(true);

    setISFirst(false);
    setUploadingFileMedia(
      UploadingFileMedia &&
      UploadingFileMedia?.map((Item) => {
        if (Item?.id === id) {
          return { ...Item, caption: event?.target?.value };
        }
        return Item;
      })
    );
  };

  useEffect(() => {
    setEachEditionLenght(UploadingFileMedia?.filter((Item) => Item?.LimitedSt == parseInt(Cookies.get("Limited-ID")))?.length);
  }, [UploadingFileMedia])

  return (
    <>
      <section className="container">
        {Medias?.filter((item) => item?.editionNumber !== 0)?.length >= 1 ? (
          <Grid item className={ArtWorkFlowStyle.boxDotted}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              className={ArtWorkFlowStyle.P_top4}
            >
              <Grid container direction="column" spacing={3}>
                <Grid style={{ marginBottom: "-25px" }} item>
                  <Grid
                    style={{ position: "absolute" }}
                    {...getRootProps({ className: "dropzone" })}
                  >
                    <input {...getInputProps()} />
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Button
                          // onClick={() => onChange ? onChange() : ""}
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
                      height: width > 960 ? EachEditionLenght === 1 || EachEditionLenght === 0 && parseInt(Cookies.get("Limited-ID")) === 0 || EachEditionLenght === 2 || EachEditionLenght === 3 || EachEditionLenght === 4 ? "190px" :
                        Uploading && EachEditionLenght === 0 ? "100px" : handleGetHeightDesktopLimited()
                        : Uploading && EachEditionLenght === 0 ? "60px" : Uploading && EachEditionLenght === 1 ? "140px" :
                          NumberLenght === 0 ? "200px" :
                            NumberLenght == 105 ? "160px" : NumberLenght == 210 ? "240px" : NumberLenght
                    }}
                  >
                    {
                      Uploading === true ?
                        <div
                          style={{
                            marginTop: width > 960 ? EachEditionLenght === 0 ? "45px" : "0px" : "50px",
                            marginBottom: width > 960 ? "" : "-30px"
                          }}
                        >
                          <Img uploading={true} />
                        </div>
                        : <></>
                    }
                    {Medias?.filter((item) => item?.editionNumber !== 0)?.length >= 1 ? (
                      <DragAndDropCo
                        Error={error}
                        NewUpload={NewUpload}
                        Medias={Medias}
                        Uploading={Uploading}
                        Data={UploadingFileMedia}
                        handleDeleteItem={handleDeleteItem}
                        handleChangeItemCaption={handleChangeItemCaption}
                        setUploadingFileMedia={setUploadingFileMedia}
                        selectButton={selectButton}
                        setSelectButton={setSelectButton}
                        setShowDisOrSaveLimited={setShowDisOrSaveLimited}
                        setMedias={setMedias}
                        setAllEditions={setAllEditions}
                        setISFirst={setISFirst}
                      />
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}


        {(Uploading === false && Medias?.filter((item) => item?.editionNumber !== 0)?.length < 1) ? (
          <Grid
            item
            style={{ marginBottom: "-10px", height: width > 960 ? "" : "100px" }}
            {...getRootProps({ className: Uploading === false && Medias?.filter((item) => item?.editionNumber !== 0)?.length < 1 ? "dropzoneWithNoImg" : "dropzone" })}
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
                  <Grid
                    container
                    direction={width > 960 ? "column" : "row"}
                    alignItems="center"
                    spacing={1}
                  >
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
        )}

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
