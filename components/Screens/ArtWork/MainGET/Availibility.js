import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

// mrx : Styles ↓
import ArtWorkFlowStyle from "../../../../styles/artworkflow.module.css";
import styles from "../../../../styles/Home.module.css";

// mrx : context ↓
import { Context } from "../../../../context/index";

// rmx : files  ↓

// mrx : components ↓

import CustomSelect from "../../../Forms/CustomSelect";
import CustomCheckBox from "../../../Forms/CustomCheckBox";
import InputForm from "../../../Forms/InputForm";
import File from "../../../Forms/File";

export default function Availibility({
  SelectInputData,
  Data,
  StatuseID,
  AvalibilatyData = [],
  setStatuseID,
  AvailibilityID,
  setAvailibilityID
}) {

  // mrx : context
  const {
    setShowDisOrSaveLimited
  } = useContext(Context);
  //  End -------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    localStorage.setItem("Add-Artwork-StatuseID", StatuseID && StatuseID);
  }, [StatuseID])

  useEffect(() => {
    localStorage.setItem("Add-Artwork-AvailibilityID", AvailibilityID && AvailibilityID);
  }, [AvailibilityID])

  useEffect(() => {
    if (AvalibilatyData[0]) {
      setStatuseID(AvalibilatyData[0]?.Status);
      setAvailibilityID(AvalibilatyData[0]?.Type);
    }
  }, [AvalibilatyData])

  return (
    <Grid item>
      <Grid
        container
        alignItems="center"
        direction="column"
        className={`${ArtWorkFlowStyle.box}`}
      >
        <span className={ArtWorkFlowStyle.obj_for_id} id="Availibility"></span>

        <Grid item className={`${ArtWorkFlowStyle.title}`}>
          Availibility
        </Grid>

        <Grid item className={`${styles.w_100}`}>
          <Grid container className={`${styles.TwoForm}`}>
            <Grid item className={`${styles.TwoInput}`}>
              <CustomSelect
                Data={SelectInputData?.availabilityStatuse}
                label="Statuse"
                placeHolder="Choose one"
                onChange={() => setShowDisOrSaveLimited(true)}
                setValue={setStatuseID}
                Value={StatuseID}
                setSelectName={setStatuseID}
                SelectName={
                  SelectInputData?.availabilityStatuse?.filter((item) => item?.id === StatuseID)?.map((item) => item?.name)
                }
              />
            </Grid>
            <Grid item className={`${styles.TwoInput}`}>
              <CustomSelect
                Data={SelectInputData?.availabilityType}
                haveIcon={true}
                label="Availibility"
                onChange={() => setShowDisOrSaveLimited(true)}
                placeHolder="Choose one"
                setValue={setAvailibilityID}
                Value={AvailibilityID}
                setSelectName={setAvailibilityID}
                SelectName={
                  SelectInputData?.availabilityType?.filter((item) => item?.id === AvailibilityID)?.map((item) => item?.name)
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}