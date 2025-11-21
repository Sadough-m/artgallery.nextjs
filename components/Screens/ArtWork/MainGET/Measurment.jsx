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
  MesurmentData,
  setMesurmentData,
  is_inside = false,
  haveTitle = true,
  SelectInputData,
  mintingStatus
}) {
  // mrx : Context → ( start ) ---------------------------------------------------------------------------------
  const { SelectedTypeID, setSelectedTypeID, setShowDisOrSaveLimited } = useContext(Context);
  // mrx : End -------------------------------------------------------------------------------------------------

  const GET_Local_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Adding-Art-Work") || "[]"
      : "[]"
  );

  // states ↓
  const [CheckRequired, setCheckRequired] = useState(false);
  const [Data, setData] = useState([]);

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

  useEffect(() => {
    setWeightType(SelectInputData?.weghitUints?.map((item) => item?.id)[0])
    if (SelectedTypeID === 0) {
      setUnitID(SelectInputData?.digitalSizeUints?.map((item) => item?.id)[0]);
      setFrameUnitID(SelectInputData?.digitalSizeUints?.map((item) => item?.id)[0]);
    } else {
      setUnitID(SelectInputData?.physicalSizeUints?.map((item) => item?.id)[0])
      setFrameUnitID(SelectInputData?.physicalSizeUints?.map((item) => item?.id)[0])
    }
  }, [SelectedTypeID])

  const getData = () => {
    if (SelectedTypeID === 0) {
      return SelectInputData?.digitalSizeUints;
    } else {
      return SelectInputData?.physicalSizeUints;
    }
  }

  useEffect(() => {
    setAddWeight(MesurmentData?.haveWeight);
    setAddFrame(MesurmentData?.haveFrame);
    setUnitID(MesurmentData?.size_Unit);
    setWidth(MesurmentData?.size_Width ? MesurmentData?.size_Width : 0);
    setHeight(MesurmentData?.size_Height);
    setDepth(MesurmentData?.size_Depth);
    setWeight(MesurmentData?.weigh);
    setWeightType(MesurmentData?.weigh_Unit);
    setFrameUnitID(MesurmentData?.frame_Size_Unit);
    seFrametWidth(MesurmentData?.frame_Size_Width);
    setFrameHeight(MesurmentData?.frame_Size_Height);
    setFrameDepth(MesurmentData?.frame_Size_Depth);
    // localStorage.setItem("Add-ArtWork-Measurment", '[]');
  }, [MesurmentData])

  useEffect(() => {
    setMesurmentData({
      "size_Width": parseInt(Width ? Width : MesurmentData?.size_Width ? MesurmentData?.size_Width : 0),
      "size_Height": parseInt(Height ? Height : MesurmentData?.size_Height ? MesurmentData?.size_Height : 0),
      "size_Depth": parseInt(Depth ? Depth : MesurmentData?.size_Depth ? MesurmentData?.size_Depth : 0),
      "size_Unit": UnitID ? UnitID : MesurmentData?.size_Unit ? MesurmentData?.size_Unit : uuid(),
      "frame_Size_Width": parseInt(FrameWidth ? FrameWidth : MesurmentData?.frame_Size_Width ? MesurmentData?.frame_Size_Width : 0),
      "frame_Size_Height": parseInt(FrameHeight ? FrameHeight : MesurmentData?.frame_Size_Height ? MesurmentData?.frame_Size_Height : 0),
      "frame_Size_Depth": parseInt(FrameDepth ? FrameDepth : MesurmentData?.frame_Size_Depth ? MesurmentData?.frame_Size_Depth : 0),
      "frame_Size_Unit": FrameUnitID ? FrameUnitID : MesurmentData?.frame_Size_Unit ? MesurmentData?.frame_Size_Unit : uuid(),
      "haveWeight": AddWeight,
      "haveFrame": AddFrame,
      "weigh": parseInt(Weight ? Weight : MesurmentData?.weigh ? MesurmentData?.weigh : 0),
      "weigh_Unit": WeightType ? WeightType : MesurmentData?.weigh_Unit ? MesurmentData?.weigh_Unit : uuid()
    })
  }, [Width, Height, Depth, UnitID, FrameWidth, FrameHeight, FrameDepth, FrameUnitID, AddWeight, AddFrame, Weight, WeightType])

  useEffect(() => {
    localStorage.setItem("Add-ArtWork-Measurment", JSON.stringify(MesurmentData))
  }, [MesurmentData])

  return (
    <Grid item>
      <Grid
        container
        direction="column"
        style={{ paddingTop: "0px" }}
        className={is_inside ? ArtFlowStyle.titleEditions1 : ArtFlowStyle.box}
      >
        <span className={ArtFlowStyle.obj_for_id} id="Measurment"></span>
        <Grid style={{ borderTop: "0px" }} item className={`${ArtFlowStyle.title3}`}>
          Measurment
        </Grid>
        <Grid item className={ArtFlowStyle.p_4forms}>
          <Grid container className={ArtFlowStyle.fourInput} spacing={1}>
            <Grid item className={ArtFlowStyle.Input3}>
              <InputForm
                value={Width}
                setValue={setWidth}
                type="number"
                onChange={() => setShowDisOrSaveLimited(true)}
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
                onChange={() => setShowDisOrSaveLimited(true)}
                locked={mintingStatus === 3 || mintingStatus === 4}
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
                    locked={mintingStatus === 3 || mintingStatus === 4}
                    placeHolder="Depth"
                    onChange={() => setShowDisOrSaveLimited(true)}
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
                locked={mintingStatus === 3 || mintingStatus === 4}
                value={UnitID}
                onChange={() => setShowDisOrSaveLimited(true)}
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
              <CustomCheckBox label="Frame" checked={AddFrame} setChecked={() => setAddFrame(!AddFrame)} />
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
                  type="number"
                  placeHolder="Width"
                  onChange={() => setShowDisOrSaveLimited(true)}
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
                  onChange={() => setShowDisOrSaveLimited(true)}
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
                      onChange={() => setShowDisOrSaveLimited(true)}
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
                  onChange={() => setShowDisOrSaveLimited(true)}
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
                          onChange={() => setShowDisOrSaveLimited(true)}
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
                          bgColor="#F7F8FA"
                          setValue={setWeightType}
                          value={WeightType}
                          SelectName={SelectInputData?.weghitUints?.filter((item) => item?.id === WeightType)?.map((item) => item?.name)}
                          setSelectName={setWeightType}
                          setCheckRequired={setCheckRequired}
                          onChange={() => setShowDisOrSaveLimited(true)}
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
