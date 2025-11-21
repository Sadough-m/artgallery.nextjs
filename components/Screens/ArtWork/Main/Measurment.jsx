import React, { useState, useEffect, useContext } from "react";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import { uuid } from "uuidv4";
// mrx : material ui ↓
import { Grid, Button } from "@material-ui/core";

// mrx : Styles ↓
import ArtFlowStyle from "../../../../styles/artworkflow.module.css";
import ArtWorkflowStyle from "../../../../styles/artworkflow.module.css";
import ArtWorkStyle from "../../../../styles/artworkflow.module.css";

// rmx : files  ↓
import remove from "../../../../public/images/icons/Remove.svg";
import addIcon from "../../../../public/images/icons/Plus - Circle.svg";
import Image from "next/image";

// mrx : components ↓
import CustomSelect from "../../../Forms/CustomSelect";
import InputForm from "../../../Forms/InputForm";
import CustomCheckBox from "../../../Forms/CustomCheckBox";
import AddWeigh from "../AddWeigh";
import ButtonAddWeigh from "../ButtonAddWeigh";
import FrameForms from "../FrameForms";

// mrx : context ↓
import { Context } from "../../../../context/index";

export default function Measurment({
  is_inside = false,
  haveTitle = true,
  SelectInputData,
  setMeasurmentData,
  MeasurmentData
}) {

  // mrx : Context → ( start ) ---------------------------------------------------------------------------------
  const { SelectedTypeID, setSelectedTypeID } = useContext(Context);
  // mrx : End -------------------------------------------------------------------------------------------------

  const GET_Local_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Adding-Art-Work") || "[]"
      : "[]"
  );

  const GET_ADDED_DATA_2 = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("ArtWork-Editions") || "[]"
      : "[]"
  );

  // states ↓
  const [frame, setFrame] = useState(false);
  const [Data, setData] = useState([]);

  useEffect(() => {
    setData(GET_Local_DATA);
  }, []);

  const getData = () => {
    if (SelectedTypeID === 0) {
      return SelectInputData?.digitalSizeUints;
    } else {
      return SelectInputData?.physicalSizeUints;
    }
  };
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

  const handleSetSelectedTypeID = () => {
    setWeightType(SelectInputData?.weghitUints?.map((item) => item?.id)[0]);
    if (SelectedTypeID === 0) {
      setUnitID(SelectInputData?.digitalSizeUints?.map((item) => item?.id)[0])
      setFrameUnitID(SelectInputData?.digitalSizeUints?.map((item) => item?.id)[0])
    } else {
      setUnitID(SelectInputData?.physicalSizeUints?.map((item) => item?.id)[0])
      setFrameUnitID(SelectInputData?.physicalSizeUints?.map((item) => item?.id)[0])
    }
  }

  useEffect(() => {
    handleSetSelectedTypeID()
  },[SelectInputData])

  useEffect(() => {
    handleSetSelectedTypeID()
  }, [SelectedTypeID])

  useEffect(() => {
    setMeasurmentData({
      size_Width: parseInt(Width ? Width : 0),
      size_Height: parseInt(Height ? Height : 0),
      size_Depth: parseInt(Depth ? Depth : 0),
      size_Unit: UnitID ? UnitID : uuid(),
      frame_Size_Width: parseInt(FrameWidth ? FrameWidth : 0),
      frame_Size_Height: parseInt(FrameHeight ? FrameHeight : 0),
      frame_Size_Depth: parseInt(FrameDepth ? FrameDepth : 0),
      frame_Size_Unit: FrameUnitID ? FrameUnitID : uuid(),
      haveWeight: AddWeight,
      haveFrame: AddFrame,
      weigh: parseInt(Weight ? Weight : 0),
      weigh_Unit: WeightType ? WeightType : uuid(),
    })
  }, [Width])

  useEffect(() => {
    setMeasurmentData({
      size_Width: parseInt(Width ? Width : 0),
      size_Height: parseInt(Height ? Height : 0),
      size_Depth: parseInt(Depth ? Depth : 0),
      size_Unit: UnitID ? UnitID : uuid(),
      frame_Size_Width: parseInt(FrameWidth ? FrameWidth : 0),
      frame_Size_Height: parseInt(FrameHeight ? FrameHeight : 0),
      frame_Size_Depth: parseInt(FrameDepth ? FrameDepth : 0),
      frame_Size_Unit: FrameUnitID ? FrameUnitID : uuid(),
      haveWeight: AddWeight,
      haveFrame: AddFrame,
      weigh: parseInt(Weight ? Weight : 0),
      weigh_Unit: WeightType ? WeightType : uuid(),
    })
  }, [Height])

  useEffect(() => {
    setMeasurmentData({
      size_Width: parseInt(Width ? Width : 0),
      size_Height: parseInt(Height ? Height : 0),
      size_Depth: parseInt(Depth ? Depth : 0),
      size_Unit: UnitID ? UnitID : uuid(),
      frame_Size_Width: parseInt(FrameWidth ? FrameWidth : 0),
      frame_Size_Height: parseInt(FrameHeight ? FrameHeight : 0),
      frame_Size_Depth: parseInt(FrameDepth ? FrameDepth : 0),
      frame_Size_Unit: FrameUnitID ? FrameUnitID : uuid(),
      haveWeight: AddWeight,
      haveFrame: AddFrame,
      weigh: parseInt(Weight ? Weight : 0),
      weigh_Unit: WeightType ? WeightType : uuid(),
    })
  }, [Depth])

  useEffect(() => {
    setMeasurmentData({
      size_Width: parseInt(Width ? Width : 0),
      size_Height: parseInt(Height ? Height : 0),
      size_Depth: parseInt(Depth ? Depth : 0),
      size_Unit: UnitID ? UnitID : uuid(),
      frame_Size_Width: parseInt(FrameWidth ? FrameWidth : 0),
      frame_Size_Height: parseInt(FrameHeight ? FrameHeight : 0),
      frame_Size_Depth: parseInt(FrameDepth ? FrameDepth : 0),
      frame_Size_Unit: FrameUnitID ? FrameUnitID : uuid(),
      haveWeight: AddWeight,
      haveFrame: AddFrame,
      weigh: parseInt(Weight ? Weight : 0),
      weigh_Unit: WeightType ? WeightType : uuid(),
    })
  }, [UnitID])

  useEffect(() => {
    setMeasurmentData({
      size_Width: parseInt(Width ? Width : 0),
      size_Height: parseInt(Height ? Height : 0),
      size_Depth: parseInt(Depth ? Depth : 0),
      size_Unit: UnitID ? UnitID : uuid(),
      frame_Size_Width: parseInt(FrameWidth ? FrameWidth : 0),
      frame_Size_Height: parseInt(FrameHeight ? FrameHeight : 0),
      frame_Size_Depth: parseInt(FrameDepth ? FrameDepth : 0),
      frame_Size_Unit: FrameUnitID ? FrameUnitID : uuid(),
      haveWeight: AddWeight,
      haveFrame: AddFrame,
      weigh: parseInt(Weight ? Weight : 0),
      weigh_Unit: WeightType ? WeightType : uuid(),
    })
  }, [FrameWidth])

  useEffect(() => {
    setMeasurmentData({
      size_Width: parseInt(Width ? Width : 0),
      size_Height: parseInt(Height ? Height : 0),
      size_Depth: parseInt(Depth ? Depth : 0),
      size_Unit: UnitID ? UnitID : uuid(),
      frame_Size_Width: parseInt(FrameWidth ? FrameWidth : 0),
      frame_Size_Height: parseInt(FrameHeight ? FrameHeight : 0),
      frame_Size_Depth: parseInt(FrameDepth ? FrameDepth : 0),
      frame_Size_Unit: FrameUnitID ? FrameUnitID : uuid(),
      haveWeight: AddWeight,
      haveFrame: AddFrame,
      weigh: parseInt(Weight ? Weight : 0),
      weigh_Unit: WeightType ? WeightType : uuid(),
    })
  }, [FrameHeight])

  useEffect(() => {
    setMeasurmentData({
      size_Width: parseInt(Width ? Width : 0),
      size_Height: parseInt(Height ? Height : 0),
      size_Depth: parseInt(Depth ? Depth : 0),
      size_Unit: UnitID ? UnitID : uuid(),
      frame_Size_Width: parseInt(FrameWidth ? FrameWidth : 0),
      frame_Size_Height: parseInt(FrameHeight ? FrameHeight : 0),
      frame_Size_Depth: parseInt(FrameDepth ? FrameDepth : 0),
      frame_Size_Unit: FrameUnitID ? FrameUnitID : uuid(),
      haveWeight: AddWeight,
      haveFrame: AddFrame,
      weigh: parseInt(Weight ? Weight : 0),
      weigh_Unit: WeightType ? WeightType : uuid(),
    })
  }, [FrameDepth])

  useEffect(() => {
    setMeasurmentData({
      size_Width: parseInt(Width ? Width : 0),
      size_Height: parseInt(Height ? Height : 0),
      size_Depth: parseInt(Depth ? Depth : 0),
      size_Unit: UnitID ? UnitID : uuid(),
      frame_Size_Width: parseInt(FrameWidth ? FrameWidth : 0),
      frame_Size_Height: parseInt(FrameHeight ? FrameHeight : 0),
      frame_Size_Depth: parseInt(FrameDepth ? FrameDepth : 0),
      frame_Size_Unit: FrameUnitID ? FrameUnitID : uuid(),
      haveWeight: AddWeight,
      haveFrame: AddFrame,
      weigh: parseInt(Weight ? Weight : 0),
      weigh_Unit: WeightType ? WeightType : uuid(),
    })
  }, [FrameUnitID])

  useEffect(() => {
    setMeasurmentData({
      size_Width: parseInt(Width ? Width : 0),
      size_Height: parseInt(Height ? Height : 0),
      size_Depth: parseInt(Depth ? Depth : 0),
      size_Unit: UnitID ? UnitID : uuid(),
      frame_Size_Width: parseInt(FrameWidth ? FrameWidth : 0),
      frame_Size_Height: parseInt(FrameHeight ? FrameHeight : 0),
      frame_Size_Depth: parseInt(FrameDepth ? FrameDepth : 0),
      frame_Size_Unit: FrameUnitID ? FrameUnitID : uuid(),
      haveWeight: AddWeight,
      haveFrame: AddFrame,
      weigh: parseInt(Weight ? Weight : 0),
      weigh_Unit: WeightType ? WeightType : uuid(),
    })
  }, [AddWeight])

  useEffect(() => {
    setMeasurmentData({
      size_Width: parseInt(Width ? Width : 0),
      size_Height: parseInt(Height ? Height : 0),
      size_Depth: parseInt(Depth ? Depth : 0),
      size_Unit: UnitID ? UnitID : uuid(),
      frame_Size_Width: parseInt(FrameWidth ? FrameWidth : 0),
      frame_Size_Height: parseInt(FrameHeight ? FrameHeight : 0),
      frame_Size_Depth: parseInt(FrameDepth ? FrameDepth : 0),
      frame_Size_Unit: FrameUnitID ? FrameUnitID : uuid(),
      haveWeight: AddWeight,
      haveFrame: AddFrame,
      weigh: parseInt(Weight ? Weight : 0),
      weigh_Unit: WeightType ? WeightType : uuid(),
    })
  }, [AddFrame])

  useEffect(() => {
    setMeasurmentData({
      size_Width: parseInt(Width ? Width : 0),
      size_Height: parseInt(Height ? Height : 0),
      size_Depth: parseInt(Depth ? Depth : 0),
      size_Unit: UnitID ? UnitID : uuid(),
      frame_Size_Width: parseInt(FrameWidth ? FrameWidth : 0),
      frame_Size_Height: parseInt(FrameHeight ? FrameHeight : 0),
      frame_Size_Depth: parseInt(FrameDepth ? FrameDepth : 0),
      frame_Size_Unit: FrameUnitID ? FrameUnitID : uuid(),
      haveWeight: AddWeight,
      haveFrame: AddFrame,
      weigh: parseInt(Weight ? Weight : 0),
      weigh_Unit: WeightType ? WeightType : uuid(),
    })
  }, [Weight])

  useEffect(() => {
    setMeasurmentData({
      size_Width: parseInt(Width ? Width : 0),
      size_Height: parseInt(Height ? Height : 0),
      size_Depth: parseInt(Depth ? Depth : 0),
      size_Unit: UnitID ? UnitID : uuid(),
      frame_Size_Width: parseInt(FrameWidth ? FrameWidth : 0),
      frame_Size_Height: parseInt(FrameHeight ? FrameHeight : 0),
      frame_Size_Depth: parseInt(FrameDepth ? FrameDepth : 0),
      frame_Size_Unit: FrameUnitID ? FrameUnitID : uuid(),
      haveWeight: AddWeight,
      haveFrame: AddFrame,
      weigh: parseInt(Weight ? Weight : 0),
      weigh_Unit: WeightType ? WeightType : uuid(),
    })
  }, [WeightType])

  useEffect(() => {
    localStorage.setItem("Add-ArtWork-Measurment", JSON.stringify(MeasurmentData))
  }, [MeasurmentData])

  useEffect(() => {
    localStorage.setItem("Add-ArtWork-Measurment", "[]");
  }, []);

  return (
    <Grid item>
      <Grid
        container
        direction="column"
        style={{ paddingTop: "0px", ZIndex: "11111" }}
        className={is_inside ? ArtFlowStyle.titleEditions1 : ArtFlowStyle.box}
      >
        <span className={ArtFlowStyle.obj_for_id} id="Measurment"></span>
        <Grid
          style={{ borderTop: "0px" }}
          item
          className={`${ArtFlowStyle.title3}`}
        >
          Measurment
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
            {SelectedTypeID !== 0 && (
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
            )}

            <Grid item className={ArtFlowStyle.Input1}>
              <CustomSelect
                Data={getData()}
                label="Unit"
                placeHolder="Choose One"
                bgColor="#F7F8FA"
                setValue={setUnitID}
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

        {SelectedTypeID !== 0 && (
          <Grid item className={`${ArtFlowStyle.mtb_10} ${ArtFlowStyle.ml_4}`}>
            <CustomCheckBox
              label="Frame"
              checked={AddFrame}
              setChecked={() => setAddFrame(!AddFrame)}
            />
          </Grid>
        )}

        {/* frame was true showen Start */}

        {AddFrame && SelectedTypeID !== 0 && (
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
              {SelectedTypeID !== 0 && (
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
              )}
              <Grid item className={ArtWorkflowStyle.Input1}>
                <CustomSelect
                  Data={getData()}
                  label="Unit"
                  placeHolder="Choose One"
                  bgColor="#F7F8FA"
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
        {SelectedTypeID !== 0 && (
          <>
            <Grid item className={ArtFlowStyle.P_ButtonAddWeigh}>
              <ButtonAddWeigh
                handleAdd={() => setAddWeight(!AddWeight)}
                addWeight={AddWeight}
              />
              {AddWeight && (
                <Grid item className={`${ArtWorkStyle.w_100}`}>
                  <Grid
                    container
                    className={ArtWorkStyle.fourInput}
                    spacing={3}
                  >
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
        )}

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
