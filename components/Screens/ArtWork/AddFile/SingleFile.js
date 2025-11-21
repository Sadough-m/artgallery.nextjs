import React, { useState, useEffect, useContext } from "react";
import { useDropzone } from 'react-dropzone';
import { toast } from "react-toastify";
import { uuid } from 'uuidv4';
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Grid, Hidden } from "@material-ui/core";

// good man : styles ↓
import ArtWorkFlowStyle from "../../../../styles/artworkflow.module.css";

// good man : files ↓
import addFile from "../../../../public/images/icons/importFile.svg";
import errorIcon from "../../../../public/images/icons/error import.svg";
import infoIcon from "../../../../public/images/icons/Info gray.svg";
import useWindowSize from "../../../../Hooks/useWindowSize";
import Info from "../Info";
import CustomCheckBox from "../../../Forms/CustomCheckBox";
import ButtonsList from "./ButtonsList";
import ImgSingle from "./ImgSingle";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import {
  POST_MINTE_UPLOAD_FILE
} from "../../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../../pages/api/config";

// good man : components ↓

export default function SingleFile({
  setMedias,
  selectButton,
  handleSetMain,
  setSelectButton,
  imSingle = false,
  Medias,
  ClassificationID,
  GetData,
  setuploadingInputs,
  IsEmpty = false,
  label = "Mint media",
  setSameMedia,
  SameMedia
}) {

  const GET_ADDED_DATA = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Editions") || '[]' : '[]');

  // dropzone drag and drop uploader
  const { fileRejections, acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg,image/png,image/tiff,image/eps,audio/mp3,audio/mpeg3,audio/mpeg,audio/flac,audio/alac,video/mp4'
  });

  // good man : states ↓
  const [error, setError] = useState(false);
  const [Uploading, setUploading] = useState(false);

  // recognize size of page
  const [width, height] = useWindowSize();

  // select button (01, 02, 03)
  const handleSelectItem = (value) => {
    if (SameMedia === true) {
      handleSetMain();
      if (ClassificationID === 1) {
        setSelectButton(0);
        Cookies.set("Limited-ID", 0);
        // setSelectButton(value ? value : GetData && GetData[0]?.editionNumber);
        // Cookies.set("Limited-ID", value ? value : GetData && GetData[0]?.editionNumber);
      } else {
        setSelectButton(0);
        Cookies.set("Limited-ID", 0);
      }
    } else {
      handleSetMain();
      if (imSingle === true && ClassificationID === 1) {
        setSelectButton(value ? value : GetData && parseInt(GetData[0]?.editionNumber));
        Cookies.set("Limited-ID", value ? value : GetData && parseInt(GetData[0]?.editionNumber));
      } else {
        setSelectButton(value ? value : ClassificationID === 1 ? GET_ADDED_DATA?.map((item, index) => item?.editionNumber)[0] : 0);
        Cookies.set("Limited-ID", value ? value : ClassificationID === 1 ? GET_ADDED_DATA?.map((item, index) => item?.editionNumber)[0] : 0);
      }
    }
  }

  useEffect(() => {
    setMedias(JSON.parse(typeof window !== "undefined" ? localStorage.getItem("Minting-Data") || '[]' : '[]'))
  }, [])

  useEffect(() => {
    handleSelectItem();
  }, [SameMedia]);

  const handleUploadFileApi = () => {
    setuploadingInputs(true);
    setUploading(true);
    let File = new FormData();
    File.append("file", acceptedFiles[0]);

    PostAuthUrl(POST_MINTE_UPLOAD_FILE(localStorage.getItem("collectionId")),
      File
    ).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setError(false);
          setuploadingInputs(false);
          // mrx : chaneg title when state update --------------------------------------------------------------------------------
          if (ClassificationID === 1) {
            if (SameMedia === true) {
              setMedias(
                Medias &&
                Medias?.map((Item) => {
                  return {
                    ...Item, medias: {
                      "fileExtention": res?.data?.data?.fileExtention,
                      "fileName": res?.data?.data?.fileName,
                      "fileSize": res?.data?.data?.fileSize,
                      "fullPath": res?.data?.data?.fullPath,
                      "mintUrl": res?.data?.data?.mintUrl,
                      "type": res?.data?.data?.type,
                      "classificationType": ClassificationID,
                    }
                  };
                })
              );
            } else {
              setMedias(
                Medias &&
                Medias?.map((Item) => {
                  if (parseInt(Item?.editionNumber) === selectButton) {
                    return {
                      ...Item, medias: {
                        "fileExtention": res?.data?.data?.fileExtention,
                        "fileName": res?.data?.data?.fileName,
                        "fileSize": res?.data?.data?.fileSize,
                        "fullPath": res?.data?.data?.fullPath,
                        "mintUrl": res?.data?.data?.mintUrl,
                        "type": res?.data?.data?.type,
                        "classificationType": ClassificationID,
                      }
                    };
                  }
                  return Item;
                })
              );
            }
          } else {
            setMedias(
              Medias &&
              Medias?.map((Item) => {
                if (parseInt(Item?.editionNumber) === selectButton) {
                  return {
                    ...Item, medias: {
                      "fileExtention": res?.data?.data?.fileExtention,
                      "fileName": res?.data?.data?.fileName,
                      "fileSize": res?.data?.data?.fileSize,
                      "fullPath": res?.data?.data?.fullPath,
                      "mintUrl": res?.data?.data?.mintUrl,
                      "type": res?.data?.data?.type,
                      "classificationType": ClassificationID,
                    }
                  };
                }
                return Item;
              })
            );
          }

          // End -----------------------------------------------------------------------------------------------------------------------
          setUploading(false);
        } else {
          handleErrorUploadFile();
          toast.error(res?.data?.message);
          setUploading(false);
          setuploadingInputs(false);
        }
      } else {
        toast.error("something went wrong !");
        setUploading(false);
      }
    });
  }

  const handleErrorUploadFile = (e) => {
    setUploading(false);
    setError(true);
    setuploadingInputs(false);
  };

  // mrx : handle upload file api call
  const handleUploadFile = () => {
    setError(false);
    handleUploadFileApi();
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


  const handleDeleteItem = () => {
    if (SameMedia === true) {
      setMedias(
        Medias &&
        Medias?.map((Item) => {
          return {
            ...Item, medias: []
          };
        })
      );
    } else {
      setMedias(
        Medias &&
        Medias?.map((Item) => {
          if (Item?.editionNumber === selectButton) {
            return {
              ...Item, medias: []
            };
          }
          return Item;
        })
      );
    }

  }
  const ItemFile = Medias?.filter((item) => item?.editionNumber === parseInt(selectButton))?.map((item) => item?.medias)[0];
  const ItemFileSame = Medias?.map((item) => item?.medias)[0];

  const handleShowMediaSection = () => {
    if (ClassificationID === 1 || ClassificationID === 0) {
      if (SameMedia === false) {
        if (!JSON.stringify(
          Medias?.filter((item) => item?.editionNumber === parseInt(selectButton))?.map((item) => item?.medias)[0]) === '[]' || ItemFile?.fullPath === null && !Uploading ||
          !Medias?.filter((item) => item?.editionNumber === parseInt(selectButton))?.map((item) => item?.medias)[0] && !Uploading ||
          Medias?.filter((item) => item?.editionNumber === parseInt(selectButton))?.map((item) => item?.medias)[0]?.length < 1 && !Uploading) {
          return true
        } else {
          return false
        }
      } else {
        if (Uploading === true) {
          return false
        } else {
          if (!Medias?.map((item) => item?.medias)[0]?.fullPath?.length) {
            return true
          } else {
            return false
          }
        }
      }
    } else if (ClassificationID === 2) {
      if (SameMedia === false) {
        if (!JSON.stringify(
          Medias?.filter((item) => item?.editionNumber === parseInt(selectButton))?.map((item) => item?.medias)[0]) === '[]' || ItemFile?.fullPath === null && !Uploading ||
          !Medias?.filter((item) => item?.editionNumber === parseInt(selectButton))?.map((item) => item?.medias)[0] && !Uploading ||
          Medias?.filter((item) => item?.editionNumber === parseInt(selectButton))?.map((item) => item?.medias)[0]?.length < 1 && !Uploading) {
          return true
        } else {
          return false
        }
      } else {
        if (Uploading === true) {
          return false
        } else {
          if (!Medias?.filter((item) => item?.editionNumber === parseInt(selectButton))?.map((item) => item?.medias)[0]?.fullPath?.length) {
            return true
          } else {
            return false
          }
        }
      }
    }

  }

  return (
    <Grid item>
      <Grid item className={ArtWorkFlowStyle.labelMintMedia}>
        {label}
      </Grid>
      {
        handleShowMediaSection() ? (
          <>
            <Grid item className={ArtWorkFlowStyle.boxDotted1}>
              <Grid {...getRootProps({ className: 'dropzone32' })}>
                <input {...getInputProps()} />
                <Grid
                  container
                  alignItems="center"
                  justifyContent={width > 960 ? "center" : "space-between"}
                  className={ArtWorkFlowStyle.P_mintEmpty}
                >
                  <Grid item>

                    <Grid container alignItems="center" spacing={2}>
                      <Grid item className={ArtWorkFlowStyle.img_import}>
                        <Image src={error ? errorIcon : addFile} />
                      </Grid>
                      <Grid item>
                        <Grid container direction="column">
                          <Grid item>
                            <Grid container alignItems="center">
                              <Grid item className={ArtWorkFlowStyle.addText}>
                                {width > 960 ? "Add file" : "Mint Media"}
                              </Grid>
                              <Hidden smDown>
                                <Info opacity="0.85">
                                  <Grid item>
                                    This file will be inserted to blcokchain.
                                  </Grid>
                                </Info>
                              </Hidden>
                            </Grid>
                          </Grid>
                          <Hidden smDown>
                            <Grid item className={ArtWorkFlowStyle.text_gray}>
                              Or drop files to upload
                            </Grid>
                          </Hidden>
                        </Grid>
                      </Grid>

                    </Grid>
                  </Grid>
                  <Hidden mdUp>
                    <Info opacity="0.85">
                      <Grid item>This file will be inserted to blcokchain.</Grid>
                    </Info>
                  </Hidden>
                </Grid>
              </Grid>

            </Grid>
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
        ) : (
          <ImgSingle
            handleDeleteItem={handleDeleteItem}
            Item={SameMedia === true && ClassificationID === 1 ? ItemFileSame : Medias?.filter((item) => item?.editionNumber === parseInt(selectButton))?.map((item) => item?.medias)[0]}
            Uploading={Uploading}
          />
        )
      }
      {
        ClassificationID !== 0 && !imSingle === true && (
          <>
            <Grid item className={ArtWorkFlowStyle.boxDotted2}>
              <CustomCheckBox
                label="Media is same for all editions"
                setChecked={setSameMedia}
                checked={SameMedia}
              />
            </Grid>

            <Grid item style={{ marginTop: '-25px' }}>
              <ButtonsList
                SingleFileModal={true}
                handleSelectItem={handleSelectItem}
                selectButton={selectButton}
                allSameImages={SameMedia}
                status={ClassificationID === 1 ? "LimitedEdition" : ""}
              />
            </Grid>

          </>
        )
      }

    </Grid>
  );
}