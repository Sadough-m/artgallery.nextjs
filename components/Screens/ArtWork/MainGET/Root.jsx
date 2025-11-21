import React, { useState, useEffect, useContext } from "react";
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

export default function Root({
  SelectInputData,
  setRootData,
  Data,
  mintingStatus
}) {
  // mrx : Get classification → ( start ) -----------------------------------------------------------------------
  const GET_Local_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Adding-Art-Work") || "[]"
      : "[]"
  );
  // mrx : End -------------------------------------------------------------------------------------------------

  // mrx : Context → ( start ) ---------------------------------------------------------------------------------
  const {
    SelectedTypeID,
    setSelectedTypeID,
    setShowDisOrSaveLimited,
    setArrayList,
    ArrayList
  } = useContext(Context);
  // mrx : End -------------------------------------------------------------------------------------------------

  // mrx : states → ( start ) ----------------------------------------------------------------------------------
  const [CheckBoxValue, setCheckBoxValue] = useState(false);
  const [CheckBoxType, setCheckBoxType] = useState(GET_Local_DATA?.SelectedTypeID === 0 ? "Physical" : "Digital");
  const [subMedium, setsubMedium] = useState("");
  const [StyleMedium, setStyleMedium] = useState("");

  // ---- select inputs all data Start
  const [subMediumList, setsubMediumList] = useState([]);
  const [mediumStyleList, setmediumStyleList] = useState([]);
  // ---- End

  const [MediumType, setMediumType] = useState(parseInt(GET_Local_DATA?.SelectedTypeID));
  // mrx : End ---------------------------------------------------------------------------------

  // handle GET data in local storage ( start ) ----------------------------------------------------------------
  useEffect(() => {
    setStyleMedium(Data?.styleId ? Data?.styleId : "");
    setsubMedium(Data?.subMediumId ? Data?.subMediumId : "");
    setMediumType(Data?.medium ? parseInt(Data?.medium) : 0);
    setCheckBoxValue(Data?.haveDigitalOrPhysicalVersion ? Data?.haveDigitalOrPhysicalVersion : "");
  }, [Data])
  // End -------------------------------------------------------------------------------------------------------

  // handle add data in local storage ( start )-----------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("Add-Artwork-StyleMedium", StyleMedium);
    // collect data for edit  ----------------------------------------------------------------------------------
    setRootData({
      "styleMedium": StyleMedium,
      "subMedium": subMedium,
      "mediumType": MediumType,
      "checkBoxValue": CheckBoxValue,
    })
    // End  ----------------------------------------------------------------------------------------------------
  }, [StyleMedium])

  useEffect(() => {
    localStorage.setItem("Add-Artwork-subMedium", subMedium);
    // collect data for edit  ----------------------------------------------------------------------------------
    setRootData({
      "styleMedium": StyleMedium,
      "subMedium": subMedium,
      "mediumType": MediumType,
      "checkBoxValue": CheckBoxValue,
    })
    // End  ----------------------------------------------------------------------------------------------------
  }, [subMedium])

  useEffect(() => {
    localStorage.setItem("Add-Artwork-MediumType", MediumType);
    // collect data for edit  ----------------------------------------------------------------------------------
    setRootData({
      "styleMedium": StyleMedium,
      "subMedium": subMedium,
      "mediumType": MediumType,
      "checkBoxValue": CheckBoxValue,
    })
    // End  ----------------------------------------------------------------------------------------------------
  }, [MediumType])

  useEffect(() => {
    localStorage.setItem("Add-Artwork-CheckBoxValue", CheckBoxValue);
    // collect data for edit  ----------------------------------------------------------------------------------
    setRootData({
      "styleMedium": StyleMedium,
      "subMedium": subMedium,
      "mediumType": MediumType,
      "checkBoxValue": CheckBoxValue,
    })
    // End  ----------------------------------------------------------------------------------------------------
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
                  locked={mintingStatus === 3 || mintingStatus === 4}
                  placeHolder="Choose one"
                  onChange={() => {
                    setShowDisOrSaveLimited(true); setArrayList(
                      ArrayList &&
                      ArrayList?.map((Item) => {
                        if (Item.id === 3) {
                          return { ...Item, isNeeded: true };
                        }
                        return Item;
                      })
                    )
                  }}
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
                  locked={mintingStatus === 3 || mintingStatus === 4}
                  onChange={() => setShowDisOrSaveLimited(true)}
                  Value={subMedium}
                  setSelectName={setStyleMedium}
                  SelectName={subMediumList?.filter((item) => item?.id === subMedium)?.map((item) => item?.name)}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item className={ArtWorkFlowStyle.P_NoDigitalLimit}>
          {
            SelectInputData?.medium?.length !== 1 && (
              <CustomCheckBox
                label={`${CheckBoxType} edition form this.`}
                checked={CheckBoxValue}
                setChecked={setCheckBoxValue}
              />
            )
          }
        </Grid> */}
          <CustomSelect
            label="Style"
            placeHolder="Choose one"
            Data={mediumStyleList}
            setValue={setStyleMedium}
            Value={StyleMedium}
            onChange={() => setShowDisOrSaveLimited(true)}
            setSelectName={setStyleMedium}
            SelectName={mediumStyleList?.filter((item) => item?.id === StyleMedium)?.map((item) => item?.name)}
          />
        </Grid>


      </Grid>
    </Grid>
  );
}
