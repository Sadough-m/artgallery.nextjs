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
  Data
}) {
  // mrx : context Data Start ------------------------------------------------------------------------------------
  const {
    StatuseID,
    setStatuseID,
    AvailibilityID,
    setAvailibilityID
  } = useContext(Context);
  // mrx : End ---------------------------------------------------------------------------------------------------

  const StData = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Adding-Art-Work") || "[]"
      : "[]"
  );
  useEffect(() => {
    setStatuseID(SelectInputData?.availabilityStatuse?.map((item) => item?.id)[0])
    setAvailibilityID(SelectInputData?.availabilityType?.map((item) => item?.id)[0])
  }, [SelectInputData])

  useEffect(() => {
    localStorage.setItem("Add-Artwork-StatuseID", StatuseID && StatuseID);
  }, [StatuseID])

  useEffect(() => {
    localStorage.setItem("Add-Artwork-AvailibilityID", AvailibilityID && AvailibilityID);
  }, [AvailibilityID])

  useEffect(() => {
    localStorage.setItem("Add-Artwork-StatuseID", parseInt(StData?.SelectedStatuseID));
    setStatuseID(parseInt(StData?.SelectedStatuseID));
  }, [SelectInputData])

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
                setValue={setStatuseID}
                Value={StatuseID}
                SelectName={
                  SelectInputData?.availabilityStatuse?.filter((item) => item?.id === StatuseID)?.map((item) => item?.name)
                }
                setSelectName={setStatuseID}
              />
            </Grid>
            <Grid item className={`${styles.TwoInput}`}>
              <CustomSelect
                haveIcon={true}
                Data={SelectInputData?.availabilityType}
                label="Availibility"
                placeHolder="Choose one"
                setValue={setAvailibilityID}
                Value={AvailibilityID}
                SelectName={
                  SelectInputData?.availabilityType?.filter((item) => item?.id === AvailibilityID)?.map((item) => item?.name)
                }
                setSelectName={setAvailibilityID}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
