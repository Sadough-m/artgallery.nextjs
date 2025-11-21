import React, { useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Image from "next/image";

import ArtWorkFlowStyle from "../../styles/artworkflow.module.css";
import img2 from "../../public/images/icons/classifi2.svg";
import { Hidden } from "@material-ui/core";
import FormClassification from "./FormClassification";

// mrx : context ↓
import { Context } from "../../context/index";

// mrx : setCookies with this
import Cookies from "js-cookie";

export default function ClassificationSelect({
  label = "",
  mintingStatus,
  disabled,
  placeHolder = "Choose One",
  bgColor = "#363539",
  SelectInputData,

}) {
  // mrx : context
  const { setClassificationID,RemoveEditons, setRemoveEditons } = useContext(Context);

  const GET_Local_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Adding-Art-Work") || "[]"
      : "[]"
  );

  const [ClassificationID, setClassificationIDS] = useState(GET_Local_DATA?.SelectedClassificationID);

  const handleRemoveEditions = () => {
    setRemoveEditons(true);
    localStorage.removeItem("ArtWork-Editions-Media");
    localStorage.setItem("UploadingFileMedia", '[]');
  }

  useEffect(() => {
    if (GET_Local_DATA?.SelectedClassificationID === 0) {
      setClassificationIDS("Unique");
      handleRemoveEditions();
    } else if (GET_Local_DATA?.SelectedClassificationID === 1) {
      setClassificationIDS("Limited edition");
      handleRemoveEditions();
    } else if (GET_Local_DATA?.SelectedClassificationID === 2) {
      setClassificationIDS("Reproduction");
      handleRemoveEditions();
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "Adding-Art-Work",
      JSON.stringify(
        {
          "SelectedTypeID": GET_Local_DATA?.SelectedTypeID,
          "SelectedClassificationID": ClassificationID === "Reproduction" ? 2 : ClassificationID === "Limited edition" ? 1 : ClassificationID === "Unique" ? 0 : 0,
          "SelectedStatuseID": GET_Local_DATA?.SelectedStatuseID
        }
      )
    );

    Cookies.set("ClassificationID",
      ClassificationID === "Reproduction" ? 2 : ClassificationID === "Limited edition" ? 1 : ClassificationID === "Unique" ? 0 : 0
    );

    setClassificationID(ClassificationID === "Reproduction" ? 2 : ClassificationID === "Limited edition" ? 1 : ClassificationID === "Unique" ? 0 : 0);
  }, [ClassificationID]);

  return (
    <Grid item>
      <Grid item className={ArtWorkFlowStyle.P_classification}>
        <Hidden smDown>
          <Grid item className={ArtWorkFlowStyle.img__classification}>
            <Image src={img2} />
          </Grid>
        </Hidden>
        <FormClassification
          handleRemoveEditions={handleRemoveEditions}
          disabled={disabled}
          locked={mintingStatus === 3 || mintingStatus === 4}
          label={label}
          Data={SelectInputData?.classification}
          bgColor={bgColor}
          value={ClassificationID}
          setValue={setClassificationIDS}
          placeHolder={placeHolder}
        />
      </Grid>
    </Grid>

  );
}
