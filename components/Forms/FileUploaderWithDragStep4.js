import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';

// mrx : styles ↓
import styles from "../../styles/Home.module.css";

// rmx : files  ↓
import Import1 from "../../public/images/icons/Plus - Circle.svg";
import PicSelected from "../../public/images/test for import.png";
import close from "../../public/images/icons/Close blue.svg";
import remove from "../../public/images/icons/Remove blue.svg";
import circleDisabled from "../../public/images/icons/Plus - Circle disbled.svg";
import lock from "../../public/images/icons/Lock.svg";

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";

// mrx : api links ↓
import {
  BASE_Image_Url,
  UPLOAD_COLLECTION_LOGO_Step4,
  POST_UPLOAD_FILE,
  HANDLE_REMOVE_FILE
} from "../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../pages/api/config";

export default function File({
  label,
  placeHolder = "Import the media",
  errorText = "File format not supported",
  disabled = false,
  locked = false,
  file,
  UploadingFileUrl,
  setUploadingFileUrl,
  SelectName = false,
  FileExtensionP = ""
}) {

  // mrx : state ↓
  const [uploadStatus, setUploadStatus] = useState("import");
  const [errorUpload, seterrorUpload] = useState(false);
  const [Uploading, setUploading] = useState(true);
  const [FileName, setFileName] = useState("");
  const [FileExtension, setFileExtension] = useState("");

  useEffect(() => {
    setFileExtension(FileExtensionP)
  }, [FileExtensionP])

  // dropzone drag and drop uploader
  const { fileRejections, acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg,image/png,image/tiff,image/eps', disabled: uploadStatus === "import" ? false : false
  });

  // good man : set pos buttons
  const handlePosButton = () => {
    if (locked) {
      return styles.imgLocked;
    } else return styles.button_ChooseFile;
  };

  // good man : set style of inputs
  const handleStyle = () => {
    if (disabled) {
      return styles.CustomFile_disabled;
    } else if (locked) {
      return styles.CustomFile_locked;
    } else if (errorUpload) {
      return styles.CustomFile_Error;
    } else return styles.CustomFile;
  };

  // good man : remove Pic When User Clicked Button Remove ↓
  const removePic = () => {
    setUploadingFileUrl("");
    setUploadStatus("import");

    GetAuthUrl(HANDLE_REMOVE_FILE(FileName)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
        } else {
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  // good man : change Button in different situations ↓
  const returnButton = () => {
    if (disabled) {
      return (
        <Button
          className={styles.button_disbled_file}
          startIcon={<Image src={circleDisabled} />}
        >
          Import
        </Button>
      );
    } else if (locked) {
      return <Image src={lock} />;
    } else if (uploadStatus === "import") {
      return (
        <>
          <Grid style={{
            height: "40px",
            outline: "none"
          }} {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <Button color="primary" startIcon={<Image src={Import1} />}>
              Import
            </Button>
          </Grid>
        </>

      );
    } else if (Uploading || uploadStatus === "Uploading") {
      return (
        <Button
          color="primary"
          startIcon={<Image src={close} />}
          onClick={removePic}
        >
          Cancel
        </Button>
      );
    } else if (uploadStatus === "Uploaded") {
      return (
        <Button
          color="primary"
          startIcon={<Image src={remove} />}
          onClick={removePic}
        >
          Remove
        </Button>
      );
    } else if (errorUpload) {
      return (
        <Button
          color="primary"
          startIcon={<Image src={close} />}
          onClick={removePic}
        >
          Cancel
        </Button>
      );
    }
  };

  // mrx : handle upload file api call
  const handleUploadFile = () => {
    seterrorUpload(false);
    handleUploadFileApi();
  };

  const handleUploadFileApi = () => {
    setUploadStatus("Uploading")
    setUploading(true);
    let File = new FormData();
    File.append("file", acceptedFiles[0]);

    PostAuthUrl(UPLOAD_COLLECTION_LOGO_Step4,
      File
    ).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          seterrorUpload(false);
          setUploading(false);
          setUploadStatus("Uploaded");
          setFileName(res?.data?.data?.fileName)
          setUploadingFileUrl(res?.data?.data?.fullPath);
          setFileExtension(res?.data?.data?.fileExtension);

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
    seterrorUpload(true);
    setUploadStatus("import");
  };

  useEffect(() => {
    if (acceptedFiles?.length >= 1) {
      handleUploadFile()
    }
  }, [acceptedFiles])

  useEffect(() => {
    if (fileRejections?.length >= 1) {
      handleErrorUploadFile()
    }
  }, [fileRejections])

  return (
    <Grid item className={`${styles.P_File}`}>
      <Grid item className={styles.label__input}>
        <label>{label}</label>
      </Grid>

      <Grid item className={styles.posRel}>
        {/* Our Main Input */}

        <input
          value={UploadingFileUrl?.length > 1 ? `Cover.${FileExtension}` : ""}
          type="text"
          className={handleStyle()}
          placeholder={placeHolder}
          style={{ paddingLeft: UploadingFileUrl !== "" || uploadStatus === "Uploading" ? "45px" : "10px" }}
          disabled={disabled || locked}
        />
        <Grid style={{
          height: "50px",
          position: "absolute",
          width: "78%",
          marginTop: "-49px",
          outline: "none"
        }} {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
        </Grid>

        <Grid item className={handlePosButton()}>
          {returnButton()}
        </Grid>
        {errorUpload && (
          <Grid item className={styles.errorText}>
            {errorText}
          </Grid>
        )}

        {/* Image user Selected */}
        {UploadingFileUrl !== "" && (
          <Grid item className={styles.Pic_File_Form}>
            <Grid item className={styles.posRel}>
              <img
                src={BASE_Image_Url + UploadingFileUrl}
                width="34px"
                height="34px"
                className={
                  errorUpload || Uploading || uploadStatus === "Uploading"
                    ? styles.imgUploading
                    : styles.img_uploaded
                }
              />
            </Grid>
          </Grid>
        )}

        {
          uploadStatus === "Uploading" && (
            <Grid item className={styles.Pic_File_Form}>
              <Grid item className={styles.posRel}>
                <img
                  src="/images/Default.png"
                  width="34px"
                  height="34px"
                  className={
                    errorUpload || Uploading || uploadStatus === "Uploading"
                      ? styles.imgUploading
                      : styles.img_uploaded
                  }
                />
                <Grid item className={styles.precent_Completed}>
                  <CircularProgress color="white" size={25} />
                </Grid>
              </Grid>
            </Grid>
          )
        }
      </Grid>
    </Grid>
  );
}
