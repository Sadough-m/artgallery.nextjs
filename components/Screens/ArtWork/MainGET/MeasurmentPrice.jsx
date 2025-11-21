import React, { useState, useEffect, useContext } from "react";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import { uuid } from 'uuidv4';

// mrx : material ui ↓
import { Grid, Button } from "@material-ui/core";

// mrx : Styles ↓
import ArtFlowStyle from "../../../../styles/artworkflow.module.css";
import ArtWorkStyle from "../../../../styles/artworkflow.module.css";
import ArtWorkflowStyle from '../../../../styles/artworkflow.module.css'

// rmx : files  ↓

// mrx : context ↓
import { Context } from "../../../../context/index";

// mrx : components ↓
import CustomSelect from "../../../Forms/CustomSelect";
import InputForm from "../../../Forms/InputForm";
import CustomCheckBox from "../../../Forms/CustomCheckBox";
import AddWeigh from "../AddWeigh";
import ButtonAddWeigh from "../ButtonAddWeigh";
import FrameForms from "../FrameForms";

export default function MeasurmentPrice({ Data, disabled, SelectInputData, setLocalData, LocalData, num }) {

  // mrx : Context → ( start ) ---------------------------------------------------------------------------------
  const { SelectedTypeID, setSelectedTypeID } = useContext(Context);
  // mrx : End -------------------------------------------------------------------------------------------------

  const getUnitName = () => {
    if (SelectedTypeID === 0) {
      return SelectInputData?.digitalSizeUints?.filter(item => item?.id === UnitID).map(item => (item?.name));
    } else {
      return SelectInputData?.physicalSizeUints?.filter(item => item?.id === UnitID).map(item => (item?.name));
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


  const getFrameUnitName = () => {
    if (SelectedTypeID === 0) {
      return SelectInputData?.digitalSizeUints?.filter(item => item?.id === FrameUnitID).map(item => (item?.name));
    } else {
      return SelectInputData?.physicalSizeUints?.filter(item => item?.id === FrameUnitID).map(item => (item?.name));
    }
  }

  // states ↓
  const [CheckRequired, setCheckRequired] = useState(false);

  const [AddWeight, setAddWeight] = useState(Data?.haveWeight);
  const [AddFrame, setAddFrame] = useState(Data?.haveFrame);
  const [UnitID, setUnitID] = useState(Data?.size_Unit);
  const [Width, setWidth] = useState(Data?.size_Width);
  const [Height, setHeight] = useState(Data?.size_Height);
  const [Depth, setDepth] = useState(Data?.size_Depth);
  const [Weight, setWeight] = useState(Data?.weigh);
  const [WeightType, setWeightType] = useState(Data?.type);

  // frame state
  const [FrameUnitID, setFrameUnitID] = useState(Data?.frame_Size_Unit);
  const [FrameWidth, seFrametWidth] = useState(Data?.frame_Size_Width);
  const [FrameHeight, setFrameHeight] = useState(Data?.frame_Size_Height);
  const [FrameDepth, setFrameDepth] = useState(Data?.frame_Size_Depth);

  const GET_Local_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Adding-Art-Work") || "[]"
      : "[]"
  );

  const getData = () => {
    if (SelectedTypeID === 0) {
      return SelectInputData?.digitalSizeUints;
    } else {
      return SelectInputData?.physicalSizeUints;
    }
  }

  useEffect(() => {
    setLocalData(
      LocalData &&
      LocalData?.map((Item) => {
        if (Item?.id === Data?.id) {
          return { ...Item, size_Width: parseInt(Width) };
        }
        return Item;
      })
    );
  }, [Width])

  useEffect(() => {
    setLocalData(
      LocalData &&
      LocalData?.map((Item) => {
        if (Item?.id === Data?.id) {
          return { ...Item, size_Height: parseInt(Height) };
        }
        return Item;
      })
    );
  }, [Height])

  useEffect(() => {
    setLocalData(
      LocalData &&
      LocalData?.map((Item) => {
        if (Item?.id === Data?.id) {
          return { ...Item, size_Depth: parseInt(Depth) };
        }
        return Item;
      })
    );
  }, [Depth])

  useEffect(() => {
    setLocalData(
      LocalData &&
      LocalData?.map((Item) => {
        if (Item?.id === Data?.id) {
          return { ...Item, size_Unit: UnitID };
        }
        return Item;
      })
    );
  }, [UnitID])

  useEffect(() => {
    if (AddWeight === false) {
      setWeight(0);
      setWeightType(0);

      setLocalData(
        LocalData &&
        LocalData?.map((Item) => {
          if (Item?.id === Data?.id) {
            return { ...Item, haveWeight: false, weigh: 0, type: 0 };
          }
          return Item;
        })
      );
    } else {
      setLocalData(
        LocalData &&
        LocalData?.map((Item) => {
          if (Item?.id === Data?.id) {
            return { ...Item, haveWeight: AddWeight };
          }
          return Item;
        })
      );
    }
  }, [AddWeight])

  useEffect(() => {
    setLocalData(
      LocalData &&
      LocalData?.map((Item) => {
        if (Item?.id === Data?.id) {
          return { ...Item, weigh: parseInt(Weight) };
        }
        return Item;
      })
    );
  }, [Weight])


  // frame data update Start

  useEffect(() => {
    setLocalData(
      LocalData &&
      LocalData?.map((Item) => {
        if (Item?.id === Data?.id) {
          return { ...Item, frame_Size_Width: parseInt(FrameWidth) };
        }
        return Item;
      })
    );
  }, [FrameWidth])

  useEffect(() => {
    setLocalData(
      LocalData &&
      LocalData?.map((Item) => {
        if (Item?.id === Data?.id) {
          return { ...Item, frame_Size_Height: parseInt(FrameHeight) };
        }
        return Item;
      })
    );
  }, [FrameHeight])

  useEffect(() => {
    setLocalData(
      LocalData &&
      LocalData?.map((Item) => {
        if (Item?.id === Data?.id) {
          return { ...Item, frame_Size_Depth: parseInt(FrameDepth) };
        }
        return Item;
      })
    );
  }, [FrameDepth])

  useEffect(() => {
    setLocalData(
      LocalData &&
      LocalData?.map((Item) => {
        if (Item?.id === Data?.id) {
          return { ...Item, frame_Size_Depth: parseInt(FrameDepth) };
        }
        return Item;
      })
    );
  }, [FrameDepth])


  useEffect(() => {
    if (AddFrame === false) {
      setFrameUnitID("");
      setAddFrame(false);
      setFrameDepth("");
      setFrameHeight("");
      seFrametWidth("");
      setLocalData(
        LocalData &&
        LocalData?.map((Item) => {
          if (Item?.id === Data?.id) {
            return { ...Item, haveFrame: false, frame_Size_Width: 0, frame_Size_Height: 0, frame_Size_Depth: 0, frame_Size_Unit: uuid() };
          }
          return Item;
        })
      );
    } else {
      setLocalData(
        LocalData &&
        LocalData?.map((Item) => {
          if (Item?.id === Data?.id) {
            return { ...Item, haveFrame: AddFrame };
          }
          return Item;
        })
      );
    }
  }, [AddFrame])

  // frame data update End

  useEffect(() => {
    setLocalData(
      LocalData &&
      LocalData?.map((Item) => {
        if (Item?.id === Data?.id) {
          return { ...Item, frame_Size_Unit: FrameUnitID ? FrameUnitID : uuid() };
        }
        return Item;
      })
    );
  }, [FrameUnitID])


  return (
    <Grid item className={ArtFlowStyle.P_line_more}>
      <span className={ArtFlowStyle.line_more}></span>
      <span className={ArtFlowStyle.text_num_more}>{num}</span>
      <Grid container direction="column" className={ArtFlowStyle.titleEditions5}>
        <Grid item className={ArtFlowStyle.p_4forms}>
          <Grid container className={ArtFlowStyle.fourInput} spacing={1}>
            <Grid item className={ArtFlowStyle.Input3}>
              <InputForm
                value={Width}
                setValue={setWidth}
                type="number"
                disabled={disabled}
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
                disabled={disabled}
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
                    disabled={disabled}
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
                disabled={disabled}
                value={UnitID}
                SelectName={
                  SelectedTypeID === 0 ?
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
          SelectedTypeID !== 0 && (
            <Grid item className={`${ArtFlowStyle.mtb_10} ${ArtFlowStyle.ml_4}`}>
              <CustomCheckBox
                disabled={disabled}
                label="Frame"
                checked={AddFrame}
                setChecked={() => setAddFrame(!AddFrame)}
              />
            </Grid>
          )
        }

        {/* frame was true showen Start */}

        {AddFrame && SelectedTypeID !== 0 && (
          <Grid item>
            <Grid container className={ArtWorkflowStyle.fourInput} spacing={1}>
              <Grid item className={ArtFlowStyle.Input3}>
                <InputForm
                  value={FrameWidth}
                  setValue={seFrametWidth}
                  disabled={disabled}
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
                  disabled={disabled}
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
                      disabled={disabled}
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
                  disabled={disabled}
                  setValue={setFrameUnitID}
                  value={FrameUnitID}
                  SelectName={
                    SelectedTypeID === 0 ?
                      SelectInputData?.digitalSizeUints?.filter((item) => item?.id === FrameUnitID)?.map((item) => item?.name)
                      :
                      SelectInputData?.physicalSizeUints?.filter((item) => item?.id === FrameUnitID)?.map((item) => item?.name)
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
          SelectedTypeID !== 0 && (
            <>
              <Grid item className={ArtFlowStyle.P_ButtonAddWeigh}>
                <ButtonAddWeigh
                  disabled={disabled}
                  handleAdd={() => setAddWeight(!AddWeight)}
                  addWeight={AddWeight}
                />
                {AddWeight && (
                  <Grid item className={`${ArtWorkStyle.w_100}`}>
                    <Grid container className={ArtWorkStyle.fourInput} spacing={3}>
                      <Grid item className={ArtWorkStyle.Input6}>
                        <InputForm
                          type="number"
                          disabled={disabled}
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
                          Data={getData()}
                          label="Unit"
                          placeHolder="Choose One"
                          disabled={disabled}
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
        {/* <Grid item>
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
      </Grid>
    </Grid>
  );
}
