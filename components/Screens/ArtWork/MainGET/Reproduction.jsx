import React, { useState, useEffect, useContext } from "react";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import { uuid } from 'uuidv4';
// mrx : material ui ↓
import { Grid, Button } from "@material-ui/core";

// mrx : Styles ↓
import ArtFlowStyle from "../../../../styles/artworkflow.module.css";
import ArtWorkflowStyle from '../../../../styles/artworkflow.module.css'
import ArtWorkStyle from "../../../../styles/artworkflow.module.css";

// rmx : files  ↓

// mrx : components ↓
import CustomSelect from "../../../Forms/CustomSelect";
import InputForm from "../../../Forms/InputForm";
import CustomCheckBox from "../../../Forms/CustomCheckBox";
import ButtonAddWeigh from "../ButtonAddWeigh";

// mrx : context ↓
import { Context } from "../../../../context/index";

export default function Measurment({
  isSingle = false,
  GetData,
  is_inside = false,
  haveTitle = true,
  SelectInputData,
  mintingStatus,
}) {
  // mrx : context
  const {
    ShowenReproduction,
    setShowenReproduction,
    ReproductionSectionData,
    setReproductionSectionData,
    SignleItemId
  } = useContext(Context);

  const GET_Local_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Adding-Art-Work") || "[]"
      : "[]"
  );

  // states ↓
  const getData = () => {
    if (GET_Local_DATA?.SelectedTypeID === 0) {
      return SelectInputData?.digitalSizeUints;
    } else {
      return SelectInputData?.physicalSizeUints;
    }
  }

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
    setReproductionSectionData({
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
      "editionNumber": 1
    })
  }, [Width, Height, Depth, UnitID, FrameWidth, FrameHeight, FrameDepth, FrameUnitID, AddWeight, AddFrame, Weight, WeightType])

  useEffect(() => {
    localStorage.setItem("Add-ArtWork-Reproduction", JSON.stringify(ReproductionSectionData))
  }, [ReproductionSectionData])

  return (
    <Grid item>
      <Grid
        container
        direction="column"
        style={{ paddingTop: "0px" }}
        className={is_inside ? ArtFlowStyle.titleEditions1 : ArtFlowStyle.box}
      >
        <span className={ArtFlowStyle.obj_for_id} id="Reproduction"></span>

        <Grid style={{ borderTop: "0px" }} item className={`${ArtFlowStyle.title3}`}>
          {
            isSingle ? "Meserment" : "Reproduction"
          }
        </Grid>
        {
          isSingle ? ""
            :
            (
              <Grid item className={ArtFlowStyle.P_NoDigitalLimit}>
                <CustomCheckBox
                  label="Original pieces not available"
                  setChecked={setShowenReproduction}
                  checked={ShowenReproduction === true}
                />
              </Grid>
            )
        }

        <Grid item className={ArtFlowStyle.p_4forms}>
          <Grid container className={ArtFlowStyle.fourInput} spacing={1}>
            <Grid item className={ArtFlowStyle.Input3}>
              <InputForm
                value={Width}
                setValue={setWidth}
                locked={mintingStatus === 3 || mintingStatus === 4}
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
                locked={mintingStatus === 3 || mintingStatus === 4}
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
                    value={Depth}
                    setValue={setDepth}
                    locked={mintingStatus === 3 || mintingStatus === 4}
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
                locked={mintingStatus === 3 || mintingStatus === 4}
                bgColor="#F7F8FA"
                setValue={setUnitID}
                value={UnitID}
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
            <Grid item className={`${ArtFlowStyle.mtb_10} ${ArtFlowStyle.ml_4}`}>
              <CustomCheckBox label="Frame" checked={AddFrame} setChecked={() => setAddFrame(!AddFrame)} />
            </Grid>
          )
        }

        {/* frame was true showen Start */}

        {AddFrame && GET_Local_DATA?.SelectedTypeID !== 0 && (
          <Grid item>
            <Grid container className={ArtWorkflowStyle.fourInput} spacing={1}>
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
              <Grid item className={ArtWorkflowStyle.Input1}>
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

        {/* <Grid item className={`${ArtFlowStyle.title2}`}>
          Pricing
        </Grid>

        <Grid item>
          <Grid container className={ArtFlowStyle.fourInput} spacing={3}>
            <Grid item className={ArtFlowStyle.Input6}>
              <InputForm
                type="number"
                placeHolder="Enter a number"
                label="Amount"
              />
            </Grid>
            <Grid item className={ArtFlowStyle.Input13}>
              <CustomSelect
                label="Unit"
                placeHolder="Choose One"
                bgColor="#F7F8FA"
              />
            </Grid>
          </Grid>
        </Grid> */}
        {/* <Grid item className={`${ArtFlowStyle.title2}`}>
          Internal
        </Grid>
        <Grid container className={`${styles.TwoForm}`}>
          <Grid item className={`${styles.TwoInput}`}>
            <InputForm type="text" placeHolder="Enter first name" label="SKU" />
          </Grid>
          <Grid item className={`${styles.TwoInput}`}>
            <InputForm
              type="text"
              placeHolder="Enter last name"
              label="Quantity"
            />
          </Grid>
        </Grid> */}
      </Grid>
    </Grid>
  );
}
