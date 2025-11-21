import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";

// mrx : Styles ↓
import ArtWorkFlowStyle from "../../../../styles/artworkflow.module.css";
import styles from "../../../../styles/Home.module.css";

// rmx : files  ↓

// mrx : components ↓
import CustomSelect from "../../../Forms/CustomSelect";
import CustomCheckBox from "../../../Forms/CustomCheckBox";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : context ↓
import { Context } from "../../../../context/index";

// mrx : api links ↓
import { GET_SUBMEDIUMS_BY_ID, GET_STYLE_INPUT_BY_ID } from "../../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../../pages/api/config";

// mrx : Get classification → ( start ) -----------------------------------------------------------------------
export default function Root({ SelectInputData }) {
  const GET_Local_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Adding-Art-Work") || "[]"
      : "[]"
  );
  // mrx : End -------------------------------------------------------------------------------------------------

  // mrx : Context → ( start ) ---------------------------------------------------------------------------------
  const { SelectedTypeID, setSelectedTypeID, RootMedumeType } = useContext(Context);
  // mrx : End -------------------------------------------------------------------------------------------------

  // mrx : states → ( start ) ----------------------------------------------------------------------------------
  const [CheckBoxValue, setCheckBoxValue] = useState(false);
  const [CheckBoxType, setCheckBoxType] = useState(GET_Local_DATA?.SelectedTypeID === 0 ? "Digital" : "Physical");
  const [subMedium, setsubMedium] = useState(0);
  const [StyleMedium, setStyleMedium] = useState(0);

  // ---- select inputs all data Start
  const [subMediumList, setsubMediumList] = useState([]);
  const [mediumStyleList, setmediumStyleList] = useState([]);
  // ---- End

  const [MediumType, setMediumType] = useState(0);
  // mrx : End --------------------------------------------------------------------------------------------------

  const DataAdding = typeof window !== "undefined" ? localStorage.getItem("Adding-Art-Work") || {} : {};

  // handle GET data in local storage ( start )
  useEffect(() => {
    setStyleMedium(typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-StyleMedium") || 0 : 0);
    setsubMedium(typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-subMedium") || 0 : 0);
    setMediumType(RootMedumeType === 2 ? 0 : RootMedumeType);
    setCheckBoxValue(typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-CheckBoxValue") || false : false);
  }, [])
  // handle GET data in local storage ( end )

  // handle add data in local storage ( start ) -----------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("Add-Artwork-StyleMedium", StyleMedium);
  }, [StyleMedium])

  useEffect(() => {
    localStorage.setItem("Add-Artwork-subMedium", subMedium);
  }, [subMedium])

  useEffect(() => {
    localStorage.setItem("Add-Artwork-MediumType", MediumType);
  }, [MediumType])

  useEffect(() => {
    localStorage.setItem("Add-Artwork-CheckBoxValue", CheckBoxValue);
  }, [CheckBoxValue])
  // End -------------------------------------------------------------------------------------------------------

  // get subMedium by medium id ( start ) ----------------------------------------------------------------------
  const HANLDE_GET_SUBMEDIUMS_BY_ID = () => {
    if (MediumType !== undefined) {
      GetAuthUrl(GET_SUBMEDIUMS_BY_ID(MediumType)).then(
        (res, err) => {
          if (res && res.status === 200) {
            if (res?.data?.isSuccess) {
              setsubMediumList(res?.data?.data);
              setsubMedium(res?.data?.data?.map((item) => item?.id)[0])
            } else {
              toast.error(res?.data?.message);
            }
          } else {
            toast.error("something went wrong !");
          }
        }
      );
    }
  }
  // End -------------------------------------------------------------------------------------------------------

  // get mediume style data by medium id ( start ) -------------------------------------------------------------
  const HANLDE_GET_STYLEsELECT_BY_ID = () => {
    if (MediumType !== undefined) {
      GetAuthUrl(GET_STYLE_INPUT_BY_ID(MediumType)).then(
        (res, err) => {
          if (res && res.status === 200) {
            if (res?.data?.isSuccess) {
              setmediumStyleList(res?.data?.data);
              setStyleMedium(res?.data?.data?.map((item) => item?.id)[0])
            } else {
              toast.error(res?.data?.message);
            }
          } else {
            toast.error("something went wrong !");
          }
        }
      );
    }
  }
  // End -------------------------------------------------------------------------------------------------------

  useEffect(() => {
    HANLDE_GET_SUBMEDIUMS_BY_ID()
    HANLDE_GET_STYLEsELECT_BY_ID()
    if (GET_Local_DATA?.SelectedTypeID === 2) {
      setCheckBoxValue(true)
    } else {
      setCheckBoxValue(false)
    }

    if (MediumType === 1) {
      setCheckBoxType("Digital")
    } else if (MediumType === 0) {
      setCheckBoxType("Physical")
    }

  }, [MediumType])

  useEffect(() => {
    localStorage.setItem(
      "Adding-Art-Work",
      JSON.stringify(
        {
          "SelectedTypeID": MediumType,
          "SelectedClassificationID": GET_Local_DATA?.SelectedClassificationID,
          "SelectedStatuseID": GET_Local_DATA?.SelectedStatuseID
        }
      )
    );
    setSelectedTypeID(MediumType);
  }, [MediumType])

  return (
    <Grid item>
      <Grid
        container
        alignItems="center"
        direction="column"
        className={`${ArtWorkFlowStyle.box}`}
      >
        <span className={ArtWorkFlowStyle.obj_for_id} id="Root"></span>

        <Grid item className={`${ArtWorkFlowStyle.title}`}>
          Root
        </Grid>
        <Grid item xs={12} className={`${styles.w_100}`}>
          <Grid item className={`${styles.w_100}`}>
            <Grid container className={`${styles.TwoForm}`}>
              <Grid item className={`${styles.TwoInput}`}>
                <CustomSelect
                  Data={SelectInputData?.medium}
                  label="Medium"
                  placeHolder="Choose one"
                  setValue={setMediumType}
                  Value={MediumType}
                  SelectName={SelectInputData?.medium?.filter((item) => item?.id === MediumType)?.map((item) => item?.name)}
                  setSelectName={setMediumType}
                />
              </Grid>
              <Grid item className={`${styles.TwoInput} ${ArtWorkFlowStyle.m_top_negatvie}`}>
                <CustomSelect
                  label=""
                  placeHolder="Choose one"
                  Data={subMediumList}
                  setValue={setsubMedium}
                  Value={subMedium}
                  SelectName={
                    subMediumList?.filter((item) => item?.id === subMedium)?.map((item) => item?.name)
                  }
                  setSelectName={setsubMedium}
                />
              </Grid>
            </Grid>
          </Grid>


          <Grid item className={ArtWorkFlowStyle.P_NoDigitalLimit}>
            {
              SelectInputData?.medium?.length !== 1 && (
                <CustomCheckBox
                  label={`${CheckBoxType} edition form this.`}
                  checked={CheckBoxValue}
                  setChecked={setCheckBoxValue}
                />
              )
            }
          </Grid>

          <CustomSelect
            label="Style"
            placeHolder="Choose one"
            Data={mediumStyleList}
            setValue={setStyleMedium}
            Value={StyleMedium}
            SelectName={
              mediumStyleList?.filter((item) => item?.id === StyleMedium)?.map((item) => item?.name)
            }
            setSelectName={setStyleMedium}
          />
        </Grid>


      </Grid>
    </Grid>
  );
}
