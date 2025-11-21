import React, { useState, useEffect, useContext } from "react";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import { uuid } from 'uuidv4';

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";

// mrx : Styles ↓
import ArtFlowStyle from "../../../../styles/artworkflow.module.css";

// rmx : files  ↓

// mrx : components ↓
import CustomSelect from "../../../Forms/CustomSelect";
import CustomCheckBox from "../../../Forms/CustomCheckBox";
import InputForm from "../../../Forms/InputForm";
import ButtonAddWeigh from "../ButtonAddWeigh";

// mrx : context ↓
import { Context } from "../../../../context/index";

export default function Original({
  isSingle = false,
  SelectInputData,
  GetData,
  mintingStatus
}) {
  const GET_Local_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Adding-Art-Work") || "[]"
      : "[]"
  );

  // mrx : context
  const {
    ShowenReproduction,
    setShowenReproduction,
    OriginalSectionData,
    setOriginalSectionData
  } = useContext(Context);
  // states ↓
  const [CheckRequired, setCheckRequired] = useState(false);

  const [AddWeight, setAddWeight] = useState(false);
  const [AddFrame, setAddFrame] = useState(false);
  const [UnitID, setUnitID] = useState("");
  const [Width, setWidth] = useState(0);
  const [Height, setHeight] = useState(0);
  const [Depth, setDepth] = useState(0);
  const [Weight, setWeight] = useState(0);
  const [WeightType, setWeightType] = useState("");

  // frame state
  const [FrameUnitID, setFrameUnitID] = useState("");
  const [FrameWidth, seFrametWidth] = useState(0);
  const [FrameHeight, setFrameHeight] = useState(0);
  const [FrameDepth, setFrameDepth] = useState(0);

  const getData = () => {
    if (GET_Local_DATA?.SelectedTypeID === 0) {
      return SelectInputData?.digitalSizeUints;
    } else {
      return SelectInputData?.physicalSizeUints;
    }
  }

  // get data from props
  useEffect(() => {
    setWidth(GetData?.size_Width);
    setHeight(GetData?.size_Height);
    setDepth(GetData?.size_Depth);
    setUnitID(GetData?.size_Unit);
    setAddFrame(GetData?.haveFrame);
    setAddWeight(GetData?.haveWeight);
    setWeightType(GetData?.weigh_Unit);
    setWeight(GetData?.weigh);
    setFrameUnitID(GetData?.frame_Size_Unit);
    seFrametWidth(GetData?.frame_Size_Width);
    setFrameHeight(GetData?.frame_Size_Height);
    setFrameDepth(GetData?.frame_Size_Depth);
  }, [])

  useEffect(() => {
    setOriginalSectionData({
      "size_Width": parseInt(Width?.length ? Width : 0),
      "size_Height": parseInt(Height?.length ? Height : 0),
      "size_Depth": parseInt(Depth?.length ? Depth : 0),
      "size_Unit": UnitID?.length ? UnitID : uuid(),
      "frame_Size_Width": parseInt(FrameWidth?.length ? FrameWidth : 0),
      "frame_Size_Height": parseInt(FrameHeight?.length ? FrameHeight : 0),
      "frame_Size_Depth": parseInt(FrameDepth?.length ? FrameDepth : 0),
      "frame_Size_Unit": FrameUnitID?.length ? FrameUnitID : uuid(),
      "haveWeight": AddWeight,
      "haveFrame": AddFrame,
      "weigh": parseInt(Weight?.length ? Weight : 0),
      "weigh_Unit": WeightType?.length ? WeightType : uuid(),
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

        <Grid style={{ borderTop: "0px" }} item className={`${!isSingle ? ArtFlowStyle.title : ArtFlowStyle.title2}`}>
          {
            isSingle ? "Meserment" : "Original"
          }
        </Grid>

        <Grid item className={ArtFlowStyle.p_4forms}>
          <Grid container className={ArtFlowStyle.fourInput} spacing={1}>
            <Grid item className={ArtFlowStyle.Input3}>
              <InputForm
                value={Width}
                setValue={setWidth}
                type="number"
                locked={mintingStatus === 3 || mintingStatus === 4}
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
                locked={mintingStatus === 3 || mintingStatus === 4}
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
              GET_Local_DATA?.SelectedTypeID !== 0 && (
                <Grid item className={ArtFlowStyle.Input3}>

                  <InputForm
                    value={Depth}
                    setValue={setDepth}
                    type="number"
                    placeHolder="Depth"
                    label=""
                    locked={mintingStatus === 3 || mintingStatus === 4}
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
                locked={mintingStatus === 3 || mintingStatus === 4}
                SelectName={
                  GET_Local_DATA?.SelectedTypeID === 0 ?
                    SelectInputData?.digitalSizeUints?.filter((item) => item?.id === UnitID)?.map((item) => item?.name)
                    :
                    SelectInputData?.physicalSizeUints?.filter((item) => item?.id === UnitID)?.map((item) => item?.name)
                }
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
          GET_Local_DATA?.SelectedTypeID !== 0 && (
            <Grid item className={ArtFlowStyle.P_NoDigitalLimit}>
              <CustomCheckBox
                label="Frame"
                checked={AddFrame} setChecked={() => setAddFrame(!AddFrame)}
              />
            </Grid>
          )
        }

        {/* frame was true showen Start */}

        {AddFrame && GET_Local_DATA?.SelectedTypeID !== 0 && (
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
                GET_Local_DATA?.SelectedTypeID !== 0 && (
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
                  SelectName={
                    GET_Local_DATA?.SelectedTypeID === 0 ?
                      SelectInputData?.digitalSizeUints?.filter((item) => item?.id === UnitID)?.map((item) => item?.name)
                      :
                      SelectInputData?.physicalSizeUints?.filter((item) => item?.id === UnitID)?.map((item) => item?.name)
                  }
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
          GET_Local_DATA?.SelectedTypeID !== 0 && (
            <>
              <Grid item className={ArtFlowStyle.P_ButtonAddWeigh}>
                <ButtonAddWeigh
                  handleAdd={() => setAddWeight(!AddWeight)}
                  addWeight={AddWeight}
                />
                {AddWeight && (
                  <Grid item className={`${ArtWorkStyle.w_100}`}>
                    <Grid container className={ArtWorkStyle.fourInput} spacing={3}>
                      <Grid item className={ArtWorkStyle.Input6}>
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
                      <Grid item className={ArtWorkStyle.Input13}>
                        <CustomSelect
                          Data={SelectInputData?.weghitUints}
                          label="Unit"
                          placeHolder="Choose One"
                          bgColor="#F7F8FA"
                          setValue={setWeightType}
                          value={WeightType}
                          SelectName={SelectInputData?.weghitUints?.filter((item) => item?.id === WeightType)?.map((item) => item?.name)}
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
