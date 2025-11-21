import React, { useEffect, useState } from "react";
import Image from "next/image";

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

export default function File({
  label,
  placeHolder = "Import the media",
  Uploading = false,
  Uploaded = false,
  errorUpload = false,
  errorText = "Error sample value.",
  disabled = false,
  locked = false,
  file,
  setFile,
  setUploadFile,
}) {
  // mrx : state ↓
  const [PicAddress, setPicAddress] = useState("");

  const [uploadStatus, setUploadStatus] = useState("import");

  const imgHandler = (e) => {
    setPicAddress(
      e.target.value.replace("C:\\fakepath\\", "").substring(0, 30)
    );
    setUploadFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFile(reader.result);
      } else if (reader.readyState === 1) {
        setUploadStatus("Uploading");
      }
    };
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (PicAddress !== "") {
      setUploadStatus("Uploaded");
    } else {
      setUploadStatus("import");
    }
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
    setPicAddress("");
    setUploadStatus("import");
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
        <Button color="primary" startIcon={<Image src={Import1} />}>
          Import
        </Button>
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

  return (
    <Grid item className={`${styles.P_File}`}>
      <Grid item className={styles.label__input}>
        <label>{label}</label>
      </Grid>
      <Grid item className={styles.posRel}>
        {/* Our Main Input */}
        <input
          value={`${PicAddress}${PicAddress.length > 28 ? "..." : ""}`}
          type="text"
          className={handleStyle()}
          placeholder={placeHolder}
          style={{ paddingLeft: PicAddress !== "" ? "45px" : "10px" }}
          disabled={disabled || locked}
        />

        {/* input Just For Click And Choose File */}
        <input
          type="file"
          className={styles.input_choose_file}
          onClick={(e) => (e.target.value = "")}
          onChange={(e) => imgHandler(e)}
          style={{ zIndex: uploadStatus !== "import" ? "-5" : "10" }}
          disabled={Uploaded || Uploading || errorUpload || disabled || locked}
        />
        <Grid item className={handlePosButton()}>
          {returnButton()}
        </Grid>
        {errorUpload && (
          <Grid item className={styles.errorText}>
            {errorText}
          </Grid>
        )}

        {/* Image user Selected */}
        {PicAddress !== "" && (
          <Grid item className={styles.Pic_File_Form}>
            <Grid item className={styles.posRel}>
              <Image
                src={file}
                width={"34px"}
                height={"34px"}
                className={
                  errorUpload || Uploading || uploadStatus === "Uploading"
                    ? styles.imgUploading
                    : styles.img_uploaded
                }
              />
              {(errorUpload || Uploading) && (
                <Grid item className={styles.precent_Completed}>
                  <CircularProgress color="white" size={25} />
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
