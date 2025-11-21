import React, { useState, useEffect, useContext } from "react";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import { uuid } from 'uuidv4';

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

// mrx : Styles ↓
import ArtFlowStyle from "../../../../styles/artworkflow.module.css";
import styles from "../../../../styles/Home.module.css";

// rmx : files  ↓

// mrx : components ↓
import CustomSelect from "../../../Forms/CustomSelect";
import CustomCheckBox from "../../../Forms/CustomCheckBox";
import InputForm from "../../../Forms/InputForm";
import { Button } from "@material-ui/core";
import ButtonAddWeigh from "../ButtonAddWeigh";
import AddWeigh from "../AddWeigh";
import FrameForms from "../FrameForms";

// mrx : context ↓
import { Context } from "../../../../context/index";

export default function Original({ SelectInputData }) {
  const GET_Local_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Adding-Art-Work") || "[]"
      : "[]"
  );

  // mrx : context
  const { OriginalSectionData, SelectedTypeID, setOriginalSectionData } = useContext(Context);
  // states ↓
  const [CheckRequired, setCheckRequired] = useState(false);
  const [Data, setData] = useState([]);

  const [AddWeight, setAddWeight] = useState(Data?.haveWeight);
  const [AddFrame, setAddFrame] = useState(Data?.haveFrame);
  const [UnitID, setUnitID] = useState(0);
  const [UnitIDSelectName, setUnitIDSelectName] = useState("");
  const [Width, setWidth] = useState(Data?.size_Width);
  const [Height, setHeight] = useState(Data?.size_Height);
  const [Depth, setDepth] = useState(Data?.size_Depth);
  const [Weight, setWeight] = useState(Data?.weigh);
  const [WeightType, setWeightType] = useState(Data?.type);

  // frame state
  const [FrameUnitIDSelectName, setFrameUnitIDSelectName] = useState("");
  const [FrameUnitID, setFrameUnitID] = useState(Data?.frame_Size_Unit);
  const [FrameWidth, seFrametWidth] = useState(Data?.frame_Size_Width);
  const [FrameHeight, setFrameHeight] = useState(Data?.frame_Size_Height);
  const [FrameDepth, setFrameDepth] = useState(Data?.frame_Size_Depth);

  const getData = () => {
    if (SelectedTypeID === 0) {
      return SelectInputData?.digitalSizeUints;
    } else {
      return SelectInputData?.physicalSizeUints;
    }
  }

  useEffect(() => {
    setUnitID(SelectedTypeID === 0 ?
      SelectInputData?.digitalSizeUints?.map((item) => item?.id)[0]
      :
      SelectInputData?.physicalSizeUints?.map((item) => item?.id)[0])
    setFrameUnitID(
      SelectedTypeID === 0 ?
        SelectInputData?.digitalSizeUints?.map((item) => item?.id)[0]
        :
        SelectInputData?.physicalSizeUints?.map((item) => item?.id)[0]
    )
    setWeightType(SelectInputData?.weghitUints?.map((item) => item?.id)[0])
  }, [getData])

  useEffect(() => {
    setOriginalSectionData({
      "size_Width": parseInt(Width ? Width : 0),
      "size_Height": parseInt(Height ? Height : 0),
      "size_Depth": parseInt(Depth ? Depth : 0),
      "size_Unit": UnitID,
      "frame_Size_Width": parseInt(FrameWidth ? FrameWidth : 0),
      "frame_Size_Height": parseInt(FrameHeight ? FrameHeight : 0),
      "frame_Size_Depth": parseInt(FrameDepth ? FrameDepth : 0),
      "frame_Size_Unit": FrameUnitID ? FrameUnitID : uuid(),
      "haveWeight": AddWeight,
      "haveFrame": AddFrame,
      "weigh": parseInt(Weight ? Weight : 0),
      "weigh_Unit": WeightType ? WeightType : uuid(),
      "editionNumber": 0
    })
  }, [Width, Height, Depth, UnitID, FrameWidth, FrameHeight, FrameDepth, FrameUnitID, AddWeight, AddFrame, Weight, WeightType])

  useEffect(() => {
    localStorage.setItem("Add-ArtWork-Original", JSON.stringify(OriginalSectionData))
  }, [OriginalSectionData])

  return (
    <Grid item>
      <Grid
        container
        alignItems="center"
        direction="column"
        className={`${ArtFlowStyle.box}`}
      >
        <span className={ArtFlowStyle.obj_for_id} id="Original"></span>

        <Grid item className={`${ArtFlowStyle.title}`}>
          Original
        </Grid>

        <Grid item className={ArtFlowStyle.p_4forms}>
          <Grid container className={ArtFlowStyle.fourInput} spacing={1}>
            <Grid item className={ArtFlowStyle.Input3}>
              <InputForm
                value={Width}
                setValue={setWidth}
                type="number"
                placeHolder="Width"
                label="Size"
                setCheckRequired={setCheckRequired}
                validateFlag={CheckRequired}
                schema={Joi.string()
                  .empty({ tlds: { allow: false } })
                  .messages({
                    "string.empty": `item required`,
                  })}
              />
            </Grid>
            <Grid item className={ArtFlowStyle.Input3}>
              <InputForm
                value={Height}
                setValue={setHeight}
                type="number"
                placeHolder="Height"
                label=""
                setCheckRequired={setCheckRequired}
                validateFlag={CheckRequired}
                schema={Joi.string()
                  .empty({ tlds: { allow: false } })
                  .messages({
                    "string.empty": `item required`,
                  })}
              />
            </Grid>
            {/* if type was digital dont show this item */}
            {
              SelectedTypeID !== 0 && (
                <Grid item className={ArtFlowStyle.Input3}>

                  <InputForm
                    value={Depth}
                    setValue={setDepth}
                    type="number"
                    placeHolder="Depth"
                    label=""
                    setCheckRequired={setCheckRequired}
                    validateFlag={CheckRequired}
                    schema={Joi.string()
                      .empty({ tlds: { allow: false } })
                      .messages({
                        "string.empty": `item required`,
                      })}
                  />

                </Grid>
              )
            }

            <Grid item className={ArtFlowStyle.Input1}>
              <CustomSelect
                Data={getData()}
                label="Unit"
                placeHolder="Choose One"
                bgColor="#F7F8FA"
                setValue={setUnitID}
                value={UnitID}
                SelectName={SelectedTypeID === 0 ?
                  SelectInputData?.digitalSizeUints?.filter((item) => item?.id === UnitID)?.map((item) => item?.name)
                  :
                  SelectInputData?.physicalSizeUints?.filter((item) => item?.id === UnitID)?.map((item) => item?.name)}
                setSelectName={setUnitID}
                setCheckRequired={setCheckRequired}
                validateFlag={CheckRequired}
                schema={Joi.string()
                  .empty({ tlds: { allow: false } })
                  .messages({
                    "string.empty": `Unit is required`,
                  })}
              />
            </Grid>
          </Grid>
        </Grid>


        {
          SelectedTypeID !== 0 && (
            <Grid item className={ArtFlowStyle.P_NoDigitalLimit}>
              <CustomCheckBox
                label="Frame"
                checked={AddFrame} setChecked={() => setAddFrame(!AddFrame)}
              />
            </Grid>
          )
        }

        {/* frame was true showen Start */}

        {AddFrame && SelectedTypeID !== 0 && (
          <Grid item>
            <Grid container className={ArtFlowStyle.fourInput} spacing={1}>
              <Grid item className={ArtFlowStyle.Input3}>
                <InputForm
                  value={FrameWidth}
                  setValue={seFrametWidth}
                  type="number"
                  placeHolder="Width"
                  label="Size"
                  setCheckRequired={setCheckRequired}
                  validateFlag={CheckRequired}
                  schema={Joi.string()
                    .empty({ tlds: { allow: false } })
                    .messages({
                      "string.empty": `item required`,
                    })}
                />
              </Grid>
              <Grid item className={ArtFlowStyle.Input3}>
                <InputForm
                  value={FrameHeight}
                  setValue={setFrameHeight}
                  type="number"
                  placeHolder="Height"
                  label=""
                  setCheckRequired={setCheckRequired}
                  validateFlag={CheckRequired}
                  schema={Joi.string()
                    .empty({ tlds: { allow: false } })
                    .messages({
                      "string.empty": `item required`,
                    })}
                />
              </Grid>
              {/* if type was digital dont show this item */}

              {
                SelectedTypeID !== 0 && (
                  <Grid item className={ArtFlowStyle.Input3}>
                    <InputForm
                      value={FrameDepth}
                      setValue={setFrameDepth}
                      type="number"
                      placeHolder="Depth"
                      label=""
                      setCheckRequired={setCheckRequired}
                      validateFlag={CheckRequired}
                      schema={Joi.string()
                        .empty({ tlds: { allow: false } })
                        .messages({
                          "string.empty": `item required`,
                        })}
                    />
                  </Grid>
                )
              }
              <Grid item className={ArtFlowStyle.Input1}>
                <CustomSelect
                  Data={getData()}
                  label="Unit"
                  placeHolder="Choose One"
                  bgColor="#F7F8FA"
                  setValue={setFrameUnitID}
                  value={FrameUnitID}
                  SelectName={SelectedTypeID === 0 ?
                    SelectInputData?.digitalSizeUints?.filter((item) => item?.id === FrameUnitID)?.map((item) => item?.name)
                    :
                    SelectInputData?.physicalSizeUints?.filter((item) => item?.id === FrameUnitID)?.map((item) => item?.name)}
                  setSelectName={setFrameUnitID}
                  setCheckRequired={setCheckRequired}
                  validateFlag={CheckRequired}
                  schema={Joi.string()
                    .empty({ tlds: { allow: false } })
                    .messages({
                      "string.empty": `Unit is required`,
                    })}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        {/* frame was true showen End */}


        {/* if type was digital dont show this item */}
        {
          SelectedTypeID !== 0 && (
            <>
              <Grid item className={ArtFlowStyle.P_ButtonAddWeigh}>
                <ButtonAddWeigh
                  handleAdd={() => setAddWeight(!AddWeight)}
                  addWeight={AddWeight}
                />
                {AddWeight && (
                  <Grid item className={`${ArtFlowStyle.w_100}`}>
                    <Grid container className={ArtFlowStyle.fourInput} spacing={3}>
                      <Grid item className={ArtFlowStyle.Input6}>
                        <InputForm
                          type="number"
                          placeHolder="Enter weigh"
                          label="Weigh"
                          value={Weight}
                          setValue={setWeight}
                          setCheckRequired={setCheckRequired}
                          validateFlag={CheckRequired}
                          schema={Joi.string()
                            .empty({ tlds: { allow: false } })
                            .messages({
                              "string.empty": `Weigh required`,
                            })}
                        />
                      </Grid>
                      <Grid item className={ArtFlowStyle.Input13}>
                        <CustomSelect
                          Data={SelectInputData?.weghitUints}
                          label="Unit"
                          placeHolder="Choose One"
                          bgColor="#F7F8FA"
                          setValue={setWeightType}
                          value={WeightType}
                          SelectName={SelectInputData?.weghitUints?.filter((item) => item?.id === WeightType)?.map((item) => item?.name)}
                          setSelectName={setWeightType}
                          setCheckRequired={setCheckRequired}
                          validateFlag={CheckRequired}
                          schema={Joi.string()
                            .empty({ tlds: { allow: false } })
                            .messages({
                              "string.empty": `Unit is required`,
                            })}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </>
          )
        }

        {/* <Grid item className={styles.w_100}>
          <Grid container justifyContent="space-between">
            <Grid item className={ArtFlowStyle.form65}>
              <InputForm label="Amount" placeHolder="type here..." />
            </Grid>
            <Grid item className={ArtFlowStyle.form3}>
              <CustomSelect label="Unit" placeHolder="type here..." />
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </Grid>
  );
}
